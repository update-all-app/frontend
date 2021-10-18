import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import LoadingButton from '../subcomponents/LoadingButton';
import BusinessApiManager from '../apiClients/BusinessApiManager';
import InformationBanner from '../subcomponents/InformationBanner';
import ErrorBanner from '../subcomponents/ErrorBanner';
import { SUPPORTED_SERVICES } from '../constants';
import getSocialMediaIcon from '../helpers/SocialMediaIcons';
import { Title } from '../subcomponents/Title';

export default function UpdateIt(props) {
  const { business } = props;
  const user = useContext(UserContext).state;
  const connectedServices = user.data.services;
  const serviceLookupByProviderOauthTokenId = {};
  for (let service of connectedServices) {
    serviceLookupByProviderOauthTokenId[service.providerOauthTokenId] =
      service.provider;
  }

  const [loading, setLoading] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(false);

  const updateIt = async () => {
    setLoading(true);
    try {
      await BusinessApiManager.updateHoursForLocation(
        props.business.locationIds[0]
      );
      setShowSuccessBanner(true);
      setTimeout(() => {
        setShowSuccessBanner(false);
      }, 5000);
    } catch (err) {
      console.log(err);
      setShowErrorBanner(true);
      setTimeout(() => {
        setShowErrorBanner(false);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const renderBanners = () => {
    if (showSuccessBanner) {
      return (
        <InformationBanner
          message='Your information has successfully been updated'
          onExit={() => setShowSuccessBanner(false)}
        />
      );
    } else if (showErrorBanner) {
      <ErrorBanner
        message='Something went wrong. Please try again and contact us if the problem persists'
        onExit={() => setShowErrorBanner(false)}
      />;
    }
  };

  const renderServicesStatus = () => {
    const connectedPages = business.connectedPages.map((page) => {
      return serviceLookupByProviderOauthTokenId[page.providerOauthTokenId];
    });
    return SUPPORTED_SERVICES.map((service) => {
      const isConnected = connectedPages.includes(service.value);

      return (
        <div
          className='flex flex px-4 py-2 bg-gray-200 rounded-md mb-2'
          key={service.value}
        >
          {getSocialMediaIcon(service.value)}
          {isConnected ? (
            <p>........................Up to date</p>
          ) : (
            <p>........................Out of sync</p>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {renderBanners()}
      <Title text='Home - Sync Status' />

      <div>{renderServicesStatus()}</div>
      <div className='mt-10'>
        <LoadingButton
          value='Update It All'
          loadingValue='Updating'
          loading={loading}
          onClick={updateIt}
        />
      </div>
    </>
  );
}
