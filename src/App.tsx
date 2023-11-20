import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {dataSelector} from './redux/tableSlice';
import {GlobalContext} from './context/Context';
import {EditingData} from './types';
import Table from './components/Table';
import Modal from './components/UI/Modal';
import {Form as AddForm, Form as EditForm} from './components/Form/Form';

import styles from './App.module.scss';

function App() {
  const data = useSelector(dataSelector);

  const [modalActive, setModalActive] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<EditingData | null>();

  return (
      <GlobalContext.Provider value={{ modalActive, setModalActive, setEditingData }}>
          <div className={styles['container']}>
              <div className={styles['wrapper']}>
                  <div className={styles['block']}>
                      {Object.entries(data).map((table, i) => (
                          <Table
                              key={table[0]}
                              data={table[1]}
                              tableId={table[0]}
                          />
                      ))}
                  </div>
                  <AddForm />
              </div>

              <Modal
                  active={modalActive}
                  setActive={setModalActive}
              >
                  <EditForm
                      defaultValues={editingData}
                      className='modalType'
                  />
              </Modal>
          </div>
      </GlobalContext.Provider>
  );
}

export default App;
