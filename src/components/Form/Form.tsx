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
                                    }) => {

    const navigate = useNavigate();


    return (
        <>
            <form onSubmit={onSubmit} style={{
                minWidth: '100%'
            }}>
                {title && <h1>{title}</h1>}
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
                    }: FormField
                ) => {
                    switch (type) {
                        case "text":
                        case "password":
                        case "email":
                        case "number":
                        case 'date': {
                            return (
                                <Input value={value} onChange={onChange} label={label} name={name} size={size}/>
                            );
                        }
                        case "select": {
                            return multiple ? (
                                            <Select type={type} options={options} onChange={onChange} value={value} placeholder={placeholder} multiple/>
                                        )
                                        : (
                                            <Select type={type} options={options} onChange={onChange} value={value} placeholder={placeholder}/>
                                        )

                        }
                        case "textarea": {
                            return (
                                <TextAreaInput type={type} value={value} onChange={onChange} label={label} name={label} placeholder={placeholder} size={size as number}/>
                            )
                        }
                        default: {
                            return (
                                <div>
                                    Tipo {type} desconocido en el input {name}
                                </div>
                            );
                        }
                    }
                })}
                {button}
                {cancelButton && (
                    <Button text={"Cancelar"} onClick={() => navigate(-1)} fill={false}/>
                )}
            </form>
        </>
    );
};
