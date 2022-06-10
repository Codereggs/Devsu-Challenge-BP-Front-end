import axios from "axios";

export const axiosGet = async (url: string, id?: number | string) => {
  try {
    if (!id) {
      const request = await axios.get(url);
      const response = await request.data;
      return response;
    } else {
      const request = await axios.get(`${url}/${id}`);
      const response = await request.data;
      return response;
    }
  } catch (error) {
    return console.error(error);
  }
};

export const axiosPost = async (url: string, options: any) => {
  try {
    const request = await axios.post(url, options);
    const response = await request.data;
    return response;
  } catch (error) {
    return console.error(error);
  }
};

export const axiosPut = async (url: string, id: number, options: any) => {
  try {
    const request = await axios.put(`${url}/${id}`, options);
    const response = await request.data;
    return response;
  } catch (error) {
    return console.error(error);
  }
};

export const axiosDelete = async (url: string, id: number) => {
  try {
    const request = await axios.delete(`${url}/${id}`);
    const response = await request.data;
    return response;
  } catch (error) {
    return console.error(error);
  }
};
