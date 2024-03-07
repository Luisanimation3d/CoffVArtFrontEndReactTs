import { FormField } from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY, API_URL } from '../../utils/constantes.ts';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalContainer } from '../../components/Modal/Modal';

export const SuppliersCreateModal = ({setIsModalOpen, title = 'Crear Proveedor'}:
{ setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const {data, post, error: errorRegister} = useFetch(API_URL)
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        name: string,
        nit: string,
        coffeType: string,
        address: string,
        phone: string,
        quality: string,
    }>({
        name: '',
        nit: '',
        coffeType: '',
        address: '',
        phone: '',
        quality: '',
    })
    const formFieldsRegister: FormField[] = [
        {
            name: 'name',
            type: 'text',
            label: 'Nombre del proveedor',
            placeholder: 'proveedor S.A.S',
            value: registerForm.name,
            onChange: (value: string) => setRegisterForm({
                ...registerForm,
                 name: value}),
            size: 'medium'
        },
        {
            name: 'nit',
            type: 'text',
            label: 'NIT',
            placeholder: '10122012334-5',
            value: registerForm.nit,
            onChange: (value:string) => setRegisterForm({
                ...registerForm,
                nit: value}),
            size: 'medium',
        },
        {
            name: 'coffeType',
            type: 'text',
            label: 'Tipo de café',
            placeholder: 'pergamino',
            value: registerForm.coffeType,
            onChange: (value:string) => setRegisterForm({...registerForm, coffeType: value}),
            size: 'medium',
        },
        {
            name: 'address',
            type: 'text',
            label: 'Dirección',
            placeholder: 'Cra 00 # 00 - 00',
            value: registerForm.address,
            onChange: (value: string) => setRegisterForm({...registerForm, address: value}),
            size: 'medium'
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Teléfono',
            placeholder: '300 000 00 00',
            value: registerForm.phone,
            onChange: (value:string) => setRegisterForm({...registerForm, phone: value}),
            size: 'medium'
        },
        {
            name: 'quality',
            type: 'text',
            label: 'Calidad',
            placeholder: 'Premiun',
            value: registerForm.quality,
            onChange: (value: string) => setRegisterForm({...registerForm, quality: value}),
            size: 'medium'
        },
    ];


    const validateForm = () => {
        const errors: any = {}
        if (registerForm.name.length === 0) {
            errors.name = 'El nombre es requerido'
        }
        if (registerForm.nit.length === 0) {
            errors.nit = 'El nit es requerido'
        }
        if (registerForm.coffeType.length === 0) {
            errors.coffeType = 'El tipo de café es requerido'
        }
        if (registerForm.address.length === 0) {
            errors.address = 'La dirección es requerida'
        }
        if (registerForm.phone.length === 0) {
            errors.phone = 'El telefono es requerido'
        }
        if (registerForm.quality.length === 0) {
            errors.quality = 'La calidad es requerida'
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
            nit: registerForm.nit,
            coffeType: registerForm.coffeType,
            address: registerForm.address,
            phone: registerForm.phone,
            quality: registerForm.quality,
        }

        post(`suppliers?apikey=${API_KEY}`, dataToSend)
    }

    useEffect(() => {
        if (data?.newProduct && !errorRegister) {
            alert('Proveedor creado correctamente')
            setIsModalOpen(false)
        }
    }, [data]);

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

