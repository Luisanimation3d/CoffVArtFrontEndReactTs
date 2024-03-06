import LogoBurdeo from '../../assets/burdeoLogo.png';
import {FiCompass, FiShoppingCart, FiUser} from 'react-icons/fi';

import './HeaderMenu.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {createPortal} from "react-dom";
import {LoginModal} from "../../Modales/LoginModal/LoginModal.tsx";
import {RegisterModal} from "../../Modales/RegisterModal/RegisterModal.tsx";
import {MiniCart} from "../MiniCart/MiniCart.tsx";
import {useCart} from "../../context/CartContext.tsx";
import {useAuth} from "../../context/AuthContext.tsx";

export const HeaderMenu = () => {
    const {cart} = useCart()
    const {isAuthenticated} = useAuth()
    const countProducts = cart?.length
    const [showMiniCart, setShowMiniCart] = useState<boolean>(false)
    const location = useLocation()
    const {search, pathname} = location
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState<boolean>(false)

    const handleClick = () => {
        if (isAuthenticated) {
            navigate('/admin/my-profile')
            return
        }
        setShowModal(true)
        navigate({
            pathname,
            search: 'login'
        })
    }


    return (
        <>
            <div className="headerMenu__container">
                <div className="headerMenu__logo">
                    <img src={LogoBurdeo} alt="Logo Burdeo"/>
                </div>
                <nav className={`headerMenu__menu`}>
                    <ul className={`headerMenu__menu--container`}>
                        <li className="headerMenu__menu--item">
                            <Link to={'/home'} className={`headerMenu__menu--link`}>Inicio</Link>
                        </li>
                        <li className={`headerMenu__menu--item`}>
                             <Link to={'/nosotros'} className={`headerMenu__menu--link`}>Nosotros</Link>
                        </li>
                        <li className={`headerMenu__menu--item`}>
                            <Link to={'/tiendaUser'} className={`headerMenu__menu--link`}>Tienda</Link>
                        </li>
                        <li className={`headerMenu__menu--item`}>
                            <Link to={'/Contactos '} className={`headerMenu__menu--link`}>Contacto</Link>
                        </li>
                        {
                            isAuthenticated && (
                                <li className={`headerMenu__menu--item`}>
                                    <Link to={'/myshops'} className={`headerMenu__menu--link`}>Mis compras</Link>
                                </li>
                            )
                        }

                    </ul>
                </nav>
                <div className="headerMenu__options">
                    <div className="headerMenu__options--item headerMenu__options--item--search">
                        <FiCompass className={`headerMenu__options--icon`}/>
                    </div>
                    <div className="headerMenu__options--item headerMenu__options--item--user"
                         onClick={handleClick}
                    >
                        <FiUser className={`headerMenu__options--icon`}/>
                    </div>
                    <div className="headerMenu__options--item headerMenu__options--cart" id={'cartButton'} onClick={() => setShowMiniCart(true)}>
                        <FiShoppingCart className={`headerMenu__cart--icon`}/>
                        {
                            countProducts > 0 && countProducts < 10 ? (
                                <span className={`headerMenu__cart--counter`}>{countProducts}</span>
                            ) : (
                                countProducts > 9 && (
                                    <span className={`headerMenu__cart--counter`}>9+</span>
                                )
                            )
                        }
                    </div>

                </div>
            </div>

            {showMiniCart &&
                createPortal(
                    <MiniCart setShowMiniCart={setShowMiniCart}/>,
                    document.querySelector('#modal') as HTMLElement
                )
            }

            {showModal &&
                createPortal(
                    search.includes('login') ? (
                        <LoginModal showModal={setShowModal}/>
                    ) : search.includes('register') ? (
                        // <Register showModal={setShowModal}/>
                        <RegisterModal showModal={setShowModal}/>
                    ) : null,
                    document.querySelector('#modal') as HTMLElement
                )}

        </>

    )
}