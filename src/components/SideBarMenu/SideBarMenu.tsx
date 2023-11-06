import {FC, useEffect, useState} from "react";

import {FiLogOut, FiMenu} from "react-icons/fi";
import BurdeoLogo from "../../assets/burdeoLogo.png";
import UserImage from "../../assets/userImage.png";
import {NavLink} from "react-router-dom";
import {SideBarMenuItemProps, SideBarMenuProps} from "../../types/MenuBar";


import "./SideBarMenu.css";

export const SideBarMenu: FC<SideBarMenuProps> = ({
                                                      items
                                                  }) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
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
                <div className="sideBarMenu__logo">
                    <img src={BurdeoLogo} alt=""/>
                </div>
                <button className="sideBarMenu__toggleMenu" onClick={handleToggleMenu}>
                    <FiMenu/>
                </button>
            </div>
            <div className="sideBarMenu__user">
                <img src={UserImage} alt="" className={`sideBarMenu__user-image`}/>
                <div className="sideBarMenu__user-info">
                    <h4 className={`sideBarMenu__user-name`}>John Doe</h4>
                    <p className={`sideBarMenu__user-role`}>Administrator</p>
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
                <button className="sideBarMenu__logout-button">
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