import {FC} from "react";
import {ContainerProps} from "../../types/GeneralTypes";

import './Container.css';
export const Container: FC<ContainerProps> = ({ children }) =>{
return (
        <div className="container">
            {children}
        </div>
    )
}