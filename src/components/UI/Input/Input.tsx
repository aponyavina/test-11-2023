import React, {FC} from 'react';

import styles from './Input.module.scss';
import cn from "classnames";

interface IInputProps {
    type?: 'text' | 'number';
    register: any;
    placeholder: string;
    error?: any;
    errorMessage?: string;
}

const Input:FC<IInputProps> = ({
   type = 'text',
   register,
   placeholder,
   error,
   errorMessage,
}) => {
    return (
        <>
            <input
                className={cn(styles['input'], {[styles['input--error']]: error})}
                type={type}
                {...register}
                placeholder={placeholder}
            />
            <div className={cn(styles['error-text'], {[styles['visible']]: error})}>{errorMessage}</div>
        </>
    );
};

export default Input;