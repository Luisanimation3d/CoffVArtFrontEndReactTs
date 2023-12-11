import { FormField, SelectOption } from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY, API_URL } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalContainer } from '../../components/Modal/Modal';

export const ProductionOrderCreateModal = ({setIsModalOpen, title = 'Crear Orden de producción'}:
{ setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const {data, post, error: errorRegister} = useFetch(API_URL)
    const [options, setOptions] = useState<SelectOption[]>([])
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        orderNumber: string,
        quantity: number,
        processId: SelectOption| undefined,
        supply: SelectOption| undefined,
    }>({
        orderNumber: '',
        quantity: 0,
        processId:undefined,
        supply: undefined,
    })
    const formFieldsRegister: FormField[] = [
        {
            name: 'orderNumber',
            type: 'text',
            label: 'Numero de orden',
            placeholder: '1',
            value: registerForm.orderNumber,
            onChange: (value: string) => setRegisterForm({
                ...registerForm,
                 orderNumber: value}),
            size: 'medium'
        },
        {
            name: 'quantity',
            type: 'number',
            label: 'Cantidad de insumo',
            placeholder: '100',
            value: registerForm.quantity,
            onChange: (value:number) => setRegisterForm({
                ...registerForm,
                quantity: value}),
            size: 'medium',
        },
        {
            name: 'processId',
            type: 'select',
            label: 'Proceso',
            placeholder: 'enviado',
            value: registerForm.processId,
            onChange: (value:SelectOption| undefined) => setRegisterForm({...registerForm,processId:value}),
            size: 'medium',
            options:options
        },
        {
            name: 'supply',
            type: 'select',
            label: 'insumo',
            placeholder: 'pergamino',
            value: registerForm.supply,
            onChange: (value: SelectOption| undefined) => setRegisterForm({...registerForm, supply: value}),
            size: 'medium',
            options:options
        },
    ];


    const validateForm = () => {
        const errors: any = {}
        if (registerForm.orderNumber.length === 0) {
            errors.orderNumber = 'El nombre es requerido'
        }
        if (registerForm.quantity === 0) {
            errors.quantity = 'El nit es requerido'
        }
        if (!registerForm.processId) {
            errors.processId = 'El tipo de café es requerido'
        }
        if (!registerForm.supply) {
            errors.supply = 'La dirección es requerida'
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
            orderNumber: registerForm.orderNumber,
            quantity: registerForm.quantity,
            processId: registerForm.processId,
            supply: registerForm.supply
        }

        post(`productionOrders?apikey=${API_KEY}`, dataToSend)
    }

    useEffect(() => {
        if (data?.newProduct && !errorRegister) {
            alert('Orden creada correctamente')
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

