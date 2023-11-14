import react from 'react'
import {useState} from 'react'
import { FormField, SelectOption } from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';

export const CoustomersCreate= ()=>{
    const options: SelectOption[]= [
        {
            value: 'CC',
            label: 'CC',
        },
        {
            value: 'TI',
            label: 'TI',
        }
    ]
    const optionsState: SelectOption[]= [
        {
            value: 'Activo',
            label: 'Activo',
        },
        {
            value: 'Inactivo',
            label: 'Inactivo',
        }
    ]
    const [state, setState] = useState <SelectOption | undefined>();
    const [tipo, setTipo] = useState <SelectOption | undefined>();
    const CoustomerFields: FormField[] = [
    {
        name: 'nombre',
        type: 'text',
        label: 'Nombre',
        placeholder: 'Nombre',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size: 'large'
    },
    {
        name: 'Tipodedocumento',
        type: 'select',
        label: 'Tipo de documento',
        placeholder: 'Tipo de documento',
        value: tipo, 
        options: options,
        onChange: (o) => setTipo(o),
        size: 'medium'
    },
    {
        name: 'documento',
        type: 'number',
        label: 'Documento',
        placeholder: 'Documento',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size: 'large'
    },
    {
        name: 'telefono',
        type: 'number',
        label: 'Telefono',
        placeholder: 'Telefono',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size: 'large'
    },
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size:'large'
    },
    {
        name: 'direccion',
        type: 'text',
        label: 'Dirección',
        placeholder: 'Dirección',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size:'large'
    },
    {
        name: 'estado',
        type: 'select',
        label: 'Estado',
        placeholder: 'Estado',
        value: state,
        onChange: (o) => setState (o),
        options: optionsState,
        size:'medium'
    }
];
return (
<Form
title='Crear Cliente'
fields={CoustomerFields}
onSubmit={onClick => (null)}
button={<Button text='Crear Cliente' onClick={() => null} fill={true} />}
/>
)

}


