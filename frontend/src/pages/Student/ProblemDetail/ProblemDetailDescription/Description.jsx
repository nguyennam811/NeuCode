import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getColorDifficulty } from "../../../../utils/status";

function Description() {
  const problem = useSelector((reducers) => reducers.problemDetail.data);
  console.log(problem);
  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          {problem.title}
        </Typography>
        {/* <Box sx={{ flexGrow: 1 }} textAlign="center">
          <Grid container>
            <Grid item xs={3}>
              <Typography>
                Difficulty:{" "}
                <span style={{ color: getColorDifficulty(problem.difficulty) }}>
                  {problem.difficulty}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Problem type: {problem.problem_type}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                Time limit: {problem.max_execution_time} s
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                Memory limit: {problem.max_memory_limit} MB
              </Typography>
            </Grid>
          </Grid>
        </Box> */}
        <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <Typography>
                Difficulty:{" "}
                <span style={{ color: getColorDifficulty(problem.difficulty) }}>
                  {problem.difficulty}
                </span>
              </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>Problem type: {problem.problem_type}</Typography>

        </Grid>
        <Grid item xs={6}>
        <Typography>
                Time limit: {problem.max_execution_time} s
              </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>
                Memory limit: {problem.max_memory_limit} MB
              </Typography>
        </Grid>
      </Grid>
    </Box>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: problem.description }} />
    </Box>
  );
}

export default Description;
