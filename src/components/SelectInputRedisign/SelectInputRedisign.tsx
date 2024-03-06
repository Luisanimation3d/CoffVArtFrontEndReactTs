import {useCallback, useEffect, useRef, useState} from "react";
import {SelectProps, SelectOption} from "../../types/Form";
import {FiX, FiChevronDown} from 'react-icons/fi';

import styles from './SelectInputRedisign.module.css';
import {useDarkMode} from "../../context/DarkMode.tsx";

export const SelectInputRedisign = ({multiple, value, options, onChange, placeholder, error=false}: SelectProps) => {
    const {darkMode} = useDarkMode();
    const [isOpen, setIsOpen] = useState(false);
    const [highLightedIndex, setHighLightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null)
    const clearOptions = () => {
        multiple ? onChange([]) : onChange(undefined);
    }
    const selectOption = useCallback((option: SelectOption) => {
        if (multiple) {
            if (value?.some(o => o.value === option.value)) {
                onChange(value.filter(o => o.value !== option.value));
            } else {
                onChange([...value, { ...option }]); // Create a new instance of the object
            }
        } else {
            if (option !== value) onChange(option);
        }
    }, [multiple, onChange, value]);
    const isOptionSelected = (option: SelectOption) => {
        if(multiple) return value?.some(o => o.value === option.value);
        return value?.value === option.value;
    }

    useEffect(() => {
        if (isOpen) setHighLightedIndex(0)
    }, [isOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return;
            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev);
                    if (isOpen) selectOption(options[highLightedIndex])
                    break;
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }
                    const newValue = highLightedIndex + (e.code === "ArrowUp" ? -1 : 1);
                    if (newValue < 0 || newValue >= options.length) return;
                    setHighLightedIndex(newValue);
                    break;
                }
                case "Escape":
                    setIsOpen(false);
                    break;
            }
        }

        containerRef.current?.addEventListener('keydown', handler);
        return () => {
            containerRef.current?.removeEventListener('keydown', handler);
        }
    }, [isOpen, highLightedIndex, options, selectOption]);

    return (
        <div onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} className={`${styles.container} ${darkMode ? styles.darkMode : styles.lightMode} ${error ? styles.error : ''}`}
             ref={containerRef}
             tabIndex={0}
        >
            <div className={`${styles.label} ${multiple ? value.length !== 0 ? styles['label--active'] : '' : value ? styles['label--active'] : ''}`}>{placeholder || ''}</div>
            <span className={styles.value}>{multiple ? value.map(v => (
                <button key={v.value} onClick={e => {
                    e.stopPropagation()
                    selectOption(v)
                }}
                        className={styles['option-badge']}
                >
                    {v.label}
                    <span className={styles['remove-button']}><FiX/></span>
                </button>
            )) : value?.label}</span>
            {
                multiple ? value.length !== 0 && (
                    <button className={styles['clear-button']} onClick={e => {
                        e.stopPropagation()
                        clearOptions()
                    }}><FiX/></button>
                ) : value && (
                    <button className={styles['clear-button']} onClick={e => {
                        e.stopPropagation()
                        clearOptions()
                    }}><FiX/></button>
                )
            }

            <div className={styles.divider}></div>
            <div className={`${styles.caret} ${isOpen ? styles['caret--active'] : ''}`}><FiChevronDown/></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
                {
                    options?.map((option, index) => (
                        <li
                            onClick={e => {
                                e.stopPropagation();
                                selectOption(option)
                                setIsOpen(false);
                            }}
                            onMouseEnter={() => setHighLightedIndex(index)}
                            key={option.value}
                            className={`
                                    ${styles.option} 
                                    ${isOptionSelected(option) ? styles.selected : ''}
                                    ${index === highLightedIndex ? styles.highlighted : ''}
                                `}
                        >
                            {option.label}
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}