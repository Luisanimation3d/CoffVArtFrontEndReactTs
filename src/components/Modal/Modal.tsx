import { MdClose } from 'react-icons/md';
import { ModalContainerProps, ModalProps } from '../../types/Modal';
import './Modal.css';
import {useDarkMode} from "../../context/DarkMode.tsx";


import { FC } from 'react';
export const ModalContainer: FC<ModalContainerProps> = ({
    children,
    ShowModal,
  }) => {
    return (
      <div
        className={`modal__container `}
        onClick={() => ShowModal(false)}
      >
        {children}
      </div>
    );
  };
  
  export const Modal: FC<ModalProps> = ({ title, children, showModal, ...props }) => {
    const { darkMode } = useDarkMode();
  
    return (
      <div className={`modal ${darkMode ? 'modal__dark' : 'modal__light'} ${props?.className ? props?.className : ''}`} onClick={(e) => e.stopPropagation()}>
        <button
          className={`modal__close ${darkMode ? 'modal__close__dark' : 'modal__close__light'}`}
          onClick={() => showModal(false)}
        >
          <MdClose style={{
            fill: props?.xColor ? props.xColor : (darkMode ? '#fff' : '#000'),
          }}/>
        </button>
        {title && (
          <div className={`modal__header ${darkMode ? 'modal__header__dark' : 'modal__header__light'}`}>
            <h2 className={`modal__title ${darkMode ? 'modal__title__dark' : 'modal__title__light'}`}>{title}</h2>
          </div>
        )}
        <div className={`modal__content ${props?.className} ${darkMode ? 'modal__content__dark' : 'modal__content__light'}`}>{children}</div>
      </div>
    );
  };