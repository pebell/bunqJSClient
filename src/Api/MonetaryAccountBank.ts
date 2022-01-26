import ApiAdapter from '../ApiAdapter';
import Session from '../Session';
import ApiEndpointInterface from '../Interfaces/ApiEndpointInterface';
import PaginationOptions from '../Types/PaginationOptions';
import AmountValue from '../Types/AmountValue';
import MonetaryAccountPutRequest from '../Types/MonetaryAccountPutRequest';

export default class MonetaryAccountBank implements ApiEndpointInterface {
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
     * @param {number} monetaryAccountBankId
     * @param options
     * @returns {Promise<any>}
     */
    public async get(monetaryAccountBankId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/monetary-account-bank', 'GET');
        const userId = this.Session.getUserId();

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-bank/${monetaryAccountBankId}`, {}, {}, axiosClient)
        );

        return response.Response.map((v) => v.MonetaryAccountBank)[0];
    }

    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        options: PaginationOptions = {
            count: 10,
        }
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/monetary-account-bank', 'LIST');
        const userId = this.Session.getUserId();

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account-bank`,
                {},
                {
                    axiosOptions: {
                        params: options,
                    },
                },
                axiosClient
            )
        );

        return response.Response.map((v) => v.MonetaryAccountBank);
    }

    /**
     * @param {number} userId
     * @param {string} currency
     * @param {string} description
     * @param {AmountValue} dailyLimit
     * @param {string} color
     * @param options
     * @returns {Promise<void>}
     */
    public async post(userId: number, currency: string, description: string, dailyLimit: AmountValue, color: string, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/monetary-account-bank', 'POST');

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account-bank`,
                {
                    currency: currency,
                    description: description,
                    daily_limit: {
                        value: dailyLimit + '',
                        currency: currency,
                    },
                    setting: {
                        color: color,
                        default_avatar_status: 'AVATAR_DEFAULT',
                    },
                },
                {},
                {},
                axiosClient
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {monetaryAccountPutRequest} MonetaryAccountPutRequest
     * @param options
     * @returns {Promise<any>}
     */
    public async put(userId: number, accountId: number, monetaryAccountPutRequest: MonetaryAccountPutRequest, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/monetary-account-bank', 'PUT');

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-bank/${accountId}`, monetaryAccountPutRequest, {}, {}, axiosClient)
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {"CANCELLED"} status
     * @param {"REDEMPTION_VOLUNTARY"} sub_status
     * @param {string} reason
     * @param options
     * @returns {Promise<any>}
     */
    public async putCancel(userId: number, accountId: number, status: 'CANCELLED', sub_status: 'REDEMPTION_VOLUNTARY', reason: string, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/monetary-account-bank', 'PUT');

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/monetary-account-bank/${accountId}`,
                {
                    status: status,
                    sub_status: sub_status,
                    reason: 'OTHER',
                    reason_description: reason,
                },
                {},
                {},
                axiosClient
            )
        );

        return response.Response;
    }
}
