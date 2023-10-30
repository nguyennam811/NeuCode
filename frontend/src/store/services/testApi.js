import axiosInstance from "./axiosInstance";

export const addTest = async (formTest) => {
  const params = new URLSearchParams();
  params.append('problem_id', formTest[0].problem_id)
  console.log(formTest[0].problem_id);
    const body = JSON.stringify(formTest);
    const res = await axiosInstance.post(
        "/test/",
        body,
        {
          params: params,
          headers: { "Content-Type": "application/json" },
        }
      );
    return res.data;
};