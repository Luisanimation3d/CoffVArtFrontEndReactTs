
import {useEffect, useState} from "react";

import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
//import {Form} from "../../components/Form/Form.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {Button} from "../../components/Button/Button.tsx";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FormRedisign } from "../../components/FormRedisign/FormRedisign.tsx";

export const IncrementProducts = () => {
    const [error] = useState<{[key: string]: string}>({})
    const {
        data: dataProducts,
        loading: loadingProducts,
        error: errorProducts,
        get: getProducts
    } = useFetch(API_URL)
    const {
        data: dataPO,
        loading: loadingPO,
        error: errorPO,
        get: getPO
    } = useFetch(API_URL)
    const [detalles, setDetalles] = useState<any[]>([]);
    const [productionOrder, setProductionOrder] = useState<string>('');
    const [selectProductionOrder, setSelectProductionOrder] = useState<SelectOption | undefined>(undefined);
    const [selectProduct, setSelectProduct] = useState<SelectOption | undefined>(undefined);
    const [cantidad, setCantidad] = useState('');
    const [productionOrders, setProductionOrders] = useState<SelectOption[]>([]);
    const [products, setProducts] = useState<SelectOption[]>([]);
    const navigate = useNavigate()


    const headers: Column[] = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'productionOrder',
            header: 'Numero de orden',
        },
        {
            key: 'product',
            header: 'producto',
        },
        {
            key: 'cantidad',
            header: 'Cantidad',
        },


    ]
    const handleSelectProduct = (option: SelectOption | undefined) => {
        setSelectProduct(option);
    };
    const handleSelectProductionOrder = (option: SelectOption | undefined) => {
        setSelectProductionOrder(option);
    }

    const fields: FormField[] = [
        {
            name: 'selectProductionOrder',
            placeholder: 'Orden',
            type: 'select',
            options: productionOrders,
            value: selectProductionOrder,
            onChange: (option) => handleSelectProductionOrder(option),
        },
        {
            name: 'selectProduct',
            placeholder: 'Producto',
            type: 'select',
            options: products,
            value: selectProduct,
            onChange: (option) => handleSelectProduct(option),
        },
        {
            name: 'quantity',
            type: 'number',
            label: 'paquetes',
            placeholder: 'paquetes',
            size: 'large',
            value: cantidad,
            onChange: setCantidad
        }
    ]

    
        const handleAddDetail = (e: any) => {
            e.preventDefault();
            if (!selectProduct) {
                alert('Debe seleccionar un insumo antes de agregar a la tabla');
                return;
            }
    
            if (!cantidad || parseInt(cantidad) <= 0) {
                alert('Debe ingresar una cantidad válida antes de agregar insumos');
                return;
            }

            const selectedProductionOrder = dataPO?.productionOrders?.rows.find((order: any) => order.id === selectProductionOrder.value);

            if (!selectedProductionOrder) {
                alert('Debe seleccionar una orden de produccion antes de agregar a la tabla');
                return;
            }
            
            const productionOrderQuantity = selectedProductionOrder?.quantity;
            if (parseInt(cantidad) > productionOrderQuantity) {
                alert(`La cantidad excede el límite máximo de ${productionOrderQuantity}`);
                return; 
            }

        const existingDetail = detalles.find(detail => detail.idProduct === selectProduct?.value);
        

        if (existingDetail) {
            // Si el producto ya está en el detalle, actualiza la cantidad
            const updatedDetalles = detalles.map(detail => {
                if (detail.idProduct === selectProduct.value) {
                    const updatedCantidad = parseInt(detail.cantidad) + parseInt(cantidad);

                    return {
                        ...detail,
                        cantidad: updatedCantidad,
                    };
                }
                return detail;
            });

            setDetalles(updatedDetalles);
        } else {
            // Si el producto no está en el detalle, agrégalo como un nuevo elemento
            const newDetail = {
                id: detalles.length + 1,
                productionOrder: selectProductionOrder?.value,
                product: selectProduct?.label,
                idProduct: selectProduct?.value,
                cantidad: cantidad,
            };
            setDetalles([...detalles, newDetail]);

            setProductionOrder('');
            setSelectProduct(undefined);
            setCantidad('');

        }

    };
    
    useEffect(() => {
        getProducts(`products?apikey=${API_KEY}`);
    }, []);
    useEffect(() => {
        getPO(`ProductionOrders?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if (!loadingProducts && !errorProducts) {
            console.log(dataProducts?.products?.rows, 'Aqui estan los Productos')
            const optionToSelectProducts: SelectOption[] = dataProducts?.products?.rows?.map((products: any) => ({
                value: products.id,
                label: products.name,
            }))
            console.log(optionToSelectProducts, 'Aqui estan los Productos')
            setProducts(optionToSelectProducts)
        }
    }, [dataProducts]);
    
    useEffect(() => {
        if (!loadingPO && !errorPO) {
            console.log(dataPO?.productionOrders?.rows, 'Aqui estan las ordenes de produccion')
            const optionToSelectProductionOrders: SelectOption[] = dataPO?.productionOrders?.rows?.map((productionOrders: any) => ({
                value: productionOrders.id,
                label: productionOrders.id,
            }))
            console.log(optionToSelectProductionOrders, 'Aqui estan las ordenes de produccion')
            setProductionOrders(optionToSelectProductionOrders)
        }
    }, [dataPO]);



   
    console.log(dataPO, 'Aqui estan las ordenes de produccion x')
    const handleDeleteProduct = (id: string) => {
        const updatedDetalles = detalles.filter((detalle) => detalle.id !== id);
        setDetalles(updatedDetalles);
    };
    

    const handleCreateIncrement = async () => {
        console.log('Entre')

        if (detalles.length === 0) {
            alert('Debe agregar al menos un producto antes de crear la orden de producción');
            return;
        }
        let id = detalles[0]

        const requestBody = {
            productionOrderId: selectProductionOrder?.value,
            state: true,
            Productdetails: detalles.map((detalle) => ({
                Id: detalle.id,
                productionOrderId: detalle.idproductionOrder,
                Productdetails: {
                    productId: detalle.idProduct,
                    quantity: parseInt(detalle.cantidad),
                }
            })),
        };
        console.log("esto estoy mandando", requestBody)

        try {
            const response = await fetch(`${API_URL}productionOrders/detail?apikey=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response) {
                    const data = await response.json();
                    if(data.message == "Empaquetado creado correctamente"){
                        toast(data.message,{
                            icon:'👏',
                            position: 'bottom-right'
                        })
                        setTimeout(()=>{
                            navigate(-1)
                        },2000);
                    }else if (data.msg == `La cantidad actualizada no es válida`){
                        toast.error(data.msg, {
                            icon: '😞',
                            position: 'bottom-right'
                        })
                        setTimeout(() => {
                            
                    }, 2000);}
                    else if (data.msg == `La cantidad excede el insumo disponible `){
                        toast.error(data.msg, {
                            icon: '😞',
                            position: 'bottom-right'
                        })
                        setTimeout(() => {
                            
                    }, 2000);}
            }

            setProductionOrder('');
            setDetalles([]);
            setProducts([]);
            setSelectProduct(undefined);
            setCantidad('');


        } catch (error) {
            
            console.error('Error al crear el empaquetado:', error);
            
            alert('Error al crear el empaquetado');
        }
    };


    return (
        <Container align={'CENTER'}>
            <Titles title={'CREAR EMPAQUETADO'}/>
            <Container justify={'CENTER'} align={'TOP'} direction={'ROW'} gap={2}>
                <div style={{width: '50%'}}>
                <Container>
                <FormRedisign fields={fields} onSubmit={handleAddDetail} button={"Agregar paquete"} title={`N°${productionOrder}`} errors={error}/> 
                <Toaster 
                    position="top-center"
                    reverseOrder= {false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        className: '',
                        duration: 5000,
                        style:{
                            background: '#363636',
                            color: '#fff'
                        },
                        success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black'
                
                        },
                    },
                }}
             />
                </Container>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <Titles title={'Detalle del Empaquetado'} level={2} transform={'UPPERCASE'}/>
                    <Table columns={headers} data={detalles} onRowClick={() => null}
                           deleteAction={{onClick: handleDeleteProduct}}/>
                    <style>
                        {`
                  .info {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    margin-top: 2rem;
                  }
                  .info p {
                    font-size: 1.2rem;
                    font-weight: bold;
                  }
                  .totals-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 1rem;
                  }
                  .totals-table th,
                  .totals-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: right;
                  }
                  .totals-table th {
                    background-color: #f2f2f2;
                  }
                `}
                    </style>
                    <div className="info">
                        <Button text={'Crear Compra'} onClick={() => handleCreateIncrement()} fill={false} type={'SUBMIT'}/>
                    </div>
                </div>
            </Container>
        </Container>
    );
}


export default IncrementProducts;