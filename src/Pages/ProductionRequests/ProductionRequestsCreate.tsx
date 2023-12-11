import { FormField, SelectOption} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY, API_URL } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import React from 'react';
import {useNavigate} from 'react-router-dom';

export const ProductionRequestsCreate = () => {
    const [formValues, setFormValues] = useState<Record<string, string | number | SelectOption | undefined>>({
        requestNumber: '',
        dateOfDispatch: '',
        quantity: '',
        supply: undefined,
        companyId: undefined,
        process: undefined,
    })
    const [supplie, setsupplie] = useState<SelectOption[]>([]);
    const [process, setprocess] = useState<SelectOption[]>([]);
    const [company, setcompany] = useState<SelectOption[]>([]);
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

    const {data:datacompany,get:getCompanys} = useFetch(API_URL);

    useEffect(() => {
        getCompanys('companys?apikey=' + API_KEY)
    }, []);
    useEffect(() => {
        const companyOptions = datacompany?.companys?.rows?.map((item: any) => ({
            value: item?.id,
            label: item?.name
        }))
        setcompany(companyOptions)
    }, [datacompany]);

    console.log(dataprocess, "velas gay de mierda")
    console.log(datasupplie)
    console.log(datacompany)

    const productionRequestFields: FormField[] = [
    {
        name: 'requestNumber',
        type: 'text',
        label: 'Numero de la solicitud',
        placeholder: '1',
        value: formValues['requestNumber'] !== undefined ? String(formValues['requestNumber']): '',
        onChange: (value) => handleInputChange('requestNumber', value),
        size: 'medium'
    },
    {
        name: 'companyId',
        type: 'select',
        label: 'Compañia',
        placeholder:'Compañia',
        options: company,
        value: formValues.companyId as SelectOption|undefined,
        onChange: (value) => setFormValues(prev=> ({...prev,companyId:value})),
        size:'medium',
    },
    {
        name: 'dateOfDispatch',
        type: 'date',
        label: 'Fecha de envio',
        placeholder: '20/11/2023',
        value: formValues['dateOfDispatch'] !== undefined ? String(formValues['dateOfDispatch']): '',
        onChange: (value) => handleInputChange('dateOfDispatch', value),
        size: 'medium'
    },
    {
        name: 'supply',
        type: 'select',
        label: 'Insumo',
        placeholder: 'Insumo',
        options: supplie,
        value: formValues.supplieId as SelectOption|undefined,
        onChange: (value) => setFormValues(prev=> ({...prev,supplieId:value})),
        size:'medium',
    },
    {
        name: 'quantity',
        type: 'number',
        label: 'Cantidad (Kg)',
        placeholder: '200',
        value: formValues['quantity'] !== undefined ? String(formValues['quantity']): '',
        onChange: (value) => handleInputChange('quantity', value),
        size: 'medium'
    },
    
   
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
            requestNumber: formValues.requestNumber,
            dateOfDispatch: formValues.dateOfDispatch,
            quantity: formValues.quantity,
            processId: (formValues.processId as SelectOption)?.value as number, 
            supplieId: (formValues.supplieId as SelectOption)?.value as number,   
            companyId: (formValues.companyId as SelectOption)?.value as number,
        }; console.log('Datos del formulario:', requestBody);

            post(`productionRequests?apikey=${API_KEY}`, requestBody)
            console.log(loading, error)
            console.log('solicitud de producción creada con éxito');
            navigate(-1);

        } catch (error) {
            console.error('Error al crear la solicitud de producción', error);
        }
    };
    return (
        <Form
            title='Crear solicitud de producción'
            fields={productionRequestFields}
            onSubmit={handleSubmit}
            button={<Button text='Crear solicitud de producción' onClick={() => handleSubmit} fill={true}
                            type={'SUBMIT'}/>}
        />
    );

}

export default ProductionRequestsCreate;


