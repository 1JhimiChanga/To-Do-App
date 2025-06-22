import React from 'react';

interface TaskPrioTagProps {
    priority: 'high' | 'medium' | 'low';
}

const TaskPrioTag = ({ priority }: TaskPrioTagProps) => {
    return (
        <span className={`task-prio-tag ${priority}`}>
            {priority}
        </span>
    );
};

export default TaskPrioTag;
