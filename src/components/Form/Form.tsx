import React, {FC, memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import {addTableRow, editTableRow, selectOptionsSelector} from '../../redux/tableSlice';
import {useGlobalContext} from '../../context/Context';
import {EditingData, Inputs, TypedDispatch} from "../../types";
import {DEFAULT_TABLE} from "../../constants";

import './Form.scss';

interface IAddFormProps{
    defaultValues?: EditingData | null;
}

export const Form:FC<IAddFormProps> = memo(({defaultValues}) => {
    const dispatch = useDispatch<TypedDispatch>();

    const {defaultValue = null, tableId = DEFAULT_TABLE} = defaultValues || {};
    const {setModalActive} = useGlobalContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const selectOptions = useSelector(selectOptionsSelector);

    const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
        if (defaultValues) {
            dispatch(editTableRow({tableId, data: {...data, id: defaultValue?.id}}));
            setModalActive(false);
        } else {
            dispatch(addTableRow({tableId, data: {...data, id: Number(new Date().getTime())}}));
        }
    }, [defaultValue?.id, defaultValues, dispatch, setModalActive, tableId])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <input
                defaultValue={defaultValue?.name ?? ''}
                placeholder='name'
                {...register('name', { required: true })}
            />

            <input
                defaultValue={defaultValue?.surname ?? ''}
                placeholder='surname'
                {...register('surname', { required: true })}
            />
            {errors.surname && <span>This field is required</span>}

            <input
                defaultValue={defaultValue?.age ?? ''}
                placeholder='age'
                type='number'
                {...register('age', { required: true })}
            />

            <select
                placeholder='city'
                {...register('city', { required: true })}
            >
                {selectOptions.map((option, i) => (
                    <option
                        key={i}
                        value={option}
                        selected={defaultValue?.city === option}
                    >
                        {option}
                    </option>
                ))}
            </select>

            <button type='submit'>{defaultValue ? 'Edit' : 'Add'}</button>
        </form>
    );
});
