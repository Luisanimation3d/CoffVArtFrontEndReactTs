type TextAreaInputProps = {
    type: 'textarea';
    value: string;
    onChange: (value: string, name?) => void;
    label: string;
    name: string;
    size: number;
    placeholder?: string;
    options?: SelectOption[];
    multiple?: false;
}

export type InputProps = {
    value: string | number;
    onChange: (value: string | number, name?) => void;
    placeholder?: string;
    label: string;
    name: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'textarea';
    size: 'medium' | 'large';
    options?: SelectOption[],
    multiple?: false;
}

export type SelectOption = {
    value: string | number
    label: string;

}

type MultipleSelectProps = {
    multiple: true;
    value: SelectOption[];
    onChange: (value: SelectOption[]) => void;
}

type SingleSelectProps = {
    multiple?: false;
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
}

export type SelectProps = {
    options: SelectOption[]
    placeholder?: string;
    type: 'select';
    label?: string;
    name?: string;
    size?: 'medium' | 'large';
} & (MultipleSelectProps | SingleSelectProps)

export type FormField = & (InputProps | SelectProps | TextAreaInputProps)

type Errors = {
    [key: string]: string;
}

export interface FormProps {
    title?: string;
    fields: FormField[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    button: JSX.Element | JSX.Element[] | string;
    extra?: JSX.Element | JSX.Element[] | string;
    errors?: Errors;
    cancelButton?: boolean;
}