import apiClient from "../apiClient";
const deleteDataAPI = (apiUrl: string, id: number) => {
  const response = apiClient.delete(`${apiUrl}/${id}`);
  return response;
};

export default deleteDataAPI;
