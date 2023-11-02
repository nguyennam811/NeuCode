import axiosInstance from "./axiosInstance";

export const fetchCourseStudent = async (params) => {
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
  const res = await axiosInstance.get(`/course_student/`, { params: searchParams });
  return res.data;
};

export const addCourseStudent = async (course_student) => {
  const body = JSON.stringify(course_student);
  const res = await axiosInstance.post(
      "/course_student",
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  return res.data;
};

export const deleteCourseStudent = async (ids) => {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append('id', id));
  const res = await axiosInstance.delete(`/course_student/`, { params: params });
  console.log(res)
  return res.data;
};