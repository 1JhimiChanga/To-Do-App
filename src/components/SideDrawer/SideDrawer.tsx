import React, { useEffect, useState } from 'react'
import { Box, Icon, IconButton, List, ListItem, ListItemButton, TextField, useMediaQuery } from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MenuIcon from '@mui/icons-material/Menu';
// styles
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./sideDrawerStyles.css"
import theme from '../../theme';
import { StyledAddListButton, StyledDeleteListIcon, StyledDrawer, StyledListItem } from './sideDrawerStyledComponents';
import { TaskList } from '../../types/tasks';
import { useListContext } from '../../context/ListContext';
import { createTaskList, getTaskLists } from '../../apis/taskList';

const SideDrawer = () => {
    const [open, setOpen] = useState<boolean>(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [lists, setLists] = useState<TaskList[]>([])
    const { currentList, setCurrentList } = useListContext();
    // Inside the SideDrawer component
    const [showInput, setShowInput] = useState(false); // Controls visibility of "Add List" input
    const [newListTitle, setNewListTitle] = useState(""); // Holds input value
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Adds a new list if input is not empty
    const handleAddList = async () => {
        if (!newListTitle.trim()) return;

        setLoading(true);
        setError(null);
        try {
            // Create list on backend
            const createdList = await createTaskList(newListTitle.trim());

            // Update local state with backend list
            setLists(prev => [...prev, createdList]);
            setCurrentList(createdList);

            setNewListTitle("");
            setShowInput(false);
        } catch (err) {
            setError("Failed to create new list");
            console.error(err);
        } finally {
            setLoading(false);
        }
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


    // Load and parse lists on mount
    useEffect(() => {
        async function fetchLists() {
            setLoading(true);
            setError(null);
            try {
                const fetchedLists = await getTaskLists();
                setLists(fetchedLists)
                if (fetchLists.length > 0) setCurrentList(fetchedLists[0])
            } catch (err) {
                setError("Failed to load task lists")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchLists()

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
                                const isCurrent = currentList?.name === list.name;
                                return (
                                    <StyledListItem aria-current={isCurrent ? 'true' : undefined} selected={isCurrent} key={list.name + '-item'}>
                                        <ListItemButton onClick={() => setCurrentList(list)}>
                                            {list.name}
                                        </ListItemButton>
                                        {isCurrent && <IconButton aria-label={`Delete List ${list.name}`}><StyledDeleteListIcon /></IconButton>}
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