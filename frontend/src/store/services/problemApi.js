
// export const fetchProblems = async () => {
//     const res = await fetch(`${process.env.REACT_APP_URL}/api/problems/`);
//     return res.json();
//   };

import axiosInstance from "./axiosInstance";

export const fetchProblems = async () => {
    const res = await axiosInstance.get(`/problems`);
    return res.data;
};