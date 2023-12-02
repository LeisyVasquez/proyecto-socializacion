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
import { createCourse, updateCourse } from "../store/courseSlice";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { openLabelsDialog } from "../store/hostsSlice";
import HostsDialog from "./dialogs/hosts/LabelsDialog";
import LicensesDialog from "./dialogs/licenses/LabelsDialog";
import { getLabels } from "../store/hostsSlice";
import { getLicenses, openLicensesDialog } from "../store/licensesSlice";

import PortsDialog from "./dialogs/ports/LabelsDialog";
import { getPorts, openPortsDialog } from "../store/portsSlice";

// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

const defaultValues = {
  name: "",
  description: "",
  licenseId: "",
  nameRepository: "",
  nameBranchRepository: "",
  urlRepository: "",
  nameDatabase: "",
  dbPortId: "",
  dbHostId: "",
  nameRoleDb: "",
  passwordRoleDb: "",
};
const schema = yup.object().shape({
  name: yup
    .string()
    .max(200, "Se debe de ingresar como máximo 200 caracteres")
    .required("Se debe de ingresar un nombre"),
  description: yup
    .string()
    .max(100, "Se debe de ingresar como máximo 100 caracteres"),
  licenseId: yup.number(),
  nameRepository: yup
    .string()
    .max(100, "Se debe de ingresar como máximo 100 caracteres")
    .required("Se debe de ingresar un nombre de repositorio")
    .matches(
      /^[a-zA-Z_][a-zA-Z0-9_]*$/,
      "Se debe de ingresar un nombre sin espacios ni caracteres especiales (solo guion bajo) y no debe de empezar por número"
    ),
  nameBranchRepository: yup
    .string()
    .max(250, "Se debe de ingresar como máximo 250 caracteres")
    .required("Se debe de ingresar el nombre de la rama del repositorio")
    .matches(
      /^\S+$/,
      "Se debe de ingresar un nombre de rama de repositorio sin espacios"
    ),
  urlRepository: yup
    .string()
    .max(1000, "Se debe de ingresar como máximo 1000 caracteres")
    .required("Se debe de ingresar la URL del repositorio")
    .matches(
      /^https?:\/\/(?:www\.)?github\.com\/.*\.git$/,
      "Se debe de ingresar una URL de un repositorio de GitHub válido (Debe de terminar .git)"
    ),
  nameDatabase: yup
    .string()
    .max(63, "Se debe de ingresar como máximo 63 caracteres")
    .required("Se debe de ingresar un nombre para la base de datos")
    .matches(
      /^[a-zA-Z]+(_?[a-zA-Z]+)*$/,
      "Se debe de ingresar un nombre de base sin dígitos ni caracteres especiales (solo guiones que nos sean ni al inicio, ni en el final)"
    ),
  dbPortId: yup
    .number()
    .required("Se debe de seleccionar un puerto para la base de datos"),
  dbHostId: yup
    .number()
    .required("Se debe de seleccionar un host para la base de datos"),
  nameRoleDb: yup
    .string()
    .max(63, "Se debe de ingresar como máximo 63 caracteres")
    .required("Se debe de ingresar un nombre para el rol de base de datos")
    .matches(
      /^[a-zA-Z]+(_?[a-zA-Z]+)*$/,
      "Se debe de ingresar un nombre de rol de base sin dígitos ni caracteres especiales (solo guiones que nos sean ni al inicio, ni en el final)"
    ),
  passwordRoleDb: yup
    .string()
    .max(4000, "Se debe de ingresar como máximo 1000 caracteres")
    .required("Se debe de ingresar un contraseña para el rol de base de datos"),
});

const licenses = [
  {
    value: 1,
    label: "MIT",
  },
];

const ports = [
  {
    value: 1,
    label: "5432",
  },
];

const hosts = [
  {
    value: 1,
    label: "https://www.clever-cloud.com",
  },
];

