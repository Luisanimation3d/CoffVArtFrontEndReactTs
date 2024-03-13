import React, { useEffect, useRef, useState } from 'react';
import styles from './SideBarRedisign.module.css';
import {Link, useLocation} from 'react-router-dom';

import userImage from '../../assets/userImage.png';
import {
	FiChevronDown,
	FiChevronLeft,
	FiLogOut,
	FiMenu,
	FiMoon,
	FiSearch,
	FiSettings,
	FiSun,
	FiX,
} from 'react-icons/fi';
import { useDarkMode } from '../../context/DarkMode.tsx';
import { MenuItemsProps } from '../../types/MenuBar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import { API_KEY, API_URL } from '../../utils/constantes.ts';
import { useFetch } from '../../hooks/useFetch.tsx';

export const SideBarMenuRedisign = ({
	menuItems,
}: {
	menuItems: MenuItemsProps;
}) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const width = window.innerWidth;
		if (width <= 768) {
			setIsMobile(true);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('resize', () => {
			const currentDeviceWidth = window.innerWidth;
			if (currentDeviceWidth <= 768) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		});
		return () => {
			window.removeEventListener('resize', () => {
				const currentDeviceWidth = window.innerWidth;
				if (currentDeviceWidth <= 768) {
					setIsMobile(true);
				} else {
					setIsMobile(false);
				}
			});
		};
	}, []);

	return (
		<>
			{isMobile ? (
				<SideBarMenuRedisignMobile menuItems={menuItems} />
			) : (
				<SideBarMenuRedisignDesktop menuItems={menuItems} />
			)}
		</>
	);
};

export const SideBarMenuRedisignDesktop = ({
	menuItems,
}: {
	menuItems: MenuItemsProps;
}) => {
	const {user } = useAuth();
	const { darkMode, setDarkMode } = useDarkMode();
	const [toggleMenu, setToggleMenu] = useState(true);
	const [searchInput, setSearchInput] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	let menuFilter: MenuItemsProps = [];

	if (searchInput !== '') {
		menuFilter = menuItems.filter((item) => {
			if (item.type === 'menu') {
				return item.title.toLowerCase().includes(searchInput.toLowerCase());
			} else {
				return item.subItems.some((subItem) =>
					subItem.title.toLowerCase().includes(searchInput.toLowerCase())
				);
			}
		});
	} else {
		menuFilter = menuItems;
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
		};
	}, []);

	return (
		<header
			className={`${
				darkMode
					? styles.darkmode__header__container
					: styles.lightmode__header__container
			} ${styles.header__container} ${
				toggleMenu
					? `${styles.header__open__container} header__open__container`
					: styles.header__close__container
			}`}
		>
			<div
				className={`${styles.header__userInfo__container}`}
				onClick={() => setToggleMenu((prev) => !prev)}
			>
				<div className={`${styles.header__userImage__container}`}>
					<img
						src={userImage}
						alt='User Image'
						className={styles.header__userImage}
					/>
				</div>
				<div className={`${styles.header__userInfo__data}`}>
					<h4 className={`${styles.header__userInfo__name}`}>{user?.name}</h4>
					<p className={`${styles.header__userInfo__role}`}>{user?.role}</p>
				</div>
				<button
					className={`${styles.header__toggler}`}
					onClick={(e) => {
						e.stopPropagation();
						setToggleMenu((prev) => !prev);
					}}
				>
					{<FiChevronLeft /> || '<'}
				</button>
			</div>
			<div className={`${styles.header__search__container}`}>
				<label
					htmlFor='searchInputHeader'
					className={`${styles.header__search__label}`}
					onClick={() => {
						setToggleMenu(true);
						inputRef.current?.focus();
					}}
				>
					<FiSearch />
				</label>
				<input
					type='text'
					placeholder={'Search'}
					id='searchInputHeader'
					className={`${styles.header__search__input}`}
					ref={inputRef}
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
			</div>
			<ul className={`${styles.header__items__container}`}>
				{menuFilter?.map((item, index) => {
					if (item.type === 'menu') {
						return (
							<SideBarMenuRedisignItem
								title={item.title}
								icon={item.icon}
								link={item.link}
								key={index}
							/>
						);
					} else {
						return (
							<SideBarMenuRedisignItemSubItem
								title={item.title}
								icon={item.icon}
								subItems={item.subItems}
								key={index}
								toggleMenu={toggleMenu}
								setToggleMenu={setToggleMenu}
							/>
						);
					}
				})}
			</ul>
			<span
				className={`${styles.header__options} ${styles.header__options__action}`}
				onClick={() => setDarkMode(!darkMode)}
			>
				{darkMode ? (
					<>
						<FiSun />
						<span className={styles.header__options__title}>Light Mode</span>
					</>
				) : (
					<>
						<FiMoon />
						<span className={styles.header__options__title}>Dark Mode</span>
					</>
				)}
			</span>
			<span className={styles.header__options}>
				<FiSettings />
				<Link to={'/admin/my-profile'} className={styles.header__options__title}>Mi perfil</Link>
			</span>
		</header>
	);
};

