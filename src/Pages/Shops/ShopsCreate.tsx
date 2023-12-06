
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

export const ShopsCreate = () => {
    const {data: dataInsumos, loading: loadingInsumos, error: errorInsumos, get: getInsumos} = useFetch('https://coffvart-backend.onrender.com/api/')
    const {data: dataProveedores, loading: loadingProveedores, error: errorProveedores, get: getProveedores} = useFetch('https://coffvart-backend.onrender.com/api/')
    // const { POST } = useFetch ('https://coffvart-backend.onrender.com/api/')

    // const {data: dataRoles, loading: loadingRoles, error: errorRoles, get: getRoles} = useFetch('https://coffvart-backend.onrender.com/api/')
    const [detalles, setDetalles] = useState<any[]>([]);
    const [factura, setFactura] = useState<string>('');
    const [selectProveedor, setSelectProveedor] = useState<SelectOption | undefined>(undefined);
    const [selectInsumo, setSelectInsumo] = useState<SelectOption | undefined>(undefined);
    const [nombre, setNombre] = useState('');
    const [invoice, setInvoice] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [insumos, setInsumos] = useState<SelectOption[]>([]);
    const [proveedores, setProveedores] = useState<SelectOption[]>([]);
   

    const headers: Column[] = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'factura',
            header: 'Factura',
        },
        {
            key: 'insumo',
            header: 'Insumo',
        },
        {
            key: 'proveedor',
            header: 'Proveedor',
        },
        {
            key: 'cantidad',
            header: 'Cantidad',
        }
    ]
    const handleSelectInsumo = (option: SelectOption | undefined) => {
        setSelectInsumo(option);
      };
    
      const handleSelectProveedor = (option: SelectOption | undefined) => {
        setSelectProveedor(option);
      };

    const fields: FormField[] = [
        {
            name: 'invoice',
            type: 'text',
            label: 'Factura',
            placeholder: 'Factura',
            size: 'large',
            value: invoice,
            onChange: setInvoice
        },
        {
            name: 'selectSupply',
            placeholder: 'Insumo',
            type: 'select',
            options: insumos,
            value: selectInsumo,
            onChange: (option) => handleSelectInsumo(option),
        },
        {
            name: 'selectSupplier',
            placeholder: 'Proveedor',
            label: 'Select',
            type: 'select',
            options: proveedores,
            value: selectProveedor,
            onChange: (option) => handleSelectProveedor(option),
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


        const selectedSupply = dataInsumos?.supplies?.rows?.find((supplies: any) => supplies.id === selectInsumo?.value)
        const totalPrice = parseInt(cantidad || '0') * selectedSupply?.unitPrice
        const newDetail = {
            id: detalles.length +1,
            factura: invoice,
            insumo: selectInsumo?.label,
            idInsumo: selectInsumo?.value,
            proveedor: selectProveedor?.label,
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

    // useEffect(() => {
    //     const characters = [
    //         "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    //         "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
    //     ]
    //     let newId = ""
    //     for(let i = 0; i < 10; i++) {
    //         newId += characters[Math.floor(Math.random() * characters.length)]
    //     }

    //     setFactura(newId)
    // }, []);

    useEffect(() => {
        getInsumos(`supplies?apikey=${API_KEY}`);
        getProveedores(`suppliers?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if(!loadingInsumos && !errorInsumos) {
            console.log(dataInsumos?.supplies?.rows, 'Aqui estan los Insumos')
            const optionToSelectInsumos: SelectOption[] = dataInsumos?.supplies?.rows?.map((insumos: any) => ({
                value: insumos.id,
                label: insumos.name,
            }))
            console.log(optionToSelectInsumos)
            setInsumos(optionToSelectInsumos)
        }
    }, [dataInsumos]);

    useEffect(() => {
        if(!loadingProveedores && !errorProveedores) {
            console.log(dataProveedores?.suppliers?.rows)
            const optionToSelectProveedores: SelectOption[] = dataProveedores?.suppliers?.rows?.map(
                (proveedor: any) => ({
                  value: proveedor.id,
                  label: proveedor.name,
                })
              );
              setProveedores(optionToSelectProveedores);
        }    
    }, [dataProveedores])

    //crea una funcion que elimine el pedido agregado al detalle y se reste en valor total del pedido segun el que se borre
    const handleDeleteProduct = (id: any) => {
        console.log('Esta entrando')
        console.log(id, 'Estoy aqui')
        const insumoItem = dataInsumos?.supplies?.rows?.find((supply: any) => supply.id == id.idInsumo)

        const NuevoDetalle= detalles.filter(detalle=> detalle.id !== id.id);
        const newSubtotal= NuevoDetalle?.reduce((sum, item) => {
            return parseFloat(sum)+ (parseFloat(insumoItem.unitPrice) * parseInt(item.cantidad))
        }, 0)

        console.log(newSubtotal, 'nuevo Subtotal')

        const newIva= newSubtotal * 0.08; 

        setDetalles(NuevoDetalle)
        setSubTotal(newSubtotal)
        setIva(newIva);
        setPrecio(newSubtotal + newIva)
        console.log('el id eliminado es', id)
    }
    
    
    
    
    return (
        <Container align={'CENTER'}>
          <Titles title={'CREAR COMPRA'}/>
          <Container justify={'CENTER'} align={'TOP'} direction={'ROW'} gap={2}>
            <div style={{ width: '50%' }}>
              <Titles title={`factura N°${invoice}`} level={2} transform={'UPPERCASE'}/>
              <Form
                fields={fields}
                onSubmit={handleAddDetail}
                button={<Button text={'Agregar'} onClick={() => null} type={'SUBMIT'} fill={false} />}
                cancelButton={false}
              />
            </div>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Titles title={'Detalle de la Compra'} level={2} transform={'UPPERCASE'}/>
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
                <Button text={'Crear Compra'} onClick={() => null} fill={false} />
              </div>
            </div>
          </Container>
        </Container>
      );
    }