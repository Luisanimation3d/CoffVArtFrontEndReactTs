import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { FormField, SelectOption } from "../../types/Form";
import { Form } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button.tsx";
import { Container } from "../../components/Container/Container.tsx";
import { Titles } from "../../components/Titles/Titles.tsx";

import styles from './Roles.module.css'
import { FiX } from "react-icons/fi";
import {API_KEY} from "../../constantes.ts";

export const RolesCreate = () => {
    const [step, setStep] = useState<number>(1)
    return (
        <Container align={'CENTER'} justify={'CENTER'}>
            <Titles title={'Crear rol'} level={2} transform={'UPPERCASE'} />
            <Titles title={'Paso 1 de 2'} level={5} transform={'UPPERCASE'} />
            {
                step === 1 &&
                <RolesCreateStepOne changeStep={setStep} />
            }
            {
                step === 2 &&
                <RolesCreateStepTwo />
            }
        </Container>
    )
}

const RolesCreateStepOne = ({ changeStep }: { changeStep: (value: any) => void }) => {
    const [valueNameRol, setValueNameRol] = useState<string>('')
    const [valueDescriptionRol, setValueDescriptionRol] = useState<string>('')
    const {data, loading, error, post } = useFetch('https://coffvart-backend.onrender.com/api/')
    const fields: FormField[] = [
        {
            name: 'nameRol',
            label: 'Nombre del rol',
            type: 'text',
            value: valueNameRol,
            onChange: setValueNameRol,
            size: 'large'
        },
        {
            name: 'descriptionRol',
            label: 'Descripción del rol',
            type: 'textarea',
            value: valueDescriptionRol,
            onChange: setValueDescriptionRol,
            size: 4
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            name: valueNameRol,
            description: valueDescriptionRol
        })
        post(`roles?apikey=${API_KEY}`, {
            name: valueNameRol,
            description: valueDescriptionRol,
            permissions: [1]
        })
    }
    return (
        <div style={{
            width: '50%'
        }}>
            <Form fields={fields} onSubmit={handleSubmit}
                button={<Button text={'Continuar'} onClick={() => null} autosize={false} />}
            />
        </div>
    )
}

const RolesCreateStepTwo = () => {

}