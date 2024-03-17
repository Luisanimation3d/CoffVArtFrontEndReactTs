import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField, SelectOption} from '../../types/Form';
import {FormRedisign} from '../../components/FormRedisign/FormRedisign';
import {API_KEY, API_URL} from '../../utils/constantes.ts';
import {useParams, useNavigate} from 'react-router-dom';
import {Container} from "../../components/Container/Container.tsx";
import toast, {Toaster} from "react-hot-toast";


export const CustomersEdit = () => {

    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [error, setError] = useState<{}>({})

    const [optionsRoles, setOptionsRoles] = useState<SelectOption[]>([])

    const {get: getRoles, data: dataRoles, loading: loadingRoles} = useFetch(API_URL);

    const optionsDocumentType: SelectOption[] = [
        {label: 'Cédula de ciudadanía', value: 'CC'},
        {label: 'Cédula de extranjería', value: 'CE'},
        {label: 'Pasaporte', value: 'PA'},
    ]


    useEffect(() => {
        getRoles(`roles?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if (dataRoles?.roles?.rows) {
            setOptionsRoles(dataRoles?.roles?.rows.map((role: any) => {
                return {
                    label: role.name,
                    value: role.id
                }
            }))
        }
    }, [dataRoles])

    console.log(optionsRoles, 'optionsRoles')

    const [formData, setFormData] = useState<{
        name: string,
        lastname: string,
        documentType: SelectOption | undefined,
        documentNumber: string,
        address: string,
        phone: string,
        email: string,
        roleId: SelectOption | undefined,
    }>({
        name: '',
        lastname: '',
        documentType: undefined,
        documentNumber: '',
        address: '',
        phone: '',
        email: '',
        roleId: undefined,
    });

    const fields: FormField[] = [
        {
            type: 'select',
            value: formData.roleId,
            onChange: (value: SelectOption | undefined) => setFormData({...formData, roleId: value}),
            label: 'Rol',
            name: 'rol',
            size: 'large',
            placeholder: 'Seleccione un rol',
            options: optionsRoles
        },
        {
            type: 'select',
            value: formData.documentType,
            onChange: (value: SelectOption | undefined) => setFormData({...formData, documentType: value}),
            label: 'Tipo de documento',
            name: 'documentType',
            size: 'medium',
            placeholder: 'Seleccione un tipo de documento',
            options: optionsDocumentType
        },
        {
            type: 'text',
            value: formData.documentNumber,
            onChange: (value: string) => setFormData({...formData, documentNumber: value}),
            label: 'Número de documento',
            name: 'documentNumber',
            size: 'medium',
        },
        {
            type: 'text',
            value: formData.name,
            onChange: (value: string) => setFormData({...formData, name: value}),
            label: 'Nombre',
            name: 'name',
            size: 'medium',
        },
        {
            type: 'text',
            value: formData.lastname,
            onChange: (value: string) => setFormData({...formData, lastname: value}),
            label: 'Apellido',
            name: 'lastname',
            size: 'medium',
        },
        {
            type: 'text',
            value: formData.address,
            onChange: (value: string) => setFormData({...formData, address: value}),
            label: 'Dirección',
            name: 'address',
            size: 'medium',
        },
        {
            type: 'text',
            value: formData.phone,
            onChange: (value: string) => setFormData({...formData, phone: value}),
            label: 'Teléfono',
            name: 'phone',
            size: 'medium',
        },
        {
            type: 'email',
            value: formData.email,
            onChange: (value: string) => setFormData({...formData, email: value}),
            label: 'Correo electrónico',
            name: 'email',
            size: 'large',
        },
    ]


    const {data, loading, error: errorFetch, get, put} = useFetch(API_URL)

    useEffect(() => {
        get(`users/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                roleId: optionsRoles.find((option) => option.value === data?.user?.roleId),
                documentType: optionsDocumentType.find((option) => option.value === data?.user?.coustumer?.documentType),
                name: data?.user.name,
                lastname: data?.user.lastname,
                address: data?.user?.coustumer?.address,
                email: data?.user?.email,
                phone: data?.user?.phone,
                documentNumber: data?.user?.coustumer?.document,
            }
            setFormData(newValues)
        }
    }, [data]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let mensajeError = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.roleId) {
            mensajeError = {...mensajeError, rol: 'El rol es requerido'}
        }
        if (!formData.documentType) {
            mensajeError = {...mensajeError, documentType: 'El tipo de documento es requerido'}
        }
        if (formData.documentType?.value === 'CC') {
            if (!/^\d+$/.test(formData.documentNumber)) {
                mensajeError = { ...mensajeError, documentNumber: 'El número de documento debe contener solo números' };
            }
        }

        if (!formData.documentNumber || formData.documentNumber.trim().length < 8 || formData.documentNumber.trim().length > 15) {
            mensajeError = { ...mensajeError, documentNumber: 'El número de documento debe tener entre 8 y 15 caracteres' };
        }
        
        if (!formData.name || formData.name.trim().length < 3 || formData.name.trim().length > 15 ||  !/^[a-zA-Z\s]+$/.test(formData.name)) {
            mensajeError = { ...mensajeError, name: 'El nombre debe tener entre 3 y 15 letras y no contener caracteres especiales' };
        }
        if (!formData.lastname || formData.lastname.trim().length < 3 ||  !/^[a-zA-Z\s]+$/.test(formData.lastname)) {
            mensajeError = { ...mensajeError, lastname: 'El apellido debe tener entre 3 y 15 letras y no contener caracteres especiales' };
        }
        if (!formData.address || formData.address.trim().length < 10){
            mensajeError = {...mensajeError, address: 'La dirección debe tener al menos 10 caracteres'}
        }
        if (!formData.phone || formData.phone.trim().length < 10 || formData.phone.trim().length > 12) {
            mensajeError = { ...mensajeError, phone: 'El teléfono debe tener entre 10 y 12 caracteres' };
        }
        if (!formData.email || !emailRegex.test(formData.email)) {
            mensajeError = { ...mensajeError, email: 'Ingrese un correo electrónico válido' };
        }
    

        if (Object.keys(mensajeError).length > 0) {
            setError(mensajeError);
            return;
        }
        console.log(formData, 'esto lo voy a mandar')
        const requestBody = {
            roleId: formData.roleId?.value,
            documentType: formData.documentType?.value,
            document: formData.documentNumber,
            name: formData.name,
            lastname: formData.lastname,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
        };
        console.log(requestBody, 'esto es lo que voy a mandar')
        put(`users/${id}?apikey=${API_KEY}`, requestBody)
        if (!errorFetch) {
            // setTimeout(() => {
            //     navigate(-1)
            // }, 500);
        }
    };

    useEffect(() => {
        if (data.message == 'Usuario actualizado correctamente' && !errorFetch) {
            toast('Usuario actualizado correctamente' , {
                icon: '👏',
                position: 'bottom-right'
            });
            setTimeout(() => {
                navigate(-1);
            },2000);
        } else if(data.msg == 'Este correo ya está registrado' && !errorFetch) {
            toast.error("Este correo ya está registrado", {
                icon: '👎',
                position: 'bottom-right'
            });
        } else if (data.msg == 'Este documento ya está registrado' && !errorFetch) {
            toast.error("Este documento ya está registrado", {
                icon: '👎',
                position: 'bottom-right'
            });
        }
    }, [data, errorFetch]);

    if (loading && !optionsRoles.length && loadingRoles) {
        return <div>Cargando...</div>;
    }

    return (
        <Container>
            <FormRedisign
                title='Editar Cliente'
                fields={fields}
                onSubmit={handleSubmit}
                button={'Guardar'}
                errors={error}
            />
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
    );
};

export default CustomersEdit;