export const SideBarMenuRedisignMobile = ({
	menuItems,
}: {
	menuItems: MenuItemsProps;
}) => {
	const { logout, user } = useAuth();
	const navigate = useNavigate();
	const { get: logoutGet } = useFetch(API_URL);
	const location = useLocation()

	const { darkMode, setDarkMode } = useDarkMode();

	const [searchInput, setSearchInput] = useState('');
	const [toggleMenu, setToggleMenu] = useState(false);

	let menuFilter: MenuItemsProps = [];

	if (searchInput !== '') {
		menuFilter = menuItems.filter((item) => {
			if (item.type === 'menu') {
				return item.title.toLowerCase().includes(searchInput.toLowerCase());
			} else {
				return item.subItems.some((subItem) =>
					subItem.title.toLowerCase().includes(searchInput.toLowerCase())
				);
			}
		});
	} else {
		menuFilter = menuItems;
	}

	const handleLogout = () => {
		logoutGet(`login/logout?apikey=${API_KEY}`);
		logout();
		setTimeout(() => {
			navigate('/home');
		}, 500);
	};

	useEffect(() => {
		setToggleMenu(false)
	}, [location])

	return (
		<>
			{!toggleMenu ? (
				<>
					<header
						className={`${styles.header__container__mobile__close} ${
							darkMode
								? styles.header__container__mobile__close__darkMode
								: styles.header__container__mobile__close__lightMode
						}`}
					>
						<button
							className={`${styles.header__toggler__mobile}`}
							onClick={() => setToggleMenu(true)}
						>
							{<FiMenu /> || 'Menu'}
						</button>
					</header>
				</>
			) : (
				<>
					<header
						className={`${styles.header__container__mobile} ${
							darkMode
								? styles.header__container__mobile__darkMode
								: styles.header__container__mobile__lightMode
						}`}
					>
						<button
							className={`${styles.header__toggler__mobile}`}
							onClick={() => setToggleMenu(false)}
						>
							{<FiX /> || 'X'}
						</button>
						<div className={`${styles.header__userInfo__container__mobile}`}>
							<div className={`${styles.header__userImage__container__mobile}`}>
								<img
									src={userImage}
									alt='User Image'
									className={styles.header__userImage}
								/>
							</div>
							<div className={`${styles.header__userInfo__data__mobile}`}>
								<h4 className={`${styles.header__userInfo__name}`}>
									{user?.name}
								</h4>
								<p className={`${styles.header__userInfo__role}`}>{user?.role}</p>
							</div>
						</div>
						<div className={`${styles.header__search__container}`}>
							<label
								htmlFor='searchInputHeader'
								className={`${styles.header__search__label}`}
							>
								<FiSearch />
							</label>
							<input
								type='text'
								placeholder={'Search'}
								id='searchInputHeader'
								className={`${styles.header__search__input}`}
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
						</div>
						<ul className={`${styles.header__items__container}`}>
							{menuFilter?.map((item, index) => {
								if (item.type === 'menu') {
									return (
										<SideBarMenuRedisignItem
											title={item.title}
											icon={item.icon}
											link={item.link}
											key={index}
										/>
									);
								} else {
									return (
										<SideBarMenuRedisignItemSubItem
											title={item.title}
											icon={item.icon}
											subItems={item.subItems}
											key={index}
										/>
									);
								}
							})}
						</ul>
						<span
							className={`${styles.header__options} ${styles.header__options__action}`}
							onClick={() => setDarkMode(!darkMode)}
						>
							{darkMode ? (
								<>
									<FiSun />
									<span className={styles.header__options__title}>
										Light Mode
									</span>
								</>
							) : (
								<>
									<FiMoon />
									<span className={styles.header__options__title}>
										Dark Mode
									</span>
								</>
							)}
						</span>
						<span className={styles.header__options}>
							<FiSettings />
							<span className={styles.header__options__title}>Settings</span>
						</span>
						<span
							className={styles.header__options}
							style={{
								color: '#9F212F',
							}}
							onClick={handleLogout}
						>
							<FiLogOut />
							<span className={`${styles.header__options__title}`}>
								Cerrar Sesión
							</span>
						</span>
					</header>
				</>
			)}
		</>
	);
};

