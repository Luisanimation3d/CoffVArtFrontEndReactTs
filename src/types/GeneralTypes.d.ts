export type ContainerProps = {
    children: React.ReactNode;
    align?: TOP | CENTER | BOTTOM;
    justify?: LEFT | CENTER | RIGHT;
    direction?: ROW | COLUMN;
    gap?: number;
}

export type SearchInputProps = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    idSearch: string;
}