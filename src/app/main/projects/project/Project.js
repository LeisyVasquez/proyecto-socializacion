import Paper from "@mui/material/Paper";
import withReducer from "app/store/withReducer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Typography from "@mui/material/Typography";
import reducer from "../store";
import { getCourse, selectCourse, updateCourse } from "../store/courseSlice";

function Course(props) {
  const dispatch = useDispatch();
  const course = useSelector(selectCourse);
  const routeParams = useParams();
  const { courseId } = routeParams;

  useDeepCompareEffect(() => {
    /**
     * Get the Course Data
     */
    dispatch(getCourse(courseId));
  }, [dispatch, routeParams]);

  if (!course) {
    return null;
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
        <div className="mt-8 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          Información del proyecto
        </div>
        <div className="md:flex">
          <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32 ">
            <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
              <div className="px-0 sm:px-24">
                <div className="mb-24">
                  <Typography className="text-2xl font-bold tracking-tight mb-24">
                    Información del repositorio
                  </Typography>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Nombre
                    </Typography>
                    <Typography>{course.nameRepository}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Rama en la que se suben cambios
                    </Typography>
                    <Typography>{course.nameBranchRepository}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      URL
                    </Typography>
                    <Typography>{course.urlRepository}</Typography>
                  </div>
                </div>
              </div>
            </Paper>

            <Paper className="mt-32 sm:mt-32 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
              <div className="px-0 sm:px-24">
                <div className="mb-24">
                  <Typography className="text-2xl font-bold tracking-tight mb-24">
                    Información de la Base de Datos
                  </Typography>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Nombre
                    </Typography>
                    <Typography>{course.nameDatabase}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Puerto
                    </Typography>
                    <Typography>{course.dbPortId}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Host
                    </Typography>
                    <Typography>{course.dbHostId}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Nombre rol
                    </Typography>
                    <Typography>{course.nameRoleDB}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Contraseña del rol
                    </Typography>
                    <Typography>{course.passwordRoleDB}</Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
          <div className="flex flex-col md:w-400">
            <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
              <div className="px-0 sm:px-24">
                <div className="mb-24">
                  <Typography className="text-2xl font-bold tracking-tight mb-24">
                    Información General
                  </Typography>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Nombre
                    </Typography>
                    <Typography>{course.name}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Descripción
                    </Typography>
                    <Typography>
                      {course?.description || "Sin descripción"}
                    </Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Licencia
                    </Typography>
                    <Typography>
                      {course?.licenseId || "Sin licencia"}
                    </Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Versión Package Json
                    </Typography>
                    <Typography>
                      {course.versionPackageJson
                        ? "v" + course.versionPackageJson
                        : "Sin versión"}
                    </Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Nombre de la documentación
                    </Typography>
                    <Typography>{course.nameDocumentation}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Fecha de creación
                    </Typography>
                    <Typography>{course.createdAt}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Fecha de actualización
                    </Typography>
                    <Typography>
                      {course?.updatedAt || "No se ha actualizado"}
                    </Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withReducer("academyApp", reducer)(Course);
