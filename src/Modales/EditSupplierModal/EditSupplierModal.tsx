import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField} from '../../types/Form';
import {Button} from '../../components/Button/Button';
import {Form} from '../../components/Form/Form';
import {API_KEY, API_URL} from '../../utils/constantes.ts';
import Swal from 'sweetalert2';
import { Modal, ModalContainer } from '../../components/Modal/Modal';


export const SuppliersEditModal= ({setIsModalOpen, title = 'Editar Proveedor', idSupplier, setIdEdit}: { setIsModalOpen: (value: boolean) => void, title?: string, idSupplier: number, setIdEdit: (value: number | null) => void }) => {
    const {data, get, put, error: errorEdit} = useFetch(API_URL)
    const {data: dataSupplier, get: getSupplier} = useFetch(API_URL)
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [editForm, setEditForm] = useState<{
        name: string,
        coffeType: string,
        address: string, 
        phone: string,
        quality:string,

    }>({
        name: '',
        coffeType: '',
        address: '', 
        phone: '',
        quality:'',
    })


    const formFieldsRegister: FormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Nombre del proveedor',
        placeholder: 'proveedor S.A.S',
        value: editForm.name,
        onChange: (value:string) =>  setEditForm({...editForm, name: value}),
        size: 'medium'
    },
    {
        name: 'coffeType',
        type: 'text',
        label: 'Tipo de café',
        placeholder: 'pergamino',
        value: editForm.coffeType,
        onChange: (value:string) =>  setEditForm({...editForm, coffeType: value}),
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
    {
        name: 'quality',
        type: 'text',
        label: 'Calidad',
        placeholder: 'Premiun',
        value: editForm.quality,
        onChange:  (value:string) =>  setEditForm({...editForm, quality: value}),
        size:'medium'
    }
];

    // ...

// ...

    const validateForm = () => {
        const errors: any = {}
        if (editForm.name.length === 0) {
            errors.name = 'El nombre es requerido'
        }
        if (editForm.coffeType.length === 0) {
            errors.lastname = 'El apellido es requerido'
        }
        if (editForm.address.length === 0) {
            errors.address = 'La dirección es requerida'
        }
        if (editForm.phone.length === 0) {
            errors.phone = 'El teléfono es requerido'
        }
        if (editForm.quality.length === 0) {
            errors.email = 'El email es requerido'
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
            coffeType: editForm.coffeType,
            address: editForm.address,
            phone: editForm.phone,
            quality: editForm.quality
        }

        put(`suppliers/${idSupplier}?apikey=${API_KEY}`, dataToSend)
    }

    useEffect(() => {
        if (data?.supplier && !errorEdit) {
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
        getSupplier(`suppliers/${idSupplier}?apikey=${API_KEY}`)
    },[])

    useEffect(() => {
        if(dataSupplier?.supplier){
            console.log(dataSupplier?.supplier)
            const supplierToEdit = {
                name: dataSupplier?.supplier?.name,
                coffeType: dataSupplier?.supplier?.coffeType,
                address: dataSupplier?.supplier?.address,
                phone: dataSupplier?.supplier?.phone,
                quality: dataSupplier?.supplier?.quality
            }
            setEditForm(supplierToEdit)
        }
    }, [dataSupplier]);

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