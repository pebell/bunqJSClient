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
        return response.Response.map((n) => n.NotificationFilterUrl) as NotificationFilter[];
    }

    public async setFilters(categories: NotificationCategory[], notification_target: string) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/notification-filter-url', 'POST');
        const userId = this.Session.userInfo.UserPerson.id;
        const payload = {
            notification_filters: categories.map((category) => ({ category, notification_target })),
        };

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.post(`/v1/user/${userId}/notification-filter-url`, payload, {}, {}, axiosClient)
        );
        return response.Response.map((n) => n.NotificationFilterUrl) as NotificationFilter[];
    }
}
