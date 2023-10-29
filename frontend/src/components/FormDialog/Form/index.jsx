import React from 'react';
import { Formik } from 'formik';

const Form = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await props.onSave(values);
          props.onClose();
        } catch (err) {
          props.setSubmitError('Something went wrong when saving data!');
        }
        setSubmitting(false);
      }}
    >
      {(formikProps) => props.children}
    </Formik>
  );
};

export default Form;
