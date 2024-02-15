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
import { API_KEY, API_URL } from "../../constantes.ts";
import { useFetch } from "../../hooks/useFetch.tsx";
import { TableRedisign } from "../../components/TableRedisign/TableRedisign.tsx";

export const Sales = () => {
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, loading, error, get, del } = useFetch(API_URL)
    const [dataSalesModify, setDataSalesModify] = useState<any>([])
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1)
    useEffect(() => {
        get(`sales?apikey=${API_KEY}&page=${page}`)
    }, [page]);

    useEffect(() => {
        get(`sales?apikey=${API_KEY}`);
    }, []);

    const columnsSales: Column[] = [
        {
            key: "id",
            header: "ID",
        },
        {
            key: "invoice",
            header: "Factura",
        },
        {
            key: "coustumerId",
            header: "Cliente",
        },
        {
            key: "total",
            header: "Total",
        },
    ];
    useEffect(() => {
        if(data?.sales?.rows){
            const newSaleData = data?.sales?.rows.map((sale: any) => {
                return {
                    ...sale,
                    coustumerId: sale?.coustumer?.name
                }
            })

            setDataSalesModify(newSaleData)
        }
    }, [data]);

    const dataSales = dataSalesModify || [];
    let dataSalesFiltered: any;

    if (search.length > 0) {
        dataSalesFiltered = dataSalesModify.filter((sales: any) =>
                sales.invoice.toLowerCase().includes(search.toLowerCase()) ||
                sales.coustumerId.toLowerCase().includes(search.toLowerCase()) 
        );
    } else {
        dataSalesFiltered = dataSales;
    }

    const handleDelete = (row: any) => {
        del(`sales/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`sales?apikey=${API_KEY}`);
        }, 500);
    };
    const [salesDetails, setSalesDetails] = useState<any[]>([]);

    const getSalesDetails = (sale: any) => {
        console.log(sale, "esta es la venta");
        const salesDetails= sale?.salesdetails?.map((salesDetail: any) => ({
            id: salesDetail.id,
            invoice: sale.invoice,
            saleId: salesDetail.saleId,
            product: salesDetail.product.name,
            quantity: salesDetail.quantity,
            value: salesDetail.value,
            total: salesDetail.quantity*salesDetail.value,
        }));
        setSalesDetails(salesDetails);
        setIsModalOpen(true);
    };

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <TableRedisign
                    columns={columnsSales}
                    data={dataSalesFiltered}
                    search={search}
                    setSearch={setSearch}
                    onRowClick={getSalesDetails}
                    title={'Ventas'}
                    loading={loading}
                    callback={getSalesDetails}
                />
            </Container>
            {
                isModalOpen && createPortal(
                    <ModalContainer ShowModal={setIsModalOpen}>
                        <Modal
                            title={`Detalle de la orden # ${salesDetails[0]?.invoice}`}
                            showModal={setIsModalOpen}
                        >
                            <Table
                                columns={[
                                    {
                                        key: "invoice",
                                        header: "Factura",
                                    },
                                    {
                                        key: "product",
                                        header: "Producto",
                                    },
                                    {
                                        key: "quantity",
                                        header: "Cantidad",
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
                                data={salesDetails}
                                onRowClick={() => null}
                            />
                        </Modal>
                    </ModalContainer>,
                    document.getElementById("modal") as HTMLElement)
            }
        </>
    );
};

export default Sales;