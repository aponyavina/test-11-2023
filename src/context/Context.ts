import {createContext, Dispatch, SetStateAction, useContext} from 'react';

export type GlobalContentType = {
    modalActive: boolean
    setModalActive: Dispatch<SetStateAction<boolean>>
    setEditingData: Dispatch<SetStateAction<any>>
}

export const GlobalContext = createContext<GlobalContentType>({
    modalActive: false,
    setModalActive: () => {},
    setEditingData: () => {}
})

export const useGlobalContext = () => useContext(GlobalContext)
