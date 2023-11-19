import { configureStore } from '@reduxjs/toolkit';

import tableReducer from "./tableSlice";
import {TableData} from "../types";

export interface TableSchema {
    selectOptions: string[];
    data: TableData;
}

export interface StateSchema {
    tableReducer: TableSchema;
}
export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {tableReducer},
        preloadedState: initialState,
    });
}