function HelpCenterSupport() {
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  function onSubmit(data) {
    if (data.description == "") delete data.description;
    if (data.licenseId == "") delete data.licenseId;
    dispatch(createCourse(data));
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
        <HostsDialog />
        <LicensesDialog />
        <PortsDialog />
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
          Crear proyecto
        </div>

        <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
            {/* <Typography color="text.secondary">
                Una vez cree su proyecto se generará el código necesario y se
                subirá al repositorio de GitHub proporcionado
              </Typography> */}
            <div className="space-y-32">
              <Typography className="text-2xl font-bold tracking-tight">
                General
              </Typography>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Nombre"
                    placeholder="Nombre"
                    id="name"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    variant="outlined"
                    multiline
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Descripción"
                    placeholder="Descripción"
                    id="description"
                    error={!!errors.description}
                    helperText={errors?.description?.message}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <div className="flex items-center justify-start mt-32">
                <Controller
                  control={control}
                  name="licenseId"
                  render={({ field }) => (
                    <TextField
                      className="w-full"
                      {...field}
                      select
                      label="Licencia"
                      placeholder="Licencia"
                      id="licenseId"
                      error={!!errors.licenseId}
                      helperText={errors?.licenseId?.message}
                      variant="outlined"
                      fullWidth
                    >
                      {licenses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <IconButton
                  aria-haspopup="true"
                  onClick={(ev) => {
                    dispatch(getLicenses());
                    dispatch(openLicensesDialog());
                  }}
                  size="large"
                >
                  <FuseSvgIcon>material-solid:settings</FuseSvgIcon>
                </IconButton>
              </div>
              <Typography className="text-2xl font-bold tracking-tight">
                Repositorio
              </Typography>
              <Controller
                control={control}
                name="nameRepository"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Nombre"
                    placeholder="Nombre"
                    id="nameRepository"
                    error={!!errors.nameRepository}
                    helperText={errors?.nameRepository?.message}
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="nameBranchRepository"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Nombre de rama"
                    placeholder="Nombre de rama"
                    id="nameBranchRepository"
                    error={!!errors.nameBranchRepository}
                    helperText={errors?.nameBranchRepository?.message}
                    variant="outlined"
                    multiline
                    fullWidth
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="urlRepository"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="URL"
                    placeholder="URL"
                    id="urlRepository"
                    error={!!errors.urlRepository}
                    helperText={errors?.urlRepository?.message}
                    variant="outlined"
                    multiline
                    fullWidth
                    required
                  />
                )}
              />
              <Typography className="text-2xl font-bold tracking-tight">
                Base de Datos
              </Typography>
              <Controller
                control={control}
                name="nameDatabase"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Nombre"
                    placeholder="Nombre"
                    id="nameDatabase"
                    error={!!errors.nameDatabase}
                    helperText={errors?.nameDatabase?.message}
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
              <div className="flex items-center justify-start mt-32">
                <Controller
                  control={control}
                  name="dbPortId"
                  render={({ field }) => (
                    <TextField
                      className="w-full"
                      {...field}
                      select
                      label="Puerto"
                      placeholder="Puerto"
                      id="dbPortId"
                      error={!!errors.dbPortId}
                      helperText={errors?.dbPortId?.message}
                      variant="outlined"
                      fullWidth
                      required
                    >
                      {ports.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <IconButton
                  aria-haspopup="true"
                  onClick={(ev) => {
                    dispatch(getPorts());
                    dispatch(openPortsDialog());
                  }}
                  size="large"
                >
                  <FuseSvgIcon>material-solid:settings</FuseSvgIcon>
                </IconButton>
              </div>
              <div className="flex items-center justify-start mt-32">
                <Controller
                  control={control}
                  name="dbHostId"
                  render={({ field }) => (
                    <TextField
                      className="w-full"
                      {...field}
                      select
                      label="Host"
                      placeholder="Host"
                      id="dbHostId"
                      error={!!errors.dbHostId}
                      helperText={errors?.dbHostId?.message}
                      variant="outlined"
                      fullWidth
                      required
                    >
                      {hosts.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <IconButton
                  aria-haspopup="true"
                  onClick={(ev) => {
                    dispatch(getLabels());
                    dispatch(openLabelsDialog());
                  }}
                  size="large"
                >
                  <FuseSvgIcon>material-solid:settings</FuseSvgIcon>
                </IconButton>
              </div>
              <Controller
                control={control}
                name="nameRoleDb"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Nombre rol"
                    placeholder="Nombre rol"
                    id="nameRoleDb"
                    error={!!errors.nameRoleDb}
                    helperText={errors?.nameRoleDb?.message}
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="passwordRoleDb"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Contraseña rol"
                    placeholder="Contraseña rol"
                    id="passwordRoleDb"
                    error={!!errors.passwordRoleDb}
                    helperText={errors?.passwordRoleDb?.message}
                    variant="outlined"
                    multiline
                    fullWidth
                    required
                  />
                  // <InputLabel htmlFor="outlined-adornment-password">
                  //   Password
                  // </InputLabel>
                  // <OutlinedInput
                  //   id="outlined-adornment-password"
                  //   type={showPassword ? "text" : "password"}
                  //   label="Password"
                  //   endAdornment={
                  //     <InputAdornment position="end">
                  //       <IconButton
                  //         aria-label="toggle password visibility"
                  //         onClick={handleClickShowPassword}
                  //         onMouseDown={handleMouseDownPassword}
                  //         edge="end"
                  //       >
                  //         {showPassword ? <VisibilityOff /> : <Visibility />}
                  //       </IconButton>
                  //     </InputAdornment>
                  //   }
                  // />
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
              Guardar
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}
export default withReducer("academyApp", reducer)(HelpCenterSupport);
