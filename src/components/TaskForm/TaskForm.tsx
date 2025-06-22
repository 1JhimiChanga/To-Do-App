import React from 'react'
import { StyledTaskItem } from '../TaskItem/taskItemStyledComponents'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Autocomplete, Button, Icon, MenuItem, Select, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useForm, Controller } from 'react-hook-form'

import "./taskForm.css"
import theme from '../../theme';
import { Task } from '../../types/tasks';
import { StyledTextfield, StyledToggleButton } from './taskFormStyledComponents';
type TaskFormValues = Omit<Task, 'completed'>;

const TaskForm = () => {

    const { control, handleSubmit, reset } = useForm<TaskFormValues>({
        defaultValues: {
            name: '',
            date: new Date(),
            priority: 'low',
            tags: [],

        }
    })

    const onSubmit = (data: Omit<Task, 'completed'>) => {
        const newTask: Task = {
            ...data,
            completed: false,
            tags: data.tags || [],
        };

        console.log(newTask);
        reset()
    };
    return (
        <StyledTaskItem>
            <div className='taskform__container'>
                <section className='taskform__wrapper'>
                    <Icon sx={{ color: theme.palette.secondary.main }}>
                        <AddCircleOutlineIcon />
                    </Icon>
                    <h1>Add Task...</h1>
                </section>
                <form onSubmit={handleSubmit(onSubmit)} className="taskform__form">
                    <div>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <StyledTextfield size='small' label="Task name" fullWidth {...field} />}

                        />
                    </div>
                    <div>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => <StyledTextfield size='small' label="Due date" type="date" InputLabelProps={{ shrink: true }} fullWidth {...field} />}
                        />
                    </div>
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                multiple
                                freeSolo
                                options={[]}
                                value={field.value}
                                onChange={(_, newValue) => field.onChange(newValue)}
                                renderInput={(params) => (
                                    <StyledTextfield
                                        {...params}
                                        size="small"
                                        label="Hashtags"
                                        placeholder="Add tags"
                                    />
                                )}
                            />
                        )}
                    />
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <ToggleButtonGroup
                                exclusive
                                value={field.value}
                                onChange={(event, newValue) => {

                                    if (newValue !== null) {
                                        field.onChange(newValue);
                                    }
                                }}
                                fullWidth
                                color="primary"
                            >
                                <StyledToggleButton size='small' value="high">High</StyledToggleButton>
                                <StyledToggleButton size='small' value="medium">Medium</StyledToggleButton>
                                <StyledToggleButton size='small' value="low">Low</StyledToggleButton>
                            </ToggleButtonGroup>
                        )}
                    />

                    <Button type="submit" sx={{ backgroundColor: theme.palette.secondary.main }}>Add Task</Button>
                </form>
            </div>

        </StyledTaskItem>
    )
}

export default TaskForm