import React, {FC} from 'react';
import cn from "classnames";

import styles from './Input.module.scss';
import {FieldError} from "react-hook-form/dist/types/errors";
import {UseFormRegisterReturn} from "react-hook-form";
import {Inputs} from "../../../types";

interface IInputProps {
    type?: 'text' | 'number';
    register: UseFormRegisterReturn<keyof Inputs>;
    placeholder: string;
    error?: FieldError;
    errorMessage?: string;
}

const Input:FC<IInputProps> = ({
   type = 'text',
   register,
   placeholder,
   error,
   errorMessage,
}) => (
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

export default Input;