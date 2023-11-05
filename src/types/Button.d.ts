export interface ButtonProps {
    text?: string | JSX.Element;
    onClick?: () => void;
    fill?: boolean;
    autosize?: boolean;
    disabled?: boolean;
}