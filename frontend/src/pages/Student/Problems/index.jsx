import TableFrame from "../../../components/TableFrame";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProblems } from "../../../store/actions/problemAction";
import { formatResponseTime } from "../../../utils/time";
import ErrorData from "../../ErrorData";
import FilterProblems from "./FilterProblems";
import { getColorDifficulty, getTotalSubmissionsAssignment } from "../../../utils/status";
import { Link } from "react-router-dom";

export const problemsTableHeaders = [
  {
    id: "id",
    label: "ID",
    numeric: false,
    disablePadding: false,
    renderFn: (problem) => (
      <Link
        to={`${problem.id}`}
        style={{
          color: "black",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        {problem.id}
      </Link>
    ),
    descComparatorFn: (a, b) => {
      if (b.id < a.id) {
        return -1;
      }
      if (b.id > a.id) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "title",
    label: "Title",
    numeric: false,
    disablePadding: false,
    renderFn: (problem) => (
      <Link
        to={`${problem.id}`}
        style={{
          color: "black",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        {problem.title}
      </Link>
    ),
    descComparatorFn: (a, b) => {
      if (b.title < a.title) {
        return -1;
      }
      if (b.title > a.title) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "difficulty",
    label: "Difficulty",
    numeric: false,
    disablePadding: false,
    renderFn: (problem) => <div dangerouslySetInnerHTML={{ __html: getColorDifficulty(problem.difficulty) }} />,

    descComparatorFn: (a, b) => {
      if (b.difficulty < a.difficulty) {
        return -1;
      }
      if (b.difficulty > a.difficulty) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "problem_type",
    label: "Problem Type",
    numeric: false,
    disablePadding: false,
    renderFn: (problem) => problem.problem_type,
    descComparatorFn: (a, b) => {
      if (b.problem_type < a.problem_type) {
        return -1;
      }
      if (b.problem_type > a.problem_type) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "author",
    label: "Author",
    numeric: false,
    disablePadding: false,
    renderFn: (problem) => (
      <Link
        to={`/user/${problem.user_id}/`}
        style={{
          color: "black",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        {problem.user.fullname}
      </Link>
    ),
  },
  {
    id: "submission",
    label: "Submissions",
    numeric: true,
    disablePadding: false,
    renderFn: (problem) => problem.submissions.length,
    descComparatorFn: (a, b) => {
      if (b.submissions.length < a.submissions.length) {
        return -1;
      }
      if (b.submissions.length > a.submissions.length) {
        return 1;
      }
      return 0;
    },
  },
  // {
  //   id: "submission",
  //   label: "Submissions",
  //   numeric: true,
  //   disablePadding: false,
  //   renderFn: (problem) => getTotalSubmissionsAssignment(problem.submissions, null),
  //   descComparatorFn: (a, b) => {
  //     if (b.submissions.length < a.submissions.length) {
  //       return -1;
  //     }
  //     if (b.submissions.length > a.submissions.length) {
  //       return 1;
  //     }
  //     return 0;
  //   },
  // },
  {
    id: "created",
    label: "Created",
    numeric: false,
    disablePadding: false,
    renderFn: (device) => formatResponseTime(device.created),
    descComparatorFn: (a, b) => {
      if (b.created < a.created) {
        return -1;
      }
      if (b.created > a.created) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "updated",
    label: "Updated",
    numeric: false,
    disablePadding: false,
    renderFn: (device) => formatResponseTime(device.updated),
    descComparatorFn: (a, b) => {
      if (!a.updated || !b.updated) return 0;

      if (b.updated < a.updated) {
        return -1;
      }

      if (b.updated > a.updated) {
        return 1;
      }
      return 0;
    },
  },
];

const ProblemsPage = () => {
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    // filter_authors: ['3'],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProblems(fetchingParams));
  }, [fetchingParams]);

  const data = useSelector((reducers) => reducers.problem.data);
  const status = useSelector((reducers) => reducers.problem.status);
  console.log(status);
  console.log(data);

  const handlePagination = (pageNumber, numberRowsPerPage) => {
    setFetchingParams({
      ...fetchingParams,
      offset: pageNumber * numberRowsPerPage,
      limit: numberRowsPerPage,
    });
  };

  const handleDeviceSearchAndFilter = (searchAndFilter) => {
    // let keys = Object.keys(searchAndFilter);
    // console.log('keto', keys)
    // let values = Object.values(searchAndFilter);
    // console.log('value', values)
    setFetchingParams({
      ...fetchingParams,
      offset: 0,
      ...searchAndFilter,
      //   ...keys.reduce((pre, cur, index) => {
      //     return {
      //       ...pre,
      //       [cur]: values[index],
      //     };
      //   }, {}),
    });
  };

  return (
    <>
      {status === "error" && <ErrorData />}
      <Box p={5} pt={2}>
        {status !== "error" && (
          <>
            <Typography variant="h5" gutterBottom>
              Problem List
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
            >
              <Box width="72%">
                <TableFrame
                  // title="Table Devices"
                  data={data?.data ?? []}
                  isLoading={status === "loading"}
                  total={data?.total ?? 0}
                  numOfColumnsInFilter={4}
                  headCells={problemsTableHeaders}
                  onPagination={handlePagination}
                  showCheckbox={false}
                />
              </Box>
              <FilterProblems
                data={data?.data ?? []}
                onSearchFilter={handleDeviceSearchAndFilter}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default ProblemsPage;
