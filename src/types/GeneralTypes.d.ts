export type ContainerProps = {
    children: React.ReactNode;
    align?: TOP | CENTER | BOTTOM;
    justify?: LEFT | CENTER | RIGHT;
}

export type SearchInputProps = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    idSearch: string;
}