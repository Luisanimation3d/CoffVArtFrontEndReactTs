
import {useEffect, useState} from "react";

import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {Button} from "../../components/Button/Button.tsx";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";

export const IncrementProducts = () => {
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


        //const selectedSupply = dataInsumos?.supplies?.rows?.find((supplies: any) => supplies.id === selectedSupply?.value)

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
                productionOrder: productionOrder,
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
            productionOrder: productionOrder,
            state: true,
            Productsdetails: detalles.map((detalle) => ({
                productionOrderDetailId: detalle.id,
                productId: detalle.idProduct,
                quantity: parseInt(detalle.cantidad),
            })),
        };
        console.log("esto estoy mandando", requestBody)

        try {
            const response = await fetch(`https://coffvart-backend.onrender.com/api/ProductionOrderDetail?apikey=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                alert('Error al crear el empaquetado');
                console.error('Error al crear el empaquetado:', response.statusText);
                return;
            }

            setProductionOrder('');
            setDetalles([]);
            setProducts([]);
            setSelectProduct(undefined);
            setCantidad('');
            alert('Empaquetado creado con éxito');

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
                    <Titles title={`N°${productionOrder}`} level={2} transform={'UPPERCASE'}/>
                    <Form
                        fields={fields}
                        onSubmit={handleAddDetail}
                        button={<Button text={'Agregar'} onClick={() => null} type={'SUBMIT'} fill={false}/>}
                        cancelButton={false}
                    />
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
                        <table className="totals-table">
                            <thead>
                            <tr>
                                <th>Concepto</th>
                                <th>Monto</th>
                            </tr>
                            </thead>
                        </table>
                        <Button text={'Crear Compra'} onClick={() => handleCreateIncrement()} fill={false} type={'SUBMIT'}/>
                    </div>
                </div>
            </Container>
        </Container>
    );
}


export default IncrementProducts;