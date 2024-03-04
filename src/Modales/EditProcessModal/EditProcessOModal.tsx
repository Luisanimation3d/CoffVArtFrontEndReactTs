import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import { useNavigate} from "react-router-dom";

export const EditProcessOModal = ({id,setIsModalOpen, title = 'Cambiar proceso'}: { id: number , setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const [process, setProcess] = useState<SelectOption | undefined>();
    const navigate = useNavigate()
    const {data, put, get, loading, error: errorRegister} = useFetch(API_URL)
    const { data: processData, get: getProcess } = useFetch(API_URL);
    const [options, setOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        get(`productionOrders/${id}?apikey=${API_KEY}`)
    }, []);
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
    console.log(data,"data")
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

    ];
    
    
    console.log(registerForm.processId,'register proceso')
    const validateForm = () => {
        const errors: any = {}
        if (!registerForm.processId || registerForm.processId.length === 0) {
            errors.processId = 'El proceso es requerido'
            console.log("El proceso es requerido")
        }
        
        return errors
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorsForm = validateForm();
        if(Object.keys(errorsForm).length !== 0) {
            setError(errorsForm)
            return
        }
        const requestBody = {
            processId: process?.value,
        };
        try{
            await put(`productionOrders/${id}?apikey=${API_KEY}`, requestBody)
            if(process?.value !== 5){
                setIsModalOpen(false)
            }
        }
        catch(error){
            console.error('Error al actualizar el proceso', error)
        }
        
    };
    useEffect(()=> {
        if(data && !loading && !errorRegister){
            if(process?.value == 5 ){
                navigate(`/admin/ProductionOrders/edit`)
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
                        <Form fields={formFieldsRegister} button={<Button text={title} type={'SUBMIT'}/>}
                          onSubmit={handleSubmit}
                          cancelButton={false}
                          errors={error}
                    />
                    }
                    
                </div>
            </Modal>
        </ModalContainer>
    )
}