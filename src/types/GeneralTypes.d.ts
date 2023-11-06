export type ContainerProps = {
    children: React.ReactNode;
}

export type SearchInputProps = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    idSearch: string;
}