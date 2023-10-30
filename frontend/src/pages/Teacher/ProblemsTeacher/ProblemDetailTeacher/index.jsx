import Split from "react-split";
import "../../../../styles/globals.css";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DescriptionTeacher from "./DescriptionTeacher";
import { getProblemDetail } from "../../../../store/actions/problemDetailAction";
import TextEditor from "./TextEditor";

const ProblemDetailTeacher = () => {
  const {id} = useParams();
  console.log("Problem ID:", id);

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getProblemDetail(id))
  }, [id])

  
  return (
    <Box sx={{ height: "100%" }}>
      <Split className="split" gutterSize={7} minSize={[25, 375]} sizes={[50, 50]}>
        <DescriptionTeacher />
        <TextEditor/>
      </Split>
    </Box>
  );
};

export default ProblemDetailTeacher;