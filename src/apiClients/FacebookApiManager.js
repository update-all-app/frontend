import { API_SUFFIX } from "../constants";
import ApiManager from "./ApiManager";

export default class FacebookApiManager extends ApiManager{

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
}