import React from 'react';

import './App.css';
import SideDrawer from './components/SideDrawer/SideDrawer';
import TaskBoard from './components/TaskBoard/TaskBoard';

import { ListProvider } from './context/ListContext';

function App() {

  return (
    <div className="app__wrapper">
      <ListProvider>
        <SideDrawer />
        <TaskBoard />
      </ListProvider>

    </div>
  );
}

export default App;
