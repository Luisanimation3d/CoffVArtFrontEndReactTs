
import {useEffect, useState} from "react";

import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {Button} from "../../components/Button/Button.tsx";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY} from "../../constantes.ts";

export const OrdersCreate = () => {
    const {data: dataProductos, loading: loadingProductos, error: errorProductos, get: getProductos} = useFetch('https://coffvart-backend.onrender.com/api/')
    const {data: dataClientes, loading: loadingClientes, error: errorClientess, get: getClientes} = useFetch('https://coffvart-backend.onrender.com/api/')
    // const { POST } = useFetch ('https://coffvart-backend.onrender.com/api/')

    // const {data: dataRoles, loading: loadingRoles, error: errorRoles, get: getRoles} = useFetch('https://coffvart-backend.onrender.com/api/')
    const [detalles, setDetalles] = useState<any[]>([]);
    const [factura, setFactura] = useState<string>('');
    const [selectCliente, setSelectCliente] = useState<SelectOption | undefined>(undefined);
    const [selectProducto, setSelectProducto] = useState<SelectOption | undefined>(undefined);
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [productos, setProductos] = useState<SelectOption[]>([]);
    const [clientes, setClientes] = useState<SelectOption[]>([]);
   

    const headers: Column[] = [
        {
            key: 'id',
            header: 'ID',
        },
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
        if (selectCliente) {
            setSelectProducto(option);
          } else {
            alert('Debe seleccionar un cliente antes de agregar productos');
          }
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
            name: 'selectProduct',
            placeholder: 'Producto',
            type: 'select',
            options: productos,
            value: selectProducto,
            onChange: (option) => handleSelectProducto(option),
        },
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
        console.log('Esta entrando')
        if (!selectCliente) {
            alert('Debe seleccionar un cliente antes de agregar productos');
            return;
          }
        if(!selectProducto){
            alert('Debe seleccionar un producto antes de agregar productos');
            return;
        }
        const selectedProduct = dataProductos?.products?.rows?.find((product: any) => product.id === selectProducto?.value)
        const totalPrice = parseInt(cantidad || '0') * selectedProduct?.unitPrice
        const newDetail = {
            id: detalles.length +1,
            producto: selectProducto?.label,
            idProducto: selectProducto?.value,
            cliente: selectCliente?.label,
            cantidad: cantidad,
            precioTotal: totalPrice,
        }

        const newSubtotal = subTotal + totalPrice
        const newIva = newSubtotal * 0.08
        setDetalles([...detalles, newDetail])
        setSubTotal(newSubtotal)
        setIva(newIva)
        setPrecio(newSubtotal + newIva)
        setNombre('')
        setDescripcion('')
    }
    console.log(detalles)

    useEffect(() => {
        const characters = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
        ]
        let newId = ""
        for(let i = 0; i < 10; i++) {
            newId += characters[Math.floor(Math.random() * characters.length)]
        }

        setFactura(newId)
    }, []);

    useEffect(() => {
        getProductos(`products?apikey=${API_KEY}`);
        getClientes(`coustumers?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if(!loadingProductos && !errorProductos) {
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
        if(!loadingClientes && !errorClientess) {
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

        const NuevoDetalle= detalles.filter(detalle=> detalle.id !== id.id);
        const newSubtotal= NuevoDetalle?.reduce((sum, item) => {
            return parseFloat(sum)+ (parseFloat(productoItem.unitPrice) * parseInt(item.cantidad))
        }, 0)

        console.log(newSubtotal, 'nuevo Subtotal')

        const newIva= newSubtotal * 0.08; 

        setDetalles(NuevoDetalle)
        setSubTotal(newSubtotal)
        setIva(newIva);
        setPrecio(newSubtotal + newIva)
        setSelectCliente(undefined);
        console.log('el id eliminado es', id)
    }

    const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Entre')
      
        // Check if all required fields are filled
        if (!selectCliente || !detalles.length) {
          alert('Debe seleccionar un cliente y agregar al menos un producto para crear un pedido');
          return;
        }
      
        // Prepare the request body
        const requestBody = {
          cliente: selectCliente?.value,
          detalles: detalles.map((detalle) => ({
            producto: detalle.producto,
            cantidad: detalle.cantidad,
          })),
        };
      
        // Send the POST request to the API
        try {
            const response = await fetch(`https://coffvart-backend.onrender.com/api/orders?apikey=${API_KEY}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
      
          if (!response.ok) {
            alert('Error al crear el pedido');
            console.error('Error al crear el pedido:', response.statusText);
            return;
          }
      
          setSelectCliente(undefined);
          setDetalles([]);
          setSubTotal(0);
          setIva(0);
          setPrecio(0);
          setProductos([]);
          setClientes([]);
      
          alert('Pedido creado con éxito');
        } catch (error) {
          console.error('Error al crear el pedido:', error);
          alert('Error al crear el pedido');
        }
      };
    return (
        <Container align={'CENTER'}>
          <Titles title={'CREAR PEDIDO'}/>
          <Container justify={'CENTER'} align={'TOP'} direction={'ROW'} gap={2}>
            <div style={{ width: '50%' }}>
              <Titles title={`factura N°${factura}`} level={2} transform={'UPPERCASE'}/>
              <Form
                fields={fields}
                onSubmit={handleAddDetail}
                button={<Button text={'Agregar'} onClick={() => null} type={'SUBMIT'} fill={false} />}
                cancelButton={false}
              />
            </div>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Titles title={'Detalle del pedido'} level={2} transform={'UPPERCASE'}/>
              <Table columns={headers} data={detalles} onRowClick={() => null} deleteAction={{ onClick: handleDeleteProduct }}/>
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
                <Button text={'Crear pedido'} onClick={() => handleCreateOrder} fill={false} type={'SUBMIT'}/>
              </div>
            </div>
          </Container>
        </Container>
      );
    }