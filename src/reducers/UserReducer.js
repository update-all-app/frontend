import {
  POPULATE_USER,
  LOADING,
  LOADING_COMPLETE,
  LOGOUT_USER,
  ADD_BUSINESS,
  POPULATE_BUSINESSES,
  VALIDATE_PAYMENT,
  ADD_BUSINESS_SERVICE,
  ADD_AUTHORIZED_SERVICE,
  ADD_CONNECTED_PAGE,
  REMOVE_CONNECTED_PAGE
} from '../actionTypes';

export default function UserReducer(state, action) {
  switch (action.type) {
    case POPULATE_USER:
      return { data: action.payload, loading: false };
    case ADD_BUSINESS:
      const businesses = state.data.businesses ? state.data.businesses : [];
      return {
        data: {
          ...state.data,
          businesses: [...businesses, action.payload]
        },
        loading: false
      };
    case POPULATE_BUSINESSES:
      return {
        data: {
          ...state.data,
          businesses: action.payload
        },
        loading: false
      };
    case LOADING:
      return { data: { ...state.data }, loading: true };
    case LOADING_COMPLETE:
      return { data: { ...state.data }, loading: false };
    case LOGOUT_USER:
      return { data: {}, loading: false };
    case VALIDATE_PAYMENT:
      return {
        data: { ...state.data, paymentStatusCurrent: true },
        loading: false
      };
    case ADD_BUSINESS_SERVICE:
      const foundBusiness = state.data.businesses.find(
        (b) => b.id === action.payload.business.id
      );
      if (!foundBusiness) {
        return state;
      } else {
        if (foundBusiness.services) {
          foundBusiness.services.push(action.payload.services);
        } else {
          foundBusiness.services = [action.payload.service];
        }
        return {
          data: {
            ...state.data,
            businesses: state.data.businesses
              .map((b) => {
                return b.id === foundBusiness.id ? foundBusiness : b;
              })
              .sort((b1, b2) => b1.id - b2.id)
          },
          loading: false
        };
      }
    case ADD_AUTHORIZED_SERVICE:
      let updated = false;
      const services = state.data.services.map((s) => {
        if (
          s.userID == action.payload.userID &&
          s.provider == action.payload.provider
        ) {
          updated = true;
          return action.payload;
        } else {
          return s;
        }
      });
      if (!updated) {
        services.push(action.payload);
      }
      return {
        ...state,
        data: {
          ...state.data,
          services
        }
      };
    case ADD_CONNECTED_PAGE:
      const pageData = { ...action.payload };
      const business = {
        ...state.data.businesses.find((b) =>
          b.locationIds.includes(action.payload.locationId)
        )
      };
      const connectedPages = [...business.connectedPages, pageData];
      business.connectedPages = connectedPages;
      const businessesAfterConnectedPage = [
        ...state.data.businesses.filter((b) => b.id !== business.id),
        business
      ].sort((b1, b2) => b1.id - b2.id);
      return {
        ...state,
        data: {
          ...state.data,
          businesses: businessesAfterConnectedPage
        }
      };
    case REMOVE_CONNECTED_PAGE:
      const locationServiceId = action.payload.locationServiceId;
      const businessId = action.payload.businessId;
      const businessToRemoveFrom = {
        ...state.data.businesses.find((b) => b.id === businessId)
      };
      const connectedPagesAfterRemoval = businessToRemoveFrom.connectedPages.filter(
        (locationService) => locationService.id !== locationServiceId
      );
      businessToRemoveFrom.connectedPages = connectedPagesAfterRemoval;
      const businessesAfterRemoval = [
        ...state.data.businesses.filter(
          (b) => b.id !== businessToRemoveFrom.id
        ),
        businessToRemoveFrom
      ].sort((b1, b2) => b1.id - b2.id);
      return {
        ...state,
        data: {
          ...state.data,
          businesses: businessesAfterRemoval
        }
      };

    default:
      return state;
  }
}
