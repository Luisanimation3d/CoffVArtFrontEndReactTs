import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";

export const EditUsersModal = ({setIsModalOpen, title = 'Editar Usuario', idUser, setIdEdit}: { setIsModalOpen: (value: boolean) => void, title?: string, idUser: number, setIdEdit: (value: number | null) => void }) => {
    const {data, get, put, error: errorEdit} = useFetch(API_URL)
    const {data: dataUser, get: getUser} = useFetch(API_URL)
    const [options, setOptions] = useState<SelectOption[]>([])
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [editForm, setEditForm] = useState<{
        name: string,
        lastname: string,
        address: string,
        phone: string,
        email: string,
        documentType: SelectOption | undefined,
        document: string,
        role: SelectOption | undefined,
    }>({
        name: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
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
            value: editForm.name,
            onChange: (value: string) => setEditForm({...editForm, name: value}),
            size: 'medium',
        },
        {
            name: 'lastname',
            type: 'text',
            label: 'Apellido',
            placeholder: 'Ingrese su apellido',
            value: editForm.lastname,
            onChange: (value: string) => setEditForm({...editForm, lastname: value}),
            size: 'medium',
        },
        {
            name: 'address',
            type: 'text',
            label: 'Dirección',
            placeholder: 'Ingrese su dirección',
            value: editForm.address,
            onChange: (value: string) => setEditForm({...editForm, address: value}),
            size: 'large',
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Teléfono',
            placeholder: 'Ingrese su teléfono',
            value: editForm.phone,
            onChange: (value: string) => setEditForm(prev => ({
                ...editForm,
                phone: validateIfNumber(value) ? value : prev.phone
            })),
            size: 'large',
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: 'Ingrese su email',
            value: editForm.email,
            onChange: (value: string) => setEditForm({...editForm, email: value}),
            size: 'large',
        },
        {
            name: 'documentType',
            type: 'select',
            label: 'Tipo de documento',
            placeholder: 'Seleccione un tipo de documento',
            value: editForm.documentType,
            onChange: (value: SelectOption | undefined) => setEditForm({...editForm, documentType: value}),
            size: 'medium',
            options: documentTypeOptions
        },
        {
            name: 'document',
            type: 'text',
            label: 'Documento',
            placeholder: 'Ingrese su documento',
            value: editForm.document,
            onChange: (value: string) => setEditForm(prev => ({
                ...editForm,
                document: validateIfNumber(value) ? value : prev.document
            })),
            size: 'large',
        },
        {
            name: 'role',
            type: 'select',
            label: 'Rol',
            placeholder: 'Seleccione un rol',
            value: editForm.role,
            onChange: (value: SelectOption | undefined) => setEditForm({...editForm, role: value}),
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
        if (editForm.name.length === 0) {
            errors.name = 'El nombre es requerido'
        }
        if (editForm.lastname.length === 0) {
            errors.lastname = 'El apellido es requerido'
        }
        if (editForm.address.length === 0) {
            errors.address = 'La dirección es requerida'
        }
        if (editForm.phone.length === 0) {
            errors.phone = 'El teléfono es requerido'
        }
        if (editForm.email.length === 0) {
            errors.email = 'El email es requerido'
        }else if(!validateEmail(editForm.email)){
            errors.email = 'El email no es válido'
        }
        if (!editForm.documentType) {
            errors.documentType = 'El tipo de documento es requerido'
        }
        if (editForm.document.length === 0) {
            errors.document = 'El documento es requerido'
        }
        if (!editForm.role) {
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
            name: editForm.name,
            lastname: editForm.lastname,
            address: editForm.address,
            phone: editForm.phone,
            email: editForm.email,
            documentType: editForm.documentType?.value,
            document: editForm.document,
            roleId: editForm.role?.value,
        }

        put(`users/${idUser}?apikey=${API_KEY}`, dataToSend)
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
        if (data?.user && !errorEdit) {
            alert('Usuario editado correctamente')
            setIdEdit(null)
            setIsModalOpen(false)
        }
    }, [data]);

    useEffect(() => {
        getUser(`users/${idUser}?apikey=${API_KEY}`)
    },[])

    useEffect(() => {
        if(dataUser?.user){
            console.log(dataUser?.user)
            const userToEdit = {
                name: dataUser?.user?.name,
                lastname: dataUser?.user?.lastname,
                address: dataUser?.user?.coustumer?.address,
                phone: dataUser?.user?.phone,
                email: dataUser?.user?.email,
                documentType: documentTypeOptions.find(option => option.value === dataUser?.user?.coustumer?.documentType),
                document: dataUser?.user?.coustumer?.document,
                role: options.find(option => option.value === dataUser?.user?.roleId),
            }
            setEditForm(userToEdit)
        }
    }, [dataUser]);

    return (
        <ModalContainer ShowModal={setIsModalOpen}>
            <Modal showModal={setIsModalOpen} title={title}>
                <div style={{
                    width: '100%',
                    padding: '1rem 2rem',
                }}>
                    <Form fields={formFieldsRegister} button={<Button text={title} type={'Submit'}/>}
                          onSubmit={handleSubmit}
                          cancelButton={false}
                          errors={error}
                    />
                </div>
            </Modal>
        </ModalContainer>
    )
}