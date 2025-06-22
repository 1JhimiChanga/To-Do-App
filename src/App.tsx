import React, { useState } from 'react';

import './App.css';
import SideDrawer from './components/SideDrawer/SideDrawer';
import TaskBoard from './components/TaskBoard/TaskBoard';
import { TaskList } from './types/tasks';

function App() {

  const [currentList, setCurrentList] = useState<TaskList | null>(null)

  return (
    <div className="app__wrapper">
      <SideDrawer currentList={currentList} setCurrentList={setCurrentList} />
      <TaskBoard taskList={currentList} />
    </div>
  );
}

export default App;
