import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { SelectOption } from "./FieldTypes/SelectField";
import { AutocompleteOption } from "./FieldTypes/AutocompleteField";
import FormContent from "./Form/FormContent";
import HeaderDialog from "./Dialog/HeaderDialog";
import ActionDialog from "./Dialog/ActionDialog";
import FormFrame from "./Form";

const FormDialog = ({
  TabSide = ({ children, side, onChange }) => <>{children}</>,
  ...props
}) => {
  const theme = useTheme();
  const [submitError, setSubmitError] = useState(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [side, setSide] = useState("0");

  let validationSchemas = props.multiFormFields.map((formFields) => {
    return Yup.object().shape(
      formFields.reduce(
        (acc, formField) => ({ ...acc, [formField.id]: formField.validator }),
        {}
      )
    );
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth={props.numOfColumns > 2 ? "md" : "sm"}
      open={props.open}
      onClose={props.onClose}
    >
      <HeaderDialog title={props.title} />
      <FormFrame
        initialValues={props.initialValues}
        setSubmitError={setSubmitError}
        validationSchema={validationSchemas[parseInt(side)]}
        onClose={props.onClose}
        onSave={props.onSave[parseInt(side)]}
      >
        <>
          <DialogContent key="dialog-content">
            <TabSide side={side} onChange={setSide}>
              {props.multiFormFields.map((formFields) => (
                <FormContent
                  key={"form-content"}
                  submitError={submitError}
                  formFields={formFields}
                  numOfColumns={props.numOfColumns}
                  onSave={props.onSave[parseInt(side)]}
                />
              ))}
            </TabSide>
          </DialogContent>
          <ActionDialog onClose={props.onClose} />
        </>
      </FormFrame>
    </Dialog>
  );
};

export default FormDialog;
