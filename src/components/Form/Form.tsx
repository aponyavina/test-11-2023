import React, {FC, memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from "classnames";

import {addTableRow, editTableRow, selectOptionsSelector} from '../../redux/tableSlice';
import {useGlobalContext} from '../../context/Context';
import {EditingData, Inputs, TypedDispatch} from "../../types";
import {DEFAULT_TABLE, ERROR_MESSAGES} from "../../constants";
import Input from "../UI/Input/Input";
import CustomSelect from "../UI/Select/Select";

import styles from './Form.module.scss';

interface IAddFormProps{
    defaultValues?: EditingData | null;
    className?: string;
}

export const Form:FC<IAddFormProps> = memo(({defaultValues, className}) => {
    const dispatch = useDispatch<TypedDispatch>();

    const {defaultValue = null, tableId = DEFAULT_TABLE} = defaultValues || {};
    const {setModalActive} = useGlobalContext();

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { isValid, errors },
    } = useForm<Inputs>({ mode: 'onBlur' });

    useEffect(() => {
        if (defaultValue) {
            setValue('name', defaultValue.name);
            setValue('surname', defaultValue.surname);
            setValue('age', defaultValue.age);
            setValue('city',  {label: defaultValue?.city?.label ?? '', value: defaultValue?.city?.value ?? ''});
        }
    }, [defaultValue, setValue]);

    const selectOptions = useSelector(selectOptionsSelector);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const resetForm = () => {
            reset();
            setValue('city', null);
        }
        if (defaultValues) {
            dispatch(editTableRow({tableId, data: {...data, id: defaultValue?.id}}));
            resetForm();
            setModalActive(false);
        } else {
            dispatch(addTableRow({tableId, data: {...data, id: Number(new Date().getTime())}}));
            resetForm();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn(styles['form'], {[styles[`${className}`]]: className})}>
            <div className={styles['form__group']}>
                <Input
                    register={register('name', { required: true, pattern: /^([A-Za-z]{3,})$/ })}
                    placeholder='Name'
                    error={errors?.name}
                    errorMessage={ERROR_MESSAGES.NAME}
                />
            </div>
            <div className={styles['form__group']}>
                <Input
                    register={register('surname', { required: true, pattern: /^([A-Za-z]{3,})$/ })}
                    placeholder='Surname'
                    error={errors?.surname}
                    errorMessage={ERROR_MESSAGES.NAME}
                />
            </div>
            <div className={styles['form__group']}>
                <Input
                    type='number'
                    register={register('age', { required: true,  validate: (value) => (value > 14 && value < 90) })}
                    placeholder='Age'
                    error={errors?.age}
                    errorMessage={ERROR_MESSAGES.AGE}
                />
            </div>
            <div className={styles['form__group']}>
                <CustomSelect
                    control={control}
                    name='city'
                    rules={{
                        required: {
                            value: true,
                            message: ERROR_MESSAGES.CITY
                        },
                    }}
                    placeholder='City'
                    options={selectOptions}
                />
            </div>

            <button
                disabled={!isValid}
                type='submit'
                className={styles['form__button']}
            >
                {defaultValue ? 'Edit' : 'Add'}
            </button>
        </form>
    );
});
