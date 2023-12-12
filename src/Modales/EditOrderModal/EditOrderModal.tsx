import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import { useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export const EditOrder = ({id,setIsModalOpen, title = 'Cambiar proceso' }: { id: number , setIsModalOpen: (value: boolean) => void, title?: string}) => {
    const options: SelectOption[] = [
        {
            value: 'pendiente',
            label: 'Pendiente',
        },
        {
            value: 'confirmado',
            label: 'Confirmado',
        },
        {
            value: 'enviado',
            label: 'Enviando',
        },
        {
            value: 'entregado',
            label: 'Entregado',
        },
        {
            value: 'cancelado',
            label: 'Cancelado',
        },
    ];
    const [IsModalAlert, setIsModalAlert] = useState(false)
    const [state, setProcess] = useState<SelectOption | undefined>();
    const navigate = useNavigate()
    const {data, put, get, loading, error: errorRegister} = useFetch(API_URL)
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
    const [error, setError] = useState<{ [key: string]: string }>({})
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
    
                // Validar que solo se pueda poner en "Cancelado" si está en "Pendiente"
                if (currentStatus === 'entregado' && o?.value === 'pendiente') {
                    showAlert = true;
                    Swal.fire({
                        title: 'Error',
                        text: 'No puedes cambiar a pendiente si ya se entregado',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                } else if (currentStatus === 'entregado' && o?.value === 'confirmado') {
                    showAlert = true;
                    Swal.fire({
                        title: 'Error',
                        text: 'No puedes cambiar a Confirmado si ya esta Entregado',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                } else if (currentStatus === 'entregado' && o?.value === 'enviado') {
                    showAlert = true;
                    Swal.fire({
                        title: 'Error',
                        text: 'No puedes cambiar a Enviado si ya esta Entregado',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                } else if (currentStatus === 'entregado' && o?.value === 'cancelado') {
                    showAlert = true;
                    Swal.fire({
                        title: 'Error',
                        text: 'No puedes cambiar a Cancelado si ya esta entregado',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    showAlert = false;
                }
    
                // Actualizar el formulario solo si no se ha mostrado ninguna alerta
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
    const validateForm = () => {
        const errors: any = {}
        if (!registerForm.state) {
            errors.state = 'El estado es requerido'
        }
        return errors
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const requestBody = {
            state: registerForm?.state?.value,
        };
        console.log(requestBody)
        put(`orders/${id}?apikey=${API_KEY}`, requestBody)
        Swal.fire({
                title: 'Éxito',
                text: 'Se ha cambiado el estado de la orden',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
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
                    <Form fields={formFieldsRegister} button={<Button text={title} type={'SUBMIT'}/>}
                          onSubmit={handleSubmit }
                          cancelButton={false}
                          errors={error}
                    />
                </div>
            </Modal>
        </ModalContainer>
    )
}