import React, { useEffect } from "react";
import GoogleAutocompleteAddressManager from "../helpers/GoogleAutocompleteAddressManager";
import Input from "./Input";

export default function GoogleAddressForm(props) {
  const {
    address,
    setAddress,
    streetAddress,
    setStreetAddress,
    route,
    setRoute,
    city,
    setCity,
    state,
    setState,
    zipCode,
    setZipCode,
    country,
    setCountry,
  } = props;

  useEffect(() => {
    let autocompleteManager = GoogleAutocompleteAddressManager.get_instance(1);
    if (!autocompleteManager) {
      autocompleteManager = GoogleAutocompleteAddressManager.new_cache(1);
    }
    autocompleteManager.setUpdateStreetAddress(setStreetAddress);
    autocompleteManager.setUpdateRoute(setRoute);
    autocompleteManager.setUpdateCity(setCity);
    autocompleteManager.setUpdateState(setState);
    autocompleteManager.setUpdatePostalCode(setZipCode);
    autocompleteManager.setUpdateCountry(setCountry);
    autocompleteManager.setSelectionMade(() => setAddress(""));

    window.initAutocomplete = autocompleteManager.initAutocomplete.bind(
      autocompleteManager
    );

    if (!window.google) {
      const script = document.createElement("script");
      script.id = "places_script";
      script.type = "text/javascript";
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBI6tsN2PSJg4LyI0R2fmmR-dBM_VRYPuQ&callback=initAutocomplete&libraries=places&v=weekly";
      script.async = false;
      document.body.appendChild(script);
    } else {
      autocompleteManager.initAutocomplete();
    }

    return () => {
      window.initAutocomplete = () => {};
      autocompleteManager.cleanupAutocomplete();

      const script = document.querySelector("#places_script");
      if (!!script) {
        script.remove();
      }
      GoogleAutocompleteAddressManager.remove_instance(1);
    };
  }, [
    setStreetAddress,
    setAddress,
    setRoute,
    setCity,
    setState,
    setZipCode,
    setCountry,
  ]);

  let autocompleteManager = GoogleAutocompleteAddressManager.get_instance(1);

  if (!autocompleteManager) {
    autocompleteManager = GoogleAutocompleteAddressManager.new_cache(1);
    autocompleteManager.setUpdateStreetAddress(setStreetAddress);
    autocompleteManager.setUpdateRoute(setRoute);
    autocompleteManager.setUpdateCity(setCity);
    autocompleteManager.setUpdateState(setState);
    autocompleteManager.setUpdatePostalCode(setZipCode);
    autocompleteManager.setUpdateCountry(setCountry);
    autocompleteManager.setSelectionMade(() => setAddress(""));
    window.initAutocomplete = autocompleteManager.initAutocomplete.bind(
      autocompleteManager
    );
  }

  return autocompleteManager ? (
    <div className="mt-10">
      <div className="flex flex-row justify-left items-baseline m-auto w-full p-2">
        <svg
          className="w-5 relative top-2 primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input
          id="autocomplete"
          placeholder="Search for your address"
          onFocus={autocompleteManager.geolocate}
          onChange={setAddress}
          value={address}
          mb="mb-0"
        />
      </div>
      <div className="mt-12 m-auto w-full border-l-2 shadow-lg border-primary flex flex-col justify-start">
        <div className="mb-10 mt-0 bg-primary w-full p-2 text-white flex flex-row justify-start">
          <svg
            className="w-4 relative top-2 primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h1 className="pl-2">Address Details</h1>
        </div>
        <div className="grid sm:grid-cols-2 gap-2 px-5">
          <Input
            id="street_number"
            placeholder="Street Address"
            onChange={() => {}}
            value={streetAddress}
            disabled={true}
            label={streetAddress ? "Street Address" : null}
          />
          <Input
            id="route"
            placeholder="Street Name"
            onChange={() => {}}
            value={route}
            disabled={true}
            label={route ? "Street Name" : null}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-2 px-5">
          <Input
            id="locality"
            placeholder="City"
            onChange={() => {}}
            value={city}
            disabled={true}
            label={city ? "City" : null}
            w="w-11/12"
          />
          <Input
            id="administrative_area_level_1"
            placeholder="State"
            onChange={() => {}}
            value={state}
            disabled={true}
            label={state ? "State" : null}
            w="w-11/12"
          />
          <Input
            id="postal_code"
            placeholder="Zip Code"
            onChange={() => {}}
            value={zipCode}
            disabled={true}
            label={zipCode ? "Zip Code" : null}
            w="w-11/12"
          />
        </div>

        <div className="px-5">
          <Input
            id="country"
            placeholder="Country"
            onChange={() => {}}
            value={country}
            disabled={true}
            label={country ? "Country" : null}
            display={"inline-block"}
            w="w-1/2"
          />
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="overlay"></div>
      <div className="loader">Loading...</div>
    </>
  );
}
