import React, { useRef, useState } from 'react';
import Editor from "@monaco-editor/react"
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

function TextEditor() {
  const [languages, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  console.log(languages)

  const mapLanguageToServerValue = (clientLanguage) => {
    // Chuyển đổi giá trị ngôn ngữ tùy thuộc vào ngôn ngữ client
    switch (clientLanguage) {
      case 'cpp':
        return 'cpp';
      case 'php':
        return 'php';
      case 'python':
        return 'py'; // Chuyển đổi sang 'py' thay vì 'python'
      case 'javascript':
        return 'js';
      default:
        return clientLanguage;
    }
  };

  const executeCode = () => {
    // Clear the output
    setOutput('');

    const language = mapLanguageToServerValue(languages);

    // Send a request to the server to execute the code
    // fetch('http://localhost:8000/api/submissions/', {
      fetch('http://127.0.0.1:9000/execute', {
      method: 'POST',
      // body: JSON.stringify({ language, input, code , problem_id: 'SUM', user_id: '2'}),
      body: JSON.stringify({ language, code, input }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          // Update the output
          setOutput(data.output);
          console.log(data)
        } else {
          // Handle errors
          setOutput('Lỗi xảy ra trong quá trình biên dịch.');
        }
      })
      .catch((error) => {
        console.error(error);
        setOutput('Lỗi xảy ra trong quá trình biên dịch.');
      });
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: '16px' , height: '500px'}}>
        <div className="control-panel">
          <TextField
            select
            label="Select Language"
            value={languages}
            onChange={handleLanguageChange}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="php">PHP</MenuItem>
            <MenuItem value="python">Python</MenuItem>
            {/* <MenuItem value="node">Javascript</MenuItem> */}
            <MenuItem value="javascript">Javascript</MenuItem>
          </TextField>
        </div>

        <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        onChange={(newCode) => setCode(newCode)}
        onMount={handleEditorDidMount}
        defaultLanguage='cpp'
        language={languages}
        value={code}
        options={{
          fontSize: 14,
        }}
        
        />
        {(code !== '') ? <div className="button-container">
          <Button variant="contained" color="primary" onClick={executeCode}>
            Run
          </Button>
        </div> :
        <div className="button-container">
        <Button disabled>
          Run
        </Button>
      </div>}
        <Container>
          <Typography variant="h6" gutterBottom>
            Input
          </Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Typography variant="h6" gutterBottom>
            Output
          </Typography>
          <Paper elevation={3} sx={{ padding: '8px', border: '2px solid gray' }}>
          <pre>{output}</pre>
          </Paper>
          {/* <pre>{output}</pre> */}
        </Container>
      </Paper>
    </Container>
  );
}

export default TextEditor;

// import React, { useRef, useState } from 'react';
// import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/mode-c_cpp'
// import 'ace-builds/src-noconflict/mode-php';
// import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/theme-monokai';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';

// function TextEditor() {
//   const [language, setLanguage] = useState('cpp');
//   const [code, setCode] = useState('');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');

//   const editorRef = useRef(null); // Tham chiếu đến AceEditor

//   const handleLanguageChange = (event) => {
//     setLanguage(event.target.value);
//   };

//   const executeCode = () => {
//     // Clear the output
//     setOutput('');

//     const currentCode = editorRef.current.editor.getValue();

//     // Send a request to the server to execute the code
//     fetch('http://localhost:8000/api/submissions/', {
//       method: 'POST',
//       body: JSON.stringify({ language, input, code: currentCode , problem_id: 'SUM', user_id: '2'}),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data.success) {
//           // Update the output
//           setOutput(data.output);
//         } else {
//           // Handle errors
//           setOutput('Lỗi xảy ra trong quá trình biên dịch.');
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         setOutput('Lỗi xảy ra trong quá trình biên dịch.');
//       });
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Codeboard Online IDE
//       </Typography>
//       <Paper elevation={3} sx={{ padding: '16px' }}>
//         <div className="control-panel">
//           <TextField
//             select
//             label="Select Language"
//             value={language}
//             onChange={handleLanguageChange}
//             sx={{ minWidth: '150px' }}
//           >
//             <MenuItem value="cpp">C++</MenuItem>
//             <MenuItem value="php">PHP</MenuItem>
//             <MenuItem value="python">Python</MenuItem>
//             <MenuItem value="javascript">Node JS</MenuItem>
//           </TextField>
//         </div>
//         <AceEditor
//           mode={language === 'cpp' ? 'c_cpp' : language}
//           theme="monokai"
//           value={code}
//           onChange={(newCode) => setCode(newCode)}
//           name="editor"
//           editorProps={{ $blockScrolling: true }}
//           sx={{ height: '400px', fontSize: 'unset' }}
//           ref={editorRef}
//         />
//         <div className="button-container">
//           <Button variant="contained" color="primary" onClick={executeCode}>
//             Run
//           </Button>
//         </div>
//         <Container>
//           <Typography variant="h6" gutterBottom>
//             Input
//           </Typography>
//           <TextField
//             multiline
//             rows={4}
//             variant="outlined"
//             fullWidth
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <Typography variant="h6" gutterBottom>
//             Output
//           </Typography>
//           <Paper elevation={3} sx={{ padding: '8px', border: '2px solid gray' }}>
//             {output}
//           </Paper>
//         </Container>
//       </Paper>
//     </Container>
//   );
// }

// export default TextEditor;


// import { useState, useRef } from 'react'
// import Editor from "@monaco-editor/react"

// const files = {
//   "script.py": {
//     name: "script.py",
//     language: "python",
//     value: "Here is some python text"
//   },
//   "index.html": {
//     name: "index.html",
//     language: "html",
//     value: "<div> </div>"
//   }
// }

// function TextEditor() {
//   const [fileName, setFileName] = useState("script.py"); // change to "index.html"
//   const editorRef = useRef(null);
//   const file = files[fileName];

  // function handleEditorDidMount(editor, monaco) {
  //   editorRef.current = editor;
  // }

//   function getEditorValue() {
//     alert(editorRef.current.getValue());
//   }

//   return (
//     <div className="App">
//       <button onClick={() => setFileName("index.html")}>
//         Switch to index.html
//       </button>
//       <button onClick={() => setFileName("script.py")}>
//         Switch to script.py
//       </button>
//       <button onClick={() => getEditorValue()}>
//         Get Editor Value
//       </button>
      // <Editor
      //   height="100vh"
      //   width="100%"
      //   theme="vs-dark"
      //   onMount={handleEditorDidMount}
      //   path={file.name}
      //   defaultLanguage={file.language}
      //   defaultValue={file.value}
      // />
//     </div>
//   )
// }

// export default TextEditor

 
 