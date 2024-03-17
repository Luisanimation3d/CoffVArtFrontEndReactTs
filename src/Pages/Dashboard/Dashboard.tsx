import { useEffect, useState } from "react"
import { Container } from "../../components/Container/Container"
import { InfoCardRedisign } from "../../components/InfoCardRedisign/InfoCardRedisign"
import { useDarkMode } from "../../context/DarkMode"
import { API_KEY, API_URL } from "../../utils/constantes"
import { useFetch } from "../../hooks/useFetch"

export const Dashboard = () => {
    const { darkMode } = useDarkMode()
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [userDataSale, setUserDataSale] = useState<any>({});
    const { data, get } = useFetch(API_URL);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        })
    }, [])


    useEffect(() => {
        get(`sales?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if(data?.sales){
            setUserDataSale(data?.sales);
        }
    }, [data]);
    console.log('InfoCardRedisign - userDataSale:', userDataSale);

let totalVentasMes = 0;
  let productosVendidosTotales: any = {};
  let productoMasVendido: string | undefined;
  let cantidadMasVendida: number | undefined;
  let totalVentasProductoMenosVendido: number | undefined;
  let productoMenosVendido: string | undefined;
  let cantidadMenosVendida: number | undefined;
  let totalVentasProductoMasVendido: number | undefined;
  let productoTotales: any = {};

  if (userDataSale.rows) {
    userDataSale.rows.forEach((sale: any) => {
      totalVentasMes += sale.total;

      sale.salesdetails.forEach((detail: any) => {
        const productName = detail.product.name;
        const totalProducto = detail.quantity * detail.value;

        
        if (productosVendidosTotales[productName]) {
          productosVendidosTotales[productName] += detail.quantity;
        } else {
          productosVendidosTotales[productName] = detail.quantity;
        }

        productoTotales[productName] = (productoTotales[productName] || 0) + totalProducto;
      });
    });

    const productosOrdenados = Object.keys(productosVendidosTotales).sort(
      (a, b) => productosVendidosTotales[b] - productosVendidosTotales[a]
    );

    // Obtener el producto más vendido
    productoMasVendido = productosOrdenados[0];
    cantidadMasVendida = productosVendidosTotales[productoMasVendido];
    totalVentasProductoMasVendido = productoTotales[productoMasVendido];

    // Obtener el producto menos vendido
    productoMenosVendido = productosOrdenados[productosOrdenados.length - 1];
    cantidadMenosVendida = productosVendidosTotales[productoMenosVendido];
    totalVentasProductoMenosVendido = productoTotales[productoMenosVendido];
  }

    return (
        <Container>
            <div style={{
                width: '100%',
                transition: 'all 0.5s ease',
                display: 'grid',
                height: '100%',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(4, 1fr)',
                gap: '1rem',
                // backgroundColor: '#dedede',
            }}>
                <InfoCardRedisign darkMode={darkMode} style={{
                    // gridColumn: '1 / 2',
                    // gridRow: '1 / 6'
                    gridColumn: isMobile ? '1 / 4' : '1 / 2',
                    gridRow: isMobile ? '1 / 3' : '1 / 6',
                }} 
                    direction={isMobile ? 'row' : 'column'}
                    titulo="Total de ventas del mes"
                    totalVentasmes={totalVentasMes}
                />
                <InfoCardRedisign darkMode={darkMode} style={{
                    // gridColumn: '2 / 4',
                    // gridRow: '1 / 3'
                    gridColumn: isMobile ? '1 / 4' : '2 / 4',
                    gridRow: isMobile ? '3 / 5' : '1 / 3',
                }}
                direction={'row'}
                titulo="Productos más vendidos"
                totalVentasmes={totalVentasProductoMasVendido}
                productoMasVendido={productoMasVendido}
                cantidadMasVendida={cantidadMasVendida}
                />
                <InfoCardRedisign darkMode={darkMode} style={{
                    // gridColumn: '2 / 4',
                    // gridRow: '3 / 6'
                    gridColumn: isMobile ? '1 / 4' : '2 / 4',
                    gridRow: isMobile ? '5 / 6' : '3 / 6',
                }}
                    titulo= 'Productos menos vendidos'
                    totalVentasmes={totalVentasProductoMenosVendido}
                    direction={'row'}
                    productoMenosVendido={productoMenosVendido}
                    cantidadMenosVendida={cantidadMenosVendida}

                    />
            </div>
        </Container>
    )
}

export default Dashboard