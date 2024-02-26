import React from 'react';
import { useState, useEffect } from 'react';
import ButtonStepper from "../../components/Order/ShopState.tsx";
import { useFetch } from '../../hooks/useFetch.tsx';
import { API_KEY, API_URL } from '../../constantes.ts';
import { useAuth} from '../../context/AuthContext.tsx';
import { useNavigate } from "react-router-dom";
import './Myshops.css';


export const MiComponente= ()=> {
  const navigate= useNavigate()  
  const [salesDetails, setSalesDetails] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const {data, error, get, loading} = useFetch(API_URL);

  const {user}= useAuth();
  const coustomerId = 6 

  useEffect(() => {
    get(`sales/customer/${coustomerId}?apikey=${API_KEY}`);
  }, [coustomerId]);

  useEffect(() => {
    if (data?.sales) {
      setSalesDetails(data.sales);
    }
  }, [data]);

  console.log(data)

  const getSalesDetails = (sale: any) => {
    console.log(sale, "esta es la venta");
    const details = sale?.salesdetails?.map((salesDetail: any) => ({
      id: salesDetail.id,
      invoice: sale.invoice,
      saleId: salesDetail.saleId,
      product: salesDetail.product.name,
      quantity: salesDetail.quantity,
      value: salesDetail.value,
      total: salesDetail.quantity * salesDetail.value,
    }));

    return details || [];
  };

  const handleCardClick = (saleId: any) => {
    setExpandedCard((prevExpandedCard) =>
      prevExpandedCard === saleId ? null : saleId
    );
  };

  return (
    <div className='container'>
      {salesDetails.map((sale: any) => (
        <div
          key={sale.id}
          className={`sale-container ${expandedCard === sale.id ? 'expanded' : ''}`}
          onClick={() => handleCardClick(sale.id)}
        >
          <div className="header">
            <h2>Factura N° {sale.invoice}</h2>
          <h2 className="total-amount">$ {sale.total}</h2>
          </div>
          {expandedCard === sale.id && (
            <div className="info-container">
              <div className="customer-info">
                <h3>Información del Cliente</h3>
                <p>Nombre: {sale.coustumer.name}</p>
              </div>
              <div className="purchase-info">
                {getSalesDetails(sale).map((detail: any) => (
                  <li key={detail.id}>
                    <p>
                      <strong>Producto:</strong> {detail.product}
                    </p>
                    <p>
                      <strong>Cantidad:</strong> {detail.quantity}
                    </p>
                    <p>
                      <strong>Valor Unitario:</strong> $ {detail.value}
                    </p>
                    <p>
                      <strong>Estado del Envío:</strong> {sale.state}
                    </p>
                  </li>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  
};



export default MiComponente;
