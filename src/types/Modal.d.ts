export interface ModalContainerProps {
    ShowModal: (showModal: boolean) => void;
    children: JSX.Element | JSX.Element[];
}

export interface ModalProps {
    title?: string;
    children: JSX.Element | JSX.Element[];
    showModal: (showModal: boolean) => void;
    [key: string]: any;
}