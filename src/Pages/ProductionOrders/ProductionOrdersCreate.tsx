import { FormField, SelectOption} from '../../types/Form'
import { API_KEY, API_URL } from '../../utils/constantes.ts';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Container } from '../../components/Container/Container';
import {useNavigate} from 'react-router-dom';
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import toast, { Toaster } from 'react-hot-toast';

export const ProductionOrdersCreate= ()=>{

    const [formValues, setFormValues] = useState<{
    quantity:string,
    processId:SelectOption|undefined, 
    supply:SelectOption|undefined
    }>({
    quantity: '',
    processId: undefined,
    supply: undefined,
})

    const [error, setError] = useState<{[key: string]: string}>({})
    const [supplie, setsupplie] = useState<SelectOption[]>([]);
    const [process, setprocess] = useState<SelectOption[]>([]);
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
    
    const productionOrderFields: FormField[] = [
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
          onChange:  (value:string) => setFormValues({...formValues,quantity:value}),
          size: 'medium',
      },
  ];


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let mensajeError = {}
    if(formValues.supply === undefined ){
        mensajeError = {...mensajeError,supply: 'El insumo es requerido '}
    }
    if(formValues.quantity === ''){
        mensajeError = {...mensajeError,quantity: 'La cantidad es requerida'}
    }
    if(Object.keys(mensajeError).length>0){
        console.log('Error en el formulario:',mensajeError)
        setError(mensajeError)
        return
    }
    try {
        const requestBody = {
            quantity: formValues.quantity,
            processId: (formValues.processId as SelectOption)?.value as number,
            supplieId: formValues.supply?.value , 
        }; console.log('Datos del formulario:', requestBody);
        const response = await fetch (`${API_URL}productionOrders?apikey=${API_KEY}`,{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
        });
        if(response){
            const data = await response.json();
            if(data.message == "Orden P. creada correctamente"){
                toast(data.message,{
                    icon:':)',
                    position: 'bottom-right'
                })
                setTimeout(()=>{
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
      fields={productionOrderFields} 
      onSubmit={handleSubmit} 
      button={'Registrar Orden'} 
      title={'Crear Orden de Producción'}
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
    );
}

export default ProductionOrdersCreate;

