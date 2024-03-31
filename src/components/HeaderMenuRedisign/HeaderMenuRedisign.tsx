import styles from './HeaderMenuRedisign.module.css'
import logoBurdeo from '../../assets/LogoBurdeoIcon.png'
import userImage from '../../assets/userImage.png'
import {FiMenu, FiSearch, FiShoppingCart, FiUser, FiX} from "react-icons/fi";
import {useEffect, useState} from "react";
import {useCart} from "../../context/CartContext.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";
import {MiniCart} from "../MiniCart/MiniCart.tsx";
import {LoginModal} from "../../Modales/LoginModal/LoginModal.tsx";
import {RegisterModal} from "../../Modales/RegisterModal/RegisterModal.tsx";

export const HeaderMenuRedisign = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth)
        })
        return () => {
            window.removeEventListener('resize', () => {
                setScreenWidth(window.innerWidth)
            })
        }
    }, []);

    return (
        <>
            {screenWidth > 820 ? <UserHeaderRedisignDesktop/> : <UserHeaderRedisignMobile/>}
        </>
    )
}
const UserHeaderRedisignDesktop = () => {

    const [search, setSearch] = useState('')
    const [isSearchActive, setIsSearchActive] = useState(false)

    const {cart} = useCart()
    const {isAuthenticated} = useAuth()
    const countProducts = cart?.length
    const [showMiniCart, setShowMiniCart] = useState<boolean>(false)
    const location = useLocation()
    const {search: searchPath, pathname} = location
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
            <header className={styles.header__container}>
                <div className={`${styles.logo__container}`}>
                    <img src={logoBurdeo} alt="Logo Burdeo"/>
                </div>
                <nav className={styles.nav__container}>
                    <ul className={styles.nav__items}>
                        <li className={`${styles.nav__item}`}>
                            <NavLink
                                className={({isActive}) => isActive ? `${styles.nav__item__link} ${styles.nav__item__link__active}` : `${styles.nav__item__link}`}
                                to="/home">Inicio</NavLink>
                        </li>
                        <li className={`${styles.nav__item}`}>
                            <NavLink
                                className={({isActive}) => isActive ? `${styles.nav__item__link} ${styles.nav__item__link__active}` : `${styles.nav__item__link}`}
                                to="/nosotros">Nosotros</NavLink>
                        </li>
                        <li className={`${styles.nav__item}`}>
                            <NavLink
                                className={({isActive}) => isActive ? `${styles.nav__item__link} ${styles.nav__item__link__active}` : `${styles.nav__item__link}`}
                                to="/tiendaUser">Tienda</NavLink>
                        </li>
                        <li className={`${styles.nav__item}`}>
                            <NavLink
                                className={({isActive}) => isActive ? `${styles.nav__item__link} ${styles.nav__item__link__active}` : `${styles.nav__item__link}`}
                                to="/Contactos">Contacto</NavLink>
                        </li>
                        {
                            isAuthenticated && (
                                <li className={`${styles.nav__item}`}>
                                    <NavLink
                                        className={({isActive}) => isActive ? `${styles.nav__item__link} ${styles.nav__item__link__active}` : `${styles.nav__item__link}`}
                                        to="/myshops">Mis compras</NavLink>
                                </li>
                            )
                        }
                    </ul>
                </nav>
                <div className={`${styles.header__actions}`}>
                    <button className={`${styles.action__button} ${styles.action__search}`} onClick={() => {
                        if (search.length > 0 && isSearchActive) {
                            console.log(search)
                        } else {
                            setIsSearchActive(prev => !prev)
                        }
                    }} onBlur={e => {
                        if (e.relatedTarget === null) {
                            setIsSearchActive(false)
                        }

                    }}>
                        <input
                            className={`${styles.action__input} ${isSearchActive ? styles.action__input__active : styles.action__input__inactive}`}
                            type="text" value={search} onChange={e => setSearch(e.target.value)}
                            onClick={e => e.stopPropagation()} placeholder="Search"/>
                        <FiSearch/>
                    </button>
                    <button className={`${styles.action__button}`} onClick={handleClick}>
                        {
                            isAuthenticated ? (
                                <img className={`${styles.action__user__image}`} src={userImage} alt="User"/>
                            ) : (
                                <FiUser/>
                            )
                        }
                    </button>
                    <button className={`${styles.action__button}`} id={'cartButton'}
                            onClick={() => setShowMiniCart(true)}>
                        <FiShoppingCart/>
                        {
                            countProducts > 0 && countProducts < 10 ? (
                                <span className={`${styles.headerMenu__cart__counter}`}>{countProducts}</span>
                            ) : (
                                countProducts > 9 && (
                                    <span className={`${styles.headerMenu__cart__counter}`}>9+</span>
                                )
                            )
                        }
                    </button>
                </div>
            </header>
            {showMiniCart &&
                createPortal(
                    <MiniCart setShowMiniCart={setShowMiniCart}/>,
                    document.querySelector('#modal') as HTMLElement
                )
            }

            {showModal &&
                createPortal(
                    searchPath.includes('login') ? (
                        <LoginModal showModal={setShowModal}/>
                    ) : searchPath.includes('register') ? (
                        // <Register showModal={setShowModal}/>
                        <RegisterModal showModal={setShowModal}/>
                    ) : null,
                    document.querySelector('#modal') as HTMLElement
                )
            }
        </>
    )
}

