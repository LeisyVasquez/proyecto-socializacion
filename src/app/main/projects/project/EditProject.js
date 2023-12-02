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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourse, selectCourse } from "../store/courseSlice";
import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "@fuse/hooks";
import FuseLoading from "@fuse/core/FuseLoading";

// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

const schema = yup.object().shape({
  name: yup
    .string()
    .max(200, "Se debe de ingresar como máximo 200 caracteres")
    .required("Se debe de ingresar un nombre"),
  description: yup
    .string()
    .max(100, "Se debe de ingresar como máximo 100 caracteres"),
  licenseId: yup.number(),
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
    value: 0,
    label: "Ninguna",
  },
  {
    value: 1,
    label: "MIT",
  }
];

const ports = [
  {
    value: 1,
    label: "MIT",
  },
  {
    value: 2,
    label: "Apache",
  },
  {
    value: 3,
    label: "Licencia 3",
  },
  {
    value: 4,
    label: "Licencia 4",
  },
];

const hosts = [
  {
    value: 1,
    label: "MIT",
  },
  {
    value: 2,
    label: "Apache",
  },
  {
    value: 3,
    label: "Licencia 3",
  },
  {
    value: 4,
    label: "Licencia 4",
  },
];
function EditProject() {
  const dispatch = useDispatch();
  const course = useSelector(selectCourse);

  const routeParams = useParams();
  const [noProduct, setNoProduct] = useState(false);

  const { control, handleSubmit, watch, formState, reset } = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { courseId } = routeParams;

      /**
       * Get Product data
       */
      dispatch(getCourse(courseId)).then((action) => {
        /**
         * If the requested product is not exist show message
         */
        if (!action.payload) {
          setNoProduct(true);
        }
      });
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!course) {
      return;
    }
    /**
     * Reset the form on course state changes
     */
    reset(course);
  }, [course, reset]);

  function onSubmit(data) {
    console.log("data",data)
    const dataToSent = {
      ...data,
      description: data.description == "" ? null : data.description,
      licenseId: data.licenseId == 0 ? null : data.licenseId,
    };
    delete dataToSent.createdAt;
    delete dataToSent.updatedAt;
    delete dataToSent.nameRepository;
    delete dataToSent.nameBranchRepository;
    delete dataToSent.urlRepository;
    delete dataToSent.versionPackageJson;
    delete dataToSent.nameDocumentation;





    console.log("Hello munod", dataToSent);
    dispatch(updateCourse(dataToSent));
  }

  // const [showPassword, setShowPassword] = useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  if (_.isEmpty(form) || (course && routeParams.courseId != course.id)) {
    return <FuseLoading />;
  }

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
          Editar proyecto
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
              disabled={false}
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
export default withReducer("academyApp", reducer)(EditProject);
