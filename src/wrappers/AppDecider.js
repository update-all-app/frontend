import React from 'react'
import useAuth from '../hooks/useAuth'



export default function AppDecider(props){

    const [loggedIn, loading] = useAuth()
    console.log(loggedIn)
    console.log(loading)

    const renderModal = () => {
        if(loading){
            return(
                <>
                    <div className="overlay"></div>
                    <div className="loader">Loading...</div>
                </>
            )
        }
    }
    
    if(!loggedIn){
      console.log('NOT LOGGED IN')
      return(
        <>
          {renderModal()}
          {props.children[0]}
        </>
      )
    }else{
      console.log("LOGGED IN")
      return(
          <>
              {renderModal()}
              {props.children[1]}
          </>
      )
    }

}