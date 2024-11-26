/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../apiClient";

const getDataById = (apiUrl: string, id: number, apiFilter?: any) => {
  const filter = apiFilter ? apiFilter : {};
  const response = apiClient.get(
    `${apiUrl}/${id}?filter=${JSON.stringify(filter)}`
  );
  return response;
};

export default getDataById;
