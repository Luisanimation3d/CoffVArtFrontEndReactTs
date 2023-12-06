import { FormField, SelectOption} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Column } from '../../types/Table';
import { Container } from '../../components/Container/Container';
import { Titles } from '../../components/Titles/Titles';
import { Table } from '../../components/Table/Table';

export const ProductionOrdersCreate= ()=>{
    const {data: dataSupplie, loading: loadingSupplie, error: errorSupplies, get: getSupplies} = useFetch('https://coffvart-backend.onrender.com/api/')
    const {data: dataProcess, loading: loadingProcess, error: errorProcesses, get: getProcesses} = useFetch('https://coffvart-backend.onrender.com/api/')
    
    const [detalles, setDetalles] = useState<any[]>([]);
    const [orderNumber, setOrderNumber] = useState<string>('');
    const [selectProcess, setSelectProcess] = useState<SelectOption | undefined>(undefined);
    const [selectSupplie, setSelectSupplie] = useState<SelectOption | undefined>(undefined);
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [supplies, setSupplies] = useState<SelectOption[]>([]);
    const [processes, setProcesses] = useState<SelectOption[]>([]);
    
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
            key: 'supplie',
            header: 'Insumo',
        },
        {
            key: 'process',
            header: 'Proceso',
        },
        {
            key: 'cantidad',
            header: 'Cantidad',
        }
    ]
    const handleSelectInsumo = (option: SelectOption | undefined) => {
        setSelectSupplie(option);
      };
    
      const handleSelectProcess = (option: SelectOption | undefined) => {
        setSelectProcess(option);
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
            name: 'selectSupplie',
            placeholder: 'Insumo',
            type: 'select',
            options: supplies,
            value: selectSupplie,
            onChange: (option) => handleSelectInsumo(option),
        },
        {
            name: 'selectProcess',
            placeholder: 'Proceso',
            label: 'Select',
            type: 'select',
            options: processes,
            value: selectProcess,
            onChange: (option) => handleSelectProcess(option),
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


        const selectedSupplie = dataSupplie?.supplies?.rows?.find((supplies: any) => supplies.id === selectSupplie?.value)
        const totalPrice = parseInt(cantidad || '0') * selectedSupplie?.unitPrice
        const newDetail = {
            id: detalles.length +1,
            orderNumber: orderNumber,
            supplie: selectSupplie?.label,
            idSupplie: selectSupplie?.value,
            process: selectProcess?.label,
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
        getSupplies(`supplies?apikey=${API_KEY}`);
        getProcesses(`processes?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if(!loadingSupplie && !errorSupplies) {
            console.log(dataSupplie?.supplies?.rows, 'Aqui estan los Insumos')
            const optionToSelectSupplies: SelectOption[] = dataSupplie?.supplies?.rows?.map((supplies: any) => ({
                value: supplies.id,
                label: supplies.name,
            }))
            console.log(optionToSelectSupplies)
            setSupplies(optionToSelectSupplies)
        }
    }, [dataSupplie]);

    useEffect(() => {
        if(!loadingProcess && !errorProcesses) {
            console.log(dataProcess?.process?.rows)
            const optionToSelectProcess: SelectOption[] = dataProcess?.process?.rows?.map(
                (process: any) => ({
                  value: process.id,
                  label: process.name,
                })
              );
              setProcesses(optionToSelectProcess);
        }    
    }, [dataProcess])

    //crea una funcion que elimine el pedido agregado al detalle y se reste en valor total del pedido segun el que se borre
    const handleDeleteProduct = (id: any) => {
        console.log('Esta entrando')
        console.log(id, 'Estoy aqui')
        const supplieItem = dataSupplie?.supplies?.rows?.find((supplie: any) => supplieItem.id == id.idSupplie)

        const NuevoDetalle= detalles.filter(detalle=> detalle.id !== id.id);
        const newSubtotal= NuevoDetalle?.reduce((sum, item) => {
            return parseFloat(sum)+ (parseFloat(supplieItem.unitPrice) * parseInt(item.cantidad))
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
                <Button text={'Crear Orden'} onClick={() => null} fill={false} />
              </div>
            </div>
          </Container>
        </Container>
      );
    }


