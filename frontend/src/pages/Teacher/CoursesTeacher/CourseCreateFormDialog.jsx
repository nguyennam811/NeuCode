import React from "react";
import * as Yup from "yup";
// import { getCurrentUser } from "../../../utils/auth";
import { useLoaderData } from "react-router-dom";
import { getCurrentUser } from "../../../utils/auth";
import FormDialog from "../../../components/FormDialog";

function CourseCreateFormDialog(props) {
  // const current_user = getCurrentUser();
  const current_user = useLoaderData();

  const initialValues = {
    teacher_id: current_user.sub,
    course_name: "",
    course_time: "",
    course_description: "",
  };
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
    },
    // {
    //   id: 'description',
    //   title: 'Description',
    //   type: 'react-quill',
    //   required: false,
    //   name: 'description',
    //   xs:12
    // },
  ];
  

  return (
    <FormDialog
      title='Create new Course'
      initialValues={initialValues}
      onClose={props.onClose}
      open={props.open}
      onSave={[props.onSave]}
      numOfColumns={3}
      multiFormFields={[courseFormFields]}
    />
  );
}

export default CourseCreateFormDialog;
