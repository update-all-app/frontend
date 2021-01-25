import React, { useState, useContext } from 'react'
import LandingNavbar from './LandingNavbar'
import { useHistory } from 'react-router-dom'
import Input from '../subcomponents/Input'
import Submit from '../subcomponents/Submit'
import LoginManager from '../helpers/LoginManager'
import { POPULATE_USER } from '../actionTypes'
import UserContext from '../context/UserContext'


export default function Login(props){

    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {dispatch} = useContext(UserContext)

    const login = async () => {
        const res = await LoginManager.login(email, password)
        if(res.success){
            console.log(res.user)
            dispatch({type: POPULATE_USER, payload: { email: res.user.email }})
            //dispatch{type: POPULATE_USER, payload: {email: res.user.email, name: res.user.name}}
            history.push('/home')
        }else{
            LoginManager.clearLocalStorage()
            console.log(res)
        }
    }

    return(
        <div className="landing">
            <div className="landing-top">
                <LandingNavbar/>
                <div className="landing-title-div">
                    <h1 className="landing-title color-green-600">Login</h1>
                </div>
            </div>
            <div className="landing-bottom">
                <div className="border-l-2 border-primary shadow-lg p-10 content-center">
                    <Input 
                        placeholder="Email"
                        onChange={(email) => { setEmail(email) }}
                        value={ email }
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={(pass) => { setPassword(pass) }}
                        value={ password }
                    />

                    <Submit 
                        value="Log In"
                        onClick={login}
                    />

                </div>
            </div> 
        </div>
        
    )
}