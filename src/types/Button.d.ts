export interface ButtonProps {
    text?: string | JSX.Element;
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    fill?: boolean;
    autosize?: boolean;
    disabled?: boolean;
    type?: BUTTON | SUBMIT;
}