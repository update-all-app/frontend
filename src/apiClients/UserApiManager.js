import ApiManager from './ApiManager';
import { API_SUFFIX } from '../constants';

export default class UserApiManager extends ApiManager {
  static async getUser() {
    const token = await this.getToken();
    if (token) {
      const uri = `${API_SUFFIX}/me`;
      return await this.get(uri, token);
    } else {
      return null;
    }
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
    return await this.put('/signup', body, token);
  }
}
