import { styled } from '@mui/material/styles';
import { Drawer, ListItem } from '@mui/material';
import DeleteListIcon from '@mui/icons-material/HighlightOff';
export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {

        width: '20rem',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        boxSizing: 'border-box',

        [theme.breakpoints.down('sm')]: {
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