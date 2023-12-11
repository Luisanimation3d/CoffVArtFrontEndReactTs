import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import { Button } from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../../constantes.ts";
import { useFetch } from "../../hooks/useFetch.tsx";

export const Shops = () => {
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/')
    const navigate = useNavigate();

    useEffect(() => {
        get(`shops?apikey=${API_KEY}`);
    }, []);

    const columnsShops: Column[] = [
        {
            key: "id",
            header: "ID",
        },
        {
            key: "invoice",
            header: "Factura",
        },
        {
            key: "supplierId",
            header: "Proveedor",
        },
        {
            key: "total",
            header: "Total",
        },
        {
            key: "date",
            header: "Fecha de Compra",
        }
    ];
    const dataShops = data?.shops?.rows || [];
    let dataShopsFiltered: any;

    if (search.length > 0) {
        dataShopsFiltered = dataShops.filter((shops: any) =>
                shops.invoice.toLowerCase().includes(search.toLowerCase()) ||
                shops.estado.toLowerCase().includes(search.toLowerCase())
        );
    } else {
        dataShopsFiltered = dataShops;
    }

    const handleDelete = (row: any) => {
        del(`shops/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`shops?apikey=${API_KEY}`);
        }, 500);
    };
    const [shopsDetails, setShopsDetails] = useState<any[]>([]);

    const getShopsDetails = (shop: any) => {
        console.log(shop, "esta es la compra");
        const shopsDetails= shop?.shopdetails?.map((shopsDetail: any) => ({
            id: shopsDetail.id,
            shopId: shopsDetail.shopId,
            supply: shopsDetail.supply.name,
            quantity: shopsDetail.quantity,
            value: shopsDetail.value,
            total: shopsDetail.quantity*shopsDetail.value,
        }));
        setShopsDetails(shopsDetails);
        setIsModalOpen(true);
    };

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <Titles title={"Compras"} level={1}/>
                <div className="roles__table" style={
                    {
                        width: '100%',
                    }
                }>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: '20px',
                }}>
                    <SearchInput
                        label={"Buscar Compra"}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        idSearch={"ShopsSearch"}
                />
                <Button text={'Crear Compra'} onClick={()=> navigate('/admin/Shops/Create')} fill= {false} />
                </div>
                {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataShopsFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataShopsFiltered.length > 0 && (
                    <Table
                        columns={columnsShops}
                        data={dataShopsFiltered}
                        onRowClick={getShopsDetails}
                        editableAction={{
                            onClick: () => null,
                        }}
                        deleteAction={{
                            onClick: handleDelete,
                        }}
                    />
                        )
                    }
                </div>
            </Container>
            {
                isModalOpen && createPortal(
                    <ModalContainer ShowModal={setIsModalOpen}>
                        <Modal
                            title="Detalle de Compra"
                            showModal={setIsModalOpen}
                        >
                            <Table
                                columns={[
                                    {
                                        key: "supply",
                                        header: "Insumo",
                                    },
                                    {
                                        key: "quantity",
                                        header: "Cantidad (Kg)",
                                    },
                                    {
                                        key: "value",
                                        header: "Valor Unitario",
                                    },
                                    {
                                        key: "total",
                                        header: "Total",
                                    },
                                ]}
                                data={shopsDetails}
                                onRowClick={() => null}
                            />
                        </Modal>
                    </ModalContainer>,
                    document.getElementById("modal") as HTMLElement)
            }
        </>
    );
};

export default Shops;