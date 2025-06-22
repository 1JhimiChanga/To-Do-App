import React, { createContext, useContext, useEffect, useState } from "react";
import { TaskList } from "../types/tasks";

interface ListContextType {
    currentList: TaskList | null;
    setCurrentList: React.Dispatch<React.SetStateAction<TaskList | null>>;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const useListContext = () => {
    const context = useContext(ListContext);
    if (!context) {
        throw new Error("useListContext must be used within a ListProvider");
    }
    return context;
};

export const ListProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    // Manage currentList state here internally
    const [currentList, setCurrentList] = useState<TaskList | null>(null);
    useEffect(() => {
        console.log(currentList)
    }, [currentList])
    return (
        <ListContext.Provider value={{ currentList, setCurrentList }}>
            {children}
        </ListContext.Provider>
    );
};
