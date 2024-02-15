import {FC} from "react";

import {useNavigate} from "react-router-dom";

import "./FormRedisign.css";
import {FormField, FormProps} from "../../types/Form";
import {GeneralInputRedisign} from "../GeneralInputRedisign/GeneralInputRedisign.tsx";
import {SelectInputRedisign} from "../SelectInputRedisign/SelectInputRedisign.tsx";
import {TextAreaInputRedisign} from "../TextAreaInputRedisign/TextAreaInputRedisign.tsx";
import {useDarkMode} from "../../context/DarkMode.tsx";

export const FormRedisign: FC<FormProps> = ({
                                        title,
                                        fields,
                                        onSubmit,
                                        button,
                                        cancelButton = true,
                                        errors,
                                        extra
                                    }) => {
    const navigate = useNavigate();

    const {darkMode} = useDarkMode();

    const handleCapitalLetter = (string: string) => {
        const toLowerCaseWord = string.toLowerCase();
        {/*   Put the first letter of every word on capital letter */}
        return toLowerCaseWord
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <>
            <form onSubmit={onSubmit} className={`${darkMode ? 'form__darkMode' : 'form__lightMode'}`} style={{minWidth: '100%'}}>
                {title && <h1>
                    {handleCapitalLetter(title)}
                </h1>}
                <div className="formInputContainer">
                    {fields?.map((
                        {
                            type,
                            value,
                            placeholder,
                            onChange,
                            label,
                            name,
                            size,
                            options,
                            multiple,
                        }: FormField,
                        index: number // Agregar el índice como parámetro
                    ) => {
                        switch (type) {
                            case "text":
                            case "password":
                            case "email":
                            case "number":
                            case 'date': {
                                return (
                                    <div
                                        className={`formControllerContainer ${size === 'large' ? 'formControllerContainer--large' : 'formControllerContainer--medium'}`}
                                        key={index}>
                                        <GeneralInputRedisign key={index} value={value} onChange={onChange} label={label} name={name}
                                               size={size} type={type}/>
                                        {errors && errors[name] && (
                                            <span className="formController__error">{errors[name]}</span>
                                        )}
                                    </div>
                                );
                            }
                            case "select": {
                                return multiple ? (
                                    <div className={`formControllerContainer ${size === 'large' ? 'formControllerContainer--large' : 'formControllerContainer--medium'}`}
                                         key={index}>
                                        <SelectInputRedisign key={index} type={type} options={options} onChange={onChange}
                                                value={value}
                                                placeholder={placeholder} size={size} multiple/>
                                    </div>
                                ) : (
                                    <div className={`formControllerContainer ${size === 'large' ? 'formControllerContainer--large' : 'formControllerContainer--medium'}`}
                                         key={index}>
                                        <SelectInputRedisign key={index} type={type} options={options} onChange={onChange}
                                                value={value}
                                                placeholder={placeholder}/>
                                    </div>
                                );
                            }
                            case "textarea": {
                                return (
                                    <div className="formControllerContainer" style={{
                                        width: '100%'
                                    }} key={index}>
                                        <TextAreaInputRedisign key={index} type={type} value={value as string} onChange={onChange}
                                                       label={label} name={name} placeholder={placeholder}
                                                       size={size as number}/>
                                        {errors && errors[name] && (
                                            <span className="formController__error">{errors[name]}</span>
                                        )}
                                    </div>
                                );
                            }
                            default: {
                                return (
                                    <div key={index}>
                                        Tipo {type} desconocido en el input {name}
                                    </div>
                                );
                            }
                        }
                    })}
                </div>
                {
                    extra && extra
                }
                <button className={'form__button__to__send'} type={'submit'}>
                    {button || 'Enviar'}
                </button>
                {cancelButton && (
                    <button onClick={() => navigate(-1)} type={'button'} className={'form__button__to__cancel'}>
                        Cancelar
                    </button>
                )}
            </form>
        </>
    );
};