import React from "react";
import { Form, FormikProps, useFormikContext } from "formik";
import AutocompleteField from "../FieldTypes/AutocompleteField";
import SelectField from "../FieldTypes/SelectField";
import { FormHelperText, Grid, Stack } from "@mui/material";
import CheckboxField from "../FieldTypes/CheckboxField";
import InputField from "../FieldTypes/InputField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const FormContent = ({ formFields, onSave, numOfColumns, submitError }) => {
  const formikProps = useFormikContext();
  const toolbarOptions = [
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ["link", "image", "video"],

    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };
  return (
    <Form noValidate id="data-form" onSubmit={formikProps.handleSubmit}>
      <Grid container spacing={3}>
        {submitError && (
          <Grid item xs={12}>
            <FormHelperText error>{submitError}</FormHelperText>
          </Grid>
        )}
        {formFields.map((field) => {
          let fieldContent;

          if (field.type === "select") {
            fieldContent = (
              <SelectField
                id={field.id}
                title={field.title}
                name={field.name}
                required={field.required}
                value={formikProps.values[field.id]}
                options={field.options}
                setFieldTouched={formikProps.setFieldTouched}
                setFieldValue={formikProps.setFieldValue}
                error={Boolean(
                  formikProps.touched[field.id] && formikProps.errors[field.id]
                )}
              />
            );
          } else if (field.type === "autocomplete") {
            fieldContent = (
              <AutocompleteField
                id={field.id}
                title={field.title}
                placeholder={field.placeholder}
                required={field.required}
                options={field.options}
                values={formikProps.values}
                multipleValues={field.multipleValues}
                groupByFn={field.groupByFn}
                filterOptionsFn={field.filterOptionsFn}
                onBlur={formikProps.handleBlur}
                setFieldValue={formikProps.setFieldValue}
                error={Boolean(
                  formikProps.touched[field.id] && formikProps.errors[field.id]
                )}
              />
            );
          } else if (field.type === "checkbox") {
            fieldContent = (
              <CheckboxField
                id={field.id}
                title={field.title}
                value={formikProps.values[field.id]}
                setFieldValue={formikProps.setFieldValue}
              />
            );
          } else if (field.type === "react-quill") {
            fieldContent = (
              <ReactQuill
                theme="snow"
                value={formikProps.values[field.id]}
                onChange={(value) => formikProps.setFieldValue(field.id, value)}
                modules={modules}
                className="react_quill"
              />
            );
          } else {
            fieldContent = (
              <InputField
                id={field.id}
                title={field.title}
                value={formikProps.values[field.id]}
                type={field.type}
                multiline={field.multiline}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                onBlur={formikProps.handleBlur}
                onChange={formikProps.handleChange}
                error={Boolean(
                  formikProps.touched[field.id] && formikProps.errors[field.id]
                )}
                hidden={field.hidden ?? false}
                readOnly={!onSave}
              />
            );
          }

          return (
            <Grid item key={field.id} xs={field.xs ?? 12 / numOfColumns}>
              <Stack spacing={1}>
                {fieldContent}
                {formikProps.touched[field.id] &&
                  formikProps.errors[field.id] && (
                    <FormHelperText error id="test-heper-form">
                      {formikProps.errors[field.id]?.toString()}
                    </FormHelperText>
                  )}
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Form>
  );
};

export default FormContent;
