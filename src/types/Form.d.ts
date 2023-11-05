import React from "react";

type OptionField = {
    value: string;
    label: string;
}

export type FormField = {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    value?: string;
    options?: OptionField[];
    selected?: string;
}

type Errors = {
    [key: string]: string;
}

export interface FormProps {
    title?: string;
    fields: FormField[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    button: JSX.Element | JSX.Element[] | string;
    editable?: boolean;
    errors?: Errors;
    cancelButton?: boolean;
    extraElements?: JSX.Element | JSX.Element[];
}