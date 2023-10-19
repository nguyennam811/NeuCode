import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Description() {
  const problem = useSelector((reducers) => reducers.problemDetail.data);
  console.log(problem);
  // const hihi = [
  //   '<h1>Description 1</h1>',
  //   '<h1>Description 2</h1>',
  //   '<h1>Description 3</h1>',
  // ];
  return (
    <Box>
      <div dangerouslySetInnerHTML={{ __html: problem.description }} />
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
      <h1>
        hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </h1>
    </Box>
  );
}

export default Description;
