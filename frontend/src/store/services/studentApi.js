import axiosInstance from "./axiosInstance";

export const fetchStudent = async (role) => {
    const params = new URLSearchParams();
    params.append('role', role)
      const res = await axiosInstance.get(`/users/`, { params: params });
    return res.data;
};