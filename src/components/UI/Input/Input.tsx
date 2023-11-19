import React, {FC} from 'react';

import './Input.scss';

interface IInputProps {
    type?: 'text' | 'number';
    register: any;
    defaultValue?: string;
    placeholder: string;
}

const Input:FC<IInputProps> = ({
   type = 'text',
   register,
   defaultValue,
   placeholder,
}) => {
    return (
        <input
            className='input'
            type={type}
            {...register}
            defaultValue={defaultValue}
            placeholder={placeholder}
        />
    );
};

export default Input;