
// export const fetchProblems = async () => {
//     const res = await fetch(`${process.env.REACT_APP_URL}/api/problems/`);
//     return res.json();
//   };

import axiosInstance from "./axiosInstance";

export const addSubmission = async (submission) => {
    const body = JSON.stringify(submission);
    const res = await axiosInstance.post(
        "/submissions",
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    return res.data;
};

export const fetchSubmission = async (submission_id) => {
  const res = await axiosInstance.get(
      `/submissions/${submission_id}`
    );
  return res.data;
};
