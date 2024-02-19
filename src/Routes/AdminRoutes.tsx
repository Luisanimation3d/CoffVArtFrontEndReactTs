import {MenuItemsProps, SideBarMenuItemProps} from "../types/MenuBar";
import {FiHexagon, FiHome,FiUser, FiBriefcase, FiTruck, FiPackage, FiFeather, FiCoffee,FiCheck, FiShoppingBag, FiShoppingCart, FiInbox} from "react-icons/fi";

import {useAuth} from "../context/AuthContext.tsx";

export const useRutasAdmin = () => {

    const {user} = useAuth();

    const adminToCompare: MenuItemsProps = [
        {
            type: 'menu',
            icon: <FiHome/>,
            title: 'Inicio',
            link: '/'
        },
        {
            type: 'menu',
            title: 'Dashboard',
            icon: <FiHome/>,
            link: 'dashboard'
        },
        {
            type: 'menu',
            title: 'Roles',
            link: 'Roles',
            icon: <FiHexagon/>
        },
        {
            type: 'menu',
            title: 'Usuarios',
            link: 'Users',
            icon: <FiUser/>
        },
        {
            type: 'menu',
            title: 'Clientes',
            link: 'Coustomers',
            icon: <FiUser/>
        },
        {
            type: 'menu',
            title: 'Ventas',
            link: 'Sales',
            icon: <FiShoppingBag/>
        },
        {
            type: 'menu',
            title: 'Compras',
            link: 'Shops',
            icon: <FiShoppingCart/>
        },
        {
            type: 'menu',
            title: 'Pedidos',
            link: 'Orders',
            icon: <FiInbox/>
        },
        {
            type: 'menu',
            title: 'Insumos',
            link: 'Supplys',
            icon: <FiFeather/>
        },
        {
            type: 'menu',
            title: 'Productos',
            link: 'Products',
            icon: <FiCoffee/>
        },
        {
            type: 'menu',
            title: 'Proveedores',
            link: 'Suppliers',
            icon: <FiTruck/>
        },
        {
            type: 'menu',
            title: 'Compañias',
            link: 'Companys',
            icon: <FiBriefcase/>
        },
        {
            type: 'menu',
            title: 'Solicitudes de Producción',
            link: 'ProductionRequests',
            icon: <FiPackage/>
        },
        {
            type: 'menu',
            title: 'Ordenes de Producción',
            link: 'ProductionOrders',
            icon: <FiPackage/>
        },
        {
            type: 'menu',
            title: 'Procesos',
            link: 'Processes',
            icon: <FiCheck/>
        },
        // {
        //     title: 'Ejemplo',
        //     link: 'ejemplo',
        //     icon: <FiBriefcase/>
        // }
    ]
    const AdminRoutes = adminToCompare?.filter((item) => {
        return user?.permissions?.find((permission) => {
            return permission.includes(item.title)
        })
    })

    return {
        AdminRoutes: adminToCompare
    }
}
