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

// export const updateCourse = async (course) => {
//   const { id, ...requestBody } = course;
//   const body = JSON.stringify(requestBody);
//   const res = await axiosInstance.put(`/course/${id}`,
//       body,
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   return res.data;
// };

// export const deleteCourse = async (ids) => {
//   const params = new URLSearchParams();
//   ids.forEach((id) => params.append('id', id));
//   const res = await axiosInstance.delete(`/course/`, { params: params });
//   console.log(res)
//   return res.data;
// };