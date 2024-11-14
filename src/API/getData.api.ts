/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../apiClient";

const getData = (apiUrl: string, apiFilter?: any) => {
  const filter = apiFilter ? apiFilter : {};
  const response = apiClient.get(`${apiUrl}?filter=${JSON.stringify(filter)}`);
  return response;
};

export default getData;
