// export const fetchProblems = async () => {
//     const res = await fetch(`${process.env.REACT_APP_URL}/api/problems/`);
//     return res.json();
//   };

import axiosInstance from "./axiosInstance";

export const fetchProblems = async (params) => {
  console.log(params);
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
  console.log(searchParams);
  const res = await axiosInstance.get(`/problems/`, { params: searchParams });
  return res.data;
};

export const deleteProblem = async (ids) => {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append('id', id));
  const res = await axiosInstance.delete(`/problems/`, { params: params });
  console.log(res)
  return res.data;
};