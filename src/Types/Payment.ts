import Amount from './Amount';

export type Payment = {
    id: number;
    created: string;
    updated: string;
    monetary_account_id: number;
    amount: Amount;
    description: string;
    // type: 'BUNQ',
    // merchant_reference: null,
    // alias: {
    //   iban: 'NL90BUNQ2206166348',
    //   is_light: false,
    //   display_name: 'Roland',
    //   avatar: {
    //     uuid: 'a3ee728e-a09b-4842-8147-3bc6225025ae',
    //     image: [ [Object] ],
    //     anchor_uuid: null,
    //     style: 'NONE'
    //   },
    //   label_user: {
    //     uuid: null,
    //     display_name: 'Roland',
    //     country: 'NL',
    //     avatar: null,
    //     public_nick_name: 'Roland'
    //   },
    //   country: 'NL'
    // },
    // counterparty_alias: {
    //   iban: 'NL35BUNQ2042526592',
    //   is_light: false,
    //   display_name: 'P.B. Ebell',
    //   avatar: {
    //     uuid: '99f8525a-509e-4cbb-86df-c828ad10afdd',
    //     image: [ [Object] ],
    //     anchor_uuid: null,
    //     style: 'NONE'
    //   },
    //   label_user: {
    //     uuid: 'cbd790e0-841b-4eeb-ab2f-7fc0c58e1b66',
    //     display_name: 'P.B. Ebell',
    //     country: 'NL',
    //     avatar: {
    //       uuid: '6c533558-ec03-4a5a-b522-809e98899da5',
    //       image: [Array],
    //       anchor_uuid: 'cbd790e0-841b-4eeb-ab2f-7fc0c58e1b66',
    //       style: 'NONE'
    //     },
    //     public_nick_name: 'Peter'
    //   },
    //   country: 'NL'
    // },
    // attachment: [],
    // geolocation: null,
    // batch_id: null,
    // scheduled_id: null,
    // address_billing: null,
    // address_shipping: null,
    // sub_type: 'PAYMENT',
    // request_reference_split_the_bill: [],
    balance_after_mutation: Amount;
    // payment_auto_allocate_instance: null
};
