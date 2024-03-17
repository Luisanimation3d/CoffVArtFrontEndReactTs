import {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField} from '../../types/Form';
import {Button} from '../../components/Button/Button';
import {Form} from '../../components/Form/Form';
import {API_KEY, API_URL} from '../../utils/constantes.ts';
import Swal from 'sweetalert2';
import { Modal, ModalContainer } from '../../components/Modal/Modal';


export const CompanysEditModal= ({setIsModalOpen, title = 'Editar Compania', idCompany, setIdEdit}: { setIsModalOpen: (value: boolean) => void, title?: string, idCompany: number, setIdEdit: (value: number | null) => void }) => {
    const {data, get, put, error: errorEdit} = useFetch(API_URL)
    const {data: dataCompany, get: getCompany} = useFetch(API_URL)
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [editForm, setEditForm] = useState<{
        name: string,
        email: string,
        address: string, 
        phone: string,
    }>({
        name: '',
        email: '',
        address: '', 
        phone: '',
    })


    const formFieldsRegister: FormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Nombre de la compañia',
        placeholder: 'proveedor S.A.S',
        value: editForm.name,
        onChange: (value:string) =>  setEditForm({...editForm, name: value}),
        size: 'medium'
    },
    {
        name: 'email',
        type: 'text',
        label: 'correo',
        placeholder: 'pergamino@gmail.com',
        value: editForm.email,
        onChange: (value:string) =>  setEditForm({...editForm, email: value}),
        size: 'medium'
    },
    {
        name: 'address',
        type: 'text',
        label: 'Dirección',
        placeholder: 'Cra 00 # 00 - 00',
        value: editForm.address,
        onChange:  (value:string) =>  setEditForm({...editForm, address: value}),
        size:'medium'
    },
    {
        name: 'phone',
        type: 'text',
        label: 'Teléfono',
        placeholder: '300 000 00 00',
        value: editForm.phone,
        onChange:  (value:string) =>  setEditForm({...editForm, phone: value}),
        size:'medium'
    },
];

    // ...

// ...
const validateIfNumber = (value: string) => {
    if (value.length === 0) return true
    const regex = new RegExp('^[0-9]+$')
    return regex.test(value) 
}

    const validateForm = () => {
        const errors: any = {}
        if (editForm.name.length === 0) {
            errors.name = 'El nombre es requerido'
        }
        if (editForm.email.length === 0) {
            errors.lastname = 'El apellido es requerido'
        }
        if (editForm.address.length === 0) {
            errors.address = 'La dirección es requerida'
        }
        if (editForm.phone.length === 0) {
            errors.phone = 'El teléfono es requerido'
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
            email: editForm.email,
            address: editForm.address,
            phone: editForm.phone,
        }

        put(`companys/${idCompany}?apikey=${API_KEY}`, dataToSend)
    }

    useEffect(() => {
        if (data?.company && !errorEdit) {
            Swal.fire({
                title: 'Usuario editado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            setIdEdit(null)
            setIsModalOpen(false)
        }
    }, [data]);

    useEffect(() => {
        getCompany(`companys/${idCompany}?apikey=${API_KEY}`)
    },[])

    useEffect(() => {
        if(dataCompany?.company){
            console.log(dataCompany?.company)
            const companyToEdit = {
                name: dataCompany?.company?.name,
                email: dataCompany?.company?.email,
                address: dataCompany?.company?.address,
                phone: dataCompany?.company?.phone,
            }
            setEditForm(companyToEdit)
        }
    }, [dataCompany]);

    return (
        <ModalContainer ShowModal={setIsModalOpen}>
            <Modal showModal={setIsModalOpen} title={title}>
                <div style={{
                    width: '100%',
                    padding: '1rem 2rem',
                }}>
        <Form
            fields={formFieldsRegister}
            button={<Button text={title} type={'SUBMIT'}/>}
            onSubmit={handleSubmit}
            cancelButton={false}
            errors={error}
        />
        </div>
            </Modal>
        </ModalContainer>
    )
}