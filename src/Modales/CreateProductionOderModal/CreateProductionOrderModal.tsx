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
    const [formValues, setFormValues] = useState<{orderNumber:string,quantity:number,processId:SelectOption|undefined, supply:SelectOption|undefined,productionRId:SelectOption|undefined}>({
        orderNumber: '',
        quantity: 0,
        processId: undefined,
        supply: undefined,
        productionRId: undefined,
    })
    const [supplie, setsupplie] = useState<SelectOption[]>([]);
    const [process, setprocess] = useState<SelectOption[]>([]);
    const [production, setproduction] = useState<SelectOption[]>([]);
    const { post, loading, error } = useFetch(API_URL);
    const navigate = useNavigate();

    const {data:datasupplie,get:getSupplies} = useFetch(API_URL);
    useEffect(()=>{
        getSupplies('supplies?apikey='+API_KEY)
    },[]);
    useEffect(()=>{
        const supplieOptions = datasupplie?.supplies?.rows?.map((item: any)=>({
            value: item?.id,
            label: item?.name
        }))
        setsupplie(supplieOptions)
    }, [datasupplie]);

    const {data:dataprocess,get:getProcesses} = useFetch(API_URL);
    useEffect(()=>{
        getProcesses('processes?apikey='+API_KEY)
    },[]);
    useEffect(()=>{
        const processOptions = dataprocess?.processes?.rows?.map((item: any)=>({
            value: item?.id,
            label: item?.name
        }))
        setprocess(processOptions)
    }, [dataprocess]);
    const {data:dataproduction,get:getProduction} = useFetch(API_URL);
    useEffect(()=>{
        getProduction('productionRequests?apikey='+API_KEY)
    },[]);
    useEffect(()=>{
        const productionOptions = dataproduction?.ProductionRequests?.rows?.map((item: any)=>({
            value: item?.id,
            label: item?.requestNumber
        }))
        setproduction(productionOptions)
    }, [dataproduction]);
    console.log(dataprocess, "velas gay de mierda")
    console.log(dataproduction, "velas muy gay de mierda")
    console.log(datasupplie)

    const productionOrderFields: FormField[] = [
        {
            name: 'orderNumber',
            type: 'text',
            label: 'Numero de orden',
            placeholder: '1',
            value: formValues['orderNumber'] !== undefined ? String(formValues['orderNumber']): '',
            onChange: (value) => handleInputChange('orderNumber', value),
            size: 'medium'
        },
        {
            name: 'productionRId',
            type: 'select',
            label: 'solicitud',
            placeholder: 'Solicitud',
            options:production,
            value: formValues.productionRId as SelectOption|undefined,
            onChange: (value) => setFormValues(prev=> ({...prev,productionRId:value})),
            size: 'medium',
            
        },
        {
            name: 'processId',
            type: 'select',
            label: 'Proceso',
            placeholder: 'Proceso',
            options:process,
            value: formValues.processId as SelectOption|undefined,
            onChange: (value) => setFormValues(prev=> ({...prev,processId:value})),
            size: 'medium',
            
        },
        {
            name: 'supply',
            type: 'select',
            label: 'insumo',
            placeholder: 'Insumo',
            options:supplie,
            value: formValues.supply as SelectOption|undefined,
            onChange: (value) => setFormValues(prev=> ({...prev,supply:value})),
            size: 'medium',
            
        },
        {
            name: 'quantity',
            type: 'number',
            label: 'Cantidad de insumo',
            placeholder: '100',
            value: formValues['quantity'] !== undefined ? String(formValues['quantity']): '',
            onChange:  (value) => handleInputChange('quantity', value),
            size: 'medium',
        },
    ];
    const handleInputChange = (name: string, value: string | number) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const requestBody = {
                orderNumber: formValues.orderNumber,
                quantity: formValues.quantity,
                processId: (formValues.processId as SelectOption)?.value as number,
                supplieId: formValues.supply?.value ,
                productionRId: formValues?.productionRId?.value, 
            }; console.log('Datos del formulario:', requestBody);
            
    
                post(`productionOrders?apikey=${API_KEY}`, requestBody)
                console.log(loading, error)
                console.log('solicitud de producción creada con éxito');
    
            } catch (error) {
                console.error('Error al crear la solicitud de producción', error);
            }
        };

    return (
        <ModalContainer ShowModal={setIsModalOpen}>
            <Modal showModal={setIsModalOpen} title={title}>
                <div style={{
                    width: '100%',
                    padding: '1rem 2rem',
                }}>
                    <Form fields={productionOrderFields} button={<Button text={title} type={'SUBMIT'}/>}
                          onSubmit={handleSubmit}
                          cancelButton={false}
                          errors={error}
                    />
                </div>
            </Modal>
        </ModalContainer>
    )
}

