// export const fetchProblems = async () => {
//     const res = await fetch(`${process.env.REACT_APP_URL}/api/problems/`);
//     return res.json();
//   };

import axiosInstance from "./axiosInstance";

export const fetchTestResult = async (id_submission) => {
  const res = await axiosInstance.get(`/test_result`, {
    headers: { submission: id_submission },
  });
  return res.data;
};
