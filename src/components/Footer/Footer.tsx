// import { createPortal } from "react-dom";
import {FaFacebookF, FaInstagram} from "react-icons/fa";
import "./Footer.css";

import LogoBurdeo from '../../assets/BurdeoFullLogo.png'
import {Button} from "../Button/Button";
// import { SubscribeModal } from "../../Modals/SubscribeModal/SubscribeModal";

export const UserFooter = () => {
    // const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <footer>
            <div className="userFooter__rowOne">
                <div className="userFooter__col">
                    <h4>Síguenos</h4>
                    <ul className="userFooter__socialMedia">
                        <li>
                            <a href="https://www.facebook.com" target="_blank">
                                <FaFacebookF/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com" target="_blank">
                                <FaInstagram/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="userFooter__col">
                    <h4>Compañía</h4>
                    <ul>
                        <li>
                            <a href="#">Términos y condiciones</a>
                        </li>
                        <li>
                            <a href="#">Política de privacidad</a>
                        </li>
                    </ul>
                </div>
                <div className="userFooter__col">
                    <img src={LogoBurdeo} alt=""/>
                </div>
                <div className="userFooter__col">
                    <h4>Ayuda</h4>
                    <ul>
                        <li><a href="#">Contáctenos</a></li>
                        <li><a href="#">FQA</a></li>
                        <li><a href="#">Estado de pedido</a></li>
                        <li><a href="#">Devoluciones y garantía</a></li>
                    </ul>
                </div>
                <div className="userFooter__col">
                    <h4>Newsletter</h4>
                    <Button text={'Suscribirse'}
                            // onClick={() => setIsOpenModal(true)}
                            fill={false}/>
                </div>
            </div>
            <div className="userFooter__rowTwo">
                <span>© Burdeo 2023</span>
                <span>coffVart</span>
            </div>
            {/*{*/}
            {/*    isOpenModal && (*/}
            {/*        createPortal(*/}
            {/*            <SubscribeModal showModal={setIsOpenModal}/>,*/}
            {/*            document.getElementById('modal') as HTMLElement*/}
            {/*        )*/}
            {/*    )*/}
            {/*}*/}
        </footer>
    );
};