import { FormField, SelectOption} from '../../types/Form'

import { API_KEY, API_URL } from '../../utils/constantes.ts';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Container} from "../../components/Container/Container.tsx";
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import toast,{ Toaster } from 'react-hot-toast';

export const ProductionRequestsCreate = () => {
    const [formValues,setFormValues] = useState<{
        companyId: SelectOption | undefined,
        dateOfDispatch: string,
        supplieId: SelectOption | undefined,
        quantity: string,
        processId: SelectOption | undefined,
    }>({
        companyId:undefined,
        dateOfDispatch:'',
        supplieId:undefined,
        quantity: '',
        processId:undefined,
    });

    const [error, setError] = useState<{[key: string]: string}>({})
    const [supplie, setsupplie] = useState<SelectOption[]>([]);
    const [process, setprocess] = useState<SelectOption[]>([]);
    const [company, setcompany] = useState<SelectOption[]>([]);
    const navigate = useNavigate();

    const {data:datasupplie,get:getSupplies} = useFetch(API_URL);
    useEffect(()=>{
        getSupplies('suppliesActive?apikey='+API_KEY)
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

    console.log(dataprocess, "datos")
    console.log(datasupplie)
    console.log(datacompany)

    const productionRequestFields: FormField[] = [
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
        value: formValues.dateOfDispatch,
        onChange: (value: string) => setFormValues({...formValues, dateOfDispatch:value}),
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
        value: formValues.quantity,
        onChange: (value: string) => setFormValues({...formValues,quantity:value}),
        size: 'medium'
    },
    
   
];
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let mensajeError = {}
    if(formValues.dateOfDispatch === ''){
        mensajeError = {...mensajeError, dateOfDispatch: 'La fecha de envio es requerida'}
    }
    if(formValues.quantity === ''){
        mensajeError = {...mensajeError, quantity: 'La cantidad es requerida'}
    }
    if(formValues.companyId === undefined){
        mensajeError = {...mensajeError, companyId: 'La compañía es requerida'}
    }
    if(formValues.supplieId === undefined){
        mensajeError = {...mensajeError, supplieId: 'El insumo es requerido'}
    }
    if(Object.keys(mensajeError).length>0){
        console.log('Error en el formulario:',mensajeError)
        setError(mensajeError)
        return
    }
    try {
        const requestBody = {
            dateOfDispatch: formValues.dateOfDispatch,
            quantity: formValues.quantity,
            processId: (formValues.processId as SelectOption)?.value as number, 
            supplieId: (formValues.supplieId as SelectOption)?.value as number,   
            companyId: (formValues.companyId as SelectOption)?.value as number,
        }; console.log('Datos del formulario:', requestBody);
        
        const response = await fetch (`${API_URL}productionRequests?apikey=${API_KEY}`,{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
        });
        if(response){
            const data = await response.json();
            if(data.message == "Solicitud P. creada correctamente"){
                toast(data.message,{
                    icon: ':)',
                    position: 'bottom-right'
                })
                setTimeout(()=> {
                    navigate(-1)
                },2000);
            }
        }

        } catch (error) {
            console.error('Error al crear la solicitud de producción', error);
        }
    };
    return (
        <Container>
            <FormRedisign 
            fields={productionRequestFields} 
            onSubmit={handleSubmit} 
            button={'Registrar Solicitud'} 
            title={'Crear Solicitud de Producción'}
            errors= {error}
            />
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=''
                containerStyle={{}}
                toastOptions={{
                    className:'',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        fontSize: '1.5em',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </Container>
        /*<Form
            title='Crear solicitud de producción'
            fields={productionRequestFields}
            onSubmit={handleSubmit} 
            button={<Button text='Crear solicitud de producción' onClick={() => handleSubmit} fill={true}
                            type={'SUBMIT'}/>}
        />*/
    );

}

export default ProductionRequestsCreate;


