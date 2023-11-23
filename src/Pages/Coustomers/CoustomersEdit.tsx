import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { FormField, SelectOption } from '../../types/Form';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';
import { useParams } from 'react-router-dom';



export const CustomersEdit = ()=>{
    const {id} = useParams<{id: string}>()
  const options: SelectOption[] = [
    {
      value: 'CC',
      label: 'CC',
    },
    {
      value: 'TI',
      label: 'TI',
    },
  ];

  const [tipo, setTipo] = useState<SelectOption | undefined>();
  const [formValues, setFormValues] = useState <any>({
    name: '',
    tipo: undefined,
    document: '',
    phone: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState<{}>({});

  const handleInputChangen = (value: SelectOption | undefined , name: string | number) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      tipo: value,
    }));
  };

  const customerFields: FormField[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      placeholder: 'Nombre',
      value: formValues.name !== undefined ? String(formValues.name) : '',
      onChange: (value) => handleInputChange('name', value),
      size: 'large',
    },
    {
        name: 'documentType',
        type: 'select',
        label: 'Tipo de documento',
        placeholder: 'Tipo de documento',
        value: formValues.tipo,
        options: options,
        onChange: (o) => handleInputChangen(o, 'tipo'),
        size: 'medium'
    },
    {
        name: 'document',
        type: 'number',
        label: 'Documento',
        placeholder: 'Documento',
        value: formValues['document'] !== undefined ? String(formValues['document']): '',
        onChange: (value) => handleInputChange('document', value),
        size: 'large'
    },
    {
        name: 'phone',
        type: 'text',
        label: 'Telefono',
        placeholder: 'Telefono',
        value: formValues['phone'] !== undefined ? String(formValues['phone']): '',
        onChange: (value) => handleInputChange('phone', value),
        size: 'large'
    },
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        value: formValues['email'] !== undefined ? String(formValues['email']): '',
        onChange: (value) => handleInputChange('email', value),
        size: 'large'
    },
    {
        name: 'address',
        type: 'text',
        label: 'Dirección',
        placeholder: 'Dirección',
        value: formValues['address'] !== undefined ? String(formValues['address']): '',
        onChange: (value) => handleInputChange('address', value),
        size: 'large'
    },
  ];

  // ...

// ...

const { data, loading, get, put } = useFetch('https://coffvart-backend.onrender.com/api/')

useEffect(() => {
    get(`coustumers/${id}?apikey=${API_KEY}`)
}, []); 

useEffect(() => {
    if(!loading){
        const newValues= {
            name: data?.coustomers.name,
            tipo: data?.coustomers.documentType,
            document: data?.coustomers.document,
            phone: data?.coustomers.phone,
            email: data?.coustomers.email,
            address: data?.coustomers.address,
        }
        setFormValues(newValues)
    }
} , [data]);
console.log(data)

  

  const handleInputChange = (name: string, value: string | number) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let mensajeError = {}
        if (!formValues.name) {
            mensajeError = {...mensajeError, name: 'El nombre del cliente es requerido'}
        }
        if (!formValues.documentType) {
            mensajeError = {...mensajeError, documentType: 'El tipo de documento es requerido'}
        }
        if (!formValues.document) {
            mensajeError = {...mensajeError, document: 'El documento del cliente es requerido'}
        }
        if (!formValues.phone) {
            mensajeError = {...mensajeError, phone: 'El telefono del cliente es requerido'}
        }
        if (!formValues.email) {
            mensajeError = {...mensajeError, email: 'El email del cliente es requerido'}
        }
        if (!formValues.address) {
            mensajeError = {...mensajeError, address: 'La dirección del cliente es requerida'}
        }
        if (Object.keys(mensajeError).length > 0) {
            setError(mensajeError)
            console.log('On')
            return
        }

    try {
      const requestBody = {
        name: formValues.name,
        documentType: tipo?.value,
        document: formValues.document,
        phone: formValues.phone,
        email: formValues.email,
        address: formValues.address,
        state: true, 
      };
      console.log('Datos del formulario:', requestBody);

      const response = await fetch(`/coustumers/${id}?apikey=${API_KEY}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error('Error al editar el cliente:', response.statusText);
        return;
      }

      console.log('Cliente editado con éxito');
    } catch (error) {
      console.error('Error al editar el cliente', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Form
      title='Editar Cliente'
      fields={customerFields}
      onSubmit={handleSubmit}
      button={<Button text='Editar Cliente' onClick={handleSubmit} fill={true} />}
      errors={error}
    />
  );
};
