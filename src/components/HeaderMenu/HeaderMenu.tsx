import LogoBurdeo from '../../assets/burdeoLogo.png';
import {FiCompass, FiShoppingCart, FiUser} from 'react-icons/fi';

import './HeaderMenu.css';

export const HeaderMenu = () => {
    return (
        <>
            <div className="headerMenu__container">
                <div className="headerMenu__logo">
                    <img src={LogoBurdeo} alt="Logo Burdeo"/>
                </div>
                <nav className={`headerMenu__menu`}>
                    <ul className={`headerMenu__menu--container`}>
                        <li className={`headerMenu__menu--item`}><a className={`headerMenu__menu--link`}
                                                                    href="/">Inicio</a></li>
                        <li className={`headerMenu__menu--item`}><a className={`headerMenu__menu--link`}
                                                                    href="/nosotros">Nosotros</a></li>
                        <li className={`headerMenu__menu--item`}><a className={`headerMenu__menu--link`}
                                                                    href="/productos">Productos</a></li>
                        <li className={`headerMenu__menu--item`}><a className={`headerMenu__menu--link`}
                                                                    href="/contacto">Contacto</a></li>
                    </ul>
                </nav>
                <div className="headerMenu__options">
                    <div className="headerMenu__options--item headerMenu__options--item--search">
                        <FiCompass className={`headerMenu__options--icon`}/>
                    </div>
                    <div className="headerMenu__options--item headerMenu__options--item--user">
                        <FiUser className={`headerMenu__options--icon`}/>
                    </div>
                    <div className="headerMenu__options--item headerMenu__options--cart">
                        <FiShoppingCart className={`headerMenu__cart--icon`}/>
                        <span className={`headerMenu__cart--counter`}>0</span>
                    </div>

                </div>
            </div>
        </>

    )
}