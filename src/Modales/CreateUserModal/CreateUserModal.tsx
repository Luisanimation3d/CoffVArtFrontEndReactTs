import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";

export const CreateUserModal = ({setIsModalOpen}: { setIsModalOpen: (value: boolean) => void }) => {
    const {data, get, post, error: errorRegister} = useFetch(API_URL)
    const [options, setOptions] = useState<SelectOption[]>([])
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        name: string,
        lastname: string,
        address: string,
        phone: string,
        email: string,
        password: string,
        confirmPassword: string,
        documentType: SelectOption | undefined,
        document: string,
        role: SelectOption | undefined,
    }>({
        name: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        documentType: undefined,
        document: '',
        role: undefined
    })

    const documentTypeOptions: SelectOption[] = [
        {
            value: 'CC',
            label: 'CC',
        },
        {
            value: 'TI',
            label: 'TI',
        }
    ];

    const formFieldsRegister: FormField[] = [
        {
            name: 'name',
            type: 'text',
            label: 'Nombre',
            placeholder: 'Ingrese su nombre',
            value: registerForm.name,
            onChange: (value: string) => setRegisterForm({...registerForm, name: value}),
            size: 'medium',
        },
        {
            name: 'lastname',
            type: 'text',
            label: 'Apellido',
            placeholder: 'Ingrese su apellido',
            value: registerForm.lastname,
            onChange: (value: string) => setRegisterForm({...registerForm, lastname: value}),
            size: 'medium',
        },
        {
            name: 'address',
            type: 'text',
            label: 'Dirección',
            placeholder: 'Ingrese su dirección',
            value: registerForm.address,
            onChange: (value: string) => setRegisterForm({...registerForm, address: value}),
            size: 'large',
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Teléfono',
            placeholder: 'Ingrese su teléfono',
            value: registerForm.phone,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                phone: validateIfNumber(value) ? value : prev.phone
            })),
            size: 'large',
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: 'Ingrese su email',
            value: registerForm.email,
            onChange: (value: string) => setRegisterForm({...registerForm, email: value}),
            size: 'large',
        },
        {
            name: 'password',
            type: 'password',
            label: 'Contraseña',
            placeholder: 'Ingrese su contraseña',
            value: registerForm.password,
            onChange: (value: string) => setRegisterForm({...registerForm, password: value}),
            size: 'large',
        },
        {
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirmar contraseña',
            placeholder: 'Ingrese su contraseña',
            value: registerForm.confirmPassword,
            onChange: (value: string) => setRegisterForm({...registerForm, confirmPassword: value}),
            size: 'large',
        },
{
            name: 'documentType',
            type: 'select',
            label: 'Tipo de documento',
            placeholder: 'Seleccione un tipo de documento',
            value: registerForm.documentType,
            onChange: (value: SelectOption | undefined) => setRegisterForm({...registerForm, documentType: value}),
            size: 'medium',
            options: documentTypeOptions
        },
        {
            name: 'document',
            type: 'text',
            label: 'Documento',
            placeholder: 'Ingrese su documento',
            value: registerForm.document,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                document: validateIfNumber(value) ? value : prev.document
            })),
            size: 'large',
        },
        {
            name: 'role',
            type: 'select',
            label: 'Rol',
            placeholder: 'Seleccione un rol',
            value: registerForm.role,
            onChange: (value: SelectOption | undefined) => setRegisterForm({...registerForm, role: value}),
            size: 'large',
            options: options
        }
    ]

    const validateIfNumber = (value: string) => {
        if (value.length === 0) return true
        const regex = new RegExp('^[0-9]+$')
        return regex.test(value)
    }

    const validateEmail = (email: string) => {
        const regex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$')
        return regex.test(email)
    }

    const validateForm = () => {
        const errors: any = {}
        if (registerForm.name.length === 0) {
            errors.name = 'El nombre es requerido'
        }
        if (registerForm.lastname.length === 0) {
            errors.lastname = 'El apellido es requerido'
        }
        if (registerForm.address.length === 0) {
            errors.address = 'La dirección es requerida'
        }
        if (registerForm.phone.length === 0) {
            errors.phone = 'El teléfono es requerido'
        }
        if (registerForm.email.length === 0) {
            errors.email = 'El email es requerido'
        }else if(!validateEmail(registerForm.email)){
            errors.email = 'El email no es válido'
        }
        if (registerForm.password.length === 0) {
            errors.password = 'La contraseña es requerida'
        }
        if (registerForm.confirmPassword.length === 0) {
            errors.confirmPassword = 'La confirmación de contraseña es requerida'
        } else if (registerForm.password !== registerForm.confirmPassword) {
            errors.password = 'Las contraseñas no coinciden'
            errors.confirmPassword = 'Las contraseñas no coinciden'
        }
        if (!registerForm.documentType) {
            errors.documentType = 'El tipo de documento es requerido'
        }
        if (registerForm.document.length === 0) {
            errors.document = 'El documento es requerido'
        }
        if (!registerForm.role) {
            errors.role = 'El rol es requerido'
        }
        return errors
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorsForm = validateForm();
        if(Object.keys(errorsForm).length !== 0) {
            setError(errorsForm)
            return
        }
        setError({})
        const dataToSend = {
            name: registerForm.name,
            lastname: registerForm.lastname,
            address: registerForm.address,
            phone: registerForm.phone,
            email: registerForm.email,
            password: registerForm.password,
            documentType: registerForm.documentType?.value,
            document: registerForm.document,
            roleId: registerForm.role?.value,
        }

        post(`users?apikey=${API_KEY}`, dataToSend)
    }

    useEffect(() => {
        get(`roles?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        if (data?.roles?.rows) {
            const roles = data?.roles?.rows?.map((rol: any) => ({
                label: rol.name,
                value: rol.id,
            }))
            setOptions(roles)
        }
    }, [data]);

    useEffect(() => {
        if (data?.newUser && !errorRegister) {
            alert('Usuario creado correctamente')
            setIsModalOpen(false)
        }
    }, [data]);

    return (
        <ModalContainer ShowModal={setIsModalOpen}>
            <Modal showModal={setIsModalOpen} title={`Crear Usuario`}>
                <div style={{
                    width: '100%',
                    padding: '1rem 2rem',
                }}>
                    <Form fields={formFieldsRegister} button={<Button text={'Crear usuario'} type={'Submit'}/>}
                          onSubmit={handleSubmit}
                          cancelButton={false}
                          errors={error}
                    />
                </div>
            </Modal>
        </ModalContainer>
    )
}