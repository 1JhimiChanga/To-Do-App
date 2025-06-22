import React from 'react'
import "./taskBoardStyles.css"
import { TaskList } from '../../types/tasks';
import { List } from '@mui/material';
import TaskItem from '../TaskItem/TaskItem';

interface TaskBoardProps {
    taskList: TaskList | null
}

const TaskBoard = ({ taskList }: TaskBoardProps) => {
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
            <header>
                <span>{currentDate}</span>
                <h1>Good {getTimeOfDay()}</h1>
            </header>
            <section>
                <List>
                    {taskList?.tasks.map((task, index) => {
                        return (
                            <TaskItem task={task} />
                        )
                    })}
                </List>
            </section>
        </main>
    )
}

export default TaskBoard