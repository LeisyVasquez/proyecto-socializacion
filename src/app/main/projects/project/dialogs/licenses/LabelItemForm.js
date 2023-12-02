import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ListItem from "@mui/material/ListItem";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useEffect } from "react";
import { useDebounce } from "@fuse/hooks";
import _ from "@lodash";
import { removeLabel, updateLabel } from "../../../store/licensesSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  content: yup.string().required("You must enter a label content"),
});

function NewLabelForm(props) {
  const { license } = props;
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
    defaultValues: license,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  useEffect(() => {
    reset(license);
  }, [license, reset]);

  const handleOnChange = useDebounce((_label, _form) => {
    if (!_label) {
      return;
    }
    if (form && !_.isEqual(_form, _label)) {
      dispatch(updateLabel(_form));
    }
  }, 300);

  useEffect(() => {
    handleOnChange(license, form);
  }, [handleOnChange, license, form]);

  function handleOnRemove() {
    dispatch(removeLabel(license.id));
  }

  return (
    <>
      <ListItem className="p-0 mb-16" dense>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={clsx("flex flex-1")}
              error={!!errors.content}
              helperText={errors?.content?.message}
              placeholder="Create new label"
              variant="outlined"
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon color="action">
                      heroicons-solid:credit-card
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleOnRemove}
                      className="w-32 h-32 p-0"
                      aria-label="Delete"
                      size="large"
                    >
                      <FuseSvgIcon color="action" size={20}>
                        heroicons-outline:trash
                      </FuseSvgIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </ListItem>
    </>
  );
}

export default NewLabelForm;
