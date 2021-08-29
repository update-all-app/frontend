import ApiManager from './ApiManager';
import { API_SUFFIX } from '../constants';

export default class GoogleApiManager extends ApiManager{

    static async createGoogleConnection(code){
        const token = this.protectedRoute();
        const url = '/auth/google_oauth2/callback';
        return await this.post(
            url,
            {
                provider_oauth_token: {
                    code
                }
            },
            token
        );
    }
}