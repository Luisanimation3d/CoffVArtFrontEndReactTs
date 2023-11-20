import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import {FormField, SelectOption} from "../../types/Form";
import {Form} from "../../components/Form/Form";
import {Button} from "../../components/Button/Button.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";

import styles from './Roles.module.css'
import {FiX} from "react-icons/fi";
import {API_KEY} from "../../constantes.ts";

export const RolesCreate = () => {
    const [step, setStep] = useState<number>(1)
    return (
        <Container align={'CENTER'} justify={'CENTER'}>
            <Titles title={'Crear rol'} level={2} transform={'UPPERCASE'}/>
            <Titles title={`Paso ${step} de 2`} level={5} transform={'UPPERCASE'}/>
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

const RolesCreateStepOne = ({changeStep}: { changeStep: (value: any) => void }) => {
    const [valueNameRol, setValueNameRol] = useState<string>('')
    const [valueDescriptionRol, setValueDescriptionRol] = useState<string>('')
    const {data, loading, error, post} = useFetch('https://coffvart-backend.onrender.com/api/')
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
        changeStep(2)
    }
    return (
        <div style={{
            width: '50%'
        }}>
            <Form fields={fields} onSubmit={handleSubmit}
                  button={<Button text={'Continuar'} onClick={() => null} autosize={false}/>}
            />
        </div>
    )
}

const RolesCreateStepTwo = () => {
    const {data, loading, error, get} = useFetch('https://coffvart-backend.onrender.com/api/')
    const [permissions, setPermissions] = useState<any[]>([])
    const [privileges, setPrivileges] = useState<any[]>([])
    useEffect(() => {
        get(`permissions?apikey=${API_KEY}`)
    }, []);
    useEffect(() => {
        if (!loading) {
            const newPermissions = data?.permissions?.rows?.map((permission: any) => {
                return {
                    id: permission.id,
                    name: permission?.name?.split(' ')[1],
                }
            })
            const newPrivileges = data?.permissions?.rows?.map((permission: any) => {
                return {
                    id: permission.id,
                    name: permission?.name?.split(' ')[0],
                }
            })
            setPermissions(newPermissions)
            setPrivileges(newPrivileges)
        }
    }, [data]);
    return <div className={styles.permissionsContainerCards}>
        {
            data?.permissions?.rows?.map((permission: any, index: number) => {
                return (
                    <div className={styles.permissionCard} key={permission.id}>
                        <h3 className={styles.permissionCardName}>{permissions[index]?.name}</h3>
                        {
                            privileges.map((privilege: any) => {
                                return (
                                    <span className={styles.permissionCardPrivilege}>{privilege.name}</span>
                                )
                            })
                        }
                    </div>
                )
            })
        }
    </div>
}