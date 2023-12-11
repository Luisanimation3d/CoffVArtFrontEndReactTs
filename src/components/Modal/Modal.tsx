import { MdClose } from 'react-icons/md';
import { ModalContainerProps, ModalProps } from '../../types/Modal';
import './Modal.css';

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
    return (
        <div className={`modal ${props?.className ? props?.className : ''}`} onClick={(e) => e.stopPropagation()}>
            <button
                className='modal__close'
                onClick={() => {
                    showModal(false)}}
            >
                <MdClose style={{
                    fill: props?.xColor ? props.xColor : '#fff',
                }}/>
            </button>
            {title && (
                <div className='modal__header'>
                    <h2 className='modal__title'>{title}</h2>
                </div>
            )}
            <div className={`modal__content ${props?.className}`}>{children}</div>
        </div>
    );
};
