import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import { useNavigate} from "react-router-dom";

export const EditProcessOModal = ({id,setIsModalOpen, title = 'Cambiar proceso'}: { id: number , setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const [formValues, setFormValues] = useState<{newQuantity:number}>({
        newQuantity: 0,
    })
    const [process, setProcess] = useState<SelectOption | undefined>();
    const [products, setProducts] = useState<SelectOption | undefined>();
    const navigate = useNavigate()
    const [openView,setOpenViewP]= useState<boolean>(false);
    const {data, put, get, loading, error: errorRegister} = useFetch(API_URL)
    const { data: processData, get: getProcess } = useFetch(API_URL);
    const { data: productsData, get: getProducts } = useFetch(API_URL);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [optionsP, setOptionsP] = useState<SelectOption[]>([]);

    useEffect(() => {
        get(`productionOrders/${id}?apikey=${API_KEY}`)
    }, []);
    useEffect(() => {
        setOpenViewP(false)
        getProducts(`products?apikey=${API_KEY}`);
    }, []);
    useEffect(() => {
        if (productsData?.products?.rows) {
          const products = productsData?.products?.rows?.map((products: any) => ({
            label: products.name,
            value: products.id,
          }));
          setOptionsP(products);
        }
      }, [productsData]);
      console.log(productsData,"datos de productos")
    useEffect(() => {
        getProcess(`processes?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if (processData?.processes?.rows) {
          const process = processData?.processes?.rows?.map((process: any) => ({
            label: process.name,
            value: process.id,
          }));
          setOptions(process);
        }
      }, [processData]);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                processId: data?.productionOrder?.processId
            }
            setRegisterForm(newValues)
        }
    }, [data]);
    useEffect(() => {
        if (!loading) {
            const newValuesP = {
                productId: data?.productionOrder?.productId
            }
            setRegisterFormP(newValuesP)
        }
    }, [data]);
    console.log(data,"data")
    const [error, setError] = useState<{ [key: string]: string }>({})
    const [registerForm, setRegisterForm] = useState<{
        processId: string,
    }>({
        processId: '',

    })
    const [registerFormP, setRegisterFormP] = useState<{
        productId: string,
    }>({
        productId: '',

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

    ];
    const formFieldsQuantity: FormField[] = [ 
        
        {
                name: 'productId',
                type: 'select',
                label: 'Producto',
                value: products,
                options: optionsP,
                onChange: (o) => setProducts(o),
                size: 'large',
    
        }
        ,
        {
            name: 'newQuantity',
            type: 'number',
            label: 'Paquetes de café',
            placeholder: '0',
            value: formValues['newQuantity']!== undefined ? String(formValues['newQuantity']): '',
            onChange: (value) => handleInputChange('newQuantity',value),
            size: 'large',

        }

    ];
    const handleInputChange = (name: string, value: string | number) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };
    console.log(registerForm.processId,'register proceso')
    const validateForm = () => {
        const errors: any = {}
        if (!registerForm.processId || registerForm.processId.length === 0) {
            errors.processId = 'El proceso es requerido'
            console.log("El proceso es requerido")
        }
        
        return errors
    }
    const validateFormRecived = () => {
        const errors: any = {}
         console.log(formValues,"values",products," products")
            if (!formValues.newQuantity ) {
                errors.newQuantity = 'La cantidad es requerida';
            }
            if (!products?.value || products?.value === '') {
                errors.productId = 'El producto es requerido';
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
        console.log(requestBody, "aquí body")
        put(`productionOrders/${id}?apikey=${API_KEY}`, requestBody)
        console.log(process,"aquí process")
    };
    const handleSubmitRecived = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorsForm = validateFormRecived();
        console.log(errorsForm,"aquí error")
        if(Object.keys(errorsForm).length !== 0) {
            setError(errorsForm)
            return
        }
        const requestBody = {
            productId:products?.value,
            newQuantity: formValues.newQuantity,
        };
        console.log(requestBody)
        put(`productionOrders/${id}?apikey=${API_KEY}`, requestBody)
    };
    useEffect(()=> {
        if(data && !loading && !errorRegister){
            if(process?.value == 5 ){
                navigate(`/admin/ProductionOrders/edit/${id}`)
            }
        }
    },[data])
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
                    {
                        !openView?(
                        <Form fields={formFieldsRegister} button={<Button text={title} type={'SUBMIT'}/>}
                          onSubmit={handleSubmit}
                          cancelButton={false}
                          errors={error}
                    />):(
                        <Form fields={formFieldsQuantity} button={<Button text={'Guardar Cantidad'} type={'SUBMIT'}/>}
                          onSubmit={handleSubmitRecived}
                          cancelButton={false}
                          errors={error}/>
                    )
                    }
                    
                </div>
            </Modal>
        </ModalContainer>
    )
}