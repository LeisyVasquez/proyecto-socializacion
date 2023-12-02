import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import Chip from "@mui/material/Chip";
import { darken, lighten } from "@mui/material/styles";

import CourseMenu from "./ProjectMenu";

function CourseInfo({ course, className }) {
  return (
    <div className={clsx("w-full", className)}>
      <div className="flex items-center justify-between mb-16">
        <Chip
          className="font-semibold text-12"
          label={course.versionPackageJson ? "v" + course.versionPackageJson : "Sin version"}
          sx={{
            color: (theme) =>
              theme.palette.mode === "light"
                ? darken(
                    `${
                      course.versionPackageJson
                        ? theme.palette.secondary.main
                        : "#9da2a3"
                    }`,
                    0.4
                  )
                : lighten(
                    `${
                      course.versionPackageJson
                        ? theme.palette.secondary.main
                        : "#9da2a3"
                    }`,
                    0.8
                  ),
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? lighten(
                    `${
                      course.versionPackageJson
                        ? theme.palette.secondary.main
                        : "#9da2a3"
                    }`,
                    0.8
                  )
                : darken(
                    `${
                      course.versionPackageJson
                        ? theme.palette.secondary.main
                        : "#9da2a3"
                    }`,
                    0.1
                  ),
          }}
          size="small"
        />
        <CourseMenu courseId={course.id} />
      </div>
      <Typography className="text-16 font-medium">{course.name}</Typography>
      <Divider className="w-48 my-12 border-1" light />

      <Typography
        className="flex items-center space-x-6 text-13"
        color="text.secondary"
      >
        <FuseSvgIcon color="disabled" size={20}>
          material-solid:calendar_today
        </FuseSvgIcon>
        <span className="whitespace-nowrap leading-none">{`F. registro: ${course.createdAt}`}</span>
      </Typography>
      <Typography
        className="flex items-center space-x-6 text-13 mt-8"
        color="text.secondary"
      >
        <FuseSvgIcon color="disabled" size={20}>
          material-solid:edit_calendar
        </FuseSvgIcon>
        <span className="whitespace-nowrap leading-none">
          {`F. actualización: ${course?.updatedAt || "No se ha actualizado"}`}
        </span>
      </Typography>
      <Typography
        className="flex items-center space-x-6 text-13 mt-8"
        color="text.secondary"
      >
        <FuseSvgIcon color="disabled" size={20}>
          feather:github
        </FuseSvgIcon>
        <span className="whitespace-nowrap leading-none">
          Repositorio: {course.nameRepository}
        </span>
      </Typography>
      <Typography
        className="flex items-center space-x-6 text-13 mt-8"
        color="text.secondary"
      >
        <FuseSvgIcon color="disabled" size={20}>
          heroicons-outline:database
        </FuseSvgIcon>
        <span className="whitespace-nowrap leading-none">
          Base de datos: {course.nameDatabase}
        </span>
      </Typography>
    </div>
  );
}

export default CourseInfo;
