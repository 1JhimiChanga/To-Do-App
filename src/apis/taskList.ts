import axiosClient from "./axiosClient";

// Get all task lists with tasks
export const getTaskLists = async () => {
  const response = await axiosClient.get("/tasklists");
  return response.data;
};

// Create a new task list
export const createTaskList = async (name: string) => {
  const response = await axiosClient.post("/tasklists", { name });
  return response.data;
};

// Add a task to a task list
export const addTaskToList = async (listId: string, taskData: any) => {
  const response = await axiosClient.post(
    `/tasklists/${listId}/tasks`,
    taskData
  );
  return response.data;
};
