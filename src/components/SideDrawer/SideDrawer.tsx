import React, { useEffect, useState } from 'react'
import { Box, IconButton, List, ListItem, ListItemButton, useMediaQuery } from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MenuIcon from '@mui/icons-material/Menu';
// mockdb
import listDB from '../../mockData/listDB.json'
// styles
import "./sideDrawerStyles.css"
import theme from '../../theme';
import { StyledDeleteListIcon, StyledDrawer, StyledListItem } from './sideDrawerStyledComponents';
import { TaskList } from '../../types/tasks';
const SideDrawer = () => {
    const [open, setOpen] = useState<boolean>(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [lists, setLists] = useState<TaskList[]>([])
    const [currentList, setCurrentList] = useState<TaskList | null>(null)
    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };


    function parseListDB(raw: typeof listDB): TaskList[] {
        return raw.map(list => ({
            ...list,
            tasks: list.tasks.map(task => ({
                ...task,
                date: new Date(task.date),
            })),
        }));
    }

    useEffect(() => {
        const parsedLists = parseListDB(listDB);
        setLists(parsedLists);
        if (parsedLists.length > 0) setCurrentList(parsedLists[0])

    }, []);

    return (
        <div>
            {isMobile && !open && (
                <div
                    className='mobile__menu-btn'
                >
                    <IconButton
                        onClick={toggleDrawer}
                        aria-label="Open drawer"
                        size="large"
                        color="secondary"
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
            )}
            <StyledDrawer open={open}
                variant={isMobile ? 'temporary' : 'permanent'}
                onClose={() => setOpen(false)}
            >
                <header className='drawer__header'>
                    <img src='/icons/king.png' alt='King Checkmate icon' />
                    <h2>CheckMate</h2>
                    {isMobile && (
                        <IconButton onClick={toggleDrawer}
                            aria-label={open ? 'Close drawer' : 'Open drawer'}
                            size="large"
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'white',
                            }}>
                            <ArrowCircleLeftIcon />
                        </IconButton>
                    )}
                </header>
                <List>
                    <h3 className='lists__title'>My Lists</h3>
                    {lists.map((list, index) => {
                        const isCurrent = currentList?.title === list.title
                        return (
                            <StyledListItem selected={isCurrent} key={list.title + '-item'}>
                                <ListItemButton onClick={() => setCurrentList(list)}>
                                    {list.title}
                                </ListItemButton>

                                {isCurrent && <IconButton><StyledDeleteListIcon /></IconButton>}

                            </StyledListItem>
                        )
                    })}
                </List>
            </StyledDrawer>
        </div>
    )
}

export default SideDrawer