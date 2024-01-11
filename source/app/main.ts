import BaseClass from "./base.js"
import htbClient from "../libs/htb_client.js";

export default class HTB {
    private HTBBase: BaseClass;

    constructor(token?: string) {
        this.HTBBase = new BaseClass()
		this.HTBBase.setAccessToken(token ?? '')
	}

    public init = async (username: string, password: string) => {
        await this.HTBBase.login(
			username,
			password
		)
		return this.HTBBase.accessCreds()
    }

	public fetchWhoAmI = async () : Promise<IHTBWhoAmIInfo> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.get("/user/info")

			return data
		}
		catch(err) {
			if(err instanceof Error) {
				throw new Error(err.message)
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
			if(err instanceof Error) {
				throw new Error(err.message)
			}
			else
				throw new Error("Unknown error")
		}
    }

	public fetchMachines = async () : Promise<IHTBMachinesList> => {
		try {
			const { data } = await htbClient(this.HTBBase.accessCreds())
				.get("/machine/paginated")

			return data as IHTBMachinesList
		}
		catch(err) {
			if(err instanceof Error) {
				throw new Error(err.message)
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
			if(err instanceof Error) {
				throw new Error(err.message)
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
			if(err instanceof Error) {
				throw new Error(err.message)
			}
			else
				throw new Error("Unknown error")
		}
	}
}
