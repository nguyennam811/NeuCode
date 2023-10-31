import React from "react";
import * as Yup from "yup";
import FormDialog from "../../../components/FormDialog"

function CourseUpdateFormDialog(props) {

  const courseFormFields = [
    {
      id: "course_name",
      title: "Course Name",
      type: "text",
      required: true,
      name: "course_name",
      placeholder: "Enter course name...",
      validator: Yup.string().max(255).required("Course Name is required"),
    },
    {
      id: "course_time",
      title: "Course Time",
      type: "text",
      required: true,
      name: "course_time",
      placeholder: "Enter course time...",
      validator: Yup.string().max(255).required("Course Time is required"),
    },
    {
      id: "course_description",
      title: "Description",
      type: "text",
      required: false,
      name: "course_description",
      placeholder: "Enter Description...",
      // validator: Yup.string().max(255).required("Description is required"),
    }
  ];
  

  return (
    <FormDialog
      title='Update Course'
      initialValues={props.initialFn(props.row)}
      onClose={props.onClose}
      open={props.open}
      onSave={[props.onSave]}
      numOfColumns={3}
      multiFormFields={[courseFormFields]}
    />
  );
}

export default CourseUpdateFormDialog;
