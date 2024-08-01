import BaseClass from "./base.js"
import htbClient from "../libs/htb_client.js";
import { AxiosError } from "axios";

export default class HTB {
    private HTBBase: BaseClass;

    constructor(token?: string) {
        this.HTBBase = new BaseClass()
		this.HTBBase.setAccessToken(token ?? '')
	}

    public init = async (username: string, password: string): Promise<IHTBLoginResponse> => {
        const login_response = await this.HTBBase.login(
			username,
			password
		)
		return login_response
    }

	public auth2FA = async (otp: string): Promise<boolean> => {
		try {
			await this.HTBBase.otp_submit(otp)
			return true
		}
		catch(err) {
			return false
		}
	}

	public fetchWhoAmI = async () : Promise<IHTBWhoAmIInfo> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.get("/user/info")

			return data
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}

    public fetchProfileByID = async (id: string) : Promise<IHTBProfile> => {
        try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.get(`/users/${id}`)

			return data
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
    }

	public fetchMachines = async () : Promise<IHTBMachinesList> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.get("/machine/paginated?per_page=100")

			return data as IHTBMachinesList
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}

	public fetchUnreleasedMachines = async () : Promise<IHTBUnRelMachinesList> => {
		try {
			const { data } : {
				data: IHTBUnRelMachinesList
			} = await htbClient(this.HTBBase.accessCreds())
				.get("/machine/unreleased")

			data.data.map((machine) => {
				machine.retiring_avatar = machine.retiring.avatar
				machine.retiring_difficulty_text = machine.retiring.difficulty_text
				machine.retiring_id = machine.retiring.id
				machine.retiring_name = machine.retiring.name
				machine.retiring_os = machine.retiring.os
			})

			return data;
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}

	public fetchMachineProfile = async (name: string) : Promise<IHTBMachineProfile> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.get(`/machine/profile/${name}`)

			return data
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}

	public submitFlag = async (id: string, flag: string) : Promise<IHTBSubmitFlagResponse> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.post("/machine/own", {
					flag,
					id
				})

			return data
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}

	public submitArenaFlag = async (flag: string) : Promise<IHTBSubmitFlagResponse> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.post("/arena/own", {
					flag,
				})

			return data
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}

	public fetchArenaMachineInfo = async () : Promise<IHTBArenaMachineInfo> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.get("/season/machine/active")

			return data
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}

	public startArenaMachine = async () : Promise<IHTBStartArenaMachineResponse> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.post("/arena/start")

			return data
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}

	public fetchVPNInfo = async () : Promise<IHTBVpnInfoResponse> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.get("/connections")

			return data
		}
		catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message ?? err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}
}
