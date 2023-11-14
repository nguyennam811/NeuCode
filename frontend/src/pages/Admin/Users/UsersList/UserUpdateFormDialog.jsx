import React from "react";
import * as Yup from "yup";
import FormDialog from "../../../../components/FormDialog";

function UserUpdateFormDialog(props) {
  const roleOptions = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
    { value: "admin", label: "Admin" },
  ];
  const userFormFields = [
    // {
    //   id: "id",
    //   title: "Mã tài khoản",
    //   type: "text",
    //   required: true,
    //   name: "id",
    //   placeholder: "Enter id...",
    //   validator: Yup.string().max(255).required("Mã tài khoản is required"),
    //   xs:6
    // },
    {
      id: "fullname",
      title: "Full Name",
      type: "text",
      required: true,
      name: "fullname",
      placeholder: "Enter full name...",
      validator: Yup.string().max(255).required("Full Name is required").min(4, "Must be more than 4 characters"),
      xs:6
    },
    {
      id: "email",
      title: "Email Address",
      type: "text",
      required: true,
      name: "email",
      placeholder: "Enter Email...",
      validator: Yup.string().max(255).required("Email is required").matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter the correct format abc@gmail.com"
      ),
      xs:6
    },
    // {
    //   id: "password",
    //   title: "Password",
    //   type: "text",
    //   required: true,
    //   name: "password",
    //   placeholder: "Enter Password...",
    //   validator: Yup.string().max(255).required("Password is required"),
    //   xs:6
    // },
    {
      id: 'role',
      title: 'Role',
      type: 'select',
      required: true,
      options: roleOptions,
      placeholder: 'Select difficulty...',
      validator: Yup.string()
        .max(255)
        .required('difficulty is required'),
      xs:6
    },
    
  ];
  

  return (
    <FormDialog
      title='Update User'
      initialValues={props.initialFn(props.row)}
      onClose={props.onClose}
      open={props.open}
      onSave={[props.onSave]}
      numOfColumns={3}
      multiFormFields={[userFormFields]}
    />
  );
}

export default UserUpdateFormDialog;
