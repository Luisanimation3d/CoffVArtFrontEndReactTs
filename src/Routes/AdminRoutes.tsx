import {SideBarMenuItemProps} from "../types/MenuBar";
import {FiHexagon, FiHome, FiUser, FiBriefcase, FiTruck, FiPackage} from "react-icons/fi";

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
    },{
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
        title: 'Compañias',
        link: 'Companys',
        icon: <FiBriefcase/>
    },
    {
        title: 'Proveedores',
        link: 'Suppliers',
        icon: <FiTruck/>
    },
    {
        title: 'Ordenes de Producción',
        link: 'ProductionOrders',
        icon: <FiPackage/>
    },
]