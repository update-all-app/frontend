import ApiManager from './ApiManager';
import { API_SUFFIX } from '../constants';

export default class GoogleApiManager extends ApiManager {
  static async createGoogleConnection(code) {
    const token = await this.protectedRoute();
    const url = `${API_SUFFIX}/provider_oauth_tokens`;
    return await this.post(
      url,
      {
        provider_oauth_token: {
          code,
          provider: 'google'
        }
      },
      token
    );
  }
}
