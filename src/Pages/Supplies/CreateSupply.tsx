import {Container} from "../../components/Container/Container.tsx";
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {useState} from "react";
import { API_KEY } from "../../constantes.ts";

export const CreateSupply = () => {
    const [error, setError] = useState<{}>({})


    const [formData, setFormData] = useState<{
        name: string,
        description: string,
    }>({
        name: '',
        description: '',
    });

    const fields: FormField[] = [
        {
            type: 'text',
            value: formData.name,
            onChange: (value: string) => setFormData({...formData, name: value}),
            label: 'Nombre',
            name: 'name',
            size: 'large',
        },
        {
            type: 'textarea',
            value: formData.description,
            onChange: (value: string) => setFormData({...formData, description: value}),
            label: 'Descripción',
            name: 'description',
            size: 4,
        },
    ]
    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let mensajeError = {}
        if (!formData.name) {
            mensajeError = {...mensajeError, name: 'El nombre es requerido'}
        }
        if (!formData.description) {
            mensajeError = {...mensajeError, description: 'La descripción es requerida'}
        }
        if (Object.keys(mensajeError).length > 0) {
            console.log('Mensaje de error', mensajeError)
            setError(mensajeError)
            return
        }
        try{
            const requestBody = {
                name: formData.name,
                description: formData.description,
            
            };
            console.log('Datos del formulario', requestBody);

            const response = await fetch(`https://coffvart-backend.onrender.com/api/supplies?apikey=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            console.log('Respuesta del servidor', response);

            if(!response.ok){
                console.error('Error al crear el Insumo', response.statusText);
                return;
            }
            console.log('Insumo creado con éxito');
        }catch(error){
            console.error('Error al crear el Insumo', error);
        
        }
    };

    return (
        <Container>
            <FormRedisign fields={fields} onSubmit={handleSubmit} button={'Registrar Insumo'} title={'Crear Insumo'} errors={error}/>
        </Container>
    )
}

export default CreateSupply;