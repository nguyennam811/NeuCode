import React, { useState } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Grid, InputAdornment } from "@mui/material";
import { getCurrentUser } from "../../../utils/auth";
import { useDispatch } from "react-redux";
import { addProblem } from "../../../store/actions/problemDetailAction";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "max_memory_limit" || name === "max_execution_time" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //ngăn trình duyệt gửi biểu mẫu lên máy chủ và tải lại trang web.
    // Gửi dữ liệu formData đến máy chủ hoặc thực hiện xử lý dữ liệu ở đây
    console.log(formData);
    dispatch(addProblem(formData))
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="id"
            label="ID"
            value={formData.id}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
            label="Difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
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
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="max_memory_limit"
            label="Max Memory Limit"
            type="number"
            value={formData.max_memory_limit}
            onChange={handleChange}
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
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">MB</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formData.detail}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default CreateProblem;
