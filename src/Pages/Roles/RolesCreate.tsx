import { useState } from "react";
import { FormField, SelectOption } from "../../types/Form";
import { Form } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button.tsx";
import { Container } from "../../components/Container/Container.tsx";
import { Titles } from "../../components/Titles/Titles.tsx";

import styles from './Roles.module.css'
import { FiX } from "react-icons/fi";

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
    return (
        <div style={{
            width: '50%'
        }}>
            <Form fields={fields} onSubmit={() => changeStep((prev: number) => prev + 1)}
                button={<Button text={'Continuar'} onClick={() => null} autosize={false} />} />
        </div>
    )
}

const RolesCreateStepTwo = () => {
    const [valuePermisoRol, setValuePermisoRol] = useState<SelectOption>()
    const [valuePrivilegioRol, setValuePrivilegioRol] = useState<SelectOption[]>([])
    const [premisosArray, setPermisosArray] = useState<any>([])
    const fields: FormField[] = [
        {
            name: 'permisoRol',
            placeholder: 'Permisos del rol',
            type: 'select',
            options: [
                { value: 'Usuarios', label: 'Usuarios' },
                { value: 'Roles', label: 'Roles' },
                { value: 'Compras', label: 'Compras' },
                { value: 'Ventas', label: 'Ventas' },
                { value: 'Productos', label: 'Productos' },
                { value: 'Clientes', label: 'Clientes' },
                { value: 'Proveedores', label: 'Proveedores' },
                { value: 'Categorias', label: 'Categorias' },
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
                { value: 'Listar', label: 'Listar' },
                { value: 'Crear', label: 'Crear' },
                { value: 'Editar', label: 'Editar' },
                { value: 'Eliminar', label: 'Eliminar' },
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
    };

    const handleDeletePrivilegio = (previlegio: {permiso:string, privilegio: string}) => {
        const permisoIndex = premisosArray.findIndex((permiso: any) => permiso.permission === previlegio.permiso)
        let newPermisosArray = [...premisosArray]
        if(permisoIndex === -1) return console.log('No se encontro el permiso')
        if(premisosArray[permisoIndex].privilege.length > 1){
            const privilegioIndex = premisosArray[permisoIndex].privilege.findIndex((privilegio: string) => privilegio === previlegio.privilegio)
            newPermisosArray[permisoIndex].privilege.splice(privilegioIndex, 1)
            setPermisosArray(newPermisosArray)
        }else{
            newPermisosArray.splice(permisoIndex, 1)
            setPermisosArray(newPermisosArray)
        }
        
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5rem'
        }}>
            <div style={
                {
                    width: '45%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }
            }>
                <Form fields={fields} onSubmit={e => {
                    e.preventDefault();
                    handleAddPermiso()
                }}
                    button={<Button text={'Añadir Permiso'} onClick={() => null} autosize={false} />} />
            </div>
            {
                premisosArray.length > 0 && (
                    <div className={styles.permisosContainer}>
                        {
                            premisosArray.map((permiso: any) => (
                                <div key={permiso.id} className={styles.permisos}>
                                    <p className={styles.permisoName}>{permiso.permission}</p>
                                    <ul className={styles.privilegios}>
                                        {permiso.privilege.map((privilegio: string) => (
                                            <li className={styles.privilegioName} key={privilegio}>{privilegio}
                                                <button 
                                                onClick={()=> handleDeletePrivilegio({
                                                    permiso: permiso.permission,
                                                    privilegio: privilegio
                                                })}
                                                className={styles.deletePrivilege}>
                                                    <FiX />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}