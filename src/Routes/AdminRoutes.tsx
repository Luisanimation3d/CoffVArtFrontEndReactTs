import {MenuItemsProps} from "../types/MenuBar";
import {FiHome, FiCoffee, FiShoppingBag, FiShoppingCart, FiSettings, FiUsers, FiBarChart} from "react-icons/fi";

import {useAuth} from "../context/AuthContext.tsx";
// import {User} from "../types/AuthContext";

export const useRutasAdmin = () => {

    const {user} = useAuth();

    // const adminToCompare: MenuItemsProps = [
    //     {
    //         type: 'menu',
    //         icon: <FiHome />,
    //         title: 'Inicio',
    //         link: '/'
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Dashboard',
    //         icon: <FiHome />,
    //         link: 'dashboard'
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Roles',
    //         link: 'Roles',
    //         icon: <FiHexagon />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Usuarios',
    //         link: 'Users',
    //         icon: <FiUser />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Clientes',
    //         link: 'Coustomers',
    //         icon: <FiUser />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Ventas',
    //         link: 'Sales',
    //         icon: <FiShoppingBag />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Compras',
    //         link: 'Shops',
    //         icon: <FiShoppingCart />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Pedidos',
    //         link: 'Orders',
    //         icon: <FiInbox />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Insumos',
    //         link: 'Supplys',
    //         icon: <FiFeather />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Productos',
    //         link: 'Products',
    //         icon: <FiCoffee />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Proveedores',
    //         link: 'Suppliers',
    //         icon: <FiTruck />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Compañias',
    //         link: 'Companys',
    //         icon: <FiBriefcase />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Solicitudes de Producción',
    //         link: 'ProductionRequests',
    //         icon: <FiPackage />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Ordenes de Producción',
    //         link: 'ProductionOrders',
    //         icon: <FiPackage />
    //     },
    //     {
    //         type: 'menu',
    //         title: 'Procesos',
    //         link: 'Processes',
    //         icon: <FiCheck />
    //     },
    // ]

    const adminToCompare: MenuItemsProps = [
        {
            type: 'menu',
            icon: <FiHome/>,
            title: 'Ir a la tienda',
            link: '/'
        },
        {
            type: 'menu',
            title: 'Dashboard',
            icon: <FiBarChart/>,
            link: 'dashboard'
        },
        {
            type: 'subMenu',
            title: 'Configuración',
            icon: <FiSettings/>,
            subItems: [
                {
                    title: 'Roles',
                    link: 'Roles',
                }
            ]
        },
        {
            type: 'subMenu',
            title: 'Usuarios',
            icon: <FiUsers/>,
            subItems: [
                {
                    title: 'Usuarios',
                    link: 'Users'
                }
            ]
        },
        {
            type: 'subMenu',
            title: 'Compras',
            icon: <FiShoppingBag/>,
            subItems: [
                {
                    title: 'Proveedores',
                    link: 'Suppliers',
                },
                {
                    title: 'Insumos',
                    link: 'Supplys',
                },
                {
                    title: 'Compras',
                    link: 'Shops'
                }
            ]
        },
        {
            type: 'subMenu',
            title: 'Producción',
            icon: <FiCoffee/>,
            subItems: [
                {
                    title: 'Compañias',
                    link: 'Companys',
                },
                {
                    title: 'Productos',
                    link: 'Products',
                },
                {
                    title: 'Solicitudes de Producción',
                    link: 'ProductionRequests',
                },
                {
                    title: 'Ordenes de Producción',
                    link: 'ProductionOrders',
                }
            ]
        },
        {
            type: 'subMenu',
            title: 'Ventas',
            icon: <FiShoppingCart/>,
            subItems: [
                {
                    title: 'Clientes',
                    link: 'Coustomers',
                },
                {
                    title: 'Pedidos',
                    link: 'Orders',
                },
                {
                    title: 'Ventas',
                    link: 'Sales',
                }
            ]
        }
    ]

    if (!user) {
        return {
            AdminRoutes: adminToCompare
        }
    }
    const {permissions} = user;

    const filteredAdminToCompare: MenuItemsProps = adminToCompare.map((menuItem) => {

            if (menuItem === null || menuItem === undefined) {
                return null;
            }

            if (menuItem.type === 'menu') {
                if (permissions.some(permission => menuItem.title.toLowerCase().includes(permission.split(' ')[1].toLowerCase()))) {
                    return menuItem;
                } else {
                    return null;
                }
            } else if (menuItem.type === 'subMenu') {
                const subMenuFiltered = menuItem.subItems.filter((subItem) => {
                    if (permissions.some(permission => subItem.title.toLowerCase().includes(permission.split(' ')[1].toLowerCase()))) {
                        return subItem;
                    } else {
                        return null;
                    }
                })
                if (subMenuFiltered.length > 0) {
                    return {
                        ...menuItem,
                        subItems: subMenuFiltered
                    }
                } else {
                    return null;
                }
            }
        }
    // ).filter((menuItem) => menuItem !== null && menuItem !== undefined);
    ).filter((menuItem): menuItem is MenuItemsProps[0] => menuItem !== null && menuItem !== undefined);

    // filteredAdminToCompare.unshift({
    //     type: 'menu',
    //     title: 'Dashboard',
    //     icon: <FiBarChart/>,
    //     link: 'dashboard'
    // })

    filteredAdminToCompare.unshift({
        type: 'menu',
        icon: <FiHome/>,
        title: 'Ir a la tienda',
        link: '/'
    })

    return {
        AdminRoutes: filteredAdminToCompare
        // AdminRoutes
    }
}
