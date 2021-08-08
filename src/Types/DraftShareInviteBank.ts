type DraftShareInviteBank = {
    id?: number;
    created?: string;
    updated?: string;
    status: DraftShareInviteBankStatus;
    expiration: string;
    draft_share_url?: string;
    share_invite_bank_response_id?: number;
    draft_share_settings: {
        share_detail: ShareDetail;
        start_date: string;
        end_date: string;
    };
};

export type DraftShareInviteBankStatus = 'USED' | 'PENDING' | 'CANCELLED' | 'ACCEPTED';

export type ShareDetail = {
    ShareDetailPayment?: ShareDetailPayment;
    ShareDetailReadonly?: ShareDetailReadonly;
    ShareDetailDraftPayment?: ShareDetailDraftPayment;
};

export type ShareDetailPayment = {
    make_payments?: boolean;
    make_draft_payments?: boolean;
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
    budget?: {
        amount: {
            value: string;
            currency: string;
        };
        frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    };
};

type ShareDetailReadonly = {
    view_balance: boolean;
    view_old_events: boolean;
    view_new_events: boolean;
};

type ShareDetailDraftPayment = {
    make_draft_payments: boolean;
    view_balance: boolean;
    view_old_events: boolean;
    view_new_events: boolean;
};

export type ShareInviteBankResponse = {
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
    status: DraftShareInviteBankStatus;
    share_detail: ShareDetail;
    start_date: string;
    end_date: string | null;
};

export default DraftShareInviteBank;
