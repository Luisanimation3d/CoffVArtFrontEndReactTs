import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import {useEffect, useState} from "react";
import {FormField} from "../../types/Form";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import Swal from "sweetalert2";

export const ProductEditModal = ({setIsModalOpen, title = 'Editar Producto', idProduct, setIdEdit}: { setIsModalOpen: (value: boolean) => void, title?: string, idProduct: number, setIdEdit: (value: number | null) => void }) => {
    const {data, put, error: errorEdit} = useFetch(API_URL)
    const {data: dataProduct, get: getProduct} = useFetch(API_URL)
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [editForm, setEditForm] = useState<{
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
            placeholder: 'Ingrese su nombre',
            value: editForm.name,
            onChange: (value: string) => setEditForm({...editForm, name: value}),
            size: 'medium',
        },
        {
            name: 'amount',
            type: 'number',
            label: 'Cantidad',
            placeholder: 'Ingrese la cantidad del Producto',
            value: editForm.amount,
            onChange: (value: string) => setEditForm(prev => ({
                ...editForm,
                amount: validateIfNumber(value) ? value : prev.amount
            })),
            size: 'medium',
        },
        {
            name: 'stockMin',
            type: 'number',
            label: 'Cantidad',
            placeholder: 'Ingrese el stock minimo del Producto',
            value: editForm.stockMin,
            onChange: (value: string) => setEditForm(prev => ({
                ...editForm,
                amount: validateIfNumber(value) ? value : prev.amount
            })),
            size: 'medium',
        },
        {
            name: 'stockMax',
            type: 'number',
            label: 'Cantidad',
            placeholder: 'Ingrese el stock máximo del Producto',
            value: editForm.stockMax,
            onChange: (value: string) => setEditForm(prev => ({
                ...editForm,
                amount: validateIfNumber(value) ? value : prev.amount
            })),
            size: 'medium',
        },
        {
            name: 'unitPrice',
            type: 'number',
            label: 'Precio Unitario',
            placeholder: 'Ingrese el precio unitario del Producto',
            value: editForm.unitPrice,
            onChange: (value: string) => setEditForm(prev => ({
                ...editForm,
                amount: validateIfNumber(value) ? value : prev.amount
            })),
            size: 'medium',
        },
        {
            name: 'amountSupply',
            type: 'number',
            label: 'Cantidad',
            placeholder: 'Ingrese la cantidad del Producto',
            value: editForm.amountSupply,
            onChange: (value: string) => setEditForm(prev => ({
                ...editForm,
                amount: validateIfNumber(value) ? value : prev.amount
            })),
            size: 'medium',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Descripción',
            placeholder: 'Ingrese la descripción del producto',
            value: editForm.description,
            onChange: (value: string) => setEditForm({...editForm, description: value}),
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
        if (editForm.name.length === 0) {
            errors.name = 'El nombre es requerido'
        }
        if (editForm.amount.length === 0) {
            errors.amount = 'La cantidad es requerida'
        }
        if (editForm.stockMin.length === 0) {
            errors.stockMin = 'El stock minimo es requerido'
        }
        if (editForm.stockMax.length === 0) {
            errors.stockMax = 'El stock maximo es requerido'
        }
        if (editForm.unitPrice.length === 0) {
            errors.unitPrice = 'El precio unitario es requerido'
        }
        if (editForm.amountSupply.length === 0) {
            errors.amountSupply = 'La cantidad de suministro es requerida'
        }
        if (editForm.description.length === 0) {
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
            name: editForm.name,
            amount: editForm.amount,
            stockMin: editForm.stockMin,
            stockMax: editForm.stockMax,
            unitPrice: editForm.unitPrice,
            amountSupply: editForm.amountSupply,
            description: editForm.description,
        }

        put(`products/${idProduct}?apikey=${API_KEY}`, dataToSend)
    }

 
    useEffect(() => {
        if (data?.product && !errorEdit) {
            Swal.fire({
                title: 'Producto editado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            setIdEdit(null)
            setIsModalOpen(false)
        }
    }, [data]);

    useEffect(() => {
        getProduct(`products/${idProduct}?apikey=${API_KEY}`)
    },[])

    useEffect(() => {
        if(dataProduct?.product){
            console.log(dataProduct?.product)
            const productToEdit = {
                name: dataProduct?.product?.name,
                amount: dataProduct?.product?.amount,
                stockMin: dataProduct?.product?.stockMin,
                stockMax: dataProduct?.product?.stockMax,
                unitPrice: dataProduct?.product?.unitPrice,
                amountSupply: dataProduct?.product?.amountSupply,
                description: dataProduct?.product?.description
            }
            setEditForm(productToEdit)
        }
    }, [dataProduct]);

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