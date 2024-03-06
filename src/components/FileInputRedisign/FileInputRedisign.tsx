import styles from './FileInputRedisign.module.css';
import React from "react";
import {FileInputProps} from "../../types/Form";

export function FileInput({onChange, label, name, size = 'large'}: FileInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onChange(e.target.files[0],name)
        }
    }

    return (
        <div className={`${styles.container} ${
            size === 'medium' ? styles.medium : size === 'large' ? styles.large : ''
        }`}>
            <input type="file" className={styles.input} name={name} id={name} onChange={handleChange}/>
            <label htmlFor={name} className={styles.label}>{label}</label>
        </div>
    )
}