import axiosInstance from "./axiosInstance";

export const addTest = async (formTest) => {
    const body = JSON.stringify(formTest);
    const res = await axiosInstance.post(
        "/test",
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    return res.data;
};