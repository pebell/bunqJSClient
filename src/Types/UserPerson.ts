import AddressDetails from './AddressDetails';
import NotificationFilter from './NotificationFilter';

type UserPerson = {
    id: number;
    created: string;
    updated: string;
    public_uuid: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    legal_name: string;
    display_name: string;
    public_nick_name: string;
    alias: [
        {
            type: 'EMAIL' | 'PHONE_NUMBER' | 'IBAN';
            value: string;
            name: string;
        }
    ];
    tax_resident: [
        {
            country: string;
            tax_number: string;
            status: 'CONFIRMED' | 'UNCONFIRMED';
        }
    ];
    address_main: AddressDetails;
    address_postal: AddressDetails;
    date_of_birth: string;
    place_of_birth: string;
    country_of_birth: string;
    nationality: string;
    language: string;
    region: string;
    gender: string;
    version_terms_of_service: string;
    status: 'ACTIVE' | 'BLOCKED' | 'SIGNUP' | 'RECOVERY' | 'DENIED' | 'ABORTED';
    sub_status: 'NONE' | 'FACE_RESET' | 'APPROVAL' | 'APPROVAL_DIRECTOR' | 'APPROVAL_PARENT' | 'APPROVAL_SUPPORT' | 'COUNTER_IBAN' | 'IDEAL' | 'SUBMIT';
    session_timeout: number;
    daily_limit_without_confirmation_login: {
        value: string;
        currency: string;
    };
    notification_filters: NotificationFilter[];
    relations: any;
};

export default UserPerson;
