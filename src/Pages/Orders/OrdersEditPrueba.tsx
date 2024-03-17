import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container.tsx";
import { Titles } from "../../components/Titles/Titles.tsx";
import { Column } from "../../types/Table";
import { Table } from "../../components/Table/Table.tsx";
import { Form } from "../../components/Form/Form.tsx";
import { FormField, SelectOption } from "../../types/Form";
import { Button } from "../../components/Button/Button.tsx";
import { useFetch } from "../../hooks/useFetch.tsx";
import { API_KEY, API_URL } from "../../utils/constantes.ts";
import { useParams } from "react-router-dom";

export const OrdersEditPrueba = () => {
    const {id} = useParams<{ id: string }>()
    const {get, data, loading} = useFetch(API_URL)
  const {
    data: dataProductos,
    loading: loadingProductos,
    error: errorProductos,
    get: getProductos,
  } = useFetch('https://coffvart-backend.onrender.com/api/');

  const {
    data: dataClientes,
    loading: loadingClientes,
    error: errorClientes,
    get: getClientes,
  } = useFetch('https://coffvart-backend.onrender.com/api/');

  const [editOrderId, setEditOrderId] = useState<number | null>(null);
  const [detalles, setDetalles] = useState<any[]>([]);
  const [factura, setFactura] = useState<string>('');
  const [selectCliente, setSelectCliente] = useState<SelectOption | undefined>(undefined);
  const [selectProducto, setSelectProducto] = useState<SelectOption | undefined>(undefined);
  const [selectestado, setSelectEstado] = useState<SelectOption | undefined>(undefined);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [productos, setProductos] = useState<SelectOption[]>([]);
  const [clientes, setClientes] = useState<SelectOption[]>([]);

  const optionsState: SelectOption[] = [
    {
      value: 'anulado',
      label: 'Anulado',
    },
    {
      value: 'pendiente',
      label: 'Pendiente',
    },
    {
      value: 'confirmado',
      label: 'Confirmado',
    },
  ];

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
      header: 'Cantidad',
    },
    {
      key: 'estado',
      header: 'Estado',
    },
  ];

  const handleSelectProducto = (option: SelectOption | undefined) => {
    setSelectProducto(option);
  };

  const handleSelectState = (option: SelectOption | undefined) => {
    setSelectEstado(option);
  };

  const handleSelectCliente = (option: SelectOption | undefined) => {
    if (detalles.length === 0) {
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
      onChange: (value) => setCantidad(value),
    },
    {
      name: 'state',
      placeholder: 'Estado',
      type: 'select',
      options: optionsState,
      value: selectestado,
      onChange: (option) => handleSelectState(option),
    },
  ];

  useEffect(() => {
    get(`orders/${id}?apikey=${API_KEY}`);
    }, []);

 useEffect (() => {
    if (!loading){
         console.log(data, "esto es lo que me traje")
 
         setSelectCliente({
             value: data.coustumerId,
             label: data.coustumer.name
         });
         setSelectProducto({
             value: data.Productdetails[0].productId,
             label: data.Productdetails[0].product.name
         });
         setCantidad(data.Productdetails[0].quantity);
 
         setSelectEstado({
             value: data.state,
             label: data.state
         });
         const orderDetails = data.Productdetails.map((detail: any) => ({
             id: detail.id,
             producto: detail.product.name,
             idProducto: detail.productId,
             cliente: data.coustumer.name,
             cantidad: detail.quantity,
             estado: data.state,
             precioTotal: detail.subtotal,
         }));
         setDetalles(orderDetails);
         }
 }, [data]);

  const handleEditDetail = (editedDetail: any) => {
    // Validar la existencia de cliente, producto y cantidad
    if (!selectCliente || !selectProducto || !cantidad || parseInt(cantidad) <= 0) {
      alert('Por favor, complete la información requerida para editar el detalle.');
      return;
    }

    const selectedProduct = dataProductos?.products?.rows?.find(
      (product: any) => product.id === selectProducto?.value
    );

    // Verificar si el producto ya está en el detalle
    const existingDetail = detalles.find(
      (detail) => detail.idProducto === selectProducto?.value
    );

    if (existingDetail) {
      // Si el producto ya está en el detalle, actualizar la cantidad
      const updatedDetalles = detalles.map((detail) => {
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

      const newSubtotal = updatedDetalles.reduce(
        (sum, item) => sum + item.precioTotal,
        0
      );
      const newIva = newSubtotal * 0.08;

      setDetalles(updatedDetalles);
      setSubTotal(newSubtotal);
      setIva(newIva);
      setPrecio(newSubtotal + newIva);
    } else {
      // Si el producto no está en el detalle, agregarlo como un nuevo elemento
      const totalPrice = parseInt(cantidad || '0') * selectedProduct?.unitPrice;
      const newDetail = {
        id: editedDetail.id, // Mantener el mismo ID para la edición
        producto: selectProducto?.label,
        idProducto: selectProducto?.value,
        cliente: selectCliente?.label,
        cantidad: cantidad,
        precioTotal: totalPrice,
      };

      const updatedDetalles = detalles.map((detail) =>
        detail.id === editedDetail.id ? newDetail : detail
      );

      const newSubtotal = updatedDetalles.reduce(
        (sum, item) => sum + item.precioTotal,
        0
      );
      const newIva = newSubtotal * 0.05;

      setDetalles(updatedDetalles);
      setSubTotal(newSubtotal);
      setIva(newIva);
      setPrecio(newSubtotal + newIva);
    }

    // Limpiar campos de entrada si es necesario
    setSelectCliente(undefined);
    setSelectProducto(undefined);
    setCantidad('');
  };

  const handleDeleteProduct = (id: any) => {
    const productoItem = dataProductos?.products?.rows?.find((product: any) => product.id == id.idProducto);

    const nuevoDetalle = detalles.filter(detalle => detalle.id !== id.id);
    const newSubtotal = nuevoDetalle?.reduce((sum, item) => {
      return parseFloat(sum) + (parseFloat(productoItem.unitPrice) * parseInt(item.cantidad))
    }, 0);

    const newIva = newSubtotal * 0.08;

    setDetalles(nuevoDetalle);
    setSubTotal(newSubtotal);
    setIva(newIva);
    setPrecio(newSubtotal + newIva);
    setSelectCliente(undefined);
  };

  const handleCreateOrder = async () => {
    if (!selectCliente || !detalles.length) {
      alert('Debe seleccionar un cliente y agregar al menos un producto para crear un pedido');
      return;
    }

    const id = detalles[0];
    const productoItem = dataProductos?.products?.rows?.find((product: any) => product.id == id.idProducto);

    const requestBody = {
      code: factura,
      coustumerId: selectCliente?.value,
      state: selectestado?.value,
      total: subTotal + iva,
      Productdetails: detalles.map((detalle) => ({
        orderId: editOrderId || detalle.id,
        productId: detalle.idProducto,
        quantity: detalle.cantidad,
        value: productoItem.unitPrice,
        subtotal: subTotal,
      })),
    };
    console.log(requestBody, 'esto es lo que voy a mandar')
    try {
      const response = await fetch(`https://coffvart-backend.onrender.com/api/orders?apikey=${API_KEY}`, {
        method: editOrderId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        alert(`Error al ${editOrderId ? "editar" : "crear"} el pedido`);
        console.error(
          `Error al ${editOrderId ? "editar" : "crear"} el pedido:`,
          response.statusText
        );
        return;
      }

      setEditOrderId(null);
      setSelectCliente(undefined);
      setDetalles([]);
      setSubTotal(0);
      setIva(0);
      setPrecio(0);
      setProductos([]);
      setClientes([]);

      alert(`${editOrderId ? "Pedido editado" : "Pedido creado"} con éxito`);
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      alert('Error al crear el pedido');
    }
  };

  useEffect(() => {
    const characters = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
    ];

    let newId = "";
    for (let i = 0; i < 10; i++) {
      newId += characters[Math.floor(Math.random() * characters.length)];
    }

    setFactura(newId);
  }, []);

  useEffect(() => {
    getProductos(`products?apikey=${API_KEY}`);
    getClientes(`coustumers?apikey=${API_KEY}`);
  }, []);

  useEffect(() => {
    if (!loadingProductos && !errorProductos) {
      const optionToSelectProductos: SelectOption[] = dataProductos?.products?.rows?.map((producto: any) => ({
        value: producto.id,
        label: producto.name,
      }));

      setProductos(optionToSelectProductos);
    }
  }, [dataProductos]);

  useEffect(() => {
    if (!loadingClientes && !errorClientes) {
      const optionToSelectClientes: SelectOption[] = dataClientes?.coustumers?.rows?.map(
        (cliente: any) => ({
          value: cliente.id,
          label: cliente.name,
        })
      );

      setClientes(optionToSelectClientes);
    }
  }, [dataClientes]);


  return (
    <Container align={'CENTER'}>
      <Titles title={'EDITAR PEDIDO'} />
      <Container justify={'CENTER'} align={'TOP'} direction={'ROW'} gap={2}>
        <div style={{ width: '50%' }}>
          <Titles title={`Factura N°${factura}`} level={2} transform={'UPPERCASE'} />
          <Form
            fields={fields}
            onSubmit={handleEditDetail}
            button={<Button text={'Agregar'} onClick={() => null} type={'SUBMIT'} fill={false} />}
            cancelButton={false}
          />
        </div>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Titles title={'Detalle del pedido'} level={2} transform={'UPPERCASE'} />
          <Table columns={headers} data={detalles} onRowClick={() => null} deleteAction={{ onClick: handleDeleteProduct }} />
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
            <Button text={'Crear pedido'} onClick={() => handleCreateOrder()} fill={false} type={'SUBMIT'} />
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default OrdersEditPrueba;
