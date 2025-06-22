import React, { useState } from 'react';

import './App.css';
import SideDrawer from './components/SideDrawer/SideDrawer';
import TaskBoard from './components/TaskBoard/TaskBoard';
import { TaskList } from './types/tasks';
import { ListProvider } from './context/ListContext';

function App() {

  const [currentList, setCurrentList] = useState<TaskList | null>(null)

  return (
    <div className="app__wrapper">
      <ListProvider currentList={currentList} setCurrentList={setCurrentList}>
        <SideDrawer />
        <TaskBoard />
      </ListProvider>

    </div>
  );
}

export default App;
