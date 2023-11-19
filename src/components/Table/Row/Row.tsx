import React, {FC, memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {deleteTableRow} from '../../../redux/tableSlice';
import {useGlobalContext} from '../../../context/Context';
import {IRowData, RowType, TypedDispatch} from '../../../types';

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
            ? <div className='table__row'>No data</div>
            : <div className='d-flex'>
                <div>{data?.name}</div>
                <div>{data?.surname}</div>
                <div>{data?.age}</div>
                <div>{data?.city}</div>
                <div>
                    <button onClick={editHandler}>Edit</button>
                    <button onClick={deleteHandler}>Delete</button>
                </div>
            </div>
    );
});
