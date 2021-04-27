import React, { useState, useContext } from "react";
import LoadingButton from "../subcomponents/LoadingButton";
import { fbLogin } from "../apiClients/FBClient";
import ApiManager from "../helpers/ApiManager";
import Accordion from '../subcomponents/Accordion'
import { useHistory } from 'react-router-dom'
import UserContext from "../context/UserContext";
import { SUPPORTED_SERVICES } from '../constants'
import { ADD_BUSINESS_SERVICE } from "../actionTypes";
import { hash } from '../helpers/functions'

export default function ManageEndpoints({ business }) {
  const { state, dispatch } = useContext(UserContext);
  const services = state.data.services
  const [loading, setLoading] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState(getAllButtonIdentifiersForState())
  const history = useHistory()
  console.log(services)
  console.log(SUPPORTED_SERVICES)


  console.log(getAllButtonIdentifiersForState())


  function servicesFor(service){
    return services.filter(s => s.provider === service)
  }

  function getAllButtonIdentifiersForState(){
    return SUPPORTED_SERVICES.reduce((outerAccum, ss) => {
      const linkedServices = servicesFor(ss.value)
      const pagesAuthorized = linkedServices.reduce((serviceAccum, linkedService) => {
        const buttonId = `${ss.value}-${linkedService.label.split(',')}`
        serviceAccum[buttonId] = false
        return serviceAccum 
      }, {})
      return {
        ...outerAccum,
        ...pagesAuthorized
      }
    }, {})
  }

  // TODO: find which services business is connected to and 
  // remove Connect button for those services (replace with checkmark icon)
  const renderLinkedServices = service => {
    const linkedServices = servicesFor(service.value)
    if(linkedServices.length > 0){
      const pages = linkedServices.flatMap(s => s.label.split(','))
      console.log(pages)
      return (
        <Accordion headerText={service.name} key={hash(service.value)}>
          <div>
            {pages.map(page => (
              <div>
                <div className="inline-block rounded bg-gray-200 text-xs p-4 m-2">
                  <p>{page}</p>
                </div>
                <LoadingButton
                  value="Connect"
                  loading={loadingButtons[`${service.value}-${page}`]}
                  loadingValue="Connecting..."
                  onClick={() => {
                    const buttonId = `${service.value}-${page}`
                    setLoadingButtons(loadingButtons => {
                      const nextState = {...loadingButtons}
                      nextState[buttonId] = true
                      return nextState
                    })
                    window.setTimeout(() => {
                      setLoadingButtons(loadingButtons => {
                        const nextState = {...loadingButtons}
                        nextState[buttonId] = false
                        return nextState
                      })
                    }, 1000)
                  }} 
                  size='sm' 
                />
              </div>  
              ))}
            </div>
          </Accordion>
        )
      }else{
        return (
          <Accordion headerText={service.name} key={hash(service.value)}>
            <p>You have not authorized {service.name}. <button className="focus:outline-none text-blue-600" onClick={() => history.push('/authorize-services')}>Do it here</button></p>
          </Accordion>
        )
      }
    }



  return (
    <div className='p-4'>
      {SUPPORTED_SERVICES.map(s => renderLinkedServices(s))}
    </div>
  );
}
