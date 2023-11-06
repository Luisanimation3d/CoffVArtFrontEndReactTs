import { FC } from 'react';
import {TitlesProps} from "../../types/Titles";

import './Titles.css';

export const Titles: FC<TitlesProps> = ({
                                            title,
                                            level
                                        }) => {
    switch (level) {
        case 1:
            return <h1 className="titles__title">{title}</h1>
        case 2:
            return <h2 className="titles__title">{title}</h2>
        case 3:
            return <h3 className="titles__title">{title}</h3>
        case 4:
            return <h4 className="titles__title">{title}</h4>
        case 5:
            return <h5 className="titles__title">{title}</h5>
        case 6:
            return <h6 className="titles__title">{title}</h6>
        default:
            return <h1 className="titles__title">{title}</h1>
    }
}