import Split from "react-split";
import ProblemDetailDescription from "./ProblemDetailDescription";
import TextEditor from "./TextEditor";
import "../../../styles/globals.css";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProblemDetail } from "../../../store/actions/problemDetailAction";
import { getSubmissions } from "../../../store/actions/submissionAction";

const ProblemDetail = () => {
  const problemId = useParams();
  const dispatch = useDispatch();
  const current_user = useLoaderData();
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    submiter_id: current_user.sub,
    problem_id: problemId.id,
  });

  useEffect(()=> {
    dispatch(getProblemDetail(problemId.id));
    dispatch(getSubmissions(fetchingParams));
  }, [problemId.id, fetchingParams])

  const [value, setValue] = useState('1');
  const [historyProblem, setHistoryProblem] = useState(true)

  // const problemId = useParams();
  // const dispatch = useDispatch();

  // useEffect(()=> {
  //   dispatch(getProblemDetail(problemId.id))
  // }, [problemId.id])
  return (
    <Box sx={{ height: "100%" , backgroundColor: 'white'}}>
      <Split className="split" gutterSize={7} minSize={[25, 375]} sizes={[50, 50]}>
        <ProblemDetailDescription value={value} setValue={setValue} historyProblem={historyProblem} setHistoryProblem={setHistoryProblem}/>
        <TextEditor setValueDescription={setValue} setHistoryProblem={setHistoryProblem}/>
      </Split>
    </Box>
  );
};

export default ProblemDetail;
