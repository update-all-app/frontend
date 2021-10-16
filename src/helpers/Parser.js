export default class Parser {
  static parseBusinessForContext(res) {
    // Assume only one location for a business
    // When we support multiple locations per business this will
    // need a major refactor
    return {
      addressLine1: res.locations[0].address_line_1,
      addressLine2: res.locations[0].address_line_2,
      city: res.locations[0].city,
      state: res.locations[0].state,
      zipcode: res.locations[0].zipcode,
      country: res.locations[0].country,
      phoneNumber: res.phone_number,
      emailAddress: res.email_address,
      name: res.name,
      id: res.id,
      locationIds: res.locations.map((l) => l.id),
      connectedPages: res.locations
        .flatMap((l) => {
          return l.location_services?.map((ls) => {
            return this.parseLocationService(ls);
          });
        })
        .filter((page) => !!page)
    };
  }

  static parseLocationService(locationService) {
    return {
      id: locationService.id,
      pageId: locationService.page_id,
      locationId: locationService.location_id,
      providerOauthTokenId: locationService.provider_oauth_token_id
    };
  }

  static parseBusinessForRequest(params) {
    const {
      businessName,
      businessEmail,
      businessTelephone,
      streetAddress,
      route,
      city,
      state,
      zipCode,
      country
    } = params;
    return {
      business: {
        name: businessName,
        email_address: businessEmail,
        phone_number: businessTelephone,
        locations_attributes: [
          {
            address_line_1: streetAddress,
            address_line_2: route,
            city,
            state,
            zipcode: zipCode,
            country,
            phone_number: businessTelephone
          }
        ]
      }
    };
  }
}
