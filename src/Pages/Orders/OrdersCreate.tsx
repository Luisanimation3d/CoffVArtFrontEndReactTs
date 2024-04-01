import {useEffect, useState} from "react";

import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {Button} from "../../components/Button/Button.tsx";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY} from "../../utils/constantes.ts";
import { FormRedisign } from "../../components/FormRedisign/FormRedisign.tsx";
import { useDarkMode} from "../../context/DarkMode.tsx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


export const OrdersCreate = () => {
    const {
        data: dataProductos,
        loading: loadingProductos,
        error: errorProductos,
        get: getProductos
    } = useFetch('https://coffvart-backend.onrender.com/api/')
    const {
        data: dataClientes,
        loading: loadingClientes,
        error: errorClientess,
        get: getClientes
    } = useFetch('https://coffvart-backend.onrender.com/api/')
    // const { POST } = useFetch ('https://coffvart-backend.onrender.com/api/')

    // const {data: dataRoles, loading: loadingRoles, error: errorRoles, get: getRoles} = useFetch('https://coffvart-backend.onrender.com/api/')
    const navigate = useNavigate()
    const [detalles, setDetalles] = useState<any[]>([]);
    const [factura, setFactura] = useState<string>('');
    const [selectCliente, setSelectCliente] = useState<SelectOption | undefined>(undefined);
    const [selectProducto, setSelectProducto] = useState<SelectOption | undefined>(undefined);
    const nombre = useState('');
    const setNombre = nombre[1]
    const [cantidad, setCantidad] = useState('');
    const descripcion = useState('');
    const setDescripcion = descripcion[1];
    const [subTotal, setSubTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [productos, setProductos] = useState<SelectOption[]>([]);
    const [clientes, setClientes] = useState<SelectOption[]>([]);
    const darkMode= {useDarkMode}


    const headers: Column[] = [
        {
            key: 'producto',
            header: 'Producto',
        },
        {
            key: 'cliente',
            header: 'Cliente',
        },
        {
            key: 'cantidad',
            header: 'cantidad',
        }
    ]
    const handleSelectProducto = (option: SelectOption | undefined) => {

        setSelectProducto(option);


    };

    const handleSelectCliente = (option: SelectOption | undefined) => {
        if (detalles.length == 0) {
            setSelectCliente(option);
        } else {
            alert('Ya hay detalles en la factura. Debes eliminar los detalles actuales antes de seleccionar otro cliente.');
        }
    };

    const fields: FormField[] = [
        {
            name: 'selectCoustomer',
            placeholder: 'Cliente',
            label: 'Select',
            type: 'select',
            options: clientes,
            value: selectCliente,
            onChange: (option) => handleSelectCliente(option),
        },
        {
            name: 'selectProduct',
            placeholder: 'Producto',
            type: 'select',
            options: productos,
            value: selectProducto,
            onChange: (option) => handleSelectProducto(option),
        },
        {
            name: 'quantity',
            type: 'number',
            label: 'Cantidad',
            placeholder: 'Cantidad',
            size: 'large',
            value: cantidad,
            onChange: setCantidad
        }
    ]

    const handleAddDetail = (e: any) => {
        e.preventDefault();

        

        if (!selectCliente) {
            toast.error("Debes seleccionar un cliente", {
                icon: '👎',
                position: 'bottom-right'
            })
            setTimeout(() => {
            }, 2000);        
            return;
        }

        if (!selectProducto) {
            toast.error("Debes seleccionar un producto", {
                icon: '👎',
                position: 'bottom-right'
            })
            setTimeout(() => {
            }, 2000);             
            return;
        }

        if (!cantidad || parseInt(cantidad) <= 0) {
            toast.error("La cantidad debe ser mayor a 0", {
                icon: '👎',
                position: 'bottom-right'
            })
            setTimeout(() => {
            }, 2000);             
            return;
        }


        const selectedProduct = dataProductos?.products?.rows?.find((product: any) => product.id === selectProducto?.value);

        // Verificar si el producto ya está en el detalle
        const existingDetail = detalles.find(detail => detail.idProducto === selectProducto?.value);

        if (existingDetail) {
            // Si el producto ya está en el detalle, actualiza la cantidad
            const updatedDetalles = detalles.map(detail => {
                if (detail.idProducto === selectProducto?.value) {
                    const updatedCantidad = parseInt(detail.cantidad) + parseInt(cantidad);
                    const updatedPrecioTotal = updatedCantidad * selectedProduct?.unitPrice;

                    return {
                        ...detail,
                        cantidad: updatedCantidad,
                        precioTotal: updatedPrecioTotal,
                    };
                }
                return detail;
            });

            const newSubtotal = updatedDetalles.reduce((sum, item) => sum + item.precioTotal, 0);
            const newIva = newSubtotal * 0.08;

            setDetalles(updatedDetalles);
            setSubTotal(newSubtotal);
            setIva(newIva);
            setPrecio(newSubtotal + newIva);
        } else {
            // Si el producto no está en el detalle, agrégalo como un nuevo elemento
            const totalPrice = parseInt(cantidad || '0') * selectedProduct?.unitPrice;
            const newDetail = {
                id: detalles.length + 1,
                producto: selectProducto?.label,
                idProducto: selectProducto?.value,
                cliente: selectCliente?.label,
                cantidad: cantidad,
                precioTotal: totalPrice,
            };

            const newSubtotal = subTotal + totalPrice;
            const newIva = newSubtotal * 0.05;

            setDetalles([...detalles, newDetail]);
            setSubTotal(newSubtotal);
            setIva(newIva);
            setPrecio(newSubtotal + newIva);
        }

        setNombre('');
        setDescripcion('');
    };

    console.log(detalles)

    useEffect(() => {
        const characters = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
        ]
        let newId = ""
        for (let i = 0; i < 10; i++) {
            newId += characters[Math.floor(Math.random() * characters.length)]
        }

        setFactura(newId)
    }, []);

    useEffect(() => {
        getProductos(`products?apikey=${API_KEY}`);
        getClientes(`coustumersActive?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if (!loadingProductos && !errorProductos) {
            console.log(dataProductos?.products?.rows, 'Aqui estan los productos')
            const optionToSelectProductos: SelectOption[] = dataProductos?.products?.rows?.map((productos: any) => ({
                value: productos.id,
                label: productos.name,
            }))
            console.log(optionToSelectProductos)
            setProductos(optionToSelectProductos)
        }
    }, [dataProductos]);

    useEffect(() => {
        if (!loadingClientes && !errorClientess) {
            console.log(dataClientes?.coustumers?.rows)
            const optionToSelectClientes: SelectOption[] = dataClientes?.coustumers?.rows?.map(
                (cliente: any) => ({
                    value: cliente.id,
                    label: cliente.name,
                })
            );
            setClientes(optionToSelectClientes);
        }
    }, [dataClientes])

    //crea una funcion que elimine el pedido agregado al detalle y se reste en valor total del pedido segun el que se borre
    const handleDeleteProduct = (id: any) => {
        console.log('Esta entrando')
        console.log(id, 'Estoy aqui')
        const productoItem = dataProductos?.products?.rows?.find((product: any) => product.id == id.idProducto)

        const NuevoDetalle = detalles.filter(detalle => detalle.id !== id.id);
        const newSubtotal = NuevoDetalle?.reduce((sum, item) => {
            return parseFloat(sum) + (parseFloat(productoItem.unitPrice) * parseInt(item.cantidad))
        }, 0)

        console.log(newSubtotal, 'nuevo Subtotal')

        const newIva = newSubtotal * 0.08;

        setDetalles(NuevoDetalle)
        setSubTotal(newSubtotal)
        setIva(newIva);
        setPrecio(newSubtotal + newIva)
        setSelectCliente(undefined);
        console.log('el id eliminado es', id)
    }

    const handleCreateOrder = async () => {
        console.log('Entre')

        if (!selectCliente || !detalles.length) {
            alert('Debe seleccionar un cliente y agregar al menos un producto para crear un pedido');
            return;
        }
        let id = detalles[0]
        const productoItem = dataProductos?.products?.rows?.find((product: any) => product.id == id.idProducto)

        const requestBody = {
            code: factura,
            coustumerId: selectCliente?.value,
            state: 'Pendiente',
            total: subTotal + iva,
            Productdetails: detalles.map((detalle) => ({
                orderId: detalle.id,
                productId: detalle.idProducto,
                quantity: detalle.cantidad,
                value: productoItem.unitPrice,
                subtotal: subTotal
            })),
        };
        console.log("esto estoy mandando", requestBody)

        try {
            const response = await fetch(`https://coffvart-backend.onrender.com/api/orders?apikey=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });


            if(response){
                const data = await response.json();
                if(data.message == "Pedido creado correctamente"){
                    toast(data.message, {
                        icon: '👏',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                        navigate(-1)
                    }, 2000);
                }else if(data.msg == `La cantidad excede el stock del producto actual`){
                    toast.error(data.msg, {
                        icon: '👎',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {

                    }, 2000);
                }
            }

            setSelectCliente(undefined);
            setDetalles([]);
            setSubTotal(0);
            setIva(0);
            setPrecio(0);
            setProductos([]);
            setClientes([]);

            
        } catch (error) {
            console.error('Error al crear el pedido:', error);
            alert('Error al crear el pedido');
        }
    };
    return (
        <Container align={'CENTER'}>
            <Titles title={'CREAR PEDIDO'}/>
            <Container justify={'CENTER'} align={'TOP'} direction={'ROW'} gap={2}>
                <div style={{width: '50%'}}>
                    <Titles title={`factura N°${factura}`} level={2} transform={'UPPERCASE'}/>
                    <FormRedisign
                        fields={fields}
                        onSubmit={handleAddDetail}
                        button={"Agregar"}
                        cancelButton={true}
                    />
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

                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <Titles title={'Detalle del pedido'} level={2} transform={'UPPERCASE'}/>
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
                  .table__lightMode .totals-table th {
                    background-color: #f2f2f2;
                  }
                  .table__darkModee .totals-table th {
                    background-color: #000000;
                  }
                `}
                    </style>
                    <div className="info">
                        <table className={`totals-table ${darkMode ? 'table__darkMode' : 'table__lightMode'}`}>
                            <thead>
                            <tr>
                                <th>Concepto</th>
                                <th>Monto</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Subtotal</td>
                                <td>{subTotal}</td>
                            </tr>
                            <tr>
                                <td>IVA</td>
                                <td>{iva}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{precio}</td>
                            </tr>
                            </tbody>
                        </table>
                        <Button text={'Crear pedido'} onClick={() => handleCreateOrder()} fill={false} type={'SUBMIT'}/>
                    </div>
                </div>
            </Container>
        </Container>
    );
}

export default OrdersCreate;