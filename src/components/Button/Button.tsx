import { useRef, useEffect } from 'react';
import './Button.css';
import {useDarkMode} from "../../context/DarkMode.tsx";

import { ButtonProps } from '../../types/Button';

export function Button({
	text,
	onClick,
	autosize = true,
	disabled,
	fill = true,
	type = 'button',
}: ButtonProps): JSX.Element {
	const btnUseRef = useRef<HTMLButtonElement>(null);
	const {darkMode} = useDarkMode();

	useEffect(() => {
		btnUseRef.current?.addEventListener('click', (e: any) => {
			const circle = document.createElement('span');
			circle.classList.add('circle');

			const x = e.clientX - e.currentTarget?.offsetLeft;
            const y = e.clientY - e.currentTarget?.offsetTop;
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;

            e.currentTarget?.appendChild(circle);
            setTimeout(() => circle.remove(), 500);
		});
        return () => {
            fill && btnUseRef.current?.removeEventListener('click', (e: any) => {
                const circle = document.createElement('span');
                circle.classList.add('circle');

                const x = e.clientX - e.currentTarget?.offsetLeft;
                const y = e.clientY - e.currentTarget?.offsetTop;
                circle.style.left = `${x}px`;
                circle.style.top = `${y}px`;

                e.currentTarget?.appendChild(circle);
                setTimeout(() => circle.remove(), 500);
            });
        }
	}, []);

	return (
		<button
			onClick={onClick}
			className={`btn btn--${fill ? 'filled' : 'outline'} ${darkMode ? 'dark-mode__outline': 'light-mode__outline'} btn--${
				autosize ? 'auto' : 'fixed'
			} ${disabled ? 'btn--disabled' : ''} ${darkMode ? 'dark-mode' : 'light-mode'}`}
			ref={btnUseRef}
			type={type}
		>
			{text}
		</button>
	);
}
