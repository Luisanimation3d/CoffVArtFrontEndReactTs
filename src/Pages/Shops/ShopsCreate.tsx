import {useEffect, useState} from "react";
import { TableRedisign } from "../../components/TableRedisign/TableRedisign.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {Button} from "../../components/Button/Button.tsx";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY} from "../../constantes.ts";
import { FormRedisign } from "../../components/FormRedisign/FormRedisign.tsx";
import { useDarkMode} from "../../context/DarkMode.tsx";


export const ShopsCreate = () => {
    const [error, setError] = useState<{[key: string]: string}>({})

    const {
        data: dataInsumos,
        loading: loadingInsumos,
        error: errorInsumos,
        get: getInsumos
    } = useFetch('https://coffvart-backend.onrender.com/api/')
    const {
        data: dataProveedores,
        loading: loadingProveedores,
        error: errorProveedores,
        get: getProveedores
    } = useFetch('https://coffvart-backend.onrender.com/api/')
    // const { POST } = useFetch ('https://coffvart-backend.onrender.com/api/')

    // const {data: dataRoles, loading: loadingRoles, error: errorRoles, get: getRoles} = useFetch('https://coffvart-backend.onrender.com/api/')
    const [detalles, setDetalles] = useState<any[]>([]);
    const [factura, setFactura] = useState<string>('');
    const [selectProveedor, setSelectProveedor] = useState<SelectOption | undefined>(undefined);
    const [selectInsumo, setSelectInsumo] = useState<SelectOption | undefined>(undefined);
    const [nombre, setNombre] = useState('');
    const [invoice, setInvoice] = useState('');
    const [date, setDate] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [description, setDescription] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [unitPrice, setUnitPrice] = useState('');
    const [precio, setPrecio] = useState(0);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [insumos, setInsumos] = useState<SelectOption[]>([]);
    const [proveedores, setProveedores] = useState<SelectOption[]>([]);
    const darkMode= {useDarkMode}



    const headers: Column[] = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'invoice',
            header: 'Factura',
        },
        {
            key: 'insumo',
            header: 'Insumo',
        },
        {
            key: 'unitPrice',
            header: 'Precio Unitario',   
        },
        {
            key: 'proveedor',
            header: 'Proveedor',
        },
        {
            key: 'cantidad',
            header: 'Cantidad',
        },


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
            label: 'Cantidad (Kg)',
            placeholder: 'Cantidad (Kg)',
            size: 'large',
            value: cantidad,
            onChange: setCantidad
        },
        {
            name: 'unitPrice',
            type: 'number',
            label: 'Precio Unitario',
            placeholder: 'Precio Unitario',
            size: 'large',
            value: unitPrice,
            onChange: setUnitPrice
        },
        {
            name: 'date',
            type: 'date',
            label: 'Fecha',
            placeholder: 'Fecha',
            size: 'large',
            value: date,
            onChange: setDate
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Descripción',
            placeholder: 'Descripción',
            size: 5,
            value: description,
            onChange: setDescription
        }
    ]

    
        const handleAddDetail = (e: any) => {
            e.preventDefault();

            if (!invoice) {
                alert('Debe ingresar el número de factura antes de agregar insumos');
                return;
            }
            if (!selectInsumo) {
                alert('Debe seleccionar un insumo antes de agregar a la tabla');
                return;
            }
    
            if (!selectProveedor) {
                alert('Debe seleccionar un proveedor antes de agregar insumos');
                return;
            }
    
            if (!cantidad || parseInt(cantidad) <= 0) {
                alert('Debe ingresar una cantidad válida antes de agregar insumos');
                return;
            }


        //const selectedSupply = dataInsumos?.supplies?.rows?.find((supplies: any) => supplies.id === selectedSupply?.value)

        const existingDetail = detalles.find(detail => detail.idInsumo === selectInsumo?.value);

        if (existingDetail) {
            // Si el producto ya está en el detalle, actualiza la cantidad
            const updatedDetalles = detalles.map(detail => {
                if (detail.idInsumo === selectInsumo.value) {
                    const updatedCantidad = parseInt(detail.cantidad) + parseInt(cantidad);
                    const updatedPrecioTotal = updatedCantidad * parseFloat(unitPrice);

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
           
        const totalPrice = parseInt(cantidad || '0') * parseFloat(unitPrice)
        const newDetail = {
            id: detalles.length + 1,
            invoice: invoice,
            insumo: selectInsumo?.label,
            idInsumo: selectInsumo?.value,
            proveedor: selectProveedor?.label,
            cantidad: cantidad,
            unitPrice: unitPrice,
            precioTotal: totalPrice,
            };

            const newSubtotal = subTotal + totalPrice
            const newIva = newSubtotal * 0.08
            setDetalles([...detalles, newDetail])
            setSubTotal(newSubtotal)
            setIva(newIva)
            setPrecio(newSubtotal + newIva)
        }

    };
    




    

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
        if (!loadingInsumos && !errorInsumos) {
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
        if (!loadingProveedores && !errorProveedores) {
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
        //const insumoItem = dataInsumos?.supplies?.rows?.find((supply: any) => supply.id == id.idInsumo)

        const NuevoDetalle = detalles.filter(detalle => detalle.id !== id.id);
        const newSubtotal = NuevoDetalle?.reduce((sum, item) => {
            return parseFloat(sum) + (parseFloat(item.unitPrice) * parseInt(item.cantidad))
        }, 0)

        console.log(newSubtotal, 'nuevo Subtotal')

        const newIva = newSubtotal * 0.08;

        setDetalles(NuevoDetalle)
        setSubTotal(newSubtotal)
        setIva(newIva);
        setPrecio(newSubtotal + newIva)
        setSelectProveedor(undefined);
        console.log('el id eliminado es', id)
    }

    const handleCreateShop = async () => {
        console.log('Entre')

        if (!selectProveedor || !detalles.length) {
            alert('Debe seleccionar un proveedor y agregar al menos un insumo para crear un pedido');
            return;
        }
        let id = detalles[0]
        //const insumoItem = dataInsumos?.supplies?.rows?.find((supply: any) => supply.id == id.idInsumo)

        const requestBody = {
            invoice: invoice,
            state: true,
            date: date,
            description: description,
            supplierId: selectProveedor?.value,
            total: subTotal + iva,
            Suppliesdetails: detalles.map((detalle) => ({
                shopId: detalle.id,
                supplyId: detalle.idInsumo,
                quantity: parseInt(detalle.cantidad),
                value: parseFloat(detalle.unitPrice),
                subtotal: subTotal
            })),
        };
        console.log("esto estoy mandando", requestBody)

        try {
            const response = await fetch(`https://coffvart-backend.onrender.com/api/shops?apikey=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                alert('Error al crear la compra');
                console.error('Error al crear la compra:', response.statusText);
                return;
            }

            setInvoice('');
            setSelectProveedor(undefined);
            setDetalles([]);
            setSubTotal(0);
            setIva(0);
            setPrecio(0);
            setInsumos([]);
            setProveedores([]);
            setDate('');
            setDescription('');

            alert('Compra creada con éxito');
        } catch (error) {
            console.error('Error al crear la compra:', error);
            alert('Error al crear la compra');
        }
    };


    return (
        <Container align={'CENTER'}>
            <Titles title={'CREAR COMPRA'}/>
            <Container justify={'TOP'} align={'TOP'} direction={'ROW'} gap={2}>
                <div style={{width: '50%'}}>
                    {/* <Titles title={`factura N°${invoice}`} level={2} transform={'UPPERCASE'}/> */}
                    <Container>
                    <FormRedisign fields={fields} onSubmit={handleCreateShop} button={"Registrar Compra"} title={`factura N°${invoice}`} errors={error}/>
                    </Container>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Titles title={'Detalle de la Compra'} level={2} transform={'UPPERCASE'} font-size={'1.5 rem'} font-weight={600}/>                    
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
                        <Button text={'Crear Compra'} onClick={() => handleCreateShop()} fill={false} type={'SUBMIT'}/>
                    </div>
                </div>
            </Container>
        </Container>
    );
}


export default ShopsCreate;