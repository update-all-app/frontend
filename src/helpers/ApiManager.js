import { BACKEND_URL, API_SUFFIX } from "../constants";
import LoginManager from "./LoginManager";
import AuthenticationError from "../errors/AuthenticationError";

export default class ApiManager {
  static getHeaders(token) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    if (!!token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  static async getToken() {
    const token = LoginManager.getToken();
    if (!!token) {
      if (!!token.token) {
        return token.token;
      } else if (!!token.refresh_token) {
        return await LoginManager.getNewToken(token.refresh_token);
      }
    } else {
      return null;
    }
  }

  static async protectedRoute() {
    try {
      const token = await this.getToken();
      if (!token) {
        throw new AuthenticationError();
      }
      return token;
    } catch (err) {
      if (err instanceof AuthenticationError) {
        LoginManager.clearLocalStorage();
        window.location.replace(window.location.origin);
      } else {
        throw err;
      }
    }
  }

  static async getUser() {
    const token = await this.getToken();
    if (token) {
      const uri = `${API_SUFFIX}/me`;
      return await this.get(uri, token);
    } else {
      return null;
    }
  }

  static async login(email, password) {
    return await this.post("/login", {
      user: {
        email,
        password
      }
    });
  }

  static async signup(
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation
  ) {
    return await this.post("/signup", {
      user: {
        name: `${firstName} ${lastName}`,
        email,
        password,
        password_confirmation: passwordConfirmation
      }
    });
  }

  static async completePayment(userData) {
    const { email, name } = userData;
    const token = await this.protectedRoute();
    const body = {
      user: {
        email,
        name,
        payment_status_current: true
      }
    };
    return await this.put("/signup", body, token);
  }

  static async getBusinesses() {
    const token = await this.protectedRoute();
    return await this.get(`${API_SUFFIX}/businesses`, token);
  }

  static async getHoursSummary(locationId, startDate, endDate){
    const token = await this.protectedRoute()
    return await this.get(`${API_SUFFIX}/locations/${locationId}/hours_summary?start_date=${startDate}&end_date=${endDate}`, token)
  }

  static async createBusiness(businessParams) {
    const token = await this.protectedRoute();
    return await this.post(`${API_SUFFIX}/businesses`, businessParams, token);
  }

  static async getAccessTokenForFacebook(accessToken, userID) {
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/provider_oauth_tokens`,
      {
        provider_oauth_token: {
          exchange_token: accessToken,
          provider: 'facebook',
          provider_uid: userID
        }
      },
      token
    );
  }
  static async createRegularEventForLocation(locationId, event){
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/locations/${locationId}/regular_events`,
      { regular_event: event },
      token
    )
  }

  static async createRegularEventForBusiness(businessId, event){
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/businesses/${businessId}/regular_events`,
      { regular_event: event },
      token
    )
  }

  static async deleteRegularEvent(eventId){
    const token = await this.protectedRoute();
    return await this.delete(
      `${API_SUFFIX}/regular_events/${eventId}`,
      token
    )
  }


  static async getRegularEventsForLocation(locationId){
    const token = await this.protectedRoute();
    return await this.get(
      `${API_SUFFIX}/locations/${locationId}/regular_events`,
      token
    )
  }

  static async getRegularEventsForBusiness(businessId){
    const token = await this.protectedRoute();
    return await this.get(
      `${API_SUFFIX}/businesses/${businessId}/regular_events`,
      token
    )
  }


  static async createIrregularEventForLocation(locationId, event){
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/locations/${locationId}/irregular_events`,
      { irregular_event: event },
      token
    )
  }

  static async createIrregularEventForBusiness(businessId, event){
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/businesses/${businessId}/irregular_events`,
      { irregular_event: event },
      token
    )
  }

  static async updateIrregularEvent(event){
    const token = await this.protectedRoute()
    const body = {
      irregular_event: {
        status: event.status,
        start_time: event.start_time,
        end_time: event.end_time
      }
    }
    return await this.patch(
      `${API_SUFFIX}/irregular_events/${event.id}`,
      body, 
      token
    )
  }

  static async deleteIrregularEvent(eventId){
    const token = await this.protectedRoute()
    return await this.delete(
      `${API_SUFFIX}/irregular_events/${eventId}`,
      token
    )
  }

  static async getIrregularEventsForBusiness(businessId){
    const token = await this.protectedRoute()
    return await this.get(
      `${API_SUFFIX}/businesses/${businessId}/irregular_events`,
      token
    )
  }

  static async getIrregularEventsForLocation(locationId){
    const token = await this.protectedRoute()
    return await this.get(
      `${API_SUFFIX}/locations/${locationId}/irregular_events`,
      token
    )
  }

  static async connectPageToLocation({
    providerOauthTokenId,
    locationId,
    pageId
  }){
    const token = await this.protectedRoute()
    const body = {
      location_service: {
        provider_oauth_token_id: providerOauthTokenId,
        location_id: locationId,
        page_id: pageId
      }
    }

    return await this.post(
      `${API_SUFFIX}/location_services`,
      body,
      token
    )
  }

  static async removeLocationService({id}){
    const token = await this.protectedRoute()
    return await this.delete(
      `${API_SUFFIX}/location_services/${id}`,
      token
    )
  }

  static async get(path, token = null) {
    return await this.request("GET", path, null, token);
  }

  static async post(path, body, token = null) {
    return await this.request("POST", path, body, token);
  }

  static async put(path, body, token = null) {
    return await this.request("PUT", path, body, token);
  }

  static async patch(path, body, token = null) {
    return await this.request("PATCH", path, body, token);
  }

  static async delete(path, token = null) {
    return await this.request("DELETE", path, null, token);
  }

  static async request(method, path, body = null, token = null) {
    const options = {
      method,
      headers: this.getHeaders(token)
    };

    if (!!body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${BACKEND_URL}${path}`, options);

    if (!res.ok) {
      throw res;
    }

    return await res.json();
  }
}
