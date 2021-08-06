import ApiAdapter from '../ApiAdapter';
import Session from '../Session';
import ApiEndpointInterface from '../Interfaces/ApiEndpointInterface';
import PaginationOptions from '../Types/PaginationOptions';
import { ShareInviteMonetaryAccountResponse, ShareInviteMonetaryAccountResponsePutStatus } from '../Types/ShareInviteMonetaryAccountResponse';
import { inspect } from 'util';

export default class ShareInviteMonetaryAccountResponseAPI implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    /**
     * @param {number} userId
     * @param {number} shareInviteMonetaryAccountResponseId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async get(shareInviteMonetaryAccountResponseId: number): Promise<ShareInviteMonetaryAccountResponse> {
        const userId = this.Session.userInfo.UserPerson.id;
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/share-invite-monetary-account-response', 'GET');

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.get(`/v1/user/${userId}/share-invite-monetary-account-response/${shareInviteMonetaryAccountResponseId}`, {}, {}, axiosClient)
        );
        // console.log(inspect(response, { depth: 6 }));
        return response.Response[0].ShareInviteMonetaryAccountResponse;
    }

    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        options: PaginationOptions = {
            count: 200,
            newer_id: false,
            older_id: false,
        }
    ): Promise<ShareInviteMonetaryAccountResponse[]> {
        const userId = this.Session.userInfo.UserPerson.id;
        const params: any = {};

        if (options.count !== undefined) {
            params.count = options.count;
        }
        if (options.newer_id !== false && options.newer_id !== undefined) {
            params.newer_id = options.newer_id;
        }
        if (options.older_id !== false && options.older_id !== undefined) {
            params.older_id = options.older_id;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create('/share-invite-monetary-account-response', 'LIST');

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/share-invite-monetary-account-response`,
                {},
                {
                    axiosOptions: {
                        params: params,
                    },
                },
                axiosClient
            )
        );
        return response.Response.map((v) => v.ShareInviteMonetaryAccountResponse);
    }

    /**
     * @param {number} userId
     * @param {number} shareInviteMonetaryAccountResponseId
     * @param {ShareInviteMonetaryAccountInquiryPostStatus} status
     * @returns {Promise<{}>}
     */
    public async put(shareInviteMonetaryAccountResponseId: number, status: ShareInviteMonetaryAccountResponsePutStatus): Promise<any> {
        const userId = this.Session.userInfo.UserPerson.id;
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/share-invite-monetary-account-response', 'PUT');

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/share-invite-monetary-account-response/${shareInviteMonetaryAccountResponseId}`,
                {
                    status: status,
                },
                {},
                {},
                axiosClient
            )
        );

        return response.Response;
    }
}
