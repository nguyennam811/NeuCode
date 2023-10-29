
// export const fetchProblems = async () => {
//     const res = await fetch(`${process.env.REACT_APP_URL}/api/problems/`);
//     return res.json();
//   };

import axiosInstance from "./axiosInstance";

export const fetchProblemDetail = async (id) => {
    const res = await axiosInstance.get(`/problems/${id}`);
    return res.data;
};

export const addProblem = async (problem) => {
    const body = JSON.stringify(problem);
    const res = await axiosInstance.post(
        "/problems",
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    return res.data;
};

export const updateProblem = async (problem) => {
  const body = JSON.stringify(problem);
  const res = await axiosInstance.put(`/problems/${problem.id}`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  return res.data;
};