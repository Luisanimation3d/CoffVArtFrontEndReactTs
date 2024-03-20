import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import { useNavigate} from "react-router-dom";
import { FormRedisign } from "../../components/FormRedisign/FormRedisign.tsx";
import { Container } from "react-bootstrap";

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
        if (processData?.processes?.rows) {
            const processOptions = processData?.processes?.rows
                .filter((process: any) => process.id > data?.productionOrder?.processId)
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
                        <Container>
                            <FormRedisign fields={formFieldsRegister} onSubmit={handleSubmit} button={"Cambiar proceso"} errors={error} cancelButton={false}/>
                        </Container>
                        
                    }
                    
                </div>
            </Modal>
        </ModalContainer>
    )
}