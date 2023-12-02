import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ListItem from "@mui/material/ListItem";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { createLabel } from "../../../store/portsSlice";
import PortModel from "../model/PortModel";

const defaultValues = {
  number: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  number: yup
    .number()
    .required("Se debe de ingresar un número")
    .min(1, "Se debe de ingresar un número mayor o igual a 1")
    .max(65534, "Se debe de ingresar un número menor o igual a 65534"),
});

function NewLabelForm(props) {
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    const newLabel = PortModel(data);
    delete newLabel.id;
    dispatch(createLabel(newLabel));
    reset(defaultValues);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ListItem className="p-0 mb-16" dense>
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={clsx("flex flex-1")}
              error={!!errors.number}
              helperText={errors?.number?.message}
              placeholder="Crear un puerto - Ingresa el número"
              variant="outlined"
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon color="action">
                      heroicons-solid:database
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="w-32 h-32 p-0"
                      aria-label="Delete"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                      size="large"
                    >
                      <FuseSvgIcon color="action" size={20}>
                        heroicons-outline:check
                      </FuseSvgIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </ListItem>
    </form>
  );
}

export default NewLabelForm;
