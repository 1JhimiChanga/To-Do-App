import React from 'react';
import { Task } from '../../types/tasks';
import { ListItem, Radio } from '@mui/material';
import { StyledTaskItem } from './taskItemStyledComponents';
import TaskPrioTag from './TaskPrioTag';
import "./taskItemStyles.css"
interface TaskItemProps {
    task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        day: '2-digit',
        year: 'numeric'
    });
    return (
        <StyledTaskItem >
            <div className='task-item__header'>
                <span>{currentDate}</span>
                <div className="task-item__prio-tag">
                    <TaskPrioTag priority={task.priority} />
                </div>
            </div>

            <section className="task-item__main">
                <div className='task-item__button'>
                    <Radio />
                    <span>{task.name}</span>
                </div>
                <div className='task-item__tags'>
                    {task.tags.map((tag) => (
                        <span key={tag + '-tag'} style={{ marginRight: '0.5rem' }}>#{tag}</span>
                    ))}
                </div>
            </section>
        </StyledTaskItem>
    );
};

export default TaskItem;
