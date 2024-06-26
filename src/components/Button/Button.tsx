import { useRef, useEffect } from 'react';
import './Button.css';

import { ButtonProps } from '../../types/Button';

export function Button({
	text,
	onClick,
	autosize = true,
	disabled,
	fill = true
}: ButtonProps): JSX.Element {
	const btnUseRef = useRef<HTMLButtonElement>(null);

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
			className={`btn--${fill ? 'filled' : 'outline'} btn--${
				autosize ? 'auto' : 'fixed'
			} ${disabled && 'btn--disabled'}`}
			ref={btnUseRef}
		>
			{text}
		</button>
	);
}
