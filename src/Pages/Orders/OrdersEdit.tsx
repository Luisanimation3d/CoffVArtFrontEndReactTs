import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";

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
    const [error, setError] = useState<{ [key: string]: string }>({})

    const [formValues, setFormValues] = useState<any>({
        code: '',
        coustumerId: undefined,
        productId: undefined,
        quantity: '',
        state: undefined,
    });

    const handleInputChangen = (value: SelectOption | undefined, _: string | number) => {
        setFormValues((prevValues: any) => ({
            ...prevValues,
            state: value,
            coustumerId: value,
            productId: value,
        }));
    };

    const formFieldsRegister: FormField[] = [
        {
            name: 'code',
            type: 'text',
            label: 'Code',
            value: formValues.code,
            onChange: (value) => handleInputChangen({value, label: value}, 'code'),
            size: 'medium',
        },
        {
            name: 'coustumerId',
            type: 'number',
            label: 'Cliente',
            value: formValues.coustumerId,
            onChange: (value) => handleInputChangen({value, label: value}, 'coustumerId'),
            size: 'medium',
        },
        {
            name: 'productId',
            type: 'number',
            label: 'Producto',
            value: formValues.productId,
            onChange: (value) => handleInputChangen({value, label: value}, 'productId'),
            size: 'large',
        },
        {
            name: 'quantity',
            type: 'number',
            label: 'Cantidad',
            value: formValues.quantity,
            onChange: (value) => handleInputChangen({value, label: value}, 'quantity'),
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
        
    ];

    const {data, put, get, loading, error: errorRegister} = useFetch(API_URL)

    useEffect(() => {
        get(`orders/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        console.log("Data:", data);
        if (!loading && data?.order) {
            console.log("Data loaded:", data);
            const newValues = {
                code: data?.order.code,
                coustumerId: data?.order.coustumerId,
                productId: data?.order.productId,
                quantity: data?.order.quantity,
                state: data?.order.state,
            }
            setFormValues(newValues)
        }
    }, [data]);

    // const validateIfNumber = (value: string) => {
    //     if (value.length === 0) return true
    //     const regex = new RegExp('^[0-9]+$')
    //     return regex.test(value)
    // }

    const validateForm = () => {
        const errors: any = {}
        if (formValues.state.length === 0) {
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
        console.log("Submitting form with data:", formValues);
        const requestBody = {
            code: formValues.code,
            coustumerId: formValues.coustumerId,
            productId: formValues.productId,
            quantity: formValues.quantity,
            state: formValues.state,
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