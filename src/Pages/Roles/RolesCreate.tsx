import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import {FormField} from "../../types/Form";
import {Form} from "../../components/Form/Form";
import {Button} from "../../components/Button/Button.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";

import styles from './Roles.module.css'
import {API_KEY} from "../../constantes.ts";

export const RolesCreate = () => {
    const [step, setStep] = useState<number>(1)
    const [valueForm, setValueForm] = useState<{
        nameRol?: string,
        descriptionRol?: string,
        permissions?: number[]
    }>({})
    return (
        <Container align={'CENTER'} justify={'CENTER'}>
            <Titles title={'Crear rol'} level={2} transform={'UPPERCASE'}/>
            <Titles title={`Paso ${step} de 2`} level={5} transform={'UPPERCASE'}/>
            {
                step === 1 &&
                <RolesCreateStepOne changeStep={setStep} valueForm={valueForm} setValueForm={setValueForm}/>
            }
            {
                step === 2 &&
                <RolesCreateStepTwo changeStep={setStep} valueForm={valueForm} setValueForm={setValueForm}/>
            }
        </Container>
    )
}

const RolesCreateStepOne = ({changeStep, valueForm, setValueForm}: {
    changeStep: (value: any) => void;
    valueForm: { name?: string, description?: string, permissions?: number[] },
    setValueForm: (value: any) => void
}) => {
    const [valueNameRol, setValueNameRol] = useState<string>(valueForm?.name || '')
    const [valueDescriptionRol, setValueDescriptionRol] = useState<string>(valueForm?.description || '')
    const [error, setError] = useState<{}>({})
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

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setError({})
        let mensajeError = {...error}
        if (!valueNameRol) {
            mensajeError = {...mensajeError, nameRol: 'El nombre del rol es requerido'}
        }
        if (!valueDescriptionRol) {
            mensajeError = {...mensajeError, descriptionRol: 'La descripción del rol es requerida'}
        }
        if (Object.keys(mensajeError).length > 0) {
            setError(mensajeError)
            return
        }
        const newValues = {
            ...valueForm,
            name: valueNameRol,
            description: valueDescriptionRol
        }
        setValueForm(newValues)
        changeStep(2)
    }
    return (
        <div style={{
            width: '50%'
        }}>
            <Form fields={fields} onSubmit={handleSubmit}
                  button={<Button text={'Continuar'} onClick={() => null} type={'SUBMIT'} autosize={false}/>}
                  errors={error}
            />
        </div>
    )
}

const RolesCreateStepTwo = ({changeStep, valueForm, setValueForm}: {
    changeStep: (value: any) => void;
    valueForm: { name?: string, description?: string, permissions?: number[] },
    setValueForm: (value: any) => void
}) => {
    const {data, loading, get, post} = useFetch('https://coffvart-backend.onrender.com/api/')
    const [permissionsPrivileges, setPermissionsPrivileges] = useState<any[]>([])
    const [selectedPrivileges, setSelectedPrivileges] = useState<any[]>([])

    const verifySelectedPrivileges = (privilege: any, permission: any) => {
        if (selectedPrivileges.length === 0) {
            return false
        } else {
            return selectedPrivileges.find((selectedPrivilege: any) => {
                return selectedPrivilege?.privilege?.name === privilege.name && selectedPrivilege?.permission?.name === permission.name
            })
        }
    }

    const verifySelectedPrivilegesByPermission = (permission: any) => {
        if (selectedPrivileges.length === 0) {
            return false
        } else {
            return selectedPrivileges.find((selectedPrivilege: any) => {
                return selectedPrivilege?.permission?.name === permission.name
            })
        }
    }

    const addPrivilege = (privilege: any, permission: any) => {
        const index = selectedPrivileges.findIndex((selectedPrivilege: any) => {
            return selectedPrivilege?.privilege?.name === privilege.name && selectedPrivilege?.permission?.name === permission.name
        })
        if (index !== -1) {
            const newPrivileges = [...selectedPrivileges]
            newPrivileges.splice(index, 1)
            setSelectedPrivileges(newPrivileges)
            return
        }
        const newPrivileges = [...selectedPrivileges, {privilege, permission}]
        setSelectedPrivileges(newPrivileges)
    }

    useEffect(() => {
        get(`permissions?apikey=${API_KEY}`)
    });

    useEffect(() => {
        if (!loading) {
            const newPermissionsPrevileges = data?.permissions?.rows?.reduce((acc: any, permission: any) => {
                    const index = acc.findIndex((permissionPrivileges: any) => permissionPrivileges.name === permission?.name?.split(' ')[1])
                    if (index !== -1) {
                        return acc
                    }
                    return [...acc, {
                        id: permission.id,
                        name: permission?.name?.split(' ')[1],
                        privileges: data?.permissions?.rows?.map((privilege: any) => privilege?.name?.split(' ')[1] === permission?.name?.split(' ')[1] ? {
                            id: privilege?.id,
                            name: privilege?.name.split(' ')[0]
                        } : null).filter((privilege: any) => privilege !== null)
                    }]
                },
                []
            )
            setPermissionsPrivileges(newPermissionsPrevileges)

        }
    }, [data]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const newValues = {
            ...valueForm,
            permissions: selectedPrivileges.map((selectedPrivilege: any) => selectedPrivilege?.privilege?.id)
        }
        setValueForm(newValues)
        post(`roles?apikey=${API_KEY}`, newValues)
    }

    return (
        <>
            <div className={styles.permissionsContainerCards}>
                {
                    permissionsPrivileges?.map((permissionPrivilege: any, index: number) => {
                        return <div key={index}
                                    className={`${styles.permissionCard} ${verifySelectedPrivilegesByPermission(permissionPrivilege) ? styles['permissionCard--active'] : ''}`}>
                            <h3 className={styles.permissionCardName}>{permissionPrivilege.name}</h3>
                            <div className={styles.permissionCardPrivilegesContainer}>
                                {
                                    permissionPrivilege.privileges?.map((privilege: any) => {
                                        return <span
                                            className={`${styles.permissionCardPrivilege} ${verifySelectedPrivileges(privilege, {
                                                id: permissionPrivilege?.id,
                                                name: permissionPrivilege?.name
                                            }) ? styles['permissionCardPrivilege--active'] : ''}`}
                                            onClick={() => addPrivilege(privilege, {
                                                id: permissionPrivilege?.id,
                                                name: permissionPrivilege?.name
                                            })}>{privilege?.name}</span>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
            <Container align={'CENTER'} justify={'CENTER'} direction={'ROW'}>
                <Button text={'Atrás'} onClick={() => changeStep(1)} type={'BUTTON'} autosize={true} fill={false}/>
                <Button text={'Registrar Rol'} onClick={handleSubmit} type={'BUTTON'} autosize={true} disabled={selectedPrivileges?.length === 0}/>
            </Container>
        </>
    )
}