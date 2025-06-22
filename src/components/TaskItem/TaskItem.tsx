import React from 'react';
import { Task, TaskFormValues } from '../../types/tasks';
import { Radio } from '@mui/material';
import { StyledTaskItem } from './taskItemStyledComponents';
import TaskPrioTag from './TaskPrioTag';
import './taskItemStyles.css';
import TaskForm from '../TaskForm/TaskForm';
import { useForm } from 'react-hook-form';
import { useListContext } from '../../context/ListContext';  // <-- import context hook

interface TaskItemProps {
    task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
    const { currentList, setCurrentList } = useListContext();  // <-- get context state

    const currentDate = new Date(task.date).toLocaleDateString('en-US', {
        month: 'numeric',
        day: '2-digit',
        year: 'numeric',
    });

    // Setup react-hook-form with defaultValues from task
    const { control, handleSubmit } = useForm<TaskFormValues>({
        defaultValues: {
            name: task.name,
            date: task.date,
            priority: task.priority,
            tags: task.tags,
        },
    });



    // Submit handler for TaskForm
    const onSubmit = (data: TaskFormValues) => {
        if (!currentList || !setCurrentList) return;

        const updatedTasks = currentList.tasks.map(existingTask => {
            // Check if this is the task we want to update
            const isTargetTask = existingTask.name === task.name;

            if (isTargetTask) {
                // Return a new object merging existing task with updated form data
                return { ...existingTask, ...data };
            }

            // Otherwise, return the task unchanged
            return existingTask;
        });

        setCurrentList({
            ...currentList,
            tasks: updatedTasks,
        });
    };

    return (
        <StyledTaskItem className="taskitem__container">
            <div className="task-item__header">
                <time dateTime={new Date(task.date).toISOString()} aria-label={`Due date: ${currentDate}`}>
                    {currentDate}
                </time>
                <div className="task-item__prio-tag">
                    <TaskPrioTag priority={task.priority} />
                </div>
            </div>

            <section className="task-item__main">
                <div className="task-item__button">
                    <Radio aria-label={`radio-${task.name}-button`} />
                    <span>{task.name}</span>
                </div>
                <div className="task-item__tags">
                    {task.tags.map(tag => (
                        <span key={tag + '-tag'} style={{ marginRight: '0.5rem' }}>
                            #{tag}
                        </span>
                    ))}
                </div>
            </section>

            {/* Hover-expand container for editing form */}
            <div className="taskitem__editform-container">
                <TaskForm
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    submitLabel="Save Changes"
                />
            </div>
        </StyledTaskItem>
    );
};

export default TaskItem;
