/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../apiClient";

const updateData = (apiUrl: string, data: any, id: number) => {
  const response = apiClient.put(`${apiUrl}/${id}`, data);
  return response;
};

export default updateData;
