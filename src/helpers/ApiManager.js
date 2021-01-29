import { BACKEND_URL, API_SUFFIX, FRONTEND_URL } from '../constants'
import LoginManager from './LoginManager'
import AuthenticationError from '../errors/AuthenticationError'

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

    static async getToken(){
        const token = LoginManager.getToken()
        if(!!token){
            if(!!token.token){
                return token.token
            }else if(!!token.refresh_token){
                return await LoginManager.getNewToken(token.refresh_token)
            }
        }else{
            return null
        }
    }

    static async protectedRoute(){
        try{
            const token = await this.getToken()
            if(!!token){ throw new AuthenticationError()}
            return token
        }catch(err){
            if(err instanceof AuthenticationError){
                LoginManager.clearLocalStorage()
                window.location.replace(`${FRONTEND_URL}/`)
            }else{
                throw err
            }
        }
    }

    static async getUser(){
        const token = await this.getToken()
        if(token){
            const uri = `${API_SUFFIX}/me`
            return await this.get(uri, token)
        }else{
            return null
        }
    }

    static async login(email, password){
        return await this.post('/login', {
            user: {
                email, 
                password
            }
        })
    }

    static async signup(firstName, lastName, email, password, passwordConfirmation){
        return await this.post('/signup', {
            user: {
                name: `${firstName} ${lastName}`,
                email,
                password,
                passwordConfirmation
            }
        })
    }


    static async getBusinesses(){
        const token = this.protectedRoute()
        return await this.get('/bussinesses', token)
    }

    static async get(path, token=null){
        return await this.request("GET", path, null, token)
    }

    static async post(path, body, token=null){
        return await this.request("POST", path, body, token)
    }

    static async patch(path, body, token=null){
        return await this.request("PATCH", path, body, token)
    }

    static async delete(path, body=null, token=null){
        return await this.request("DELETE", path, body, token)
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



