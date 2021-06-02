import React, { useState, useContext } from 'react'
import LandingNavbar from './LandingNavbar'
import { useHistory } from 'react-router-dom'
import Input from '../../subcomponents/Input'
import Submit from '../../subcomponents/Submit'
import Form from '../../subcomponents/Form'
import WithFooter from '../../wrappers/WithFooter'
import LoginManager from '../../helpers/LoginManager'
import { POPULATE_USER, LOADING, LOGOUT_USER } from '../../actionTypes'
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom'

import { validateEmail, validatePassword } from '../../helpers/functions'

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
    const [formErrors, setFormErrors] = useState([])
    const [passwordConfirmationChanged, setPasswordConfirmationChanged] = useState(false)
    const [emailErrorOccurred, setEmailErrorOccurred] = useState(false)

    const {dispatch} = useContext(UserContext)

    const updatePasswordConfirmation = async (pass) => {
        setPasswordConfirmation(pass)
        setPasswordConfirmationChanged(true)
        const {errors} = checkPasswordConfirmation(pass)
        setPasswordConfirmationErrors(errors)
    }

    const updatePassword = pass => {
        setPassword(pass)
        const {errors} = checkPassword(pass)
        setPasswordErrors(errors)
        if(passwordConfirmationChanged){
            const passwordConfirmationData = checkPasswordConfirmation()
            setPasswordConfirmationErrors(passwordConfirmationData.errors)
        }
    }

    const updateEmail = e => {
        setEmail(e)
        if(emailErrorOccurred){
            const {errors} = checkEmail(e)
            setEmailErrors(errors)
        }   
    }

    const checkFirstName = () => {
        const valid = firstName.length > 0
        const errors = valid ? [] : ["This field must be populated"]
        return {
            valid,
            errors
        }

    }

    const checkLastName = () => {
        const valid = lastName.length > 0
        const errors = valid ? [] : ["This field must be populated"]
        return {
            valid,
            errors
        }
    }

    const checkEmail = (e=null) => {
        const emailValue = e !== null ? e : email
        const validEmail = validateEmail(emailValue)
        const errors = validEmail ? [] : ["Invalid Email"]
        return {
            valid: validEmail,
            errors
        }
    }

    const checkPassword = (pass=null) => {
        const passwordValue = pass !== null ? pass : password
        const { valid, errors } = validatePassword(passwordValue)
        return {
            valid, 
            errors
        }
    }

    const checkPasswordConfirmation = (pass=null) => {
        const passwordValue = pass !== null ? pass : passwordConfirmation
        const allErrors = []
        const { valid } = validatePassword(password) 
        const isValid = valid && passwordValue === password
        if(!valid){
            allErrors.push("Password does not meet specifications")
        }
        if(passwordValue !== password){
            allErrors.push("Confirmation does not match password")
        }
        return {
            valid: isValid,
            errors: allErrors
        }

    }

    const signup = async () => {
        const validFirstName = checkFirstName()
        const validLastName = checkLastName()
        const validEmail = checkEmail()
        const validPassword = checkPassword()
        const validPasswordConfirmation = checkPasswordConfirmation()
        setFirstNameErrors(validFirstName.errors)
        setLastNameErrors(validLastName.errors)
        setEmailErrors(validEmail.errors)
        setPasswordErrors(validPassword.errors)
        setPasswordConfirmationErrors(validPasswordConfirmation.errors)
        if(validEmail.valid && validPassword.valid && validFirstName.valid && validLastName.valid && validPasswordConfirmation.valid){
            dispatch({type: LOADING})
            const res = await LoginManager.signup(firstName, lastName, email, password, passwordConfirmation)
            if(res.success){
                dispatch({type: POPULATE_USER, payload: { name: res.user.name, email: res.user.email, services: [], businesses: [], paymentStatusCurrent: false }})
                history.push('/setup-payment')
            }else{
                LoginManager.clearLocalStorage()
                dispatch({type: LOGOUT_USER })
                setFormErrors(["There was a problem signing you up"])
            }
        }else if(!validEmail.valid){
            setEmailErrorOccurred(true)
        }
    }


    return(
        <WithFooter>
            <div className="h-45vh w-full bg-secondary">
                <LandingNavbar/>
            </div>
            <div className="white flex flex-col justify-center align-left h-1/2 p-8">
                
            </div> 
            <div className="border-l-2 border-primary shadow-lg p-10 content-center absolute top-1/8 left-1/3 bg-white w-1/3 max-h-3/4 overflow-scroll hide-scroll">
                    <Form onSubmit={signup}>
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
                            onChange={ updateEmail }
                            value={ email }
                            errors={ emailErrors }
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            onChange={ pass => updatePassword(pass) }
                            value={ password }
                            errors={ passwordErrors }
                        />
                        <Input 
                            placeholder="Password Confirmation"
                            type="password"
                            onChange={ pass => updatePasswordConfirmation(pass) }
                            value={ passwordConfirmation }
                            errors={ passwordConfirmationErrors }
                        />
                        <Submit 
                            value="Sign Up"
                            errors={formErrors}
                        />
                    </Form>
                    <div className="mt-6 ">
                        <Link to="/login">Already have an account? Log in.</Link>
                    </div>   
                </div>
        </WithFooter>
        
    )
}