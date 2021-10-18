import ApiManager from './ApiManager';
import { API_SUFFIX } from '../constants';

export default class BusinessApiManager extends ApiManager {
  static async getBusinesses() {
    const token = await this.protectedRoute();
    return await this.get(`${API_SUFFIX}/businesses`, token);
  }

  static async getHoursSummary(locationId, startDate, endDate) {
    const token = await this.protectedRoute();
    return await this.get(
      `${API_SUFFIX}/locations/${locationId}/hours_summary?start_date=${startDate}&end_date=${endDate}`,
      token
    );
  }

  static async createBusiness(businessParams) {
    const token = await this.protectedRoute();
    return await this.post(`${API_SUFFIX}/businesses`, businessParams, token);
  }

  static async createRegularEventForLocation(locationId, event) {
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/locations/${locationId}/regular_events`,
      { regular_event: event },
      token
    );
  }

  static async createRegularEventForBusiness(businessId, event) {
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/businesses/${businessId}/regular_events`,
      { regular_event: event },
      token
    );
  }

  static async deleteRegularEvent(eventId) {
    const token = await this.protectedRoute();
    return await this.delete(`${API_SUFFIX}/regular_events/${eventId}`, token);
  }

  static async getRegularEventsForLocation(locationId) {
    const token = await this.protectedRoute();
    return await this.get(
      `${API_SUFFIX}/locations/${locationId}/regular_events`,
      token
    );
  }

  static async getRegularEventsForBusiness(businessId) {
    const token = await this.protectedRoute();
    return await this.get(
      `${API_SUFFIX}/businesses/${businessId}/regular_events`,
      token
    );
  }

  static async createIrregularEventForLocation(locationId, event) {
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/locations/${locationId}/irregular_events`,
      { irregular_event: event },
      token
    );
  }

  static async createIrregularEventForBusiness(businessId, event) {
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/businesses/${businessId}/irregular_events`,
      { irregular_event: event },
      token
    );
  }

  static async updateIrregularEvent(event) {
    const token = await this.protectedRoute();
    const body = {
      irregular_event: {
        status: event.status,
        start_time: event.start_time,
        end_time: event.end_time
      }
    };
    return await this.patch(
      `${API_SUFFIX}/irregular_events/${event.id}`,
      body,
      token
    );
  }

  static async deleteIrregularEvent(eventId) {
    const token = await this.protectedRoute();
    return await this.delete(
      `${API_SUFFIX}/irregular_events/${eventId}`,
      token
    );
  }

  static async getIrregularEventsForBusiness(businessId) {
    const token = await this.protectedRoute();
    return await this.get(
      `${API_SUFFIX}/businesses/${businessId}/irregular_events`,
      token
    );
  }

  static async getIrregularEventsForLocation(locationId) {
    const token = await this.protectedRoute();
    return await this.get(
      `${API_SUFFIX}/locations/${locationId}/irregular_events`,
      token
    );
  }

  static async updateHoursForLocation(locationId) {
    const token = await this.protectedRoute();
    return await this.post(
      `${API_SUFFIX}/locations/${locationId}/hours_updates`,
      {},
      token
    );
  }
}
