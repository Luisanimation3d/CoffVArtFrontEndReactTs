import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField} from '../../types/Form';
import {Button} from '../../components/Button/Button';
import {Form} from '../../components/Form/Form';
import {API_KEY, API_URL} from '../../constantes';
import {useParams, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, ModalContainer } from '../../components/Modal/Modal';


export const SupplyEditModal= ({setIsModalOpen, title = 'Editar Insumo', idSupply, setIdEdit}: { setIsModalOpen: (value: boolean) => void, title?: string, idSupply: number, setIdEdit: (value: number | null) => void }) => {
    const {data, get, put, error: errorEdit} = useFetch(API_URL)
    const {data: dataSupply, get: getSupply} = useFetch(API_URL)
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [editForm, setEditForm] = useState<{
        name: string,
        description: string,

    }>({
        name: '',
        description: '',
    })


    const formFieldsRegister: FormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Nombre del proveedor',
        placeholder: 'proveedor S.A.S',
        value: editForm.name,
        onChange: (value:string) =>  setEditForm({...editForm, name: value}),
        size: 'large'
    },
    {
        name: 'description',
        type: 'textarea',
        label: 'Descripción',
        placeholder: 'Ingrese la descripción del proveedor',
        value: editForm.description,
        onChange: (value:string) =>  setEditForm({...editForm, description: value}),
        size: 'large'
    },
];

    // ...

// ...


    const validateForm = () => {
        const errors: any = {}
        if (editForm.name.length === 0) {
            errors.name = 'El nombre es requerido'
        }
        if (editForm.description.length === 0) {
            errors.description = 'La descripción es requerida'
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
            description: editForm.description,
        }

        put(`supplies/${idSupply}?apikey=${API_KEY}`, dataToSend)
    }

    useEffect(() => {
        if (data?.supply && !errorEdit) {
            Swal.fire({
                title: 'Insumo editado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            setIdEdit(null)
            setIsModalOpen(false)
        }
    }, [data]);

    useEffect(() => {
        getSupply(`supplies/${idSupply}?apikey=${API_KEY}`)
    },[])

    useEffect(() => {
        if(dataSupply?.supply){
            console.log(dataSupply?.supply)
            const supplyToEdit = {
                name: dataSupply?.supply?.name,
                description: dataSupply?.supply?.description,
            }
            setEditForm(supplyToEdit)
        }
    }, [dataSupply]);

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