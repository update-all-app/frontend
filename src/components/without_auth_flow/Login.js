import React, { useState, useContext } from 'react'
import LandingNavbar from './LandingNavbar'
import Input from '../../subcomponents/Input'
import Submit from '../../subcomponents/Submit'
import WithFooter from '../../wrappers/WithFooter'

import LoginManager from '../../helpers/LoginManager'
import ApiManager from '../../helpers/ApiManager'
import Parser from '../../helpers/Parser'
import { POPULATE_USER, LOADING, LOGOUT_USER } from '../../actionTypes'
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom'


export default function Login(props){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErrors, setEmailErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])
    const [formErrors, setFormErrors] = useState([])
    const { dispatch } = useContext(UserContext)
    

    const checkEmail = () => {
        const valid = email.length > 0
        const errors = valid ? [] : ["Must include an email"]
        return {
            valid,
            errors
        }
    }

    const checkPassword = () => {
        const valid = password.length > 0
        const errors = valid ? [] : ["Must include a password"]
        return {
            valid,
            errors
        }
    }


    const login = async () => {
        const validEmail = checkEmail()
        const validPassword = checkPassword()
        setEmailErrors(validEmail.errors)
        setPasswordErrors(validPassword.errors)
        if(validEmail.valid && validPassword.valid){
            dispatch({type: LOADING})
            const res = await LoginManager.login(email, password)
            if(res.success){
                const businesses = await ApiManager.getBusinesses()
                const businessesForContext = businesses.map(b => Parser.parseBusinessForContext(b))
                dispatch({type: POPULATE_USER, payload: { name: res.user.name, email: res.user.email, businesses: businessesForContext }})
            }else{
                LoginManager.clearLocalStorage()
                dispatch({type: LOGOUT_USER })
                setFormErrors(["Improper Credentials Entered"])
            }
        }
    }

    return(

        <WithFooter >
            <div className="h-45vh w-full bg-secondary">
                <LandingNavbar/>
            </div>
            <div className="white flex flex-col justify-center align-left ">
                
            </div> 
            <div className="border-l-2 border-primary shadow-lg p-10 content-center absolute top-1/4 left-3/10 bg-white w-2/5 max-h-3/4 overflow-scroll">
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
                    errors={formErrors}
                />
                <div className="mt-6">
                    <Link to="/">Trouble logging in?</Link>
                </div> 
                <div className="mt-6 ">
                    <Link to="/signup">Don't have an account? Sign Up.</Link>
                </div>   
            </div>
        </ WithFooter>

    )
}