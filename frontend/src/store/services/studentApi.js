import axiosInstance from "./axiosInstance";


export const fetchDashboard = async () => {
  const res = await axiosInstance.get(`/admin/dashboard/`);
return res.data;
};

export const fetchUser = async () => {
  const res = await axiosInstance.get(`/users/`);
return res.data;
};

export const fetchStudent = async (role) => {
    // const params = new URLSearchParams();
    // params.append('role', role)
    // const res = await axiosInstance.get(`/users/`, { params: params });
    // return res.data;
    console.log(role);
  let searchParams = new URLSearchParams();
  let keys = Object.keys(role);
  console.log(keys);
  let values = Object.values(role);
  console.log(values);
  keys.forEach((item, index) => {
    return typeof values[index] === "object"
      ? values[index].forEach((id) => {
          if (id !== "") return searchParams.append(item, id);
        })
      : searchParams.append(item, values[index]);
  });
  console.log(searchParams);
      const res = await axiosInstance.get(`/users/`, { params: searchParams });
    return res.data;
};

export const fetchUserDetail = async (id) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data;
};

export const addUser = async (user) => {
  const body = JSON.stringify(user);
  const res = await axiosInstance.post(
      "/users",
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  return res.data;
};

export const updateUser = async (user) => {
  const body = JSON.stringify(user);
  const res = await axiosInstance.put(`/users/${user.id}`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  return res.data;
};

export const deleteUser = async (ids) => {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append('id', id));
  const res = await axiosInstance.delete(`/users/`, { params: params });
  console.log(res)
  return res.data;
};