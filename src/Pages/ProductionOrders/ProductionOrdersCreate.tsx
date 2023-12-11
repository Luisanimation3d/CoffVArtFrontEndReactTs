import { FormField, SelectOption} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY, API_URL } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Column } from '../../types/Table';
import { Container } from '../../components/Container/Container';
import { Titles } from '../../components/Titles/Titles';
import { Table } from '../../components/Table/Table';

export const ProductionOrdersCreate= ()=>{
    const {data: dataProductos, loading: loadingProductos, error: errorProductos, get: getProductos} = useFetch(API_URL)
    
    const [detalles, setDetalles] = useState<any[]>([]);
    const [orderNumber, setOrderNumber] = useState<string>('');
    const [selectProducto, setSelectProducto] = useState<SelectOption | undefined>(undefined);
    const [cantidad, setCantidad] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [subSupplyTotal, setSubSupplyTotal] = useState(0);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [supplies, setSupplies] = useState<SelectOption[]>([]);
    const [productos, setProductos] = useState<SelectOption[]>([]);
    
    const headers: Column[] = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'orderNumber',
            header: 'Numero de orden',
        },
        {
            key: 'producto',
            header: 'Producto',
        },
        {
            key: 'cantidad',
            header: 'Cantidad',
        }
    ]
    
      const handleSelectProducto = (option: SelectOption | undefined) => {
        setSelectProducto(option);
      };

    const fields: FormField[] = [
        {
            name: 'orderNumber',
            type: 'text',
            label: 'Numero de orden',
            placeholder: '1',
            size: 'large',
            value: orderNumber,
            onChange: setOrderNumber
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
        console.log('Esta entrando')
        if (!selectProducto) {
          alert('Debe seleccionar un producto antes de agregar productos');
          return;
        }
        if (!cantidad || parseInt(cantidad) <= 0) {
          alert('Debe ingresar una cantidad válida antes de agregar productos');
          return;
        }


        const selectedProduct = dataProductos?.products?.rows?.find((product: any) => product.id === selectProducto?.value);
        const existingDetail = detalles.find(detail => detail.idProducto === selectProducto?.value);
        
        if (existingDetail) {
          // Si el producto ya está en el detalle, actualiza la cantidad
          const updatedDetalles = detalles.map(detail => {
            if (detail.idProducto === selectProducto?.value) {
              const updatedCantidad = parseInt(detail.cantidad) + parseInt(cantidad);
              const updatedAmountSupplyTotal = updatedCantidad * selectedProduct?.amountSupply;
      
              return {
                ...detail,
                cantidad: updatedCantidad,
                AmountSupplyTotal: updatedAmountSupplyTotal,
              };
            }
            return detail;
          });
        
          const newSubSupplyTotal = updatedDetalles.reduce((sum, item) => sum + item.amountSupplyTotal, 0);
          const newIva = newSubSupplyTotal * 0.08;

          setDetalles(updatedDetalles);
          setSubTotal(newSubSupplyTotal);
          setIva(newIva);
          setSubSupplyTotal(newSubSupplyTotal + newIva);
    }else {
      // Si el producto no está en el detalle, agrégalo como un nuevo elemento
      const totalAmountSupply = parseInt(cantidad || '0') * selectedProduct?.amountSupply;
      const newDetail = {
        id: detalles.length + 1,
        producto: selectProducto?.label,
        idProducto: selectProducto?.value,
        cantidad: cantidad,
        AmountSupplyTotal: totalAmountSupply,
      };
  
      const newSubSupplytotal = subSupplyTotal + totalAmountSupply;
      const newIva = newSubSupplytotal * 0.05;
  
      setDetalles([...detalles, newDetail]);
      setSubTotal(newSubSupplytotal);
      setIva(newIva);
      setSubSupplyTotal(newSubSupplytotal + newIva);
    }
  };
  
  console.log(detalles)

  useEffect(() => {
      getProductos(`products?apikey=${API_KEY}`);
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
  //crea una funcion que elimine el pedido agregado al detalle y se reste en valor total del pedido segun el que se borre
  const handleDeleteProduct = (id: any) => {
      console.log('Esta entrando')
      console.log(id, 'Estoy aqui')
      const productoItem = dataProductos?.products?.rows?.find((product: any) => product.id == id.idProducto)

      const NuevoDetalle= detalles.filter(detalle=> detalle.id !== id.id);
      const newSubSupplytotal= NuevoDetalle?.reduce((sum, item) => {
          return parseFloat(sum)+ (parseFloat(productoItem.amountSupply) * parseInt(item.cantidad))
      }, 0)

      console.log(newSubSupplytotal, 'nuevo Subtotal')

      const newIva= newSubSupplytotal * 0.08; 

      setDetalles(NuevoDetalle)
      setSubTotal(newSubSupplytotal)
      setIva(newIva);
      setSubSupplyTotal(newSubSupplytotal + newIva)
      console.log('el id eliminado es', id)
  }

  const handleCreateOrder = async () => {
      console.log('Entre')
    
      let id = detalles[0]
      const productoItem = dataProductos?.products?.rows?.find((product: any) => product.id == id.idProducto)

      const requestBody = {
        total: subTotal + iva,
        Productdetails: detalles.map((detalle) => ({
          orderId: detalle.id,
          productId: detalle.idProducto,
          quantity: detalle.cantidad,
          value: productoItem.amountSupply,
          subSupplytotal: subSupplyTotal 
        })),
      };
      console.log("esto estoy mandando" , requestBody)
    
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
    
        setDetalles([]);
        setSubTotal(0);
        setIva(0);
        setSubSupplyTotal(0);
        setProductos([]);
    
        alert('Orden creada con éxito');
      } catch (error) {
        console.error('Error al crear el pedido:', error);
        alert('Error al crear el pedido');
      }
    };
    return (
        <Container align={'CENTER'}>
          <Titles title={'Finalizar Orden'}/>
          <Container justify={'CENTER'} align={'TOP'} direction={'ROW'} gap={2}>
            <div style={{ width: '50%' }}>
              <Titles title={`orden N°${orderNumber}`} level={2} transform={'UPPERCASE'}/>
              <Form
                fields={fields}
                onSubmit={handleAddDetail}
                button={<Button text={'Agregar'} onClick={() => null} type={'SUBMIT'} fill={false} />}
                cancelButton={false}
              />
            </div>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Titles title={'Detalle de la Orden'} level={2} transform={'UPPERCASE'}/>
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
                      <td>Insumo Total</td>
                      <td>{'1000'}</td>
                    </tr>
                    <tr>
                      <td>Insumo Usado</td>
                      <td>{'200'}</td>
                    </tr>
                    <tr>
                      <td>Insumo Disponible</td>
                      <td>{'800'}</td>
                    </tr>
                  </tbody>
                </table>
                <Button text={'Crear Orden'} onClick={() => null} fill={false} />
              </div>
            </div>
          </Container>
        </Container>
    );
}

export default ProductionOrdersCreate;

