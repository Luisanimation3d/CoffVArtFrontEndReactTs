import {FC} from "react";

import {useNavigate} from "react-router-dom";

import "./Form.css";
import {Button} from "../Button/Button";
import {FormField, FormProps} from "../../types/Form";
import {Input} from "../GeneralInput/GeneralInput.tsx";
import {Select} from "../SelectInput/SelectInput.tsx";
import {TextAreaInput} from "../TextAreaInput/TextAreaInput.tsx";

export const Form: FC<FormProps> = ({
                                        title,
                                        fields,
                                        onSubmit,
                                        button,
                                        cancelButton = true,
                                        errors,
                                        extra
                                    }) => {
    const navigate = useNavigate();

    return (
        <>
            <form onSubmit={onSubmit} style={{minWidth: '100%'}}>
                {title && <h1>{title}</h1>}
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
                                        <Input key={index} value={value} onChange={onChange} label={label} name={name}
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
                                        <Select key={index} type={type} options={options} onChange={onChange}
                                                value={value}
                                                placeholder={placeholder} size={size} multiple/>
                                    </div>
                                ) : (
                                    <div className={`formControllerContainer ${size === 'large' ? 'formControllerContainer--large' : 'formControllerContainer--medium'}`}
                                         key={index}>
                                        <Select key={index} type={type} options={options} onChange={onChange}
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
                                        <TextAreaInput key={index} type={type} value={value} onChange={onChange}
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
                {button}
                {cancelButton && (
                    <Button text={"Cancelar"} onClick={() => navigate(-1)} fill={false}/>
                )}
            </form>
        </>
    );
};