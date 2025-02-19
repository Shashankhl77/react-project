import React, { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button, Typography, Container } from "@mui/material";

const STORAGE_KEY = "richTextEditorContent";

const RichTextEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = useCallback((value: string) => {
    setContent(value);
    setIsDirty(true);
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, content);
    setIsDirty(false);
    alert("Content saved successfully!");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Rich Text Editor
      </Typography>
      <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 , height: 450}}>
        <ReactQuill theme="snow" value={content} onChange={handleChange} />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Content
      </Button>
    </Container>
  );
};

export default RichTextEditor;
