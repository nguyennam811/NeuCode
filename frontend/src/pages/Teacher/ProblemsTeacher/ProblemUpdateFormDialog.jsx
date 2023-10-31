import React from "react";
import * as Yup from "yup";
import FormDialog from "../../../components/FormDialog"

function ProblemUpdateFormDialog(props) {
  const difficultyOptions = [
    { value: "Dễ", label: "Dễ" },
    { value: "Trung bình", label: "Trung bình" },
    { value: "Khó", label: "Khó" },
  ];

  const problemFormFields = [
    {
      id: "title",
      title: "Title",
      type: "text",
      required: true,
      name: "title",
      placeholder: "Enter title...",
      validator: Yup.string().max(255).required("Title is required"),
      xs: 6
    },
    {
      id: "problem_type",
      title: "Problem Type",
      type: "text",
      required: true,
      name: "problem_type",
      placeholder: "Enter problem type...",
      validator: Yup.string().max(255).required("Problem type is required"),
      xs: 6
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
      title='Update Problem'
      initialValues={props.initialFn(props.row)}
      onClose={props.onClose}
      open={props.open}
      onSave={[props.onSave]}
      numOfColumns={3}
      multiFormFields={[problemFormFields]}
    />
  );
}

export default ProblemUpdateFormDialog;
