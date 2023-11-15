import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EditOffIcon from "@mui/icons-material/EditOff";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserDetail, updateUser } from "../../store/actions/studentAction";
import ErrorData from "../ErrorData";

function Information() {
  const { id } = useParams();
  const currentUser = useLoaderData();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [id]);

  const user = useSelector((reducers) => reducers.student.data);
  const status = useSelector((reducers) => reducers.student.status);
  console.log(user);

  const [edit, setEdit] = useState(false);
  console.log(edit);

  const [editedValues, setEditedValues] = useState({
    id: "",
    fullname: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (user.id) {
      setEditedValues({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        role: user.role,
      });
    }
  }, [user]);

  const infoUsers = [
    {
      id: "id",
      label: "ID Student",
      value: editedValues.id,
      icon: <CodeIcon />,
      disabled: true,
    },
    {
      id: "fullname",
      label: "Full Name",
      value: editedValues.fullname,
      icon: <PermContactCalendarIcon />,
      disabled: !edit,
    },
    {
      id: "email",
      label: "Email",
      value: editedValues.email,
      icon: <EmailIcon />,
      disabled: !edit,
    },
    {
      id: "role",
      label: "Role",
      value: editedValues.role,
      icon: <AdminPanelSettingsIcon />,
      disabled: true,
    },
  ];

  const handleChange = (fieldName, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleSave = async () => {
    console.log("handleSave", editedValues);
    await dispatch(updateUser(editedValues));
    dispatch(getUserDetail(id));
    setEdit(false);
  };
  return (
    <>
      {status === "error" && <ErrorData />}
      {status !== "error" && (
        <>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4" color={"primary"}>
              Information
            </Typography>

            
            { currentUser.sub === user.id &&
            <Tooltip title="Update User">
            <IconButton
              color="primary"
              aria-label="edit User"
              onClick={() => {
                setEdit((preState) => !preState);
              }}
            >
              {edit ? (
                <EditOffIcon fontSize={"large"} />
              ) : (
                <DriveFileRenameOutlineIcon fontSize={"large"} />
              )}
            </IconButton>
          </Tooltip>
            }
          </Box>

          {infoUsers.map((info) => (
            <Box
              display={"flex"}
              width={"70%"}
              flexDirection={"row"}
              mt={3}
              key={info.id}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography mt={1.2}>{info.label}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="input-with-icon-textfield"
                    value={info.value}
                    onChange={(e) => handleChange(info.id, e.target.value)}
                    disabled={info.disabled}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {info.icon}
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </Box>
          ))}

          {edit && (
            <Box mt={8} ml={5}>
              <Button
                variant="outlined"
                onClick={() => {
                  setEdit((preState) => !preState);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ marginLeft: "40px" }}
                onClick={handleSave}
              >
                save
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
}

export default Information;
