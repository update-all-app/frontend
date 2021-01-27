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


export default function Signup(props){

    const history = useHistory()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [firstNameErrors, setFirstNameErrors] = useState([])
    const [lastNameErrors, setLastNameErrors] = useState([])
    const [emailErrors, setEmailErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])
    const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState([])

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
            <div className="border-l-2 border-primary shadow-lg p-10 content-center absolute top-1/8 left-1/3 bg-white w-1/3 max-h-3/4 overflow-scroll">
                    <Input 
                        placeholder="First Name"
                        onChange={ firstName => setFirstName(firstName) }
                        value={ firstName }
                        errors={ firstNameErrors }
                    />
                    <Input 
                        placeholder="Last Name"
                        onChange={ lastName => setLastName(lastName) }
                        value={ lastName }
                        errors={ lastNameErrors}
                    />
                    <Input 
                        placeholder="Email"
                        onChange={ email => setEmail(email) }
                        value={ email }
                        errors={ emailErrors }
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={ pass => setPassword(pass) }
                        value={ password }
                        errors={ passwordErrors }
                    />
                    <Input 
                        placeholder="Password Confirmation"
                        onChange={ pass => setPasswordConfirmation(pass) }
                        value={ passwordConfirmation }
                        errors={ passwordConfirmationErrors }
                    />
                    <Submit 
                        value="Sign Up"
                        onClick={() => {}}
                    />
                    <div className="mt-6 ">
                        <Link to="/login">Already have an account? Log in.</Link>
                    </div>   
                </div>
                <Footer />
        </div>
        
    )
}