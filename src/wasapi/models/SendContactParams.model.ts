export interface SendContactParams {
    wa_id: string;
    from_id: number;
    context_wam_id?: string | null;
    contacts: Contact[];
}

export interface Contact {
    name: ContactName;
    birthday?: string; 
    addresses?: ContactAddress[];
    emails?: ContactEmail[];
    org?: ContactOrg;
    phones?: ContactPhone[];
    urls?: ContactUrl[];
}

export interface ContactName {
    formatted_name?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    suffix?: string;
    prefix?: string;
}

export interface ContactAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    country_code: string;
    type: string;
}

export interface ContactEmail {
    email: string;
    type: string;
}

export interface ContactOrg {
    company: string;
    department: string;
    title: string;
}

export interface ContactPhone {
    phone: string;
    type: string;
    wa_id?: string;
}

export interface ContactUrl {
    url: string;
    type: string;
}
