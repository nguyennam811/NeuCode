import Split from "react-split";
import ProblemDetailDescription from "./ProblemDetailDescription";
import TextEditor from "./TextEditor";
import "../../../styles/globals.css";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProblemDetail = () => {
  const [problem, setProblem] = useState([]);
  const problemId = useParams();
  console.log("Problem ID:", problemId.id);

  useEffect(() => {
    // Gọi API
    fetch(`http://127.0.0.1:8000/api/problems/${problemId.id}`)
      .then((response) => {
        // Kiểm tra nếu response không thành công
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProblem(data); // Cập nhật dữ liệu khi API thành công
      })
      .catch((error) => {
      });
  }, []);
  console.log(problem)
  return (
    <Box sx={{ height: "100%" }}>
      <Split className="split" gutterSize={7} minSize={[25, 375]} sizes={[50, 50]}>
        <ProblemDetailDescription />
        <TextEditor problem = {problem}/>
      </Split>
    </Box>
  );
};

export default ProblemDetail;
