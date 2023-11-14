import {useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {Form} from "../../components/Form/Form";
import {Button} from "../../components/Button/Button.tsx";

export const RolesCreate = () => {
    const options: SelectOption[][] = [
        [
            {
                value: '1',
                label: '1'
            },
            {
                value: '2',
                label: '2'
            },
            {
                value: '3',
                label: '3'
            }
        ],
        [
            {
                value: '4',
                label: '4'
            },
            {
                value: '5',
                label: '5'
            },
            {
                value: '6',
                label: '6'
            }
        ],
        [
            {
                value: '7',
                label: '7'
            },
            {
                value: '8',
                label: '8'
            },
            {
                value: '9',
                label: '9'
            }
        ]
    ]
    const [value1, setValue1] = useState<SelectOption[]>([]);
    const formFields: FormField[] = [
        {
            label: 'Nombre',
            multiple: true,
            name: 'name',
            onChange: (o) => setValue1(o),
            options: options[0],
            placeholder: 'Seleccione una opción',
            type: 'select',
            value: value1,
        }
    ]

    return (
        <div>
            <Form fields={formFields} onSubmit={e => e.preventDefault()}
                  button={<Button text={'crear Rol'} onClick={() => null}/>}/>
        </div>
    )
}