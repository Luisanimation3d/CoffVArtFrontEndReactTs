import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";

export const CreateSupplyModal = ({setIsModalOpen, title = 'Crear Insumo'}: { setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const {data, post, error: errorRegister} = useFetch(API_URL)
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        name: string,
        amount: string,
        unitPrice: string,
        description: string,
    }>({
        name: '',
        amount: '',
        unitPrice: '',
        description: '',
    })


    const formFieldsRegister: FormField[] = [
        {
            name: 'name',
            type: 'text',
            label: 'Nombre',
            placeholder: 'Ingrese el nombre del Producto',
            value: registerForm.name,
            onChange: (value: string) => setRegisterForm({...registerForm, name: value}),
            size: 'medium',
        },
        {
            name: 'amount',
            type: 'number',
            label: 'Cantidad',
            placeholder: 'Ingrese la cantidad del Producto',
            value: registerForm.amount,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                amount: validateIfNumber(value) ? value : prev.amount
            })),
            size: 'medium',
        },
        {
            name: 'unitPrice',
            type: 'number',
            label: 'Precio Únitario',
            placeholder: 'Ingrese el Precio Únitario del producto',
            value: registerForm.unitPrice,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                unitPrice: validateIfNumber(value) ? value : prev.unitPrice
            })),
            size: 'large',
        },
        {
            name: 'description',
            type: 'text',
            label: 'Descripción',
            placeholder: 'Ingrese la descripción del producto',
            value: registerForm.description,
            onChange: (value: string) => setRegisterForm({...registerForm, description: value}),
            size: 'large',
        },
    ]




    const validateIfNumber = (value: string) => {
        if (value.length === 0) return true
        const regex = new RegExp('^[0-9]+$')
        return regex.test(value)
    }


    const validateForm = () => {
        const errors: any = {}
        if (registerForm.name.length === 0) {
            errors.name = 'El nombre es requerido'
        }
        if (registerForm.amount.length === 0) {
            errors.amount = 'La cantidad es requerida'
        }
        if (registerForm.unitPrice.length === 0) {
            errors.unitPrice = 'El precio unitario es requerido'
        }
        if (registerForm.description.length === 0) {
            errors.description = 'La descripción es requerida'
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
        setError({})
        const dataToSend = {
            name: registerForm.name,
            amount: registerForm.amount,
            unitPrice: registerForm.unitPrice,
            description: registerForm.description,
        }

        post(`supplies?apikey=${API_KEY}`, dataToSend)
    }

    useEffect(() => {
        if (data?.newProduct && !errorRegister) {
            alert('Insumo creado correctamente')
            setIsModalOpen(false)
        }
    }, [data]);

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