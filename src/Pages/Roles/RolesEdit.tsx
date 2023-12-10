import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import {FormField} from "../../types/Form";
import {Form} from "../../components/Form/Form";
import {Button} from "../../components/Button/Button.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {useParams, useNavigate} from "react-router-dom";

import styles from './Roles.module.css'
import {API_KEY} from "../../constantes.ts";

export const RolesEdit = () => {
    const {id} = useParams<{ id: string }>()
    const [step, setStep] = useState<number>(1)
    const [valueForm, setValueForm] = useState<{
        nameRol?: string,
        descriptionRol?: string,
        permissions?: number[]
    }>({})
    const {data, loading, get} = useFetch('https://coffvart-backend.onrender.com/api/')

    useEffect(() => {
        get(`roles/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                name: data?.role?.name,
                description: data?.role?.description,
                permissions: data?.role?.rol_details?.map((rol: any) => rol.permission.id)
            }
            console.log(newValues)
            setValueForm(newValues)
        }
    }, [data, loading]);

    return (
        <Container align={'CENTER'} justify={'CENTER'}>
            <Titles title={'Editar rol'} level={2} transform={'UPPERCASE'}/>
            <Titles title={`Paso ${step} de 2`} level={5} transform={'UPPERCASE'}/>
            {
                step === 1 &&
                <RolesEditStepOne changeStep={setStep} valueForm={valueForm} setValueForm={setValueForm}/>
            }
            {
                step === 2 &&
                <RolesEditStepTwo changeStep={setStep} valueForm={valueForm} setValueForm={setValueForm}/>
            }
        </Container>
    )
}

const RolesEditStepOne = ({changeStep, valueForm, setValueForm}: {
    changeStep: (value: any) => void;
    valueForm: { name?: string, description?: string, permissions?: number[] },
    setValueForm: (value: any) => void
}) => {
    const [error, setError] = useState<{[key: string]: string}>({})

    const handleChange = (value: string, name: string) => {
        console.log(value, name)
        if (name == 'nameRol') {
            setValueForm({
                ...valueForm,
                name: value
            })
            return
        }
        if (name == 'descriptionRol') {
            setValueForm({
                ...valueForm,
                description: value
            })
            return
        }
    }

    const fields: FormField[] = [
        {
            name: 'nameRol',
            label: 'Nombre del rol',
            type: 'text',
            value: valueForm?.name || '',
            onChange: handleChange,
            size: 'large'
        },
        {
            name: 'descriptionRol',
            label: 'Descripción del rol',
            type: 'textarea',
            value: valueForm?.description || '',
            onChange: handleChange,
            size: 4
        }
    ]

    const handleSubmit = (e: any) => {
        e.preventDefault()
        let mensajeError = {}
        if (!valueForm?.name) {
            mensajeError = {...mensajeError, nameRol: 'El nombre del rol es requerido'}
        }
        if (!valueForm?.description) {
            mensajeError = {...mensajeError, descriptionRol: 'La descripción del rol es requerida'}
        }
        if (Object.keys(mensajeError).length > 0) {
            setError(mensajeError)
            console.log('On')
            return
        }
        const newValues = {
            ...valueForm,
            name: valueForm?.name,
            description: valueForm?.description
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

const RolesEditStepTwo = ({changeStep, valueForm, setValueForm}: {
    changeStep: (value: any) => void;
    valueForm: { name?: string, description?: string, permissions?: number[] },
    setValueForm: (value: any) => void
}) => {
    const {id} = useParams<{ id: string }>()
    const {data, loading, error, get, put} = useFetch('https://coffvart-backend.onrender.com/api/')
    const [permissionsPrivileges, setPermissionsPrivileges] = useState<any[]>([])
    const [selectedPrivileges, setSelectedPrivileges] = useState<any[]>([])
    const navigate = useNavigate()

    console.log(valueForm, 'valueForm')

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
            const newValues = {
                ...valueForm,
                permissions: newPrivileges.map((selectedPrivilege: any) => selectedPrivilege?.privilege?.id)
            }
            setValueForm(newValues)
            setSelectedPrivileges(newPrivileges)
            return
        }
        const newPrivileges = [...selectedPrivileges, {privilege, permission}]

        const newValues = {
            ...valueForm,
            permissions: newPrivileges.map((selectedPrivilege: any) => selectedPrivilege?.privilege?.id)
        }
        setValueForm(newValues)


        setSelectedPrivileges(newPrivileges)


    }


    useEffect(() => {
        get(`permissions?apikey=${API_KEY}`)
    }, []);

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

    useEffect(() => {
        const permissionsAlreadySelected = valueForm?.permissions?.map((permission: any) => {
            return permissionsPrivileges?.find((permissionPrivilege: any) => {
                return permissionPrivilege?.privileges?.find((privilege: any) => {
                    return privilege?.id === permission
                })
            })
        })

        const permissionsAlreadySelectedReduced = permissionsAlreadySelected?.map((permission: any, index: number) => {
            const permissionSelected = {id: permission?.id, name: permission?.name}
            const privilegePermission = permission?.privileges && [...permission.privileges]
            const valueFormPermissions = valueForm?.permissions ? [...valueForm.permissions] : []
            const privilege = privilegePermission?.find((privilege: any) => {
                return privilege?.id === valueFormPermissions[index]
            })
            return {
                privilege,
                permission: permissionSelected
            }
        })
        setSelectedPrivileges(permissionsAlreadySelectedReduced || [])
    }, [data])

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const newValues = {
            ...valueForm,
            permissions: selectedPrivileges.map((selectedPrivilege: any) => selectedPrivilege?.privilege?.id)
        }
        setValueForm(newValues)
        put(`roles/${id}?apikey=${API_KEY}`, newValues)
        if (!loading && !error) {
            setTimeout(() => {
                navigate(-1)
            }, 500)
        }
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
                                    permissionPrivilege.privileges?.map((privilege: any, indexPrivilege: number) => {
                                        return <span
                                            key={indexPrivilege}
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
                <Button text={'Editar Rol'} onClick={handleSubmit} type={'BUTTON'} autosize={true}
                        disabled={selectedPrivileges?.length === 0}/>
                <Button text={'Cancelar'} onClick={() => navigate(-1)} type={'BUTTON'} autosize={true} fill={false}/>
            </Container>
        </>
    )
}

export default RolesEdit