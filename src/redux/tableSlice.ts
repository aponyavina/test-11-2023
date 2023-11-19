import {createSelector, createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

import {TableSchema, StateSchema} from './store';
import {CITY_OPTIONS, DEFAULT_TABLE, TEXT_NOTIFICATIONS} from '../constants';
import {IRowData} from '../types';

const initialState: TableSchema = {
    selectOptions: CITY_OPTIONS,
    data: {
        [`${DEFAULT_TABLE}`]: []
    },
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        addTableRow: (state, {payload}) => {
            let table = state.data[payload.tableId];
            table.push(payload.data);
            toast.success(TEXT_NOTIFICATIONS.ADD_ROW_SUCCESS, {position: "bottom-right"});
        },
        deleteTableRow: (state, {payload}) => {
            let {data} = state;
            state.data[payload.tableId] = data[payload.tableId]
                .filter((item: IRowData) => item.id !== payload.dataId);
            toast.success(TEXT_NOTIFICATIONS.DELETE_ROW_SUCCESS, {position: "bottom-right"});
        },
        editTableRow: (state, {payload}) => {
            let {data} = state;
            state.data[payload.tableId] = data[payload.tableId]
                .map((item: IRowData) => item.id === payload.data.id ? payload.data : item);
            toast.success(TEXT_NOTIFICATIONS.EDIT_ROW_SUCCESS, {position: "bottom-right"});
        },
        duplicateTable: (state, {payload}) => {
            let {data} = state;
            state.data[payload.id] = data[payload.tableId];
            toast.success(TEXT_NOTIFICATIONS.DUPLICATE_TABLE_SUCCESS, {position: "bottom-right"});
        },
        deleteTable: (state, {payload}) => {
            let {data} = state;
            delete data[payload];
            toast.success(TEXT_NOTIFICATIONS.DELETE_TABLE_SUCCESS, {position: "bottom-right"});
        }
    },
});

// Action creators are generated for each case reducer function
export const {
    addTableRow,
    deleteTableRow,
    editTableRow,
    duplicateTable,
    deleteTable,
} = tableSlice.actions;
export default tableSlice.reducer;

export const slice = ({tableReducer}: StateSchema) => tableReducer;

export const selectOptionsSelector = createSelector(
    slice,
    ({selectOptions}: TableSchema) => selectOptions,
);

export const dataSelector = createSelector(
    slice,
    ({data}: TableSchema) => data,
);
