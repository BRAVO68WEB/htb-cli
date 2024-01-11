import axios from 'axios'

export default class BaseHTB {
    private access_token: string;

	constructor(token?: string) {
		this.access_token = token ?? '';
	}

    public login = async (username: string, password: string) => {
		try {
			this.access_token = await this.getAccessToken(username, password);
			return
		}
		catch(err) {
			if(err instanceof Error) {
				throw new Error(err.message)
			}
		}
	}

    public accessCreds = () => {
        return this.access_token
    }

    public getAccessToken = async (email: string, password: string): Promise<string> => {
		return new Promise(async function(resolve, reject) {
			try {
                const { data } = await axios
                    .post("https://www.hackthebox.com/api/v4/login", {
                        email,
                        password,
                        remember: true
                    }, {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                            "User-Agent": "HTB-CLI"
                        }
                    });
                resolve(data.message.access_token);
            } catch (err: any) {
                console.warn(err);
                console.warn("Could not get session:", err.status);
                reject(err);
            }
		})
	}

	public setAccessToken = (token: string) => {
		this.access_token = token;
	}
}
