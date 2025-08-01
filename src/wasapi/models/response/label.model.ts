import { Label } from "../shared/label.model";

export interface ResponseAllLabels {
    success: boolean;
    labels: Label[];
}

export interface ResponseLabelById {
    success: boolean;
    data: Label;
}