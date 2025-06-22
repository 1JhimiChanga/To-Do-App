import { ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
interface StyledTaskItemProps {
    hovered?: boolean;
}
export const StyledTaskItem = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== 'hovered',
})<StyledTaskItemProps>(({ theme, hovered }) => ({

    backgroundColor: theme.palette.primary.main,
    color: hovered ? theme.palette.background.default : theme.palette.common.white,
    width: "30rem",
    marginBottom: '1rem',
    borderRadius: "7px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
}));