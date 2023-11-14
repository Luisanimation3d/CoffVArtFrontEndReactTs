import {useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {Form} from "../../components/Form/Form";
import {Button} from "../../components/Button/Button.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";

export const RolesCreate = () => {
    const [step, setStep] = useState<number>(1)
    return (
        <Container align={'CENTER'} justify={'CENTER'}>
            <Titles title={'Crear rol'} level={2} transform={'UPPERCASE'}/>
            <Titles title={'Paso 1 de 2'} level={5} transform={'UPPERCASE'}/>
            {
                step === 1 &&
                <RolesCreateStepOne changeStep={setStep}/>
            }
            {
                step === 2 &&
                <RolesCreateStepTwo/>
            }
        </Container>
    )
}

const RolesCreateStepOne = ({changeStep}:{changeStep: (value)=> void}) => {
    const [valueNameRol, setValueNameRol] = useState<string>('')
    const [valueDescriptionRol, setValueDescriptionRol] = useState<string>('')
    const fields: FormField[] = [
        {
            name: 'nameRol',
            label: 'Nombre del rol',
            type: 'text',
            value: valueNameRol,
            onChange: setValueNameRol
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
    return (
        <Form fields={fields} onSubmit={() => changeStep((prev: number) => prev + 1)}
              button={<Button text={'Continuar'} onClick={() => null} autosize={false}/>}/>
    )
}

const RolesCreateStepTwo = () => {
    const [valuePermisoRol, setValuePermisoRol] = useState<SelectOption>()
    const [valuePrivilegioRol, setValuePrivilegioRol] = useState<SelectOption[]>([])
    const [premisosArray, setPermisosArray] = useState<object[]>([])
    const fields: FormField[] = [
        {
            name: 'permisoRol',
            placeholder: 'Permisos del rol',
            type: 'select',
            options: [
                {value: 'Usuarios', label: 'Usuarios'},
                {value: 'Roles', label: 'Roles'},
                {value: 'Compras', label: 'Compras'},
                {value: 'Ventas', label: 'Ventas'},
                {value: 'Productos', label: 'Productos'},
                {value: 'Clientes', label: 'Clientes'},
                {value: 'Proveedores', label: 'Proveedores'},
                {value: 'Categorias', label: 'Categorias'},
            ],
            value: valuePermisoRol,
            onChange: setValuePermisoRol,
            multiple: false,
        },
        {
            name: 'privilegioRol',
            placeholder: 'Privilegios del rol',
            type: 'select',
            options: [
                {value: 'Listar', label: 'Listar'},
                {value: 'Crear', label: 'Crear'},
                {value: 'Editar', label: 'Editar'},
                {value: 'Eliminar', label: 'Eliminar'},
            ],
            value: valuePrivilegioRol,
            onChange: setValuePrivilegioRol,
            multiple: true,
        },
    ]

    const handleAddPermiso = () => {
        const permiso = {
            id: premisosArray.length + 1,
            permission: valuePermisoRol?.label,
            privilege: valuePrivilegioRol.map((privilegio: SelectOption) => privilegio.label)
        }
        setPermisosArray((prev: object[]) => [...prev, permiso])
        setValuePermisoRol(undefined)
        setValuePrivilegioRol([])
    }
;
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5rem'
        }}>
            <Form fields={fields} onSubmit={e => {
                e.preventDefault();
                handleAddPermiso()
            }}
                  button={<Button text={'Añadir Permiso'} onClick={() => null} autosize={false}/>}/>
            {
                premisosArray.length > 0 && (
                    <div>
                        {
                            premisosArray.map((permiso: any) => (
                                <div key={permiso.id}>
                                    <p>{permiso.permission}</p>
                                    <p>{JSON.stringify(permiso.privilege)}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}