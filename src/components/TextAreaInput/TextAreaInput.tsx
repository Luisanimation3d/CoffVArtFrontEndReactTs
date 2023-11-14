import {TextAreaInputProps} from "../../types/Form";

import styles from './TextAreaInput.module.css';

export const TextAreaInput = ({value, onChange, label, name, size = 1}: TextAreaInputProps) => {
    return (
        <div className={styles.container}
             style={{height: `${size * 32}px`}}
        >
            <textarea
                name={name}
                id={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.textArea}
                placeholder={label}
            />
            <label htmlFor={name} className={styles.label}>{label}</label>
        </div>
    )
}