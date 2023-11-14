export type InputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label: string;
    name: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'date';
    size?: 'medium' | 'large';
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

export type FormField = & (InputProps | SelectProps)

type Errors = {
    [key: string]: string;
}

export interface FormProps {
    title?: string;
    fields: FormField[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    button: JSX.Element | JSX.Element[] | string;
    errors?: Errors;
    cancelButton?: boolean;
}