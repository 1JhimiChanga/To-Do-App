import { styled, TextField, ToggleButton } from "@mui/material";

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