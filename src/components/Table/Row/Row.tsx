import React, {FC, memo} from 'react';
import {useDispatch} from 'react-redux';
import cn from "classnames";

import {deleteTableRow} from '../../../redux/tableSlice';
import {useGlobalContext} from '../../../context/Context';
import {IRowData, RowType, TypedDispatch} from '../../../types';

import styles from '../Table.module.scss';

interface IRowProps {
    data?: IRowData;
    type: RowType;
    tableId: string;
}

const Row:FC<IRowProps> = ({data, type, tableId}) => {
    const dispatch = useDispatch<TypedDispatch>();

    const {setModalActive, setEditingData} = useGlobalContext();

    const editHandler = () => {
        setEditingData({tableId, defaultValue: data})
        setModalActive(true);
    };

    const deleteHandler = () => {
        if (data?.id) {
            dispatch(deleteTableRow({tableId, dataId: data?.id}))
        }
    };

    return (
        (type === 'empty' && !data)
            ? <div className={styles['table__row']}>
                <div className={styles['no-data']}>No data</div>
            </div>
            : <div className={styles['table__row']}>
                <div>{data?.name}</div>
                <div>{data?.surname}</div>
                <div>{data?.age}</div>
                <div>{data?.city?.value}</div>
                <div className={styles['table__row-buttons']}>
                    <span
                        className={cn(styles['button'], styles['button--edit'])}
                        onClick={editHandler}
                    >
                        Edit
                    </span>
                    <span
                        className={cn(styles['button'], styles['button--delete'])}
                        onClick={deleteHandler}
                    >
                        Delete
                    </span>
                </div>
            </div>
    );
};

export default memo(Row);
