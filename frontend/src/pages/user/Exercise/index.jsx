import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import TextEditor from "./TextEditor";
import "../../../styles/globals.css";
import { Box } from "@mui/material";

const Exercise = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Split className="split" >
        <ProblemDescription />
        <TextEditor />
      </Split>
    </Box>
  );
};

export default Exercise;
