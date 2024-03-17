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
import toast, { Toaster } from 'react-hot-toast';

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
        const quantity = data?.ProductionRequest?.quantity;
    }, [data]);

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
        if (processData?.processes?.rows) {
            const processOptions = processData?.processes?.rows
                .filter((process: any) => process.id > data?.ProductionRequest?.processId)
                .map((process: any) => ({
                    label: process.name,
                    value: process.id,
                }));
            setOptions(processOptions);
        }
    }, [processData, data?.productionOrder?.processId]);

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
    
    const handleSubmitRecived =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorsForm = validateFormRecived();
        if(Object.keys(errorsForm).length !== 0) {
            setError(errorsForm)
            return
        }
        try{ 
        const requestBody = {
            receivedQuantity: formValues.receivedQuantity,
        };
        const response = await fetch (`${API_URL}productionRequests/${id}?apikey=${API_KEY}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        if(response){
            const data = await response.json();
            if(data.message == "Cantidad de insumo recibida correctamente"){
                toast(data.message,{
                    icon:'👏',
                    position: 'bottom-right'
                })
                setTimeout(()=>{
                    setIsModalOpen(false)
                },2000);
            }else if (data.error == `La cantidad de insumo recibida no puede ser menor que 0`){
                toast.error(data.error, {
                    icon: '😞',
                    position: 'bottom-right'
                })}

                else if (data.error == `La cantidad recibida no puede superar el insumo enviado`){
                   console.log(data, "aqui data")
                    toast.error(`${data.error} - Cantidad Actual: ${data.quantity}`, {
                        
                        icon: '😞',
                        position: 'bottom-right'
                    });
                
        }
    }}
     catch (error) {
        console.error('Error al crear la solicitud de producción', error);
    }
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
                            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=''
                containerStyle={{}}
                toastOptions={{
                    className:'',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        fontSize: '1.5em',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
                        </Container>
                        
                    )
                }
                    
                </div>
            </Modal>
        </ModalContainer>
    )
}