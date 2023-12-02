import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import MenuItem from "@mui/material/MenuItem";
import {
  createCourse,
  updateCourse,
  sendEmailWithCredentials,
} from "../store/courseSlice";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import { useDispatch } from "react-redux";

const defaultValues = {
  email: "",
};
const schema = yup.object().shape({
  email: yup
    .string()
    .max(320, "Se debe de ingresar como máximo 320 caracteres")
    .required("Se debe de ingresar un email")
    .email("Se debe de ingresar un correo válido"),
});

function SendCredentials() {
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  function onSubmit(data) {
    console.log(data);
    dispatch(sendEmailWithCredentials(data));
  }

  if (_.isEmpty(form)) {
    return null;
  }

  // const [showPassword, setShowPassword] = useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  return (
    <div className="flex flex-col items-center p-24 sm:p-40 container">
      <div className="flex flex-col w-full max-w-4xl">
        <div className="sm:mt-32">
          <Button
            component={Link}
            to="/project/courses"
            color="secondary"
            startIcon={
              <FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>
            }
          >
            Volver a los proyectos
          </Button>
        </div>
        <div className="mt-8 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight">
          Enviar credenciales .env
        </div>

        <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
            <div className="space-y-32">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Correo"
                    placeholder="Correo"
                    id="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </div>
          </form>
          <div className="flex items-center justify-end mt-32">
            <Button
              className="mx-8"
              variant="contained"
              color="secondary"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleSubmit(onSubmit)}
            >
              Enviar
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}
export default withReducer("academyApp", reducer)(SendCredentials);
