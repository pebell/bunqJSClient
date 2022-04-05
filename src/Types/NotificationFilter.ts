import { Payment } from './Payment';
import { ShareInviteBankResponse } from './DraftShareInviteBank';

type NotificationFilter = {
    notification_delivery_method?: 'URL' | 'PUSH';
    notification_target: string | null;
    category: NotificationCategory;
};

// export type NotificationUrl = {
//     target_url: string;
//     category: NotificationCategory;
//     event_type: 'SHARE_INVITE_BANK_RESPONSE_CREATED' | 'SHARE_INVITE_BANK_RESPONSE_CANCELLED' | 'SHARE_INVITE_BANK_RESPONSE_REVOKED';
//     object: {
//         ShareInviteBankResponse: ShareInviteBankResponse;
//     };
// };

export type NotificationUrl = NotificationUrlShare | NotificationUrlMutation;

export type NotificationUrlShare = {
    target_url: string;
    category: 'SHARE';
    event_type:
        | 'SHARE_INVITE_BANK_RESPONSE_CREATED'
        | 'SHARE_INVITE_BANK_RESPONSE_CANCELLED'
        | 'SHARE_INVITE_BANK_RESPONSE_REVOKED'
        | 'SHARE_INVITE_BANK_RESPONSE_EXPIRED';
    object: {
        ShareInviteBankResponse: ShareInviteBankResponse;
    };
};

export type NotificationUrlMutation = {
    target_url: string;
    category: 'MUTATION';
    event_type: 'MUTATION_CREATED' | 'MUTATION_RECEIVED';
    object: {
        Payment: Payment;
    };
};

export type NotificationCategory =
    | 'BILLING'
    | 'BUNQME_TAB'
    | 'CARD_TRANSACTION_FAILED'
    | 'CARD_TRANSACTION_SUCCESSFUL'
    | 'CHAT'
    | 'DRAFT_PAYMENT'
    | 'IDEAL'
    | 'SOFORT'
    | 'MONETARY_ACCOUNT_PROFILE'
    | 'MUTATION'
    | 'PAYMENT'
    | 'PROMOTION'
    | 'REQUEST'
    | 'SCHEDULE_RESULT'
    | 'SCHEDULE_STATUS'
    | 'SHARE'
    | 'SUPPORT'
    | 'TAB_RESULT'
    | 'USER_APPROVAL';
export default NotificationFilter;
