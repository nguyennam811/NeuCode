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
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getProblemDetail(problemId.id))
  }, [problemId.id])

  const [value, setValue] = useState('1');
  const [historyProblem, setHistoryProblem] = useState(true)

  return (
    <Box sx={{ height: "100%" }}>
      <Split className="split" gutterSize={7} minSize={[25, 375]} sizes={[50, 50]}>
        <ProblemDetailDescription value={value} setValue={setValue} historyProblem={historyProblem} setHistoryProblem={setHistoryProblem}/>
        <TextEditor setValueDescription={setValue} setHistoryProblem={setHistoryProblem}/>
      </Split>
    </Box>
  );
};

export default ProblemDetail;
