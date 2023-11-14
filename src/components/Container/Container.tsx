import {FC} from "react";
import {ContainerProps} from "../../types/GeneralTypes";

import styles from './Container.module.css';
export const Container: FC<ContainerProps> = ({ children, align = 'TOP', justify = 'TOP' }) =>{
return (
        <div className={styles.container}
            style={
                {
                    alignItems: align === 'TOP' ? 'flex-start' : align === 'BOTTOM' ? 'flex-end' : 'center',
                    justifyContent: justify === 'TOP' ? 'flex-start' : justify === 'BOTTOM' ? 'flex-end' : 'center'
                }
            }
        >
            {children}
        </div>
    )
}