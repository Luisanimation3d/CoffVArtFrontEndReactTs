import {useEffect, useState} from "react";

import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {Button} from "../../components/Button/Button.tsx";

export const EjemploVistaConDetalle = () => {
    const [detalles, setDetalles] = useState<any[]>([]);
    const [factura, setFactura] = useState<string>('');
    const [select, setSelect] = useState<SelectOption | undefined>(undefined);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [precio, setPrecio] = useState(0);

    const headers: Column[] = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'name',
            header: 'Nombre',
        },
        {
            key: 'description',
            header: 'Descripción',
        }
    ]

    const handleSelect = (option: SelectOption | undefined) => {
        setSelect(option)
        setNombre(option?.label || '')
        const data: any[] = []
        const index = data?.findIndex((item: any) => item.id === option?.value)
        const precio = data[index]?.price || 5
        setNombre(precio)
    }

    const fields: FormField[] = [
        {
            name: 'select',
            placeholder: 'Select',
            type: 'select',
            options: [
                {
                    value: '1',
                    label: 'Uno'
                },
                {
                    value: '2',
                    label: 'Dos'
                },
                {
                    value: '3',
                    label: 'Tres'
                },
            ],
            value: select,
            onChange: (option) => handleSelect(option),
        },
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            value: nombre,
            onChange: setNombre,
            size: "large",
        },
        {
            name: 'description',
            label: 'Descripción',
            type: 'textarea',
            size: 4,
            value: descripcion,
            onChange: setDescripcion
        }
    ]

    const handleAddDetail = (e: any) => {
        e.preventDefault();
        const newDetail = {
            id: detalles.length + 1,
            name: nombre,
            description: descripcion
        }
        const newSubtotal = subTotal + parseInt(nombre || '0')
        const newIva = newSubtotal * 0.08
        setDetalles([...detalles, newDetail])
        setSubTotal(newSubtotal)
        setIva(newIva)
        setPrecio(newSubtotal + newIva)
        setSelect(undefined)
        setNombre('')
        setDescripcion('')
    }

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


    return (
        <Container align={'CENTER'}>
            <Titles title={'Ejemplo Vista con Detalle'}/>
            <Container justify={'CENTER'} align={'TOP'} direction={'ROW'} gap={2}>
                <div style={{
                    width: '50%',
                }}>
                    <Titles title={`factura N°${factura}`} level={2} transform={'UPPERCASE'}/>
                    <Form fields={fields} onSubmit={handleAddDetail}
                          button={<Button text={'Agregar'} onClick={() => null}/>}
                        cancelButton={false}
                    />
                </div>
                <div style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}>
                    <Table columns={headers} data={detalles} onRowClick={() => null}/>
                    <p>subtotal | {subTotal} </p>
                    <p>iva | {iva} </p>
                    <p>Total | {precio} </p>
                </div>
            </Container>
        </Container>
    )
}