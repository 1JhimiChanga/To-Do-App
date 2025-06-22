import React from 'react';
import { Task } from '../../types/tasks';
import { ListItem, Radio } from '@mui/material';

interface TaskItemProps {
    task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
    return (
        <ListItem className="task-item">
            <Radio />
            <span>{task.name}</span>
            {/* More expandable info can go here */}
        </ListItem>
    );
};

export default TaskItem;
