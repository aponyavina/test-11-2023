import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';

export type TypedDispatch = ThunkDispatch<ReadyState, never, AnyAction>;

export interface Inputs {
    name: string
    surname: string
    age: number
    city: {value: string, label: string} | null
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