import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';

export type TypedDispatch = ThunkDispatch<ReadyState, never, AnyAction>;

export interface Inputs {
    name: string
    surname: string
    age: number
    city: string
}

export interface IRowData extends Inputs {
    id: number
}

export interface EditingData {
    tableId: number
    defaultValue: IRowData
}

export interface TableData {
    [key: string]: IRowData[]
}

export type RowType = 'empty' | 'filled'