import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {useEffect, useState} from "react";
import {validateIfNumber} from "../../helpers/validateIfNumber.helper.ts";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";

export const EditMyProfile = ({setShowModal}: {
    setShowModal: (value: boolean) => void
}) => {
    const {data, loading,get} = useFetch(API_URL);
    const [formDataRegister, setFormDataRegister] = useState<{
        name: string,
        lastname: string,
        documentType: SelectOption | undefined,
        documentNumber: string,
        address: string,
        phone: string,
        email: string,
        password: string,
        confirmPassword: string,
    }>({
        documentType: undefined,
        documentNumber: '',
        name: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const fields: FormField[] = [
        {
            type: 'select',
            value: formDataRegister.documentType,
            onChange: (value: SelectOption | undefined) => setFormDataRegister({
                ...formDataRegister,
                documentType: value
            }),
            label: 'Tipo de documento',
            name: 'documentType',
            size: 'medium',
            placeholder: 'Seleccione un tipo de documento',
            options: [
                {label: 'Cédula de ciudadanía', value: 'CC'},
                {label: 'Cédula de extranjería', value: 'CE'},
                {label: 'Pasaporte', value: 'PAS'},
            ]
        },
        {
            type: 'text',
            value: formDataRegister.documentNumber,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, documentNumber: value}),
            label: 'Número de documento',
            name: 'documentNumber',
            size: 'medium',
        },
        {
            type: 'text',
            value: formDataRegister.name,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, name: value}),
            label: 'Nombre',
            name: 'name',
            size: 'medium',
        },
        {
            type: 'text',
            value: formDataRegister.lastname,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, lastname: value}),
            label: 'Apellido',
            name: 'lastname',
            size: 'medium',
        },
        {
            type: 'text',
            value: formDataRegister.address,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, address: value}),
            label: 'Dirección',
            name: 'address',
            size: 'medium',
        },
        {
            type: 'text',
            value: formDataRegister.phone,
            onChange: (value: string) => setFormDataRegister(prev => ({
                ...prev,
                phone: validateIfNumber(value) ? value : prev.phone
            })),
            label: 'Teléfono',
            name: 'phone',
            size: 'medium',
        },
        {
            type: 'email',
            value: formDataRegister.email,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, email: value}),
            label: 'Correo electrónico',
            name: 'email',
            size: 'large',
        },
        {
            type: 'password',
            value: formDataRegister.password,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, password: value}),
            label: 'Contraseña',
            name: 'password',
            size: 'medium',
        },
        {
            type: 'password',
            value: formDataRegister.confirmPassword,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, confirmPassword: value}),
            label: 'Confirmar contraseña',
            name: 'confirmPassword',
            size: 'medium',
        }
    ]

    useEffect(() => {
        get('users/my-profile/obtener?apikey=' + API_KEY)
    }, []);

    useEffect(() => {
        if (data.user) {
            setFormDataRegister({
                documentType: {label: data.user.coustumer.documentType, value: data.user.coustumer.documentType},
                documentNumber: data.user.coustumer.document,
                name: data.user.name,
                lastname: data.user.lastname,
                address: data.user.coustumer.address,
                phone: data.user.coustumer.phone,
                email: data.user.email,
                password: '',
                confirmPassword: '',

            })
        }
    }, [data]);

    return (
        <>
            <ModalContainer ShowModal={setShowModal}>
                <Modal showModal={setShowModal}>
                    <Container >
                        <FormRedisign fields={fields} onSubmit={() => null} button={'Actualizar perfil'}
                                      title={'Actualizar mi perfil'}
                                    cancelButton={false}
                        />
                    </Container>
                </Modal>
            </ModalContainer>
        </>
    )
}