import { FormField, SelectOption} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductionOrdersCreate= ()=>{
    const [formValues, setFormValues] = useState<Record<string, string  | number | SelectOption | undefined>>({
        orderNumber: '',
        quantity: '',
        supplieId: undefined,
        productId: undefined,
        process: undefined,

    })
    const [supplie, setsupplie] = useState<SelectOption[]>([]);
    const [process, setprocess] = useState<SelectOption[]>([]);
    const [product, setproduct] = useState<SelectOption[]>([]);

    const {data:datasupplie,get:getSupplies} = useFetch('https://coffvart-backend.onrender.com/api/');
    useEffect(()=>{
        getSupplies('supplies?apikey='+API_KEY)
    },[]);
    useEffect(()=>{
        const supplieOptions = datasupplie?.supplies?.rows?.map((item: any)=>({
            value: item?.id,
            label: item?.name
        }))
        setsupplie(supplieOptions)
    },[datasupplie]);

    const {data:dataprocess,get:getProcesses} = useFetch('https://coffvart-backend.onrender.com/api/');
    useEffect(()=>{
        getProcesses('processes?apikey='+API_KEY)
    },[]);
    useEffect(()=>{
        const processOptions = dataprocess?.processes?.rows?.map((item: any)=>({
            value: item?.id,
            label: item?.name
        }))
        setprocess(processOptions)
    },[dataprocess]);

    const {data:dataproduct,get:getProducts} = useFetch('https://coffvart-backend.onrender.com/api/');

    useEffect(()=>{
        getProducts('products?apikey='+API_KEY)
    },[]);
    useEffect(()=>{
        const companyOptions = dataproduct?.products?.rows?.map((item: any)=>({
            value: item?.id,
            label: item?.name
        }))
        setproduct(companyOptions)
    },[dataproduct]);

    const { post,loading,error } = useFetch('https://coffvart-backend.onrender.com/api/');
    const navigate = useNavigate()
    const productionOrderFields: FormField[] = [
    {
        name: 'orderNumber',
        type: 'text',
        label: 'Numero de la orden',
        placeholder: '1',
        value: formValues['orderNumber'] !== undefined ? String(formValues['orderNumber']): '',
        onChange: (value) => handleInputChange('orderNumber', value),
        size: 'medium'
    },
    {
        name: 'quantity',
        type: 'number',
        label: 'Cantidad (lb)',
        placeholder: '200',
        value: formValues['quantity'] !== undefined ? String(formValues['quantity']): '',
        onChange: (value) => handleInputChange('quantity', value),
        size: 'medium'
    },
    {
        name: 'supplieId',
        type: 'select',
        label: 'Insumo',
        options: supplie,
        value: formValues.supplieId as SelectOption|undefined,
        onChange: (value) => setFormValues(prev=> ({...prev,supplieId:value})),
        size:'medium',
    },
    {
        name: 'productId',
        type: 'select',
        label: 'Producto',
        options: product,
        value: formValues.productId as SelectOption|undefined,
        onChange: (value) => setFormValues(prev=> ({...prev,productId:value})),
        size:'medium',
    },
    {
        name: 'processId',
        type: 'select',
        label: 'Proceso',
        options: process,
        value: formValues.processId as SelectOption|undefined,
        onChange: (value) => setFormValues(prev=> ({...prev,processId:value})),
        size:'medium',
    }
];
const handleInputChange = (name: string, value: string | number) => {
    setFormValues(prevValues => ({
        ...prevValues,
        [name]: value
    }));
};
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const requestBody = {
            orderNumber: formValues.orderNumber,
            quantity: formValues.quantity,
        }; console.log('Datos del formulario:', requestBody);

        post(`productionOrders?apikey=${API_KEY}`, requestBody)
        console.log(loading, error)
        console.log('orden de producción creada con éxito');
        navigate(-1);

        

    } catch (error) {
        console.error('Error al crear la orden de producción', error);
    }
};
return (
    <Form
        title='Crear orden de producción'
        fields={productionOrderFields}
        onSubmit={handleSubmit}
        button={<Button text='Crear orden de producción' onClick={() => handleSubmit} fill={true} type={'SUBMIT'}/>}
    />
);

}


