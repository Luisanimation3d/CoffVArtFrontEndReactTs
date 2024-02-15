import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import Swal from "sweetalert2";

export const CreateSupplyModal = ({setIsModalOpen, title = 'Crear Insumo'}: { setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const {data, post, error: errorRegister} = useFetch(API_URL)
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        name: string,
        description: string,
    }>({
        name: '',
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
            size: 'large',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Descripción',
            placeholder: 'Ingrese la descripción del producto',
            value: registerForm.description,
            onChange: (value: string) => setRegisterForm({...registerForm, description: value}),
            size: 'large',
        },
    ]




    const validateForm = () => {
        const errors: any = {}
        if (registerForm.name.length === 0) {
            errors.name = 'El nombre es requerido'
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
            description: registerForm.description,
        }

        post(`supplies?apikey=${API_KEY}`, dataToSend)
    }

    useEffect(() => {
        if (data?.newSupply && !errorRegister) {
            Swal.fire({
                title: 'Insumo creado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            })
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