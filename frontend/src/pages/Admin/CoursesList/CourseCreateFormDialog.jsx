import React from "react";
import * as Yup from "yup";
import FormDialog from "../../../components/FormDialog";

function CourseCreateFormDialog(props) {

  const initialValues = {
    teacher_id: "",
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
    {
      id: 'teacher_id',
      title: 'Teacher',
      type: 'autocomplete',
      required: true,
      options: props.filteredUsers.sort(
        (a, b) => -b.label.toUpperCase().localeCompare(a.label.toUpperCase())
      ),
      groupByFn: (option) => option.label[0].toUpperCase(),
      placeholder: 'Select teacher...',
      multipleValues: false,
      validator: Yup.string()
        .max(255)
        .required('Teacher is required'),
      xs:12
    },
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
