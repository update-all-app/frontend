import ApiManager from "./ApiManager"
import { API_SUFFIX } from "../constants"
export default class ServicesApiManager extends ApiManager{

    static async removeLocationService({id}){
        const token = await this.protectedRoute()
        return await this.delete(
        `${API_SUFFIX}/location_services/${id}`,
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
}