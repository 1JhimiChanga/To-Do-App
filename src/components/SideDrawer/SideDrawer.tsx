import React, { useEffect, useState } from 'react'
import { Box, Icon, IconButton, List, ListItem, ListItemButton, TextField, useMediaQuery } from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MenuIcon from '@mui/icons-material/Menu';
// mockdb
import listDB from '../../mockData/listDB.json'
// styles
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./sideDrawerStyles.css"
import theme from '../../theme';
import { StyledAddListButton, StyledDeleteListIcon, StyledDrawer, StyledListItem } from './sideDrawerStyledComponents';
import { TaskList } from '../../types/tasks';
import { useListContext } from '../../context/ListContext';


const SideDrawer = () => {
    const [open, setOpen] = useState<boolean>(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [lists, setLists] = useState<TaskList[]>([])
    const { currentList, setCurrentList } = useListContext();
    // Inside the SideDrawer component
    const [showInput, setShowInput] = useState(false); // Controls visibility of "Add List" input
    const [newListTitle, setNewListTitle] = useState(""); // Holds input value

    // Adds a new list if input is not empty
    const handleAddList = () => {
        if (!newListTitle.trim()) return;
        const newList: TaskList = {
            title: newListTitle.trim(),
            tasks: [],
        };
        setLists(prev => [...prev, newList]);
        setCurrentList(newList);
        setNewListTitle("");
        setShowInput(false);
    };
    // Handles "Enter" key press to submit list name
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddList();
        }
    };
    // Toggles drawer open/closed
    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };

    // Parses the mockDB JSON and casts priorities properly
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
    // Load and parse lists on mount
    useEffect(() => {
        const parsedLists = parseListDB(listDB);
        setLists(parsedLists);
        if (parsedLists.length > 0) setCurrentList(parsedLists[0])

    }, []);

    return (
        <aside >
            {/* Mobile-only menu icon */}
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
            {/* Drawer content */}
            <StyledDrawer open={open}
                variant={isMobile ? 'temporary' : 'permanent'}
                onClose={() => setOpen(false)}
                aria-modal={isMobile ? true : undefined}
            >
                <nav >
                    {/* Header with logo and title */}
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
                    {/* Lists section */}
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
                            {/* New list input (conditionally rendered) */}
                            {showInput && (
                                <ListItem>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="New list name"
                                        value={newListTitle}
                                        onChange={(e) => setNewListTitle(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        onBlur={() => {
                                            if (newListTitle.trim()) {
                                                handleAddList();
                                            } else {
                                                setShowInput(false);
                                            }
                                        }}
                                        autoFocus
                                        sx={{ input: { color: 'white' } }}
                                    />
                                </ListItem>
                            )}
                            <ListItem disablePadding>
                                <StyledAddListButton
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={1}
                                    onClick={() => setShowInput(prev => !prev)}
                                >
                                    <Icon sx={{ color: "inherit" }}>
                                        <AddCircleOutlineIcon />
                                    </Icon>
                                    <span>Add List</span>
                                </StyledAddListButton>
                            </ListItem>
                        </List>

                    </section>
                </nav>
            </StyledDrawer>
        </aside>
    )
}

export default SideDrawer