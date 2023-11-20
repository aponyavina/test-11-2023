import React, {FC, memo} from 'react';
import {useDispatch} from 'react-redux';
import cn from "classnames";

import {deleteTable, duplicateTable} from '../../redux/tableSlice';
import {COL_NAMES, DEFAULT_TABLE} from '../../constants';
import Row from './Row';
import {IRowData, TypedDispatch} from "../../types";
import CrossIcon from "../../icons/CrossIcon";

import styles from './Table.module.scss'

interface ITableProps {
    data: IRowData[];
    tableId: string;
}

const Table:FC<ITableProps> = ({data, tableId}) => {

    const dispatch = useDispatch<TypedDispatch>();

    const duplicateHandler = () => {
        dispatch(duplicateTable({id: Number(new Date().getTime()), tableId}));
    }

    const deleteHandler = () => {
        dispatch(deleteTable(tableId))
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['wrapper-buttons']}>
                <button
                    className={cn(styles['button'], styles['button--copy'])}
                    onClick={duplicateHandler}
                >
                    Copy table
                </button>
                {tableId !== DEFAULT_TABLE &&
                    <CrossIcon
                        className={cn(styles['button'], styles['button--delete'])}
                        onClick={deleteHandler}
                    />
                }
            </div>
            <div className={styles['wrapper-table']}>
                <div className={styles['table']}>
                    <div className={styles['table__header']}>
                        {COL_NAMES.map(col => (<div key={col}>{col}</div>))}
                    </div>

                    <div className={styles['table__body']}>
                        {!data?.length
                            ? <Row
                                type='empty'
                                tableId={tableId}
                            />
                            : data.map((item: IRowData) => (
                                <Row
                                    type='filled'
                                    key={item.id}
                                    data={item}
                                    tableId={tableId}
                                />))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Table);
