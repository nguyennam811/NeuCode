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
    // {
    //   id: "course_name",
    //   title: "Course Name",
    //   type: "text",
    //   required: true,
    //   name: "course_name",
    //   placeholder: "Enter course name...",
    //   validator: Yup.string().max(255).required("Course Name is required"),
    // },
    // {
    //   id: "is_public",
    //   title: "Course Time",
    //   type: "text",
    //   required: true,
    //   name: "course_time",
    //   placeholder: "Enter course time...",
    //   validator: Yup.string().max(255).required("Course Time is required"),
    // },
    // {
    //   id: "deadline",
    //   title: "Description",
    //   type: "text",
    //   required: false,
    //   name: "course_description",
    //   placeholder: "Enter Description...",
    //   // validator: Yup.string().max(255).required("Description is required"),
    // },
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
      title='Move to Assignment'
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
