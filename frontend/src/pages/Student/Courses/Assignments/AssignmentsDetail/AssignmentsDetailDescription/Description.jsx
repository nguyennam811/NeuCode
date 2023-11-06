import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getColorDifficulty } from "../../../../../../utils/status";
import ErrorData from "../../../../../ErrorData";

function Description() {
  const assignment = useSelector((reducers) => reducers.assignment.data);
  const status = useSelector((reducers) => reducers.assignment.status);
  console.log(assignment);
  return (
    <>
      {status === "loading" && <CircularProgress />}
      {status === "error" && <ErrorData />}

      {status === "success" && assignment && assignment.problems && (
        <Box>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              {assignment.problems.title}
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Typography>
                    Difficulty:{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getColorDifficulty(
                          assignment.problems.difficulty
                        ),
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Problem type: {assignment.problems.problem_type}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Time limit: {assignment.problems.max_execution_time} s
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Memory limit: {assignment.problems.max_memory_limit} MB
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <div
            dangerouslySetInnerHTML={{
              __html: assignment.problems.description,
            }}
          />
        </Box>
      )}
    </>
  );
}

export default Description;
