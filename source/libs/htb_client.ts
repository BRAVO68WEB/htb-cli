import axios from 'axios';

const htbClient = (token?: string) => {
    return axios.create({
        baseURL: 'https://www.hackthebox.com/api/v4/',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'HTB-CLI',
            'Authorization': 'Bearer ' + token,
        }
    })
}

const htbAccountClient = (token?: string) => {
    return axios.create({
        baseURL: 'https://account.hackthebox.com/api/v1/',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'HTB-CLI',
            'Authorization': 'Bearer ' + token,
        }
    })
}

export default htbClient;
export {
	htbAccountClient
}
