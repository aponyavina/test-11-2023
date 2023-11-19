import React, {FC, memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {deleteTableRow} from '../../../redux/tableSlice';
import {useGlobalContext} from '../../../context/Context';
import {IRowData, RowType, TypedDispatch} from '../../../types';
import cn from "classnames";

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
            ? <div className='table__row'>
                <div className='w-100'>No data</div>
            </div>
            : <div className='table__row'>
                <div>{data?.name}</div>
                <div>{data?.surname}</div>
                <div>{data?.age}</div>
                <div>{data?.city}</div>
                <div className='table__row-buttons'>
                    <span className={cn('button', 'button--edit')} onClick={editHandler}>Edit</span>
                    <span className={cn('button', 'button--delete')} onClick={deleteHandler}>Delete</span>
                </div>
            </div>
    );
});
