import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import { useNavigate, useParams } from "react-router-dom";

export const EditProductionRequestModal = ({ id, setIsModalOpen, title = 'Cambiar proceso'}: { id: number , setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const options: SelectOption[] = [
        {
            value: 'enviado',
            label: 'Enviado',
        },
        {
            value: 'cancelado',
            label: 'Cancelado',
        },
        {
            value: 'finalizado',
            label: 'Finalizado',
        }
    ];
    const [process, setProcess] = useState<SelectOption | undefined>();
    const navigate = useNavigate()
    const {data, put, get, loading, error: errorRegister} = useFetch(API_URL)
    useEffect(() => {
        get(`productionRequests/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                requestNumber: data?.ProductionRequest.requestNumber,
                processId: data?.ProductionRequest.processId,
            }
            setRegisterForm(newValues)
        }
    }, [data]);

    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        requestNumber: string,
        processId: string,
    }>({
        requestNumber: '',
        processId: '',

    })


    const formFieldsRegister: FormField[] = [

        {
            name: 'requestNumber',
            type: 'text',
            label: 'Numero de solicitud',
            value: registerForm.requestNumber,
            onChange: (value: string) => setRegisterForm({...registerForm, requestNumber: value}),
            size: 'medium',
        },
        {
            name: 'processId',
            type: 'select',
            label: 'Proceso',
            value: process,
            options: options,
            onChange: (o) => setProcess(o),
            size: 'large',

        }

    ]


    const validateForm = () => {
        const errors: any = {}
        if (registerForm.processId.length === 0) {
            errors.processId = 'El estado es requerido'
        }

        return errors
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorsForm = validateForm();
        if(Object.keys(errorsForm).length !== 0) {
            setError(errorsForm)
            return
        }
        const requestBody = {
            requestNumber: registerForm.requestNumber,
            proceessId: registerForm.processId,
        };

        put(`productionRequests?apikey=${API_KEY}`, requestBody)
        if(errorRegister){
            setTimeout(() => {
                navigate(-1)
            }, 500);
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
                    <Form fields={formFieldsRegister} button={<Button text={title} type={'Submit'}/>}
                          onSubmit={handleSubmit}
                          cancelButton={false}
                          errors={error}
                    />
                </div>
            </Modal>
        </ModalContainer>
    )
}

export default EditProductionRequestModal