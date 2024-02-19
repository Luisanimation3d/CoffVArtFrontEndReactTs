import React from 'react';
import { useState, useEffect } from 'react';
import ButtonStepper from "../../components/Order/ShopState.tsx";
import { useFetch } from '../../hooks/useFetch.tsx';
import { API_KEY, API_URL } from '../../constantes.ts';
import { useAuth} from '../../context/AuthContext.tsx';


export const MiComponente= ()=> {
  const [salesDetails, setSalesDetails] = useState([]);
  const {data} = useFetch(API_URL);
  const {get} = useFetch("http://localhost:3000/api/");
  const {loading} = useFetch(API_URL);
  const {error} = useFetch(API_URL);

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
  return (
    <div>
      <h2>Detalles de las ventas:</h2>
      <ul>
        {salesDetails.map((sale: { id: number, salesDetails: { product: { name: string }, quantity: number, value: number }[] }) => (
          <li key={sale.id}>
            <h3>Producto: {sale.salesDetails[0].product.name}</h3>
            <p>Cantidad: {sale.salesDetails[0].quantity}</p>
            <p>Valor Unitario: {sale.salesDetails[0].value}</p>
            {/* Agrega más detalles según sea necesario */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MiComponente;
