import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import EditorNav from "./EditorNav";
import Split from "react-split";
import "../../../../../../styles/globals.css";
import EditorTestCase from "./EditorTestCase";
import { useParams } from "react-router-dom";
import { memo } from "react";

function TextEditor({setValueDescription, SetHistoryAssignment}) {

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
            SetHistoryAssignment={SetHistoryAssignment}
          />
        </Split>
      </Box>
    </Box>
  );
}

export default memo(TextEditor);
