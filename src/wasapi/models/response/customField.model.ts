import { BaseCustomField } from "../shared/customField.model";

export interface ResponseAllCustomFields {
    success: boolean;
    data: BaseCustomField[];
}

export interface ResponseCustomFieldById {
    success: boolean;
    data: BaseCustomField;
}