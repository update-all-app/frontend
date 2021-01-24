import { BACKEND_URL } from '../constants'

export default class ApiManager{

    static getHeaders(token){
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if(!!token){
            headers["Authorization"] = `Bearer ${token}`
        }

        return headers
    }

    static async login(email, password){
        return await this.post('/login', {
            user: {
                email, 
                password
            }
        })
    }

    static async get_businesses(token){
        return await this.get('/bussinesses', token)
    }

    static async get(path, token=null){
        return await this.request("GET", path)
    }

    static async post(path, body, token=null){
        return await this.request("POST", path, body)
    }

    static async patch(path, body, token=null){
        return await this.request("PATCH", path, body)
    }

    static async delete(path, body=null, token=null){
        return await this.request("DELETE", path, body)
    }

    static async request(method, path, body=null, token=null){
        const options = {
            method, 
            headers: this.getHeaders(token)
        }

        if(!!body){ options.body = JSON.stringify(body)}

        const res = await fetch(`${BACKEND_URL}${path}`, options)

        if(!res.ok){
            throw res
        }

        return await res.json()
    }

}



