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

interface SideDrawerProps { currentList: TaskList | null, setCurrentList: React.Dispatch<React.SetStateAction<TaskList | null>> }

const SideDrawer = ({ currentList, setCurrentList }: SideDrawerProps) => {
    const [open, setOpen] = useState<boolean>(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [lists, setLists] = useState<TaskList[]>([])
    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };


    function parseListDB(raw: typeof listDB): TaskList[] {
        return raw.map((list) => ({
            ...list,
            tasks: list.tasks.map((task) => ({
                ...task,
                date: new Date(task.date),
                priority: task.priority as "high" | "medium" | "low", // 👈 cast here
            })),
        }));
    }
    useEffect(() => {
        const parsedLists = parseListDB(listDB);
        setLists(parsedLists);
        if (parsedLists.length > 0) setCurrentList(parsedLists[0])

    }, []);

    return (
        <aside>
            {isMobile && !open && (
                <nav aria-label="Mobile menu toggle" className='mobile__menu-btn'>
                    <IconButton
                        onClick={toggleDrawer}
                        aria-label="Open drawer"
                        size="large"
                        color="secondary"
                    >
                        <MenuIcon />
                    </IconButton>
                </nav>
            )}
            <StyledDrawer open={open}
                variant={isMobile ? 'temporary' : 'permanent'}
                onClose={() => setOpen(false)}
                aria-modal={isMobile ? true : undefined}
            >
                <nav >
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

                    <section>
                        <h3 className='lists__title'>My Lists</h3>
                        <List>
                            {lists.map((list, index) => {
                                const isCurrent = currentList?.title === list.title;
                                return (
                                    <StyledListItem aria-current={isCurrent ? 'true' : undefined} selected={isCurrent} key={list.title + '-item'}>
                                        <ListItemButton onClick={() => setCurrentList(list)}>
                                            {list.title}
                                        </ListItemButton>
                                        {isCurrent && <IconButton aria-label={`Delete List ${list.title}`}><StyledDeleteListIcon /></IconButton>}
                                    </StyledListItem>
                                )
                            })}
                        </List>

                    </section>
                </nav>
            </StyledDrawer>
        </aside>
    )
}

export default SideDrawer