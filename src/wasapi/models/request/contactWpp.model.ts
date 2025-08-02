export interface SendContact {
    wa_id: string;
    from_id: number;
    context_wam_id?: string | null;
    contacts: ContactWPP[];
}

export interface ContactWPP{
    name: ContactName;
    birthday?: string; 
    addresses?: ContactAddress[];
    emails?: ContactEmail[];
    org?: ContactOrg;
    phones?: ContactPhone[];
    urls?: ContactUrl[];
}

interface ContactName { 
    formatted_name?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    suffix?: string;
    prefix?: string;
}

interface ContactAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    country_code: string;
    type: string;
}
interface ContactEmail {
    email: string;
    type: string;
}

interface ContactOrg {
    company: string;
    department: string;
    title: string;
}

interface ContactPhone {
    phone: string;
    type: string;
    wa_id?: string;
}

interface ContactUrl {
    url: string;
    type: string;
}
