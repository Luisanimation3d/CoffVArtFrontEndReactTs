import {FC, useEffect, useRef} from "react";
import {SearchInputProps} from "../../types/GeneralTypes";
import './SearchInput.css';

export const SearchInput: FC<SearchInputProps> = ({label, value, onChange, idSearch}) => {
    const inputRef = useRef<any>(null);
    const labelRef = useRef<any>(null);
    useEffect(() => {
        inputRef.current?.addEventListener('focus', () => {
            labelRef.current?.classList.add('active');
            inputRef.current?.addEventListener('blur', () => {
                if (inputRef.current?.value !== '') {
                    labelRef.current?.classList.add('lleno');
                } else {
                    labelRef.current?.classList.remove('lleno');
                }
                labelRef.current?.classList.remove('active');
            });
        });

        return () => {
            inputRef.current?.removeEventListener('focus', () => {
                labelRef.current?.classList.add('active');
            });
            inputRef.current?.removeEventListener('blur', () => {
                if (inputRef.current?.value === '') {
                    labelRef.current?.classList.remove('active');
                }
            });
        }
    }, [])
    return (
        <div className='inputContainer'>
			<span className='inputSpan'>
				<input type='text' placeholder={label} ref={inputRef} value={value} onChange={onChange} id={idSearch}/>
			</span>
            <label ref={labelRef}>{label}</label>
        </div>
    );
}