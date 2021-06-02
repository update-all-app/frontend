import React, { useState, useContext } from "react";
import LoadingButton from "../subcomponents/LoadingButton";
import ApiManager from "../helpers/ApiManager";
import Accordion from '../subcomponents/Accordion'
import Card from '../wrappers/Card'
import { useHistory } from 'react-router-dom'
import UserContext from "../context/UserContext";
import { SUPPORTED_SERVICES } from '../constants'
import { ADD_CONNECTED_PAGE } from "../actionTypes";
import { hash } from '../helpers/functions'

export default function ManageEndpoints({ business }) {
  const { state, dispatch } = useContext(UserContext);
  const services = state.data.services
  const otherBusinesses = state.data.businesses.filter(b => b.id !== business.id)
  const [loading, setLoading] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState(getAllButtonIdentifiersForState())
  const history = useHistory()


  function servicesFor(service){
    return services.filter(s => s.provider === service)
  }

  function getAllButtonIdentifiersForState(){
    return SUPPORTED_SERVICES.reduce((outerAccum, ss) => {
      const linkedServices = servicesFor(ss.value)
      const pagesAuthorized = linkedServices.reduce((serviceAccum, linkedService) => {
        for(let page of linkedService.pageData){
          const buttonId = `${ss.value}-${page.id}`
          serviceAccum[buttonId] = false
        }
        return serviceAccum 
      }, {})
      return {
        ...outerAccum,
        ...pagesAuthorized
      }
    }, {})
  }

  async function connectPage({providerOauthTokenId, pageId}){
    try{
      const locationId = business.locationIds[0]
      const res = await ApiManager.connectPageToLocation({
        providerOauthTokenId,
        locationId,
        pageId
      })
     dispatch({
       type: ADD_CONNECTED_PAGE,
       payload: {
         id: res.id,
         locationId,
         providerOauthTokenID: res.provider_oauth_token_id,
         pageId: res.page_id
       }
     }) 
    }catch(err){
      console.log(err)
      alert(err)
    }
  }

  async function handleConnect({
    serviceName,
    pageId,
    providerOauthTokenId
  }){
    const buttonId = `${serviceName}-${pageId}`
    setLoadingButtons(loadingButtons => {
      const nextState = {...loadingButtons}
      nextState[buttonId] = true
      return nextState
    })
    await connectPage({
      providerOauthTokenId,
      pageId 
    })
    setLoadingButtons(loadingButtons => {
      const nextState = {...loadingButtons}
      nextState[buttonId] = false
      return nextState
    })
  }

  async function handleDisconnect({
    serviceName, 
    pageId
  }){
    alert('disconnecting...')
  }

  function isPageConnectedToAnotherBusiness(providerOauthTokenId, pageId){
    for(let otherBusiness of otherBusinesses){
      if(isPageConnectedToBusiness(providerOauthTokenId, pageId, otherBusiness)){
        return true
      }
    }
    return false
  }

  function isPageConnectedToBusiness(providerOauthTokenId, pageId, business){
    return !!business.connectedPages.find(page => {
      return page.providerOauthTokenId === providerOauthTokenId && page.pageId === pageId
    })
  }

  const renderOnlineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-0 right-0" fill="none" viewBox="0 0 24 24" stroke="green">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  )

  const renderOfflineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-0 right-0" fill="none" viewBox="0 0 24 24" stroke="red">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
    </svg>
  )


  const renderLinkedServices = service => {
    const linkedServices = servicesFor(service.value)
    if(linkedServices.length > 0){
      const pages = linkedServices.flatMap(s => s.pageData.map(pageData => ({...pageData, providerOauthTokenId: s.providerOauthTokenId})))
      return (
        <Accordion headerText={service.name} key={hash(service.value)}>
          <div>
            {pages.map(pageData => {
              const pageIsConnected = isPageConnectedToBusiness(pageData.providerOauthTokenId, pageData.id, business)
              const pageIsConnectedToDifferentBusiness = isPageConnectedToAnotherBusiness(pageData.providerOauthTokenId, pageData.id)
              
              let value = "Connect"
              let onClick = () => handleConnect({
                  serviceName: service.value, 
                  pageId: pageData.id, 
                  providerOauthTokenId: pageData.providerOauthTokenId
                })
              let disabled = false

              if(pageIsConnected){
                value = "Disconnect"
                onClick = () => handleDisconnect({
                  serviceName: service.value,
                  pageId: pageData.id, 
                  providerOauthTokenId: pageData.providerOauthTokenId
                }) 
              }else if(pageIsConnectedToDifferentBusiness){
                value = "Connected to another business"
                disabled = true
                onClick = () => {}
              }

              return (
              <Card 
                clickable={false}
                classNames={'p-4'}
              >
                <div className="relative">
                  {pageIsConnected ? renderOnlineIcon() : renderOfflineIcon()}
                </div>
                <div className="flex flex-col justify-between items-center height-full">
                  <div className="flex flex-row justify-center items-center p-4 w-full">
                    <img className="inline-block" width={25} height={25} src={process.env.PUBLIC_URL + '/assets/f_logo_RGB-Blue_58.png'} alt={"fb logo"}/>
                    <p className="inline-block p-4">{pageData.name}</p>
                  </div>
                  <LoadingButton
                    value={value}
                    loading={loadingButtons[`${service.value}-${pageData.id}`]}
                    loadingValue="Connecting..."
                    onClick={onClick} 
                    size='xs' 
                    disabled={disabled}
                  />
                </div>
              </Card>  
              )})}
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
