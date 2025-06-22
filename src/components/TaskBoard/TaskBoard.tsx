import React, { useEffect, useState } from 'react'
import "./taskBoardStyles.css"
import { List } from '@mui/material';
import TaskItem from '../TaskItem/TaskItem';
import { useListContext } from '../../context/ListContext';
import AddTask from '../TaskForm/AddTask';



const TaskBoard = () => {
    const { currentList } = useListContext();



    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit'
    });

    // Return appropriate salutation
    const getTimeOfDay = () => {
        const hour = new Date().getHours();

        if (hour < 12) return 'Morning';
        if (hour < 18) return 'Afternoon';
        return 'Evening';
    }


    return (
        <main className='taskboard__wrapper'>
            <div>
                <header className='taskboard__header'>
                    <h3>{currentDate}</h3>
                    <h1>Good {getTimeOfDay()}</h1>
                </header>
                <section>
                    <AddTask />
                    <List>
                        {currentList?.tasks.map((task, index) => {
                            return (
                                <TaskItem key={task.name} task={task} />
                            )
                        })}
                    </List>
                </section>
            </div>

        </main>
    )
}

export default TaskBoard