type DraftShareInviteBank = {
    status: 'USED' | 'PENDING' | 'CANCELLED';
    expiration: string;
    draft_share_settings: {
        share_detail: {
            ShareDetailPayment?: ShareDetailPayment;
            ShareDetailReadonly?: ShareDetailReadonly;
            ShareDetailDraftPayment?: ShareDetailDraftPayment;
        };
        start_date: string;
        end_date: string;
    };
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

export default DraftShareInviteBank;
