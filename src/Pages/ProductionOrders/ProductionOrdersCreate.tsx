import { FormField, SelectOption} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY, API_URL } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Column } from '../../types/Table';
import { Container } from '../../components/Container/Container';
import { Titles } from '../../components/Titles/Titles';
import { Table } from '../../components/Table/Table';
import {useNavigate} from 'react-router-dom';
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";

export const ProductionOrdersCreate= ()=>{

    const [formValues, setFormValues] = useState<{quantity:number,processId:SelectOption|undefined, supply:SelectOption|undefined}>({
    quantity: 0,
    processId: undefined,
    supply: undefined,
})

    const [supplie, setsupplie] = useState<SelectOption[]>([]);
    const [process, setprocess] = useState<SelectOption[]>([]);
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
            quantity: formValues.quantity,
            processId: (formValues.processId as SelectOption)?.value as number,
            supplieId: formValues.supply?.value , 
        }; console.log('Datos del formulario:', requestBody);
        

            post(`productionOrders?apikey=${API_KEY}`, requestBody)
            console.log(loading, error)
            console.log('solicitud de producción creada con éxito');
            navigate(-1);

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
      title={'Crear Orden de Producción'}/>
  </Container>
    );
}

export default ProductionOrdersCreate;

