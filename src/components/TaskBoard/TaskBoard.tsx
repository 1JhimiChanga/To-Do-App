import React from 'react'
import "./taskBoardStyles.css"
import { TaskList } from '../../types/tasks';
import { List } from '@mui/material';
import TaskItem from '../TaskItem/TaskItem';
import TaskForm from '../TaskForm/TaskForm';
import { useListContext } from '../../context/ListContext';


const TaskBoard = () => {
    const { currentList } = useListContext();

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit'
    });
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
                    <TaskForm />
                    <List>
                        {currentList?.tasks.map((task, index) => {
                            return (
                                <TaskItem task={task} />
                            )
                        })}
                    </List>
                </section>
            </div>

        </main>
    )
}

export default TaskBoard