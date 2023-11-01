import React from "react";
import * as Yup from "yup";
import { useLoaderData } from "react-router-dom";
import FormDialog from "../../../../components/FormDialog";

function AssignmentCreateFormDialog(props) {
  // const current_user = getCurrentUser();
  const current_user = useLoaderData();
  const difficultyOptions = [
    { value: "Dễ", label: "Dễ" },
    { value: "Trung bình", label: "Trung bình" },
    { value: "Khó", label: "Khó" },
  ];
  const initialValues = {
    id: "",
    user_id: current_user.sub,
    title: "",
    difficulty: "Dễ",
    problem_type: "",
    max_memory_limit: 0,
    max_execution_time: 0,
    description: "",
  };
  const assignmentFormFields = [
    {
      id: "id",
      title: "ID",
      type: "text",
      required: true,
      name: "id",
      placeholder: "Enter assignment id...",
      validator: Yup.string().max(255).required("ID is required"),
    },
    {
      id: "title",
      title: "Title",
      type: "text",
      required: true,
      name: "title",
      placeholder: "Enter title...",
      validator: Yup.string().max(255).required("Title is required"),
    },
    {
      id: "problem_type",
      title: "Problem Type",
      type: "text",
      required: true,
      name: "problem_type",
      placeholder: "Enter problem type...",
      validator: Yup.string().max(255).required("Problem type is required"),
    },
    {
      id: 'difficulty',
      title: 'Difficulty',
      type: 'select',
      required: true,
      options: difficultyOptions,
      placeholder: 'Select difficulty...',
      validator: Yup.string()
        .max(255)
        .required('difficulty is required'),
    },
    {
      id: 'max_execution_time',
      title: 'Max Execution Time (s)',
      type: 'number',
      required: true,
      name: 'max_execution_time',
      placeholder: 'Enter Max Execution Time..',
      validator: Yup.number()
        .min(0.5)
        .required('Max Execution Time id greater than 0.'),
    },
    {
      id: 'max_memory_limit',
      title: 'Max Memory Limit (MB)',
      type: 'number',
      required: true,
      name: 'max_memory_limit',
      placeholder: 'Enter Max Memory Limit..',
      validator: Yup.number()
        .min(1)
        .required('Max Memory Limit id greater than 0.'),
    },
    {
      id: "deadline",
      title: "Deadline",
      type: 'date',
      required: true,
      name: "deadline",
      placeholder: "Enter Deadline...",
      validator: Yup.string().max(255).required("Deadline is required"),
      xs: 8
    },
    {
      id: 'is_public',
      title: 'Public?',
      type: 'checkbox',
      xs: 2,
    },
    {
      id: 'description',
      title: 'Description',
      type: 'react-quill',
      required: false,
      name: 'description',
      xs:12
    },
  ];
  

  return (
    <FormDialog
      title='Create new Assignment'
      initialValues={initialValues}
      onClose={props.onClose}
      open={props.open}
      onSave={[props.onSave]}
      numOfColumns={3}
      multiFormFields={[assignmentFormFields]}
    />
  );
}

export default AssignmentCreateFormDialog;
