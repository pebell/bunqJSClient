import { inspect } from 'util';
import ApiAdapter from '../ApiAdapter';
import ApiEndpointInterface from '../Interfaces/ApiEndpointInterface';
import Session from '../Session';
import NotificationFilter, { NotificationCategory } from '../Types/NotificationFilter';

export default class NotificationFilterAPI implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    public async getAll() {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/notification-filter-url', 'GET');
        const userId = this.Session.userInfo.UserPerson.id;

        const response = await limiter.run(async (axiosClient) => this.ApiAdapter.get(`/v1/user/${userId}/notification-filter-url`, {}, {}, axiosClient));
        return this.mapResponse(response);
    }

    public async setFilters(categories: NotificationCategory[], notification_target: string, monetary_account_id: number = null) {
        const apiUrlLimit = monetary_account_id ? '/monetary-account' : '/notification-filter-url';
        const apiUrl = monetary_account_id ? `monetary-account/${monetary_account_id}/notification-filter-url` : 'notification-filter-url';
        const limiter = this.ApiAdapter.RequestLimitFactory.create(apiUrlLimit, 'POST');
        const userId = this.Session.userInfo.UserPerson.id;
        const payload = {
            notification_filters: categories.map((category) => ({ category, notification_target })),
        };

        const response = await limiter.run(async (axiosClient) => this.ApiAdapter.post(`/v1/user/${userId}/${apiUrl}`, payload, {}, {}, axiosClient));
        return this.mapResponse(response);
    }

    public async getFilters(monetary_account_id: number) {
        const apiUrlLimit = '/monetary-account';
        const apiUrl = `monetary-account/${monetary_account_id}/notification-filter-url`;
        const limiter = this.ApiAdapter.RequestLimitFactory.create(apiUrlLimit, 'GET');
        const userId = this.Session.userInfo.UserPerson.id;

        const response = await limiter.run(async (axiosClient) => this.ApiAdapter.get(`/v1/user/${userId}/${apiUrl}`, {}, {}, axiosClient));
        return this.mapResponse(response);
    }

    private mapResponse(response: any) {
        return response.Response.map((n) => ({ ...n.NotificationFilterUrl, notification_delivery_method: 'URL' })) as NotificationFilter[];
    }
}
