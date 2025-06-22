
import React from 'react'
import { Stack, ToggleButtonGroup, Autocomplete } from '@mui/material'
import { Controller, Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
import { StyledAddTaskButton, StyledChip, StyledTextfield, StyledToggleButton } from './taskFormStyledComponents'
import { TaskFormValues } from '../../types/tasks'


interface TaskFormProps {
    control: Control<TaskFormValues>
    handleSubmit: UseFormHandleSubmit<TaskFormValues>
    onSubmit: SubmitHandler<TaskFormValues>
    submitLabel: string

}
const TaskForm = ({ control, handleSubmit, onSubmit, submitLabel }: TaskFormProps) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="taskform__form" aria-labelledby="add-task-form-title">
            <Stack spacing={3}>
                {/* Task name input */}
                {/* Task name input */}
                <Controller
                    name="name"   // <-- FIXED HERE
                    control={control}
                    render={({ field }) => (
                        <StyledTextfield
                            id="task-name"
                            size="small"
                            label="Task name"
                            fullWidth
                            {...field}
                        />
                    )}
                />

                {/* Due date input */}
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => {
                        const formattedDate = field.value instanceof Date
                            ? field.value.toISOString().substring(0, 10)
                            : field.value || "";

                        return (
                            <StyledTextfield
                                id="task-date"
                                size="small"
                                label="Due date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={formattedDate}
                                onChange={(e) => {
                                    // Convert date string back to Date if your form expects Date objects
                                    field.onChange(e.target.value);
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                            />
                        );
                    }}
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
                    {submitLabel}
                </StyledAddTaskButton>
            </Stack>
        </form>
    )
}

export default TaskForm