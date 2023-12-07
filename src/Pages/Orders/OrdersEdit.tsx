import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import { useNavigate, useParams } from "react-router-dom";

export const EditOrdersModal = ({ id, setIsModalOpen, title = 'Editar Orden'}: { id: number , setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const options: SelectOption[] = [
        {
            value: 'anulado',
            label: 'Anulado',
        },
        {
            value: 'pendiente',
            label: 'Pendiente',
        },
        {
            value: 'confirmado',
            label: 'Confirmado',
        }
    ];
    const [state, setState] = useState<SelectOption | undefined>();
    const navigate = useNavigate()
    const {data, put, get, loading, error: errorRegister} = useFetch(API_URL)
    useEffect(() => {
        get(`orders/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                code: data?.orders.code,
                coustumerId: data?.orders.coustumerId,
                productId: data?.orders.productId,
                quantity: data?.orders.quantity,
                value: data?.orders.value,
                total: data?.orders.total,
                state: data?.orders.state,
            }
            setRegisterForm(newValues)
        }
    }, [data]);

    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        code: string,
        coustumerId: string,
        productId: string,
        quantity: string,
        value: string,
        total: string,
        state: string,
    }>({
        code: '',
        coustumerId: '',
        productId: '',
        quantity: '',
        value: '',
        total: '',
        state: '',

    })


    const formFieldsRegister: FormField[] = [
        
        {
            name: 'code',
            type: 'text',
            label: 'Code',
            value: registerForm.code,
            onChange: (value: string) => setRegisterForm({...registerForm, code: value}),
            size: 'medium',
        },
        {
            name: 'coustumerId',
            type: 'number',
            label: 'Cliente',
            value: registerForm.coustumerId,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                amount: validateIfNumber(value) ? value : prev.coustumerId
            })),
            size: 'medium',
        },
        {
            name: 'productId',
            type: 'number',
            label: 'Producto',
            value: registerForm.productId,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                productId: validateIfNumber(value) ? value : prev.productId
            })),
            size: 'large',
        },
        {
            name: 'quantity',
            type: 'number',
            label: 'Cantidad',
            value: registerForm.quantity,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                quantity: validateIfNumber(value) ? value : prev.quantity
            })),
            size: 'large',
            
        },
        {
            name: 'value',
            type: 'number',
            label: ' Valor Unitario',
            placeholder: 'Ingrese el Precio Únitario del producto',
            value: registerForm.value,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                value: validateIfNumber(value) ? value : prev.value
            })),
            size: 'large',
        },
        {
            name: 'total',
            type: 'text',
            label: 'Total',
            value: registerForm.total,
            onChange: (value: string) => setRegisterForm({...registerForm, total: value}),
            size: 'large',
        },  
        {
            name: 'state',
            type: 'select',
            label: 'Estado',
            value: state,
            options: options,
            onChange: (o) => setState(o),
            size: 'large',

        }

    ]

    const validateIfNumber = (value: string) => {
        if (value.length === 0) return true
        const regex = new RegExp('^[0-9]+$')
        return regex.test(value)
    }


    const validateForm = () => {
        const errors: any = {}
        if (registerForm.state.length === 0) {
            errors.state = 'El estado es requerido'
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
            code: registerForm.code,
            coustumerId: registerForm.coustumerId,
            productId: registerForm.productId,
            quantity: registerForm.quantity,
            value: registerForm.value,
            total: registerForm.total,
            state: registerForm.state,
        };

        put(`orders?apikey=${API_KEY}`, requestBody)
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