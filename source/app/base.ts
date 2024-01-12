import { AxiosError } from "axios";
import htbClient from "../libs/htb_client.js";

export default class BaseHTB {
    private access_token: string;

	constructor(token?: string) {
		this.access_token = token ?? '';
	}

    public login = async (username: string, password: string): Promise<IHTBLoginResponse> => {
		try {
			const login_response = await this.getAccessToken(username, password);
			this.access_token = login_response.message.access_token;
			return login_response
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.message)
			}
			else {
				throw new Error("Unknown error")
			}
		}
	}

	public otp_submit = async (otp: string): Promise<string> => {
		try {
			const { data } = await htbClient(this.access_token)
				.post("/2fa/login", {
					one_time_password: otp
				}
			);
			return data.message;
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else {
				throw new Error("Unknown error")
			}
		}
	}

    public accessCreds = () => {
        return this.access_token
    }

    public getAccessToken = async (email: string, password: string): Promise<IHTBLoginResponse> => {
		return new Promise(async function(resolve, reject) {
			try {
                const { data } = await htbClient()
                    .post("/login", {
                        email,
                        password,
                        remember: true
                    }, {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                            "User-Agent": "HTB-CLI"
                        }
                    });
                resolve(data);
            } catch (err: any) {
                console.warn("Could not get session:", err.status);
                reject(err);
            }
		})
	}

	public setAccessToken = (token: string) => {
		this.access_token = token;
	}
}
