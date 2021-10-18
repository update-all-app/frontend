import Cachable from './Cachable';

export default class GoogleAutocompleteAddressManager extends Cachable {
  constructor() {
    super();
    this.placeSearch = null;
    this.autocomplete = null;
    this.componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    this.updateComponents = {
      street_number: this.updateStreetNumber,
      route: this.updateRoute,
      locality: this.updateLocality,
      administrative_area_level_1: this.updateAdministrativeAreaLevel1,
      country: this.updateCountry,
      postal_code: this.updatePostalCode
    };

    this.selectionMade = () => {};

    this.activeListeners = [];
  }

  setUpdateStreetAddress(callback) {
    this.updateComponents.street_number = callback;
  }

  setUpdateRoute(callback) {
    this.updateComponents.route = callback;
  }

  setUpdateCity(callback) {
    this.updateComponents.locality = callback;
  }

  setUpdateState(callback) {
    this.updateComponents.administrative_area_level_1 = callback;
  }

  setUpdateCountry(callback) {
    this.updateComponents.country = callback;
  }

  setUpdatePostalCode(callback) {
    this.updateComponents.postal_code = callback;
  }

  setSelectionMade(callback) {
    this.selectionMade = callback;
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const circle = new window.google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      { types: ['geocode'] }
    );
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_component']);
    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    const listener = this.autocomplete.addListener('place_changed', () =>
      this.fillInAddress()
    );
    this.activeListeners.push(listener);
  }

  cleanupAutocomplete() {
    for (let listener of this.activeListeners) {
      window.google.maps.event.removeListener(listener);
    }
    for (let component in this.updateComponents) {
      this.updateComponents[component] = () => {};
    }
  }

  fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = this.autocomplete.getPlace();
    for (const component in this.updateComponents) {
      this.updateComponents[component]('');
    }
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    try {
      for (const component of place.address_components) {
        const addressType = component.types[0];

        if (this.componentForm[addressType]) {
          const val = component[this.componentForm[addressType]];
          // document.getElementById(addressType).value = val
          this.updateComponents[addressType](val);
        }
      }
      this.selectionMade();
    } catch (err) {
      return;
    }
  }
}
