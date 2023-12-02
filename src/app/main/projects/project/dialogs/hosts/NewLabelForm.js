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
import { createLabel } from "../../../store/hostsSlice";
import HostModel from "../model/HostModel";

const defaultValues = {
  url: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  url: yup
    .string()
    .matches(
      /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}(\/.*)?$|^(([0-9]{1,3}\.){3}[0-9]{1,3})$|^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:([0-9A-Fa-f]{1,4})?))$/,
      "Se debe de ingresar una URL valida (también puede ser una dirección ipv4 o ipv6)"
    )
    .required("Se debe de ingresar una URL")
    .max(1000, "Se debe de ingresar como máximo 1000 caracteres"),
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
    const newLabel = HostModel(data);
    dispatch(createLabel(newLabel));
    reset(defaultValues);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ListItem className="p-0 mb-16" dense>
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={clsx("flex flex-1")}
              error={!!errors.url}
              helperText={errors?.url?.message}
              placeholder="Crear un host de base de datos - ingrese URL"
              variant="outlined"
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon color="action">
                      heroicons-solid:cloud
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
