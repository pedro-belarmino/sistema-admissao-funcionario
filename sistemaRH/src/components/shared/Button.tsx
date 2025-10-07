import { FC } from 'react';
import '../../index.css'


interface ButtonProps {
    children?: React.ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    name?: string;
    value?: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}


const Button: FC<ButtonProps> = ({ type, name, value, className, children, onClick }) => {
    return (
        <div className='inputContainer'>
            <button
                type={type}
                name={name}
                id={name}
                value={value}
                className={className}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}

export default Button;