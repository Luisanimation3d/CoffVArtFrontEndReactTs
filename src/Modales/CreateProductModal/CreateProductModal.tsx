import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import Swal from "sweetalert2";

export const CreateProductModal = ({setIsModalOpen, title = 'Crear Producto'}: { setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const {data, post, error: errorRegister} = useFetch(API_URL)
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        name: string,
        amount: string,
        stockMin: string,
        stockMax: string,
        unitPrice: string,
        amountSupply: string,
        description: string,
    }>({
        name: '',
        amount: '',
        stockMin: '',
        stockMax: '',
        unitPrice: '',
        amountSupply: '',
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
            name: 'stockMin',
            type: 'number',
            label: 'Stock Minimo',
            placeholder: 'Ingrese el Stock Minimo del producto',
            value: registerForm.stockMin,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                stockMin: validateIfNumber(value) ? value : prev.stockMin
            })),
            size: 'large',
        },
        {
            name: 'stockMax',
            type: 'number',
            label: 'Stock Máximo',
            placeholder: 'Ingrese el Stock Máximo del producto',
            value: registerForm.stockMax,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                stockMax: validateIfNumber(value) ? value : prev.stockMax
            })),
            size: 'large',
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
            name: 'amountSupply',
            type: 'number',
            label: 'Cantidad de Insumos',
            placeholder: 'Ingrese la cantidad de insumos del producto',
            value: registerForm.amountSupply,
            onChange: (value: string) => setRegisterForm(prev => ({
                ...registerForm,
                amountSupply: validateIfNumber(value) ? value : prev.amountSupply
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
        if (registerForm.stockMin.length === 0) {
            errors.stockMin = 'El stock minimo es requerido'
        }
        if (registerForm.stockMax.length === 0) {
            errors.stockMax = 'El stock maximo es requerido'
        }
        if (registerForm.unitPrice.length === 0) {
            errors.unitPrice = 'El precio unitario es requerido'
        }
        if (registerForm.amountSupply.length === 0) {
            errors.amountSupply = 'La cantidad de insumos es requerida'
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
            stockMin: registerForm.stockMin,
            stockMax: registerForm.stockMax,
            unitPrice: registerForm.unitPrice,
            amountSupply: registerForm.amountSupply,
            description: registerForm.description,
        }

        post(`products?apikey=${API_KEY}`, dataToSend)
    }

    useEffect(() => {
        if (data?.newProduct && !errorRegister) {
            Swal.fire({
                title: 'Producto creado con éxito',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            })
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