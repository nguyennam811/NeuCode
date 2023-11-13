import axiosInstance from "./axiosInstance";

export const fetchAssignments = async (params) => {
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
  const res = await axiosInstance.get(`/assignment/`, { params: searchParams });
  return res.data;
};

export const addAssignment = async (assignment) => {
  const { course_id, ...requestBody } = assignment;
  const params = new URLSearchParams();
  params.append('course_id', course_id)
  const body = JSON.stringify(requestBody);
  const res = await axiosInstance.post(
      "/problems",
      body,
      {
        params: params,
        headers: { "Content-Type": "application/json" },
      }
    );
  return res.data;
};

export const moveToAssignment = async (assignment) => {
  const body = JSON.stringify(assignment);
  const res = await axiosInstance.post(
      "/assignment",
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  return res.data;
};

export const updateAssignment = async (assignment) => {

  const { course_id, ...requestBody } = assignment;
  const params = new URLSearchParams();
  params.append('course_id', course_id)
  const body = JSON.stringify(requestBody);
  const res = await axiosInstance.put(
      "/problems",
      body,
      {
        params: params,
        headers: { "Content-Type": "application/json" },
      }
    );
  return res.data;
};

export const deleteAssignment = async (ids) => {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append('id', id));
  const res = await axiosInstance.delete(`/assignment/`, { params: params });
  console.log(res)
  return res.data;
};

export const fetchAssignmentDetail = async (id) => {
  const res = await axiosInstance.get(`/assignment/${id}`);
  return res.data;
};