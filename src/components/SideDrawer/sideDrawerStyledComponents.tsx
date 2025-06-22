import { styled } from '@mui/material/styles';
import { Button, colors, Drawer, ListItem, Stack } from '@mui/material';
import DeleteListIcon from '@mui/icons-material/HighlightOff';
export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        width: '25rem',
        height: "100vh",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
            width: '100vw',
        },
    },
}));

interface StyledListItemProps {
    selected?: boolean;
}
export const StyledListItem = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<StyledListItemProps>(({ theme, selected }) => ({

    backgroundColor: selected ? theme.palette.secondary.main : 'transparent',
    color: selected ? theme.palette.background.default : theme.palette.common.white,
    width: "80%",
    marginLeft: '1rem',
    paddingLeft: "0",

    borderRadius: "7px"
}));

export const StyledDeleteListIcon = styled(DeleteListIcon)(({ theme }) => ({
    color: theme.palette.common.white,
    cursor: 'pointer',
    transition: 'color 0.3s ease',

    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

export const StyledAddListButton = styled(Stack)(({ theme }) => ({
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    width: "80%",
    marginLeft: '1rem',
    borderRadius: "0 0 7px 7px",
    marginTop: "1rem",
    height: '2.3rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',

    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: `0px 4px 10px ${theme.palette.secondary.main}33`,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
    }
}));