import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Button,
  TextareaAutosize,
  Paper,
} from '@mui/material';

const Exercise = () => {
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const executeCode = () => {
    // Viết logic để thực thi mã ở đây
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Codeboard Online IDE</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h5" className="input-header">
          Input
        </Typography>
        <TextareaAutosize
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rowsMin={4}
          placeholder="Enter input here"
        />

        <Typography variant="h5" className="output-header">
          Output
        </Typography>
        <Paper elevation={3} className="output">
          <pre>{output}</pre>
        </Paper>
      </Container>

      <Container className="control-panel">
        <Select
          label="Select Language"
          value={language}
          onChange={handleLanguageChange}
        >
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="php">PHP</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="node">Node JS</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={executeCode}>
          Run
        </Button>
      </Container>
    </div>
  );
};

export default Exercise;
