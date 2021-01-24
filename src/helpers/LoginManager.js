import ApiManager from './ApiManager'
import TokenTimeManager from './TokenTimeManager'

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


    static async login(email, password){
        try{
            const res = await ApiManager.login(email, password)
            const { token, user, message } = res
            localStorage.setItem('token') = token.token
            localStorage.setItem('refresh_token') = token.refresh_token
            localStorage.setItem('previous_refresh_token') = token.previous_refresh_token
            const expiresAt = TokenTimeManager.getEpochExpiryTime(token.expires_in)
            localStorage.setItem('expires_at') = expiresAt

        }catch(err){
            console.log(err)
            if(!!err.status){
                switch(err.status){
                    
                }
            }else{
                console.log("Connectivity Issues")
            }
        }
        
    }
}