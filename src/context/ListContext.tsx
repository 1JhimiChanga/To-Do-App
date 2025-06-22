import { createContext, useContext } from "react";
import { TaskList } from "../types/tasks";


const ListContext = createContext<ListContextType | undefined>(undefined);

interface ListContextType {
    currentList: TaskList | null;
    setCurrentList: React.Dispatch<React.SetStateAction<TaskList | null>>;
}

export const useListContext = () => {
    const context = useContext(ListContext)
    if (!context) {
        throw new Error("useListContext must be used within a ListProvider")
    }

    return context
}

export const ListProvider: React.FC<React.PropsWithChildren<ListContextType>> = ({
    children,
    currentList,
    setCurrentList,
}) => (
    <ListContext.Provider value={{ currentList, setCurrentList }}>
        {children}
    </ListContext.Provider>
);
