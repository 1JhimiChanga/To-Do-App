import React from 'react';
import { Task } from '../../types/tasks';

interface TaskItemProps {
    task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
    return (
        <div>
            <span>{task.name}</span>
        </div>
    );
};

export default TaskItem;