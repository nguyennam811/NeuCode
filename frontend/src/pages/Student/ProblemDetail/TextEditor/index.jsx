import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import EditorNav from "./EditorNav";
import Split from "react-split";
import "../../../../styles/globals.css";
import EditorTestCase from "./EditorTestCase";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../../../utils/auth";
import { mapLanguage } from "../../../../utils/mapLanguage";
import { memo } from "react";

function TextEditor({setValueDescription, setHistoryProblem}) {

  const [languages, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  // const [input, setInput] = useState("");
  // const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSizes, setFontSizes] = useState("14px");

  

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // const executeCode = () => {
  //   setOutput("");

  //   const language = mapLanguage(languages);

  //   // Send a request to the server to execute the code
  //   // fetch('http://localhost:8000/api/submissions/', {
  //   fetch("http://127.0.0.1:9000/execute", {
  //     method: "POST",
  //     // body: JSON.stringify({ language, input, code , problem_id: 'SUM', user_id: '2'}),
  //     body: JSON.stringify({
  //       languages,
  //       code,
  //       problem_id: problemId.id,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data) {
  //         // Update the output
  //         setOutput(data.output);
  //         console.log(data);
  //       } else {
  //         // Handle errors
  //         setOutput("Lỗi xảy ra trong quá trình biên dịch.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setOutput("Lỗi xảy ra trong quá trình biên dịch.");
  //     });
  // };

  // const submitCode = async () => {
  //   const language = mapLanguageToServerValue(languages);

  //   const res = await fetch("http://localhost:8000/api/submissions", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       language,
  //       code,
  //       user_id: current_user.sub,
  //       problem_id: problemId.id,
  //     }),
  //   })
  //     .then((result) => result.json())
  //     .catch((error) => {
  //       console.error(error);
  //       alert("Lỗi xảy ra trong quá trình biên dịch.");
  //     });

  //   console.log(res);
  //   return res;
  // };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <EditorNav
        languages={languages}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        fontSizes={fontSizes}
        setFontSizes={setFontSizes}
      />

      <Box sx={{ height: "calc(100% - 58px)" }}>
        <Split
          className="comp2"
          direction="vertical"
          gutterSize={7}
          sizes={[60, 40]}
          minSize={[25, 120]}
        >
          <Paper elevation={3}>
            <Editor
              height="100%"
              width="100%"
              theme={theme}
              onChange={(newCode) => setCode(newCode)}
              onMount={handleEditorDidMount}
              defaultLanguage="cpp"
              loading="Loading..."
              // loading={<CircularProgress />}
              language={languages}
              value={code}
              options={{
                fontSize: `${fontSizes}`,
              }}
            />
          </Paper>

          <EditorTestCase
            code={code}
            languages={languages}
            setValueDescription={setValueDescription}
            setHistoryProblem={setHistoryProblem}
          />
        </Split>
      </Box>
    </Box>
  );
}

export default memo(TextEditor);
