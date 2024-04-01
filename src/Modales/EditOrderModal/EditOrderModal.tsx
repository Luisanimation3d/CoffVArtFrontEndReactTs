import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import { Container } from "react-bootstrap";
import { FormRedisign } from "../../components/FormRedisign/FormRedisign.tsx";
import toast, { Toaster } from "react-hot-toast";


export const EditOrder = ({id,setIsModalOpen, title = 'Cambiar proceso' }: { id: number , setIsModalOpen: (value: boolean) => void, title?: string}) => {
    const options: SelectOption[] = [
        {
            value: 'Pendiente',
            label: 'Pendiente',
        },
        {
            value: 'Enviado',
            label: 'Enviando',
        },
        {
            value: 'Entregado',
            label: 'Entregado',
        },
    ];
    const {data, put, get, loading} = useFetch(API_URL)
    useEffect(() => {
        get(`orders/${id}?apikey=${API_KEY}`)
    }, []);
    useEffect(() => {
        if (!loading) {
            const newValues = {
                state: data?.orders?.state
            }
            setRegisterForm(newValues)
        }
    }, [data]);
    const [error, _] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        state: SelectOption | undefined,
    }>({
        state: undefined,

    })
    const formFieldsRegister: FormField[] = [
        {
            name: 'state',
            type: 'select',
            label: 'Proceso',
            value: registerForm.state,
            options: options,
            onChange: (o) => {
                const currentStatus = data?.order?.state;
                let showAlert = false;
                console.log(currentStatus);
                console.log(o?.value, "value");
    
                if (currentStatus === 'Entregado' && o?.value === 'Pendiente') {
                    showAlert = true;
                    toast.error('No puedes cambiar a pendiente si ya esta entregado')

                } else if (currentStatus === 'Entregado' && o?.value === 'Enviado') {
                    showAlert = true;
                    toast.error('No puedes cambiar a enviado si ya está entregado');

                } else {
                    showAlert = false;
                }
                if (!showAlert) {
                    setRegisterForm({
                        ...registerForm,
                        state: o
                    });
                }
            },
            size: 'large',
        }
    ];
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const requestBody = {
            state: registerForm?.state?.value,
        };
        console.log(requestBody)
        put(`orders/${id}?apikey=${API_KEY}`, requestBody)
        if(data.message == "Estado cambiado correctamente"){
            toast(data.message, {
                icon: '👏',
                position: 'bottom-right'
            })
        }
    };
    if (loading) {
        return <div>Cargando...</div>;
    }
    return (
        <ModalContainer ShowModal={setIsModalOpen}>
            <Modal showModal={setIsModalOpen} title={title}>
                <div style={{
                    width: '100%',
                    padding: '1rem 2rem',
                }}>
                    <Container>
                    <FormRedisign fields={formFieldsRegister} button={'Cambiar proceso'}
                          onSubmit={handleSubmit }
                          cancelButton={false}
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
                </div>
            </Modal>
        </ModalContainer>
    )
}