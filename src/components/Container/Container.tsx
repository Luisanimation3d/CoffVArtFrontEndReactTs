import {FC} from "react";
import {ContainerProps} from "../../types/GeneralTypes";

import styles from './Container.module.css';
export const Container: FC<ContainerProps> = ({ children, align = 'TOP', justify = 'TOP', direction = 'COLUMN', gap = 1, className }) =>{
return (
        <div className={`${styles.container} ${className || ''}`}
            style={
                {
                    alignItems: align === 'TOP' ? 'flex-start' : align === 'BOTTOM' ? 'flex-end' : 'center',
                    justifyContent: justify === 'TOP' ? 'flex-start' : justify === 'BOTTOM' ? 'flex-end' : 'center',
                    flexDirection: direction === 'COLUMN' ? 'column' : 'row',
                    gap: `${gap}rem`
                }
            }
        >
            {children}
        </div>
    )
}