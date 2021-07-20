import ApiAdapter from '../ApiAdapter';
import Session from '../Session';
import ApiEndpointInterface from '../Interfaces/ApiEndpointInterface';
import DeviceServer from '../Types/DeviceServer';

export default class DeviceRegistration implements ApiEndpointInterface {
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
     *
     * @param options
     * @returns {Promise<any>}
     */
    public async add(options: any = { description: 'My Device', permitted_ips: [] }) {
        const postData = {
            description: options.description,
            secret: this.Session.apiKey,
        };
        if (options.permitted_ips.length > 0) {
            postData['permitted_ips'] = options.permitted_ips;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create('/device-server', 'POST');
        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.post(
                '/v1/device-server',
                postData,
                {},
                {
                    skipSessionCheck: true,
                },
                axiosClient
            )
        );
        // return the device id
        return response.Response[0].Id.id;
    }

    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    public async get(options?: any) {
        if (options && options.deviceId === null) {
            // if none is set we default to our current deviceId
            options.deviceId = this.Session.deviceId;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create('/device-server', 'GET');

        if (options) {
            const response = await limiter.run(async (axiosClient) => this.ApiAdapter.get(`/v1/device-server/${options.deviceId}`, {}, {}, axiosClient));
            // console.log(response.Response[0]);
            // return the device server
            return response.Response[0].DeviceServer as DeviceServer;
        } else {
            const response = await limiter.run(async (axiosClient) => this.ApiAdapter.get(`/v1/device-server`, {}, {}, axiosClient));
            // return the device servers
            return response.Response as DeviceServer[];
        }
    }

    public async getAll(options?: any) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/device-server', 'GET');
        const response = await limiter.run(async (axiosClient) => this.ApiAdapter.get(`/v1/device-server`, {}, {}, axiosClient));
        // return the device servers
        return response.Response as DeviceServer[];
    }
}
