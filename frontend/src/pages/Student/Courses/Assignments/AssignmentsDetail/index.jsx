import Split from "react-split";
import AssignmentsDetailDescription from "./AssignmentsDetailDescription";
import TextEditor from "./TextEditor";
import "../../../../../styles/globals.css";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAssignmentDetail } from "../../../../../store/actions/assignmentAction";
import { getSubmissions } from "../../../../../store/actions/submissionAction";

const ProblemDetail = () => {
  const dispatch = useDispatch();
  const assignment = useParams();
  const current_user = useLoaderData();
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    submiter_id: current_user.sub,
    assignment_id: assignment.id,
  });

  useEffect(()=> {
    dispatch(getAssignmentDetail(assignment.id));
    dispatch(getSubmissions(fetchingParams));
  }, [assignment.id, fetchingParams])


  // const assignment = useParams();
  // console.log("assignment ID:", assignment.id);

  // const dispatch = useDispatch();

  // useEffect(()=> {
  //   dispatch(getAssignmentDetail(assignment.id))
  // }, [assignment.id])

  const [value, setValue] = useState('1');
  const [historyAssignment, SetHistoryAssignment] = useState(true)
  
  return (
    <Box sx={{ height: "100%" }}>
      <Split className="split" gutterSize={7} minSize={[25, 375]} sizes={[50, 50]}>
        <AssignmentsDetailDescription value={value} setValue={setValue} historyAssignment={historyAssignment} SetHistoryAssignment={SetHistoryAssignment}/>
        <TextEditor setValueDescription={setValue} SetHistoryAssignment={SetHistoryAssignment}/>
      </Split>
    </Box>
  );
};

export default ProblemDetail;
