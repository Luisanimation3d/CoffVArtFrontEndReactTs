import {SideBarMenuItemProps} from "../types/MenuBar";
import {FiHexagon, FiHome,FiUser, FiBriefcase, FiTruck, FiPackage, FiFeather, FiCoffee,FiCheck} from "react-icons/fi";

export const AdminRoutes: SideBarMenuItemProps[] = [
    {
        title: 'Dashboard',
        icon: <FiHome/>,
        link: 'dashboard'
    },
    {
        title: 'Roles',
        link: 'Roles',
        icon: <FiHexagon/>
    },
    {
        title: 'Clientes',
        link: 'Coustomers',
        icon: <FiUser/>
    },
    {
        title: 'Ventas',
        link: 'Sales',
        icon: <FiHexagon/>
    },
    {
        title: 'Pedidos',
        link: 'Orders',
        icon: <FiHexagon/>
    },
    {
        title: 'Insumos',
        link: 'Supplys',
        icon: <FiFeather/>
    },
    {
        title: 'Productos',
        link: 'Products',
        icon: <FiCoffee/>
    },
    {
        title: 'Proveedores',
        link: 'Suppliers',
        icon: <FiTruck/>
    },
    {
        title: 'Compañias',
        link: 'Companys',
        icon: <FiBriefcase/>
    },
    {
        title: 'Solicitudes de Producción',
        link: 'ProductionRequests',
        icon: <FiPackage/>
    },
    {
        title: 'Ordenes de Producción',
        link: 'ProductionOrders',
        icon: <FiPackage/>
    },
    {
        title: 'Procesos',
        link: 'Processes',
        icon: <FiCheck/>
    },
    {
        title: 'Ejemplo',
        link: 'ejemplo',
        icon: <FiBriefcase/>
    }
]