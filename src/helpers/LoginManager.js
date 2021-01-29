import ApiManager from './ApiManager'
import TokenTimeManager from './TokenTimeManager'
import { strip } from './functions'

export default class LoginManager{

    static getToken(){
        const token = localStorage.getItem('token')
        const refresh_token = localStorage.getItem('refresh_token')
        if(!token){
            if(!refresh_token){
                return null
            }else{
                return { refresh_token }
            }
        }else{
            const expiresAt = localStorage.getItem('expires_at')
            const timeManager = new TokenTimeManager(expiresAt)
            if(timeManager.tokenIsExpired()){
                if(!refresh_token){
                    return null
                }else{
                    return { refresh_token }
                }
            }else{
                return { token }
            }
        }
    }

    static clearLocalStorage(){
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('previous_refresh_token')
    }

    static async getNewToken(refreshToken){
        try{
            const res = await ApiManager.post('/refresh_token', {}, refreshToken)
            this.writeTokenToStorage(res)
            if(res && res.token && res.token.token){
                return res.token.token
            }else{
                return null
            }
        }catch(err){
            return null
        }
        
    }


    static async login(email, password){
        try{
            const res = await ApiManager.login(strip(email), password)
            this.writeTokenToStorage(res)
            return { success: true, user: res.user }
        }catch(err){
            console.log(err)
            if(!!err.status){
                switch(err.status){
                    
                }
                return { success: false }
            }else{
                console.log("Connectivity Issues")
                return { success: false }
            }
        }
        
    }

    static async signup(firstname, lastname, email, password, passwordConfirmation){
        try{
            const res = await ApiManager.signup(strip(firstname), strip(lastname), strip(email), password, passwordConfirmation)
            this.writeTokenToStorage(res)
            return { success: true, user: res.user }
        }catch(err){
            console.log(err)
            if(!!err.status){
                switch(err.status){

                }
                return { success: false }
            }else{
                console.log("Connectivity Issues")
                return { success: false }
            }
        }
    }

    static writeTokenToStorage(res){
        const { token } = res
        localStorage.setItem('token', token.token)
        localStorage.setItem('refresh_token', token.refresh_token)
        localStorage.setItem('previous_refresh_token', token.previous_refresh_token)
        const expiresAt = TokenTimeManager.getEpochExpiryTime(token.expires_in)
        localStorage.setItem('expires_at', expiresAt)
    }
}