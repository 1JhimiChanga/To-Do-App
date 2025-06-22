import React from 'react'
import { StyledTaskItem } from '../TaskItem/taskItemStyledComponents'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
    Icon,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import './taskForm.css'
import theme from '../../theme'
import { Task, TaskFormValues } from '../../types/tasks'
import { useListContext } from '../../context/ListContext'
import TaskForm from './TaskForm'

const AddTask = () => {
    // Access currentList and updater from context
    const { currentList, setCurrentList } = useListContext()

    // Initialize react-hook-form with default values
    const { control, handleSubmit, reset } = useForm<TaskFormValues>({
        defaultValues: {
            name: '',
            date: new Date(),
            priority: 'low',
            tags: []
        }
    })

    // Handle form submission to create and add a new task
    const handleAddTask = (data: Omit<Task, 'completed'>) => {
        if (!currentList) return

        const newTask: Task = {
            ...data,
            completed: false,
            tags: data.tags || []
        }

        // Add the new task to the current list
        const updatedList = {
            ...currentList,
            tasks: [...currentList.tasks, newTask]
        }

        setCurrentList(updatedList) // Update context state
        reset() // Reset form fields
    }

    return (
        <StyledTaskItem>
            <div className="taskform__container">
                <section className="taskform__wrapper">
                    {/* Form header with icon and title */}
                    <Icon sx={{ color: theme.palette.secondary.main }}>
                        <AddCircleOutlineIcon />
                    </Icon>
                    <h1 id="add-task-form-title">Add Task...</h1>
                </section>

                {/* Task creation form */}
                <TaskForm control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={handleAddTask}
                    submitLabel="Add Task" />
            </div>
        </StyledTaskItem>
    )
}

export default AddTask
