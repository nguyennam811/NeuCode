import React from "react";
import {
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useMemo } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import { addUser, deleteUsers, getStudents, updateUser } from "../../../../store/actions/studentAction";
import { formatResponseTime } from "../../../../utils/time";
import ErrorData from "../../../ErrorData";
import TableFrameDetail from "../../../../components/TableFrame/TableFrameDetail";
import UserCreateFormDialog from "./UserCreateFormDialog";
import UserUpdateFormDialog from "./UserUpdateFormDialog";


export const usersTableHeaders = [
  {
    id: "id",
    label: "ID",
    numeric: false,
    disablePadding: false,
    renderFn: (user) => user.id,
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
    id: "fullname",
    label: "Full Name",
    numeric: false,
    disablePadding: false,
    renderFn: (user) => user.fullname,
    descComparatorFn: (a, b) => {
      if (b.fullname < a.fullname) {
        return -1;
      }
      if (b.fullname > a.fullname) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "email",
    label: "Email",
    numeric: false,
    disablePadding: false,
    renderFn: (user) => user.email,
    descComparatorFn: (a, b) => {
      if (b.email < a.email) {
        return -1;
      }
      if (b.email > a.email) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "role",
    label: "Role",
    numeric: false,
    disablePadding: false,
    renderFn: (user) => user.role,
    descComparatorFn: (a, b) => {
      if (b.role < a.role) {
        return -1;
      }
      if (b.role > a.role) {
        return 1;
      }
      return 0;
    },
  },
  
];

const UsersList = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [editingUser, setEditingUser] = useState();
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    role: props.roleUser
  });
  useEffect(() => {
    dispatch(getStudents(fetchingParams));
  }, [fetchingParams]);

const data = useSelector((reducers) => reducers.student.data);
const status = useSelector((reducers) => reducers.student.status);
  console.log(data);
  console.log(status);

  //Search
  const usersSearchFields = [
    { id: "id", title: "ID" },
    { id: "fullname", title: "Full Name" },
    { id: "email", title: "Email" },
  ];

  const handleUsersSearch = (searchOptions) => {
    let keys = Object.keys(searchOptions[0]);
    console.log(keys);
    let values = Object.values(searchOptions[0]);
    console.log(values);
    setFetchingParams({
      ...fetchingParams,
      offset: 0,
      search_key: keys[0],
      search_value: values[0],
    });
  };
  //Search
  const handlePagination = (pageNumber, numberRowsPerPage) => {
    setFetchingParams({
      ...fetchingParams,
      offset: pageNumber * numberRowsPerPage,
      limit: numberRowsPerPage,
    });
  };

  const handleCreateUser = async (values) => {
    console.log(values);
    await dispatch(addUser(values));
    dispatch(getStudents(fetchingParams));
  };

  const handleUpdateUser = async (values) => {
    console.log(values);
    await dispatch(updateUser(values));
    dispatch(getStudents(fetchingParams));
  };

  const handleUserDeleteRows = async (ids) => {
    console.log(ids);
    await dispatch(deleteUsers(ids));
    dispatch(getStudents(fetchingParams));
  };

  const isEditing = editingUser !== undefined;

  const updatedHeadUsers = useMemo(() => {
    return [
      ...usersTableHeaders,
      {
        id: "created",
        label: "Created",
        numeric: false,
        disablePadding: false,
        renderFn: (user) => formatResponseTime(user.created),
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
        renderFn: (user) => formatResponseTime(user.updated),
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
      {
        id: "row-actions",
        label: "Actions",
        numeric: false,
        disablePadding: false,
        renderFn: (user) => (
          <ButtonGroup
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Tooltip title="Update User">
              <IconButton
                color="warning"
                aria-label="edit User"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingUser(user);
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {status === "error" && <ErrorData />}
      {!isEditing && (
        <UserCreateFormDialog
          open={isShowCreateDialog}
          onSave={handleCreateUser}
          onClose={() => setIsShowCreateDialog(false)}
          roleUser={props.roleUser}
        />
      )}
      {isEditing && (
        <UserUpdateFormDialog
          row={editingUser}
          open={isEditing}
          onSave={handleUpdateUser}
          onClose={() => {
            setEditingUser(undefined);
          }}
          initialFn={(user) => ({
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            password: user.password,
          })}
        />
      )}
        {status !== "error" && (
          <TableFrameDetail
            data={data?.data ?? []}
            isLoading={status === "loading"}
            total={data?.total ?? 0}
            searchFields={usersSearchFields}
            numOfColumnsInFilter={4}
            headCells={updatedHeadUsers}
            onPagination={handlePagination}
            showCheckbox={true}
            onSearch={handleUsersSearch}
            handleNewClick={() => {
              setIsShowCreateDialog(true);
            }}
            onDeleteRows={handleUserDeleteRows}
          />
        )}
    </>
  );
};

export default UsersList;
