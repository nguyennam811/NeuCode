import axiosInstance from "./axiosInstance";

export const fetchCourses = async (params) => {
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
  const res = await axiosInstance.get(`/course/`, { params: searchParams });
  return res.data;
};

export const addCourse = async (course) => {
  const body = JSON.stringify(course);
  const res = await axiosInstance.post(
      "/course",
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  return res.data;
};

export const updateCourse = async (course) => {
  const { id, ...requestBody } = course;
  const body = JSON.stringify(requestBody);
  const res = await axiosInstance.put(`/course/${id}`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  return res.data;
};

export const deleteCourse = async (ids) => {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append('id', id));
  const res = await axiosInstance.delete(`/course/`, { params: params });
  console.log(res)
  return res.data;
};