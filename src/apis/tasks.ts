import axiosClient from "./axiosClient";

export const updateTask = async (id: string, updatedData: any) => {
  const response = await axiosClient.put(`/tasks/${id}`, updatedData);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosClient.delete(`/tasks/${id}`);
  return response.data;
};
