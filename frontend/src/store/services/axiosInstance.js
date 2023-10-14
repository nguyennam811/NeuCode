import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_URL}/api`
});

// headers: Đây là một đối tượng chứa các tiêu đề HTTP mà bạn muốn gửi cùng với các yêu cầu. Ví dụ:
// const instance = axios.create({
//     baseURL: "https://example.com",
//     headers: {
//       'Authorization': 'Bearer your-token',
//       'Content-Type': 'application/json',
//     },
//   });
  

// timeout: Đặt một thời gian giới hạn cho yêu cầu. Nếu yêu cầu không hoàn thành trong khoảng thời gian này, nó sẽ bị hủy. Ví dụ:
//   const instance = axios.create({
//     baseURL: "https://example.com",
//     timeout: 5000, // milliseconds
//   });


//   auth: Cung cấp thông tin xác thực HTTP cơ bản. Ví dụ:
//   const instance = axios.create({
//     baseURL: "https://example.com",
//     auth: {
//       username: 'your-username',
//       password: 'your-password',
//     },
//   });

//   withCredentials: Cho phép gửi các cookie và thông tin xác thực khi thực hiện yêu cầu dưới dạng CORS. Mặc định, giá trị này là false. Ví dụ:
//   const instance = axios.create({
//     baseURL: "https://example.com",
//     withCredentials: true,
//   });


//   transformResponse: Cho phép bạn tùy chỉnh cách dữ liệu phản hồi được xử lý sau khi yêu cầu hoàn thành. Ví dụ:
//   const instance = axios.create({
//     baseURL: "https://example.com",
//     transformResponse: axios.defaults.transformResponse.concat((data) => {
//       // Xử lý dữ liệu ở đây
//       return data;
//     }),
//   });


//   proxy: Cho phép bạn thiết lập một proxy server để xử lý yêu cầu, hữu ích trong môi trường phát triển và kiểm tra. Ví dụ:
//   const instance = axios.create({
//     baseURL: "https://example.com",
//     proxy: {
//       host: 'localhost',
//       port: 8888,
//     },
//   });