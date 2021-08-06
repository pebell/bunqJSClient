import { ShareDetail } from './DraftShareInviteBank';

export type ShareInviteMonetaryAccountResponsePutStatus =
    | 'REVOKED'
    | 'ACCEPTED'
    | 'CANCELLED'
    | 'CANCELLATION_PENDING'
    | 'CANCELLATION_ACCEPTED'
    | 'CANCELLATION_REJECTED';

export type ShareInviteMonetaryAccountResponseStatus = ShareInviteMonetaryAccountResponsePutStatus | 'INVITED';

export type ShareInviteMonetaryAccountResponse = {
    id: number;
    created: string;
    updated: string;
    draft_share_invite_bank_id: number;
    monetary_account_id: number;
    counter_alias: {
        iban: string;
        is_light: boolean;
        display_name: string;
    };
    user_alias_cancelled: null;
    description: string;
    share_type: 'STANDARD';
    status: ShareInviteMonetaryAccountResponseStatus;
    share_detail: ShareDetail;
    start_date: string;
    end_date: string | null;
};
