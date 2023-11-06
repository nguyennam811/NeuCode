import Split from "react-split";
import AssignmentsDetailDescription from "./AssignmentsDetailDescription";
import TextEditor from "./TextEditor";
import "../../../../../styles/globals.css";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAssignmentDetail } from "../../../../../store/actions/assignmentAction";

const ProblemDetail = () => {
  const assignment = useParams();
  console.log("assignment ID:", assignment.id);

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAssignmentDetail(assignment.id))
  }, [assignment.id])

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
