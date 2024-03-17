import {FC, useEffect, useState} from "react";

import {FiLogOut, FiMenu} from "react-icons/fi";
import BurdeoLogo from "../../assets/burdeoLogo.png";
import UserImage from "../../assets/userImage.png";
import {NavLink, useNavigate} from "react-router-dom";
import {SideBarMenuItemProps, SideBarMenuProps} from "../../types/MenuBar";
import {useAuth} from "../../context/AuthContext.tsx";


import "./SideBarMenu.css";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";

export const SideBarMenu: FC<SideBarMenuProps> = ({
                                                      items
                                                  }) => {
    const {logout, user} = useAuth();
    const navigate = useNavigate();
    const {get: logoutGet} = useFetch(API_URL);
    const [toggleMenu, setToggleMenu] = useState(false);
    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    }


    const handleNavigate = () => {
        console.log('ingresa aqui')
    }
    const handleLogout = () => {
        logoutGet(`login/logout?apikey=${API_KEY}`)
        logout();
        setTimeout(() => {
            navigate('/home')
        }
            , 500);
    }

    useEffect(() => {
        const width = window.innerWidth;
        if (width > 768) {
            setToggleMenu(true);
        }
    }, []);
    useEffect(() => {
        window.addEventListener('resize', () => {
            const currentDeviceWidth = window.innerWidth;
            if (currentDeviceWidth > 768) {
                setToggleMenu(true);
            } else {
                setToggleMenu(false);
            }
        });
        return () => {
            window.removeEventListener('resize', () => {
                const currentDeviceWidth = window.innerWidth;
                if (currentDeviceWidth > 768) {
                    setToggleMenu(true);
                } else {
                    setToggleMenu(false);
                }
            });
        }
    }, []);
    return (
        <div className={`sideBarMenu__container ${toggleMenu && 'sideBarMenu__container--active'}`}>
            <div className="sideBarMenu__top">
                <div className="sideBarMenu__logo" onClick={handleNavigate}>
                    <img src={BurdeoLogo} alt=""/>
                </div>
                <button className="sideBarMenu__toggleMenu" onClick={handleToggleMenu}>
                    <FiMenu/>
                </button>
            </div>
            <div className="sideBarMenu__user" onClick={()=> {
                navigate('/admin/my-profile')
            }}>
                <img src={UserImage} alt="" className={`sideBarMenu__user-image`}/>
                <div className="sideBarMenu__user-info">
                    <h4 className={`sideBarMenu__user-name`}>{user?.name}</h4>
                    <p className={`sideBarMenu__user-role`}>{user?.role}</p>
                </div>
            </div>
            <ul className="sideBarMenu__menu">
                {
                    items?.map((item, index) => {
                        return (
                            <SideBarMenuItem icon={item.icon} title={item.title} link={item.link} key={index}/>
                        )
                    })
                }
            </ul>

            <div className="sideBarMenu__logout">
                <button className="sideBarMenu__logout-button" onClick={handleLogout}>
                    <FiLogOut/>
                    <span className={`sideBarMenu__logout-name`}>
                        Logout
                    </span>
                </button>
                <span className="sideBarMenu__logout-tooltip">Logout</span>
            </div>

        </div>
    )
}

const SideBarMenuItem: FC<SideBarMenuItemProps> = ({
                                                       title,
                                                       link,
                                                       icon
                                                   }) => {
    return (
        <li className="sideBarMenu__menuItem">
            <NavLink to={link} className={`sideBarMenu__menuItem-link`}>
                {icon}
                <span className={`sideBarMenu__menuItem-name`}>{title}</span>
            </NavLink>
            <span className="sideBarMenu__menuItem-tooltip">{title}</span>
        </li>
    )
}