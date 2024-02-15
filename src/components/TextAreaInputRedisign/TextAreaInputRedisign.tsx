import styles from './TextAreaInputRedisign.module.css';
import {useDarkMode} from "../../context/DarkMode.tsx";

type TextAreaInputProps = {
    value: string;
    onChange: (value: string) => void;
    label: string;
    name: string;
    size?: number;

}

export const TextAreaInputRedisign = ({value, onChange, label, name, size = 1}: TextAreaInputProps) => {

    const {darkMode} = useDarkMode();

    return (
        <div className={`${styles.container} ${darkMode ? styles.darkMode : styles.lightMode}`}
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