import { inspect } from 'util';
import ApiAdapter from '../ApiAdapter';
import ApiEndpointInterface from '../Interfaces/ApiEndpointInterface';
import Session from '../Session';
import DraftShareInviteBank, { ShareDetailPayment } from '../Types/DraftShareInviteBank';
import PaginationOptions from '../Types/PaginationOptions';
// import DraftShareInviteBank from '../Types/DraftShareInviteBank';

export default class DraftShareInviteBankAPI implements ApiEndpointInterface {
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
     */
    public async get(draftShareInviteBankId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/draft-share-invite-bank');
        const userId = this.Session.getUserId();

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.get(`/v1/user/${userId}/draft-share-invite-bank/${draftShareInviteBankId}`, {}, {}, axiosClient)
        );
        return response.Response[0].DraftShareInviteBank as DraftShareInviteBank;
    }

    public async cancel(draftShareInviteBankId: number) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/draft-share-invite-bank', 'PUT');
        const userId = this.Session.getUserId();
        const payload = {
            status: 'CANCELLED',
        };
        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.put(`/v1/user/${userId}/draft-share-invite-bank/${draftShareInviteBankId}`, payload, {}, {}, axiosClient)
        );
        return response.Response[0];
    }

    public async getQRCode(draftShareInviteBankId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/draft-share-invite-bank/qr-code');
        const userId = this.Session.getUserId();
        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/draft-share-invite-bank/${draftShareInviteBankId}/qr-code-content`,
                {},
                {
                    disableVerification: true,
                    axiosOptions: { responseType: 'stream' },
                },
                axiosClient
            )
        );
        return response;
    }

    public async getAll(options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/draft-share-invite-bank');
        const userId = this.Session.getUserId();

        const opts: PaginationOptions = {
            count: 200,
            newer_id: undefined,
            older_id: undefined,
        };

        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/draft-share-invite-bank`,
                {},
                {
                    axiosOptions: {
                        params: opts,
                    },
                },
                axiosClient
            )
        );
        console.log(JSON.stringify(response.Response, null, 2));

        return response.Response.map((i) => i.DraftShareInviteBank) as DraftShareInviteBank[];
    }

    public async createShareInvite(sharePaymentDetails: ShareDetailPayment, expiration: string) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create('/draft-share-invite-bank', 'POST');
        const userId = this.Session.getUserId();
        const payload = {
            status: 'ACTIVE',
            expiration,
            draft_share_settings: {
                share_detail: {
                    ShareDetailPayment: sharePaymentDetails,
                },
            },
        };
        // console.log(JSON.stringify(payload, null, 2));
        const response = await limiter.run(async (axiosClient) =>
            this.ApiAdapter.post(`/v1/user/${userId}/draft-share-invite-bank`, payload, {}, {}, axiosClient)
        );

        // console.log(inspect(response.Response, { depth: 5 }));
        // console.log(response.data);
        return response.Response[0].Id as { id: number };
    }
}
