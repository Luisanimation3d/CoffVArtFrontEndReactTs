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

  return (
    <div>
      {salesDetails.map((sale: any) => (
        <div key={sale.id} className="sale-container">
          <div className='sale-image'>
          <img src={"src/assets/product.jpg"} alt={""} />
          </div>
          <h2>Invoice: {sale.invoice}</h2>
          <ul className='sale-details-item'>
            {getSalesDetails(sale).map((detail: any) => (
              <li key={detail.id}>
                <p>Producto: {detail.product}</p>
                <p>Cantidad: {detail.quantity}</p>
                <p>Valor Unitario: {detail.value}</p>
                <p>Total: {detail.total}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};



export default MiComponente;
