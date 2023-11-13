
// export const fetchProblems = async () => {
//     const res = await fetch(`${process.env.REACT_APP_URL}/api/problems/`);
//     return res.json();
//   };

import axiosInstance from "./axiosInstance";

export const fetchSubmissionsAll = async (params) => {
  let searchParams = new URLSearchParams();
  let keys = Object.keys(params);
  console.log(keys);
  let values = Object.values(params);
  console.log(values);
  keys.forEach((item, index) => {
    return typeof values[index] === "object"
      ? values[index].forEach((id) => {
          if (id !== "") return searchParams.append(item, id);
        })
      : searchParams.append(item, values[index]);
  });
  const res = await axiosInstance.get(`/submissions/`, { params: searchParams });
  return res.data;
};

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

export const deleteSubmission = async (ids) => {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append('id', id));
  const res = await axiosInstance.delete(`/submissions/`, { params: params });
  console.log(res)
  return res.data;
};