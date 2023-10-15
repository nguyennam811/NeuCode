import Split from "react-split";
import ProblemDetailDescription from "./ProblemDetailDescription";
import TextEditor from "./TextEditor";
import "../../../styles/globals.css";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProblemDetail } from "../../../store/actions/problemDetailAction";

const ProblemDetail = () => {
  const problemId = useParams();
  console.log("Problem ID:", problemId.id);

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getProblemDetail(problemId.id))
  }, [dispatch])

  
  return (
    <Box sx={{ height: "100%" }}>
      <Split className="split" gutterSize={7} minSize={[25, 375]} sizes={[50, 50]}>
        <ProblemDetailDescription />
        <TextEditor/>
      </Split>
    </Box>
  );
};

export default ProblemDetail;
