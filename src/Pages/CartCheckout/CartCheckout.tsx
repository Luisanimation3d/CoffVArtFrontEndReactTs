import styles from './CartCheckout.module.css'
import {useNavigate} from "react-router-dom";
import {useCart} from "../../context/CartContext.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {CartProductCard} from "../../components/ProductCard/ProductCard.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {Form} from "../../components/Form/Form.tsx";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import Swal from "sweetalert2";

export const CartCheckout = () => {
    const navigate = useNavigate()
    const {cart, clearCart} = useCart()
    const {isAuthenticated, user} = useAuth()
    const {data, loading, error: errorLogin, post} = useFetch(API_URL)
    const [formValidation, setFormValidation] = useState<boolean>(false)
    const [errorForm, setErrorForm] = useState<{ [key: string]: string }>({})
    const [formInfo, setFormInfo] = useState<{
        name: string,
        lastName: string,
        email: string,
        documentType: SelectOption | undefined,
        document: string,
    }>({
        name: '',
        lastName: '',
        email: '',
        documentType: undefined,
        document: '',
    })

    const [formShipping, setFormShipping] = useState<{
        address: string,
        phone: string,
    }>({
        address: '',
        phone: '',
    })

    const optionsDocumentType: SelectOption[] = [
        {
            value: 'CC',
            label: 'CC',
        },
        {
            value: 'TI',
            label: 'TI',
        }
    ]

    if(!isAuthenticated){
        localStorage.setItem('CartComes', String(true))
        navigate('/user/login')
    }

    const validateIfNumber = (value: string) => {
        if(value === '') return true
        const reg = new RegExp('^[0-9]+$');
        return reg.test(value)
    }

    const formValidationInfo: FormField[] = [
        {
            name: user?.name.split(' ')[0] || '',
            type: 'text',
            label: 'Nombre',
            placeholder: 'Ingrese su nombre',
            value: formInfo.name,
            onChange: (value: string) => setFormInfo({...formInfo, name: value}),
            size: 'medium',
        },
        {
            name: user?.name.split(' ')[1] || '',
            type: 'text',
            label: 'Apellido',
            placeholder: 'Ingrese su apellido',
            value: formInfo.lastName,
            onChange: (value: string) => setFormInfo({...formInfo, lastName: value}),
            size: 'medium',
        },
        {
            name: user?.email || '',
            type: 'email',
            label: 'Correo',
            placeholder: 'Ingrese su correo',
            value: formInfo.email,
            onChange: (value: string) => setFormInfo({...formInfo, email: value}),
            size: 'large',
        },
        {
            name: 'documentType',
            type: 'select',
            label: 'Tipo de documento',
            placeholder: 'Seleccione su tipo de documento',
            value: formInfo.documentType,
            onChange: (value: SelectOption | undefined) => setFormInfo({...formInfo, documentType: value}),
            options: optionsDocumentType
        },
        {
            name: user?.document || '',
            type: 'text',
            label: 'Documento',
            placeholder: 'Ingrese su documento',
            value: formInfo.document,
            onChange: (value: string) => setFormInfo({...formInfo, document: validateIfNumber(value) ? value : formInfo.document}),
            size: 'large',
        },
    ]
    const formValidationShipping: FormField[] = [
        {
            name: 'address',
            type: 'text',
            label: 'Dirección',
            placeholder: 'Ingrese su dirección',
            value: formShipping.address,
            onChange: (value: string) => setFormShipping({...formShipping, address: value}),
            size: 'large',
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Teléfono',
            placeholder: 'Ingrese su teléfono',
            value: formShipping.phone,
            onChange: (value: string) => setFormShipping({...formShipping, phone: validateIfNumber(value) ? value : formShipping.phone}),
            size: 'large',
        },
    ]

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const impuestos = subtotal * 0.19
    const total = subtotal + impuestos + 10000

    const [checkoutStep, setCheckoutStep] = useState(2)

    const validateInfo = () => {
        const errors: any = {};
        if (!formInfo.name) {
            errors.name = 'El nombre es requerido'
        }
        if (!formInfo.lastName) {
            errors.lastName = 'El apellido es requerido'
        }
        if (!formInfo.email) {
            errors.email = 'El correo Electrónico es requerido'
        } else if (!/\S+@\S+\.\S+/.test(formInfo.email)) {
            errors.email = 'El correo electrónico es inválido'
        }
        if (!formInfo.documentType) {
            errors.documentType = 'El tipo de documento es requerido'
        }
        if (!formInfo.document) {
            errors.document = 'El documento es requerido'
        }
        return errors;
    }

    const changeStep = () => {
        if(checkoutStep == 4){
            handleSubmitSale()
        }else{
            setCheckoutStep(prev => prev + 1)
            setFormValidation(true)
        }
    }

    const validateShipping = () => {
        const errors: any = {};
        if (!formShipping.address) {
            errors.address = 'La dirección es requerida'
        }
        if (!formShipping.phone) {
            errors.phone = 'El teléfono es requerido'
        }
        return errors;
    }

    const handleSubmitSale = () => {
        const sale = {
            invoice: Math.floor(Math.random() * 1000000000),
            user: user?.email,
            state: true,
            Productdetails: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity
            })),
        }
        console.log(sale)
        post(`sales?apikey=${API_KEY}`, sale)
    }

    useEffect(() => {
        if (isAuthenticated) {
            const documentType: SelectOption | undefined = optionsDocumentType.find(item => item.value === user?.documentType)
            setFormInfo({
                name: user?.name.split(' ')[0] || '',
                lastName: user?.name.split(' ')[1] || '',
                email: user?.email || '',
                documentType: documentType || undefined,
                document: user?.document || '',
            })

            setFormShipping({
                address: user?.address || '',
                phone: user?.phone || '',
            })
        }
    }, [checkoutStep]);

    useEffect(() => {
        const errors = validateInfo();
        if (Object.keys(errors).length === 0) {
            setFormValidation(false)
        } else {
            setFormValidation(true)
        }
        setErrorForm(errors);
    }, [formInfo])

    useEffect(() => {
        const errors = validateShipping();
        if (Object.keys(errors).length === 0) {
            setFormValidation(false)
        } else {
            setFormValidation(true)
        }
        setErrorForm(errors);
    }, [formShipping])

    useEffect(() => {
        if(checkoutStep == 4){
            setFormValidation(false)
        }
    }, [formValidation]);

    useEffect(() => {
        if (data?.newSale) {
            Swal.fire({
                title: 'Gracias por su compra',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            })
            navigate('/')
            clearCart()
        }
    }, [data])

    return (
        <>
            {
                cart.length === 0 ?
                    (
                        <div className={styles.emptyCartContainer}>
                            <div className={styles.emptyCartTitle}>Tu carrito está vacío</div>
                            <div className={styles.emptyCartSubtitle}>Parece que aún no has elegido lo que quieres
                                comprar
                            </div>
                            <Button text={'Seguir comprando'} fill={true} autosize={false}
                                    onClick={() => navigate('/tiendaUser')}/>
                        </div>
                    )
                    :
                    (
                        <div className={styles.cartContainer}>
                            <nav className={styles.navigationCartContainer}>
                                <ul className={`${styles.navigationList}`}>
                                    <li className={`${styles.navigationListItem}`}>Carrito</li>
                                    <li className={`${styles.navigationListItem} ${checkoutStep == 2 ? styles['navigationListItem--active'] : ''}`}>Valida tu información</li>
                                    <li className={`${styles.navigationListItem} ${checkoutStep == 3 ? styles['navigationListItem--active'] : ''}`}>valida el envío</li>
                                    <li className={`${styles.navigationListItem} ${checkoutStep == 4 ? styles['navigationListItem--active'] : ''}`}>Pago</li>
                                </ul>
                            </nav>
                            <div className={styles.cartResumeContainer}>
                                <div className={styles.productCartContainer}>
                                    <div className={styles.productsCartContainerCards}>
                                        {
                                            checkoutStep == 2 ? (
                                                <Form fields={formValidationInfo} button={<></>} onSubmit={()=>{}} errors={errorForm} cancelButton={false}/>
                                            ) : checkoutStep == 3 ? (
                                                <Form fields={formValidationShipping} button={<></>} onSubmit={()=>{}} errors={errorForm} cancelButton={false}/>
                                            ) : checkoutStep == 4 && (
                                                <h1>Gracias por su compra</h1>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={styles.summaryContainer}>
                                    <div className={styles.summaryItem}>
                                        <div className={styles.summaryItemTitle}>Subtotal</div>
                                        <div
                                            className={styles.summaryItemValue}>$ {Intl.NumberFormat('es-co').format(subtotal)}</div>
                                    </div>
                                    <div className={styles.summaryItem}>
                                        <div className={styles.summaryItemTitle}>Impuestos</div>
                                        <div
                                            className={styles.summaryItemValue}>$ {Intl.NumberFormat('es-co').format(impuestos)}</div>
                                    </div>
                                    <div className={styles.summaryItem}>
                                        <div className={styles.summaryItemTitle}>Envío</div>
                                        <div className={styles.summaryItemValue}>$ 10.000</div>
                                    </div>
                                    <div className={`${styles.summaryItem} ${styles.summaryItemTotal}`}>
                                        <div className={styles.summaryItemTitle}>Total</div>
                                        <div
                                            className={styles.summaryItemValue}>$ {Intl.NumberFormat('es-co').format(total)}</div>
                                    </div>
                                    <div className={styles.buttonsContainer}>
                                        <Button text={checkoutStep < 4 ? 'Continuar' : 'Terminar compra'} fill={false} autosize={false} onClick={changeStep} disabled={formValidation}/>
                                        <Button text={'Volver atrás'} fill={true} autosize={false} onClick={() => checkoutStep == 2 ? navigate('/user/cart') : setCheckoutStep(prev => prev - 1)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default CartCheckout