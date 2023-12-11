import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import { useNavigate} from "react-router-dom";

export const EditProcessRModal = ({id,setIsModalOpen, title = 'Cambiar proceso'}: { id: number , setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const options: SelectOption[] = [
        {
            value: 2,
            label: 'Enviado',
        },
        {
            value: 3,
            label: 'Cancelado',
        },
        {
            value: 4,
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
                processId: data?.ProductionRequest?.processId
            }
            setRegisterForm(newValues)
        }
    }, [data]);
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        processId: string,
    }>({
        processId: '',

    })
    const formFieldsRegister: FormField[] = [ 
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
            processId: process?.value,
        };
        console.log(requestBody)
        put(`productionRequests/${id}?apikey=${API_KEY}`, requestBody)
        if(!errorRegister){
            setTimeout(() => {
                if (process?.value == 4) {
                    navigate('/admin/ProductionOrders/create')
                }
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
                    <Form fields={formFieldsRegister} button={<Button text={title} type={'SUBMIT'}/>}
                          onSubmit={handleSubmit}
                          cancelButton={false}
                          errors={error}
                    />
                </div>
            </Modal>
        </ModalContainer>
    )
}