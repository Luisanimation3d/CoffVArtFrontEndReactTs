import {Container} from "../../components/Container/Container.tsx";
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import {FormField} from "../../types/Form";
import {useState} from "react";
import { API_KEY } from "../../utils/constantes.ts";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const CreateSupply = () => {
    const [error, setError] = useState<{}>({})

    const navigate= useNavigate();
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
        if (!formData.name || formData.name.trim().length < 4 || !/^[a-zA-ZÁÉÍÓÚáéíóú\s()]+$/ .test(formData.name)) {
            mensajeError = {...mensajeError, name: 'El nombre es requerido'}
        }
        if (!formData.description || formData.description.trim().length < 5 || !/^[a-zA-ZÁÉÍÓÚáéíóú\s()]+$/ .test(formData.description)){
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

            if(response){
                const data = await response.json();
                if(data.message == "Insumo creado correctamente"){
                    toast(data.message, {
                        icon: '👏',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                        navigate(-1)
                    }, 2000);
                }
            }
        }catch(error){
            console.error('Error al crear el Insumo', error);
        
        }
    };

    return (
        <Container>
            <FormRedisign fields={fields} onSubmit={handleSubmit} button={'Registrar Insumo'} title={'Crear Insumo'} errors={error}/>
            <Toaster 
        position="top-center"
        reverseOrder= {false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
            className: '',
            duration: 5000,
            style:{
                background: '#363636',
                color: '#fff'
            },
            success: {
                duration: 3000,
                iconTheme: {
                    primary: 'green',
                    secondary: 'black'
                
                },
            },
        }}

        
        />
        </Container>
    )
}

export default CreateSupply;