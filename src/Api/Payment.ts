import ApiAdapter from '../ApiAdapter';
import Session from '../Session';

import ApiEndpointInterface from '../Interfaces/ApiEndpointInterface';
import Amount from '../Types/Amount';
import CounterpartyAlias from '../Types/CounterpartyAlias';
import PaginationOptions from '../Types/PaginationOptions';

export default class Payment implements ApiEndpointInterface {
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
     * @param {number} monetaryAccountId
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    public async get(userId: number, monetaryAccountId: number, paymentId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/payment');

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment/${paymentId}`, {}, {}, axiosClient)
        );

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        monetaryAccountId: number,
        options: PaginationOptions = {
            count: 200,
            newer_id: false,
            older_id: false,
        }
    ) {
        const userId = this.Session.getUserId();
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

        const limiter = this.ApiAdapter.RequestLimitFactory.create('/payment', 'LIST');

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment`,
                {},
                {
                    axiosOptions: {
                        params: params,
                    },
                },
                axiosClient
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {string} description
     * @param {Amount} amount
     * @param {CounterpartyAlias} counterpartyAlias
     * @param options
     * @returns {Promise<void>}
     */
    public async post(userId: number, monetaryAccountId: number, description: string, amount: Amount, counterpartyAlias: CounterpartyAlias, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/payment', 'POST');

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment`,
                {
                    counterparty_alias: counterpartyAlias,
                    description: description,
                    amount: amount,
                },
                {},
                {},
                axiosClient
            )
        );

        return response.Response;
    }
}
