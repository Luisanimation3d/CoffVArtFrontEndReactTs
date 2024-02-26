import { FC } from 'react';
import {TitlesProps} from "../../types/Titles";
import { useDarkMode} from "../../context/DarkMode.tsx";
import './Titles.css';

export const Titles: FC<TitlesProps> = ({
                                            title,
                                            level,
                                            transform = 'CAPITALIZE',
                                        }) => {
                                        const {darkMode} = useDarkMode();
    switch (level) {
        case 1:
            return <h1 className={`titles__title ${darkMode ? 'titles__title__darkMode' : 'titles__title__lightMode'}`} style={{
                textTransform: transform === 'UPPERCASE' ? 'uppercase' : transform === 'LOWERCASE' ? 'lowercase' : 'capitalize',
            }}>{title}</h1>
        case 2:
            return <h2 className={`titles__title ${darkMode ? 'titles__title__darkMode' : 'titles__title__lightMode'}`} style={{
                textTransform: transform === 'UPPERCASE' ? 'uppercase' : transform === 'LOWERCASE' ? 'lowercase' : 'capitalize'
            }}>{title}</h2>
        case 3:
            return <h3 className="titles__title" style={{
                textTransform: transform === 'UPPERCASE' ? 'uppercase' : transform === 'LOWERCASE' ? 'lowercase' : 'capitalize',
            }}>{title}</h3>
        case 4:
            return <h4 className="titles__title" style={{
                textTransform: transform === 'UPPERCASE' ? 'uppercase' : transform === 'LOWERCASE' ? 'lowercase' : 'capitalize',
            }}>{title}</h4>
        case 5:
            return <h5 className="titles__title" style={{
                textTransform: transform === 'UPPERCASE' ? 'uppercase' : transform === 'LOWERCASE' ? 'lowercase' : 'capitalize',
            }}>{title}</h5>
        case 6:
            return <h6 className="titles__title" style={{
                textTransform: transform === 'UPPERCASE' ? 'uppercase' : transform === 'LOWERCASE' ? 'lowercase' : 'capitalize',
            }}>{title}</h6>
        default:
            return <h1 className="titles__title" style={{
                textTransform: transform === 'UPPERCASE' ? 'uppercase' : transform === 'LOWERCASE' ? 'lowercase' : 'capitalize',
            }}>{title}</h1>
    }
}