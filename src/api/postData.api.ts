/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../apiClient";

const postData = (apiUrl: string, data: any) => {
    const response = apiClient.post(apiUrl, data);
    return response;
};

export default postData;
