import React, {FC, memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import cn from "classnames";

import {deleteTableRow} from '../../../redux/tableSlice';
import {useGlobalContext} from '../../../context/Context';
import {IRowData, RowType, TypedDispatch} from '../../../types';

import styles from "../Table.module.scss";

interface IRowProps {
    data?: IRowData;
    type: RowType;
    tableId: string;
}

export const Row:FC<IRowProps> = memo(({data, type, tableId}) => {
    const dispatch = useDispatch<TypedDispatch>();

    const {setModalActive, setEditingData} = useGlobalContext();

    const editHandler = useCallback(() => {
        setEditingData({tableId, defaultValue: data})
        setModalActive(true);
    }, [data, setEditingData, setModalActive, tableId]);

    const deleteHandler = useCallback(() => {
        dispatch(deleteTableRow({tableId, dataId: data?.id}))
    }, [data?.id, dispatch, tableId]);

    return (
        (type === 'empty' && !data)
            ? <div className={styles['table__row']}>
                <div className={styles['w-100']}>No data</div>
            </div>
            : <div className={styles['table__row']}>
                <div>{data?.name}</div>
                <div>{data?.surname}</div>
                <div>{data?.age}</div>
                <div>{data?.city?.value}</div>
                <div className={styles['table__row-buttons']}>
                    <span className={cn(styles['button'], styles['button--edit'])} onClick={editHandler}>Edit</span>
                    <span className={cn(styles['button'], styles['button--delete'])} onClick={deleteHandler}>Delete</span>
                </div>
            </div>
    );
});
