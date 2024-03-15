import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import { useNavigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import { FormRedisign } from "../../components/FormRedisign/FormRedisign.tsx";

export const EditProcessRModal = ({id,setIsModalOpen, title = 'Cambiar proceso'}: { id: number , setIsModalOpen: (value: boolean) => void, title?: string }) => {
    const [formValues, setFormValues] = useState<{receivedQuantity:number}>({
        receivedQuantity: 0,
    })
    const [process, setProcess] = useState<SelectOption | undefined>();
    const navigate = useNavigate(); 
    const [openView,setOpenView]= useState<boolean>(false);
    const {data, put, get, loading, error: errorRegister} = useFetch(API_URL)
    const { data: processData, get: getProcess } = useFetch(API_URL);
    const [options, setOptions] = useState<SelectOption[]>([]);
   
    useEffect(() => {
        get(`productionRequests/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        setOpenView(false)
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
                processId: data?.ProductionRequest?.processId
            }
            setRegisterForm(newValues)
        }
    }, [data]);
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

        },

    ];
    const formFieldsQuantity: FormField[] = [ 
        {
            name: 'receivedQuantity',
            type: 'number',
            label: 'Insumo Recibido',
            placeholder: '0',
            value: formValues['receivedQuantity']!== undefined ? String(formValues['receivedQuantity']): '',
            onChange: (value) => handleInputChange('receivedQuantity',value),
            size: 'large',

        }

    ];
    const handleInputChange = (name: string, value: string | number) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };
    const validateForm = () => {
        const errors: any = {}
        if (registerForm.processId.length === 0) {
            errors.processId = 'El proceso es requerido'
        }
        
        return errors
    }
    const validateFormRecived = () => {
        const errors: any = {}
        if (formValues.receivedQuantity === 0) {
            errors.receivedQuantity = 'La cantidad es requerida'
        }
        
        return errors
    }
    
       
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorsForm = validateForm();
        if (Object.keys(errorsForm).length !== 0) {
            setError(errorsForm);
            return;
        }
        const requestBody = {
            processId: process?.value,
        };
        console.log(requestBody);

        try {
            await put(`productionRequests/${id}?apikey=${API_KEY}`, requestBody);
            if(process?.value !== 3){
                setIsModalOpen(false)
            }
        } catch (error) {
            console.error('Error al actualizar el proceso:', error);
            // Manejar el error aquí si es necesario
        }
    };
    
    const handleSubmitRecived = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorsForm = validateFormRecived();
        if(Object.keys(errorsForm).length !== 0) {
            setError(errorsForm)
            return
        }
        const requestBody = {
            receivedQuantity: formValues.receivedQuantity,
        };
        console.log(requestBody)
        put(`productionRequests/${id}?apikey=${API_KEY}`, requestBody)
        setIsModalOpen(false)
    };
    
    useEffect(()=> {
        if(data && !loading && !errorRegister){
            if(process?.value == 3){
                setOpenView(true)
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
                        <Container>
                            <FormRedisign fields={formFieldsRegister} onSubmit={handleSubmit} button={"Cambiar proceso"} errors={error} cancelButton={false}/>
                        </Container>
                        
                    ):(
                        <Container>
                            <FormRedisign fields={formFieldsQuantity} onSubmit={handleSubmitRecived} button={"Guardar cantidad"} errors={error} cancelButton={false}/>
                        </Container>
                        
                    )
                }
                    
                </div>
            </Modal>
        </ModalContainer>
    )
}