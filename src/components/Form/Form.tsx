import React, {FC, memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from "classnames";

import {addTableRow, editTableRow, selectOptionsSelector} from '../../redux/tableSlice';
import {useGlobalContext} from '../../context/Context';
import {EditingData, Inputs, TypedDispatch} from "../../types";
import {COL_NAMES, DEFAULT_TABLE} from "../../constants";
import Input from "../UI/Input/Input";
import CustomSelect from "../UI/Select/Select";

import './Form.scss';

interface IAddFormProps{
    defaultValues?: EditingData | null;
    classname?: string
}

export const Form:FC<IAddFormProps> = memo(({defaultValues, classname}) => {
    const dispatch = useDispatch<TypedDispatch>();

    const {defaultValue = null, tableId = DEFAULT_TABLE} = defaultValues || {};
    const {setModalActive} = useGlobalContext();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Inputs>();

    const selectOptions = useSelector(selectOptionsSelector);

    const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
        if (typeof data.city !== "string") {
            // @ts-ignore
            data.city = data.city.value;
        }

        if (defaultValues) {
            dispatch(editTableRow({tableId, data: {...data, id: defaultValue?.id}}));
            setModalActive(false);
        } else {
            dispatch(addTableRow({tableId, data: {...data, id: Number(new Date().getTime())}}));
        }
    }, [defaultValue?.id, defaultValues, dispatch, setModalActive, tableId])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn('form', classname ?? '')}>
            <div className='form-block'>
                <Input
                    register={register('name', { required: true })}
                    defaultValue={defaultValue?.name ?? ''}
                    placeholder='Name'
                />
            </div>
            <div className='form-block'>
                <Input
                    register={register('surname', { required: true })}
                    defaultValue={defaultValue?.surname ?? ''}
                    placeholder='Surname'
                />
            </div>
            <div className='form-block'>
                <Input
                    type='number'
                    register={register('age', { required: true })}
                    // @ts-ignore
                    defaultValue={defaultValue?.age ?? ''}
                    placeholder='Age'
                />
            </div>
            <div className='form-block'>
                <CustomSelect
                    control={control}
                    name='city'
                    defaultValue={defaultValue?.city}
                    rules={{
                        required: {
                            value: true,
                            message: 'Это поле необходимо заполнить'
                        },
                    }}
                    placeholder='City'
                    options={selectOptions}
                />
            </div>

            <button
                disabled={!isValid}
                type='submit'
                className='form__button'
            >{defaultValue ? 'Edit' : 'Add'}</button>
        </form>
    );
});
