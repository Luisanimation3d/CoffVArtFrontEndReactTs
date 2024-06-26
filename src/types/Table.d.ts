type Column = {
    key: string;
    header: string;
}

type OptionButton = {
    icon?: JSX.Element;
    label?: string;
    onClick: (row: any) => void;
}

export  interface TableProps {
    columns: Column[];
    data: any[];
    onRowClick: (row: any) => void;
    optionButtons?: OptionButton[];
    editableAction?: OptionButton;
    deleteAction?: OptionButton;
}