const SideBarMenuRedisignItem = ({
	title,
	icon,
	link,
}: {
	title: string;
	icon: React.ReactNode;
	link: string;
}) => {
	return (
		<li className={`${styles.header__item__menu}`}>
			<NavLink
				to={link}
				className={({ isActive }) =>
					isActive
						? `${styles.header__item__link} ${styles.header__item__menu__active}`
						: `${styles.header__item__link}`
				}
			>
				<span className={`${styles.header__item__icon}`}>{icon}</span>
				<span className={`${styles.header__item__title}`}>{title}</span>
			</NavLink>
		</li>
	);
};

const SideBarMenuRedisignItemSubItem = ({
	title,
	icon,
	subItems,
	toggleMenu,
	setToggleMenu,
}: {
	title: string;
	icon: React.ReactNode;
	subItems: {
		title: string;
		link: string;
	}[];
	toggleMenu?: boolean;
	setToggleMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [showSubmenu, setShowSubmenu] = useState(false);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		if (!toggleMenu) {
			setShowSubmenu(false);
		}
	}, [toggleMenu]);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWindowWidth(window.innerWidth);
		});
		return () => {
			window.removeEventListener('resize', () => {
				setWindowWidth(window.innerWidth);
			});
		};
	}, []);

	return (
		<>
			<li
				className={`${styles.header__item__submenu__container}`}
				style={{
					minHeight: windowWidth > 768 && windowWidth <= 1500 ? showSubmenu ? `${subItems.length * 37.5 + 37.5}px` : '37.5px' :  showSubmenu ? `${subItems.length * 50 + 50}px` : '50px',
				}}
			>
				<div
					className={`${styles.header__submenu__text__container} ${
						showSubmenu ? styles.header__submenu__text__container__active : ''
					}`}
					onClick={() => {
						setToggleMenu && setToggleMenu(true);
						setShowSubmenu((prev) => !prev);
					}}
				>
					<span className={`${styles.header__item__icon}`}>{icon}</span>
					<span className={`${styles.header__item__title}`}>{title}</span>
					<button className={`${styles.header__submenu__toggler}`}>
						{<FiChevronDown /> || '<'}
					</button>
				</div>
				<ul
					className={`${styles.header__submenu__container} ${
						showSubmenu ? styles.header__submenu__container__active : ''
					}`}
				>
					{subItems.map((item, index) => (
						<li className={`${styles.header__submenu__item}`} key={index}>
							<NavLink
								to={item.link}
								// className={`${styles.header__submenu__link} ${
								// 	item.title === 'Payments'
								// 		? styles.header__submenu__link__active
								// 		: ''
								// }`}

								className={({ isActive }) =>
									isActive
										? `${styles.header__submenu__link} ${styles.header__submenu__link__active
								}`
										: `${styles.header__submenu__link}`
								}
							>
								{item.title}
							</NavLink>
						</li>
					))}
				</ul>
			</li>
		</>
	);
};
