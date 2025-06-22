import { Button, Chip, styled, TextField, ToggleButton } from "@mui/material";

export const StyledTextfield = styled(TextField)(({ theme }) => ({

    '& label.Mui-focused': {
        color: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.grey[500],
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.light,
        },
    },

}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    textTransform: 'none',
    borderColor: theme.palette.grey[400],
    color: theme.palette.text.primary,

    '&:hover': {
        borderColor: theme.palette.background.default,
        backgroundColor: "transparent"
    },

    '&.Mui-selected': {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
    },
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: '0.75rem',

    '& .MuiChip-deleteIcon': {
        color: theme.palette.secondary.dark,

    },
}));

export const StyledAddTaskButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    transition: 'all 0.3s ease',
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
    },

    borderRadius: "7px"
}));