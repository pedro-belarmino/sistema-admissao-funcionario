import { FC } from 'react';
import '../../index.css'


interface InputsProps {
    type?: string;
    name?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputMode?: "search" | "email" | "tel" | "text" | "url" | "none" | "numeric" | "decimal";
    pattern?: string;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    readOnly?: boolean;
    min?: string;
    max?: string;
    id?: string;
}

const Inputs: FC<InputsProps> = ({ type, name, value, onChange, inputMode, pattern, placeholder, className, defaultValue, readOnly, min, max, }) => {
    return (
        <div className='inputContainer'>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                className={className}
                placeholder={placeholder}
                onChange={onChange}
                inputMode={inputMode}
                pattern={pattern}
                defaultValue={defaultValue}
                readOnly={readOnly}
                min={min}
                max={max}
            />
        </div>
    )
}

export default Inputs;