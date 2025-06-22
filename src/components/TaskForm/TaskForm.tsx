import React from 'react'
import { StyledTaskItem } from '../TaskItem/taskItemStyledComponents'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
    Autocomplete,
    Icon,
    Stack,
    ToggleButtonGroup
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import './taskForm.css'
import theme from '../../theme'
import { Task } from '../../types/tasks'
import {
    StyledAddTaskButton,
    StyledChip,
    StyledTextfield,
    StyledToggleButton
} from './taskFormStyledComponents'
import { useListContext } from '../../context/ListContext'

// Define form type based on Task but without 'completed'
type TaskFormValues = Omit<Task, 'completed'>

const TaskForm = () => {
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
    const onSubmit = (data: Omit<Task, 'completed'>) => {
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
                <form onSubmit={handleSubmit(onSubmit)} className="taskform__form" aria-labelledby="add-task-form-title">
                    <Stack spacing={3}>
                        {/* Task name input */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <StyledTextfield id="task-name" size="small" label="Task name" fullWidth {...field} />
                            )}
                        />

                        {/* Due date input */}
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <StyledTextfield
                                    id="task-date"
                                    size="small"
                                    label="Due date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    {...field}
                                />
                            )}
                        />

                        {/* Hashtag/tag input with autocomplete */}
                        <Controller
                            name="tags"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    id="task-tags"
                                    multiple
                                    freeSolo
                                    options={[]}
                                    value={field.value}
                                    onChange={(_, newValue) => field.onChange(newValue)}
                                    renderTags={(value: string[], getTagProps) =>
                                        value.map((option, index) => (
                                            <StyledChip
                                                label={`#${option}`}
                                                {...getTagProps({ index })}
                                                key={option}
                                                size="small"
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <StyledTextfield {...params} size="small" label="Hashtags" placeholder="Add tags" />
                                    )}
                                />
                            )}
                        />

                        {/* Priority selection toggle buttons */}
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label
                                        id="priority-label"
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.9rem',
                                            marginTop: '-0.85rem'
                                        }}
                                    >
                                        Priority
                                    </label>
                                    <ToggleButtonGroup
                                        exclusive
                                        value={field.value}
                                        onChange={(event, newValue) => {
                                            if (newValue !== null) {
                                                field.onChange(newValue)
                                            }
                                        }}
                                        fullWidth
                                        color="primary"
                                        aria-labelledby="priority-label"
                                    >
                                        <StyledToggleButton size="small" value="high">
                                            High
                                        </StyledToggleButton>
                                        <StyledToggleButton size="small" value="medium">
                                            Medium
                                        </StyledToggleButton>
                                        <StyledToggleButton size="small" value="low">
                                            Low
                                        </StyledToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            )}
                        />

                        {/* Submit button */}
                        <StyledAddTaskButton aria-label="add-task-button" type="submit">
                            Add Task
                        </StyledAddTaskButton>
                    </Stack>
                </form>
            </div>
        </StyledTaskItem>
    )
}

export default TaskForm
