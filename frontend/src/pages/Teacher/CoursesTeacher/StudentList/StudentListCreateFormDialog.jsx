import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import AutocompleteField from "../../../../components/FormDialog/FieldTypes/AutocompleteField";
import { useDispatch } from "react-redux";
import { addCourseStudentByTeacher } from "../../../../store/actions/courseStudentAction";


function StudentListCreateFormDialog({ open, onClose, onSave, studentOptions }) {
  const courseId = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [textFieldValue, setTextFieldValue] = useState("");

  const handleStudentIdsChange = (event, newValue, field) => {
    const selectedStudentIds = newValue.map((option) => option.value).join(",");
    setStudentIds({ ...student_ids, [field]: selectedStudentIds });
  };

  const [student_ids, setStudentIds] = useState({});

  const handleSubmit = async () => {
    if (value === "1") {
      const formAddStudent = { course_id: courseId.id, student_ids: student_ids.student_id || "" };
      await dispatch(addCourseStudentByTeacher(formAddStudent));
  
    } else if (value === "2") {
      const formAddStudent = { course_id: courseId.id, student_ids: textFieldValue };
      await dispatch(addCourseStudentByTeacher(formAddStudent));
    }
    onSave()
    onClose();
  };
  const selectAddStudent = [
    {
      id: "student_id",
      title: "Student ID",
      placeholder: "Select Student ID...",
      values: "",
      options: studentOptions.sort(
        (a, b) =>
          -b.label[0].toUpperCase().localeCompare(a.label[0].toUpperCase())
      ),
      groupByFn: (option) => option.label[0].toUpperCase(),
      multipleValues: true,
    },
  ];

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <TabContext value={value}>
        <DialogTitle width="500px" id="customized-dialog-title" >
        <Typography variant="h5" gutterBottom>Add Student</Typography>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Select" value="1" />
              <Tab label="Enter" value="2" />
            </TabList>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{paddingTop: '0'}}>
          <TabPanel value="1" >
            
      {selectAddStudent.map((filter) => (
            <Grid item key={`filter-${filter.id}`} sx={{ marginTop: "12px" }}>
              <AutocompleteField
                id={filter.id}
                title={filter.title}
                placeholder={filter.placeholder}
                multipleValues
                values={filter.values}
                required={filter.required}
                options={filter.options}
                error={filter.error}
                onBlur={filter.onBlur}
                setFieldValue={(field, value) => {
                  handleStudentIdsChange(null, value, field);
                }}
                groupByFn={filter.groupByFn}
              />
            </Grid>
          ))}
          </TabPanel>
          <TabPanel value="2">
          <Typography gutterBottom>Enter Studen ID (Separate values ​​by ",")<Typography sx={{color: '#0006'}}>VD: msv1,msv2</Typography></Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Student Id..."
              fullWidth
              value={textFieldValue}
              onChange={(e) => setTextFieldValue(e.target.value)}
            />
          </TabPanel>
        </DialogContent>
      </TabContext>

      <DialogActions>
        <Button autoFocus onClick={handleSubmit} startIcon={<SaveIcon />}
        variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StudentListCreateFormDialog;
