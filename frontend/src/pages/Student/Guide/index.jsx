import React from "react";
import { Box, Typography } from "@mui/material";
import problems from "../../../assets/images/problems.png";
import courses from "../../../assets/images/courses.png";
import assignments from "../../../assets/images/assignment.png";
import code from "../../../assets/images/lam_bai.png";
import runsuccess from "../../../assets/images/run_success.png";
import runerror from "../../../assets/images/run_error.png";
import submit from "../../../assets/images/submit.png";

const Guide = () => {
  return (
    <>
      <Box
        width={"100%"}
        sx={{
          backgroundColor: "#c7c7c740",
          padding: "2% 15%",
          "@media (max-width:600px)": {
            mt: 0,
            p: 0,
            "& h3 ": {
              fontSize: "1.5rem",
            },
            "& h4 ": {
              fontSize: "1.5rem",
            },
            "& h5 ": {
              fontSize: "1.1rem",
            },
          },
        }}
      >
        <Box
          sx={{ backgroundColor: "white" }}
          width={"100%"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          paddingLeft={"5%"}
          paddingRight={"5%"}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            color={"error"}
            mt={1.5}
            gutterBottom
          >
            Hướng dẫn nộp bài trực tuyến
          </Typography>

          <Typography variant="h5" gutterBottom>
            Bước 1: Chọn bài tập
          </Typography>

          <Typography
            variant="h5"
            color={"blue"}
            marginLeft={"5%"}
            gutterBottom
          >
            {" "}
            * Đối với trang Problems
          </Typography>
          <Typography gutterBottom>
            {" "}
            Sinh viên chọn bài trong danh sách bài tập, nhấn vào ID hoặc Title
            để xem chi tiết bài tập đó.
          </Typography>
          <img src={problems} alt="Problems" style={{padding: '10px'}}/>
          <Typography textAlign={"center"} color={"gray"} gutterBottom>
            Hình 1. Danh sách các bài tập ở kho chung.
          </Typography>
          <Typography
            variant="h5"
            color={"blue"}
            marginLeft={"5%"}
            mt={2}
            gutterBottom
          >
            {" "}
            * Đối với trang Courses
          </Typography>
          <Typography gutterBottom>
            {" "}
            Sinh viên nhấn vào tên lớp học phần để có thể vào danh sách bài tập trong lớp đó.
          </Typography>
          <img src={courses} alt="Courses" style={{padding: '10px'}}/>
          <Typography textAlign={"center"} color={"gray"} gutterBottom>
            Hình 2. Danh sách các lớp học phần
          </Typography>
          <Typography gutterBottom mt={2}>
            {" "}
            Sinh viên chọn bài tập để làm, nhấn vào ID hoặc Title để xem chi tiết bài tập đó. 
            Mỗi bài tập sẽ có deadline, nếu quá thời gian deadline thì sinh viên sẽ ko thể nộp bài được nữa. Và mỗi bài tập trong lớp sẽ chỉ được <b>nộp 1 lần</b>.
          </Typography>
          <img src={assignments} alt="Assignments" style={{padding: '10px'}}/>
          <Typography textAlign={"center"} color={"gray"} gutterBottom>
            Hình 3. Danh sách các bài tập trong lớp cơ sở dữ liệu
          </Typography>

          <Typography variant="h5" gutterBottom mt={3}>
            Bước 2: Chạy thử và nộp bài
          </Typography>
          <Typography gutterBottom>
            {" "}
            Sau khi ấn sẽ chuyển vào giao diện làm bài.
          </Typography>
          <img src={code} alt="Code" style={{padding: '10px'}}/>
          <Typography textAlign={"center"} color={"gray"} gutterBottom>
            Hình 4. Giao diện làm bài.
          </Typography>

          <Typography gutterBottom mt={2}>
            {" "}
            Sau khi gõ bài làm code vào phần text editor,
             sinh viên có thể ấn <b>Run</b> để chạy test kết quả trước để kiểm tra kết quả. Nếu có lỗi thì hệ thống sẽ báo trong phần <b><i>Your Output</i></b> và <b><i>Compiler Message </i></b>
          </Typography>

          <img src={runsuccess} alt="Run_Success" style={{padding: '10px'}}/>
          <Typography textAlign={"center"} color={"gray"} gutterBottom>
            Hình 5. Giao diện kết quả kiểm tra khi Run (đúng)
          </Typography>
<br></br>
          <img src={runerror} alt="Run_Error" style={{padding: '10px'}}/>
          <Typography textAlign={"center"} color={"gray"} gutterBottom>
            Hình 6. Giao diện kết quả kiểm tra khi Run (sai)
          </Typography>

          <Typography gutterBottom mt={2}>
            {" "}
            Sau khi test xong, Sinh viên sẽ ấn <b>Submit</b> để nộp bài, hệ thống sẽ hỏi lại lần nữa để kiểm tra.
             Nếu đồng ý nộp thì hệ thống chuyển hướng đến trang kết quả nộp bài tập đó, kết quả chấm bài sẽ được cập nhật tự động (Không cần refresh lại trang web).
          </Typography>
          <img src={submit} alt="Submit" style={{padding: '10px'}}/>
          <Typography textAlign={"center"} color={"gray"} gutterBottom>
            Hình 7. Giao diện kết quả bài nộp trên hệ thống.
          </Typography>

<br></br>
          <Typography
            variant="h3"
            mt={3}
            gutterBottom
          >
            Các trạng thái kết quả
          </Typography>

          <Typography variant="h5" mb={2.5} gutterBottom color={'green'}>AC: Accepted (Kết quả đúng)</Typography>
          <Typography variant="h5" mb={2.5} gutterBottom color={'red'}>WA: Wrong Answer (Kết quả sai)</Typography>
          <Typography variant="h5" mb={2.5} gutterBottom color={'red'}>TLE: Time Limit Exceeded (Quá giới hạn thời gian)</Typography>
          <Typography variant="h5" mb={2.5} gutterBottom color={'red'}>MLE: Memory Limit Exceeded (Quá giới hạn bộ nhớ)</Typography>
          <Typography variant="h5" mb={2.5} gutterBottom color={'red'}>IR: Invalid Return (Trả về không hợp lệ)</Typography>
          <Typography variant="h5" mb={2.5} gutterBottom color={'red'}>RTE: Runtime Error (Lỗi thực thi)</Typography>
          <Typography variant="h5" gutterBottom mb={4}>CE: Compile Error (Lỗi biên dịch)</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Guide;

// import React from "react";
// import { Box, Typography } from "@mui/material";

// const Guide = () => {
//   return (
//     <>
//       <Box
//         sx={{
//           my: 15,
//           textAlign: "center",
//           p: 2,
//           "& h4": {
//             fontWeight: "bold",
//             my: 2,
//             fontSize: "2rem",
//           },
//           "& p": {
//             textAlign: "justify",
//           },
//           "@media (max-width:600px)": {
//             mt: 0,
//             "& h4 ": {
//               fontSize: "1.5rem",
//             },
//           },
//         }}
//       >
//         <Typography variant="h4">Welcome To Neu Code</Typography>
//         <p>
//           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat quod,
//           suscipit, aperiam totam autem culpa cum eveniet dolorum quasi est
//           perspiciatis laborum. Nam recusandae nihil quia odio voluptatibus
//           facere omnis facilis rerum? Ab eum beatae nobis reiciendis, qui
//           temporibus aliquid, nesciunt velit sed quam recusandae necessitatibus,
//           tempora maxime. Repellendus incidunt, maxime labore dolorum eos
//           aperiam unde? At veritatis nesciunt eos quas cupiditate blanditiis est
//           quam maiores, amet, soluta exercitationem voluptatum, veniam
//           assumenda? Ratione perferendis officiis deserunt nostrum aspernatur
//           sed asperiores! Earum sunt placeat ducimus sint, deleniti amet esse
//           saepe voluptatem commodi laudantium quibusdam repellat nobis libero at
//           consectetur adipisci ipsa.
//         </p>
//         <br />
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
//           deserunt libero reprehenderit cum sint fugit cumque temporibus modi
//           facere eveniet amet obcaecati ducimus harum velit maxime vel qui
//           voluptatibus quam odio corrupti saepe, voluptas dolorum quidem
//           tempore? Esse sapiente molestias minus enim quisquam dolorum eum culpa
//           ullam impedit velit quo, corporis ducimus numquam dignissimos
//           inventore maiores. Nam deleniti itaque nostrum neque dolorum dolores,
//           aliquam, voluptatum sapiente doloribus laborum perspiciatis ipsam, quo
//           ut nisi distinctio sunt nihil est blanditiis perferendis eveniet
//           nesciunt! Nostrum, voluptatum eveniet repellat vel officia deleniti
//           tempore voluptatibus perferendis esse eaque temporibus porro?
//           Aspernatur beatae deleniti illo autem!
//         </p>
//       </Box>
//     </>
//   );
// };

// export default Guide;