export const UserHeaderRedisignMobile = () => {

    const [showMenu, setShowMenu] = useState(true)
    const [closeMenu, setCloseMenu] = useState(false)

    const {cart} = useCart()
    const {isAuthenticated} = useAuth()
    const countProducts = cart?.length
    const [showMiniCart, setShowMiniCart] = useState<boolean>(false)
    const location = useLocation()
    const {search: searchPath, pathname} = location
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

    useEffect(() => {
        setCloseMenu(true)
        setTimeout(() => {
            setShowMenu(false)
            setCloseMenu(false)
        })
    }, [location])

    return (
        <>
            <header className={styles.header__container__mobile}>
                <button className={styles.header__button__menu__open__mobile} onClick={() => setShowMenu(true)}>
                    <FiMenu/>
                </button>
                <div className={`${styles.logo__container__mobile}`}>
                    <img src={logoBurdeo} alt="Logo Burdeo"/>
                </div>
                <div className={`${styles.header__actions__mobile}`}>
                    <button className={`${styles.action__button}`} onClick={handleClick}>
                        {
                            isAuthenticated ? (
                                <img className={`${styles.action__user__image}`} src={userImage} alt="User"/>
                            ) : (
                                <FiUser/>
                            )
                        }
                    </button>
                    <button className={`${styles.action__button}`} id={'cartButton'}
                            onClick={() => setShowMiniCart(true)}>
                        <FiShoppingCart/>
                        {
                            countProducts > 0 && countProducts < 10 ? (
                                <span className={`${styles.headerMenu__cart__counter}`}>{countProducts}</span>
                            ) : (
                                countProducts > 9 && (
                                    <span className={`${styles.headerMenu__cart__counter}`}>9+</span>
                                )
                            )
                        }
                    </button>
                </div>
            </header>
            {
                showMenu && (
                    <div
                        className={`${styles.menu__container__items__mobile} ${showMenu && !closeMenu ? styles.active : ''} ${showMenu && closeMenu ? styles.inactive : ''}`}>
                        <button className={styles.header__button__menu__close__mobile} onClick={() => {
                            setCloseMenu(true)
                            setTimeout(() => {
                                setShowMenu(false)
                                setCloseMenu(false)
                            }, 500)
                        }}>
                            <FiX/>
                        </button>

                        <ul className={styles.menu__items__mobile}>
                            <li className={`${styles.menu__item__mobile}`}>
                                <NavLink
                                    className={({isActive}) => isActive ? `${styles.menu__item__link__mobile} ${styles.menu__item__link__mobile__active}` : `${styles.menu__item__link__mobile}`}
                                    to="/home">Inicio</NavLink>
                            </li>
                            <li className={`${styles.menu__item__mobile}`}>
                                <NavLink
                                    className={({isActive}) => isActive ? `${styles.menu__item__link__mobile} ${styles.menu__item__link__mobile__active}` : `${styles.menu__item__link__mobile}`}
                                    to="/nosotros">Nosotros</NavLink>
                            </li>
                            <li className={`${styles.menu__item__mobile}`}>
                                <NavLink
                                    className={({isActive}) => isActive ? `${styles.menu__item__link__mobile} ${styles.menu__item__link__mobile__active}` : `${styles.menu__item__link__mobile}`}
                                    to="/tiendaUser">Tienda</NavLink>
                            </li>
                            <li className={`${styles.menu__item__mobile}`}>
                                <NavLink
                                    className={({isActive}) => isActive ? `${styles.menu__item__link__mobile} ${styles.menu__item__link__mobile__active}` : `${styles.menu__item__link__mobile}`}
                                    to="/Contactos">Contacto</NavLink>
                            </li>
                            {
                                isAuthenticated && (
                                    <li className={`${styles.menu__item__mobile}`}>
                                        <NavLink
                                            className={({isActive}) => isActive ? `${styles.menu__item__link__mobile} ${styles.menu__item__link__mobile__active}` : `${styles.menu__item__link__mobile}`}
                                            to="/myshops">Mis compras</NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            }

            {showMiniCart &&
                createPortal(
                    <MiniCart setShowMiniCart={setShowMiniCart}/>,
                    document.querySelector('#modal') as HTMLElement
                )
            }

            {showModal &&
                createPortal(
                    searchPath.includes('login') ? (
                        <LoginModal showModal={setShowModal}/>
                    ) : searchPath.includes('register') ? (
                        // <Register showModal={setShowModal}/>
                        <RegisterModal showModal={setShowModal}/>
                    ) : null,
                    document.querySelector('#modal') as HTMLElement
                )
            }
        </>
    )
}