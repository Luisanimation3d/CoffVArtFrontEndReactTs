import {useState} from 'react'
import { FormField, SelectOption } from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';

export const CompanysCreate= ()=>{
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
    const CompanyFields: FormField[] = [
    {
        name: 'nombre',
        type: 'text',
        label: 'Nombre de la compañia',
        placeholder: 'Compañia S.A.S',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size: 'medium'
    },
    {
        name: 'nit',
        type: 'text',
        label: 'NIT',
        placeholder: '10122012334-5',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size: 'medium'
    },
    {
        name: 'email',
        type: 'email',
        label: 'Correo',
        placeholder: 'Compañia@company.com',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size: 'medium'
    },
    {
        name: 'address',
        type: 'text',
        label: 'Dirección',
        placeholder: 'Cra 00 # 00 - 00',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size:'medium'
    },
    {
        name: 'phone',
        type: 'text',
        label: 'Teléfono',
        placeholder: '300 000 00 00',
        value: '',
        onChange: (e) => {
            console.log(e)
        },
        size:'medium'
    },
    {
        name: 'state',
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
title='Crear Compañia'
fields={CompanyFields}
onSubmit={e => {
    e.preventDefault();
}}
button={<Button text='Guardar' onClick={() => null} fill={true} />}
/>
)

}


