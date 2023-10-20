
import React, { useState } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Grid, InputAdornment, Typography } from "@mui/material";
import { getCurrentUser } from "../../../utils/auth";
import { useDispatch } from "react-redux";
import { addProblem } from "../../../store/actions/problemDetailAction";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateProblem = () => {
  const dispatch = useDispatch();
  const current_user = getCurrentUser();
  const [formData, setFormData] = useState({
    id: '',
    user_id: current_user.sub, 
    title: '',
    difficulty: 'Dễ',
    problem_type: '',
    max_memory_limit: 0,
    max_execution_time: 0,
    description: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleQuillChange = (value) => {
  handleChange("description", value);
};

  const handleSubmit = (e) => {
    e.preventDefault(); //ngăn trình duyệt gửi biểu mẫu lên máy chủ và tải lại trang web.
    // Gửi dữ liệu formData đến máy chủ hoặc thực hiện xử lý dữ liệu ở đây
    console.log(formData);
    dispatch(addProblem(formData))
    
  };

const toolbarOptions = [
  [{ 'font': [] }],
  ['bold', 'italic', 'underline', 'strike'],   
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'align': [] }],
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  
  ["link", "image", "video"],


  ['clean']                                         // remove formatting button
];


const modules = {
  toolbar: toolbarOptions,
}



  return (
    <Box p={6}>

    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="id"
            label="ID"
            value={formData.id}
            onChange={(e) => handleChange("id", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="title"
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
            label="Difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={(e) => handleChange("difficulty", e.target.value)}
            >
              <MenuItem value="Dễ">Dễ</MenuItem>
              <MenuItem value="Trung Bình">Trung Bình</MenuItem>
              <MenuItem value="Khó">Khó</MenuItem>
            </Select>
          </FormControl>


          
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="problem_type"
            label="Problem Type"
            value={formData.problem_type}
            onChange={(e) => handleChange("problem_type", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="max_memory_limit"
            label="Max Memory Limit"
            type="number"
            value={formData.max_memory_limit}
            onChange={(e) =>
              handleChange("max_memory_limit", parseInt(e.target.value))
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">s ( giây )</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="max_execution_time"
            label="Max Execution Time"
            type="number"
            value={formData.max_execution_time}
            onChange={(e) =>
              handleChange("max_execution_time", parseInt(e.target.value))
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">MB</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box height={'601px'} display='flex' flexDirection='column'>
            <Typography gutterBottom variant="h6" fontSize={17}>
            Description
            </Typography>
          <ReactQuill 
          theme="snow"
          value={formData.description}
          onChange={handleQuillChange}
          modules={modules}
          className="react_quill"
          
          />

          </Box>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
    </Box>
  );
};

export default CreateProblem;
