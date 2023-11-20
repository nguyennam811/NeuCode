import React from "react";
import * as Yup from "yup";
import FormDialog from "../../../components/FormDialog";

function MoveToAssignment(props) {

  const initialValues = {
    problem_id: props.problemAssignment,
    course_id: "",
    deadline: "",
    is_public: false
  };
  const moveAssignmentFormFields = [
    {
      id: 'course_id',
      title: 'Course ID',
      type: 'autocomplete',
      required: true,
      options: props.filteredCourses.sort(
        (a, b) => -b.label.toUpperCase().localeCompare(a.label.toUpperCase())
      ),
      groupByFn: (option) => option.label[0].toUpperCase(),
      placeholder: 'Select course...',
      multipleValues: false,
      validator: Yup.string()
        .max(255)
        .required('Course is required'),
      xs:12
    },
    {
        id: "deadline",
        title: "Deadline",
        type: 'date',
        required: true,
        name: "deadline",
        placeholder: "Enter Deadline...",
        validator: Yup.string().max(255).required("Deadline is required"),
        xs: 10
      },
      {
        id: 'is_public',
        title: 'Public?',
        type: 'checkbox',
        xs: 2,
      },
  ];
  

  return (
    <FormDialog
      title= {`Move ${props.problemAssignment} to Assignment`}
      initialValues={initialValues}
      onClose={props.onClose}
      open={props.open}
      onSave={[props.onSave]}
      numOfColumns={3}
      multiFormFields={[moveAssignmentFormFields]}
    />
  );
}

export default MoveToAssignment;
