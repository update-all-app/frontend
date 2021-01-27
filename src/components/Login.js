import React, { useState, useContext } from 'react'
import LandingNavbar from './LandingNavbar'
import { useHistory } from 'react-router-dom'
import Input from '../subcomponents/Input'
import Submit from '../subcomponents/Submit'
import Footer from './Footer'

import LoginManager from '../helpers/LoginManager'
import { POPULATE_USER } from '../actionTypes'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'


export default function Login(props){

    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErrors, setEmailErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])
    const {dispatch} = useContext(UserContext)

    const checkEmail = (email) => {
        return {
            valid: email !== "",
            errors: ["Must include an email"]
        }
    }

    const checkPassword = (password) => {
        return {
            valid: password.length > 0,
            errors: ["Must include a password"]
        
        }
    }

    const login = async () => {
        const validEmail = checkEmail(email)
        const validPassword = checkPassword(password)
        if(validEmail.valid && validPassword.valid){
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
        }else{
            if(!validEmail.valid){
                setEmailErrors(validEmail.errors)
            }else{
                setEmailErrors([])
            }
            if(!validPassword.valid){
                setPasswordErrors(validPassword.errors)
            }else{
                setPasswordErrors([])
            }
        }
    }


    return(
        <div className="landing">
            <div className="landing-top">
                <LandingNavbar/>
            </div>
            <div className="landing-bottom">
                
            </div> 
            <div className="border-l-2 border-primary shadow-lg p-10 content-center absolute top-1/4 left-3/10 bg-white w-2/5">
                    <Input 
                        placeholder="Email"
                        onChange={email => setEmail(email) }
                        value={ email }
                        errors={emailErrors}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={pass => setPassword(pass) }
                        value={ password }
                        errors={passwordErrors}
                    />
                    <Submit 
                        value="Log In"
                        onClick={login}
                    />
                    <div className="mt-6">
                        <Link to="/">Trouble logging in?</Link>
                    </div> 
                    <div className="mt-6 ">
                        <Link to="/signup">Don't have an account? Sign Up.</Link>
                    </div>   
                </div>
                <Footer />
        </div>
        
    )
}