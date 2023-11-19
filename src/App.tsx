import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {dataSelector} from './redux/tableSlice';
import {GlobalContext} from './context/Context';
import {EditingData} from './types';
import Table from './components/Table';
import Modal from './components/Modal';
import {Form as AddForm, Form as EditForm} from './components/Form/Form';

import './App.scss';

function App() {
  const data = useSelector(dataSelector);

  const [modalActive, setModalActive] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<EditingData | null>();

  return (
      <GlobalContext.Provider value={{ modalActive, setModalActive, setEditingData }}>
          <div>
              {Object.entries(data).map((table, i) => (
                  <div className='d-flex' key={table[0]}>
                      <Table
                          data={table[1]}
                          tableId={table[0]}
                      />
                      {i === 0 && <AddForm />}
                  </div>
              ))}

              <Modal
                  active={modalActive}
                  setActive={setModalActive}
              >
                  <EditForm defaultValues={editingData}/>
              </Modal>
          </div>
      </GlobalContext.Provider>
  );
}

export default App;
