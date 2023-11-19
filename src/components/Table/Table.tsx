import React, {FC, memo} from 'react';
import {useDispatch} from 'react-redux';

import {deleteTable, duplicateTable} from '../../redux/tableSlice';
import {COL_NAMES, DEFAULT_TABLE} from '../../constants';
import {Row} from './Row/Row';
import {IRowData, TypedDispatch} from "../../types";

import './Table.scss'

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
        <div>
            <div className='buttons'>
                <button onClick={duplicateHandler}>Copy table</button>
                {tableId !== DEFAULT_TABLE && <button onClick={deleteHandler}>Delete table</button>}
            </div>
            <div className='table'>
                <div className='table__header'>
                    {COL_NAMES.map(col => (<div key={col}>{col}</div>))}
                </div>

                <div className='table__body'>
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
    );
};

export default memo(Table);
