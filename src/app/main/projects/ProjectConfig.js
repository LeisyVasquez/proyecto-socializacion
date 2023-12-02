import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Project from "./Project";

const Course = lazy(() => import("./project/Project"));
const Courses = lazy(() => import("./projects/Projects"));
const CreateCourse = lazy(() => import("./project/CreateProject"));
const EditCourse = lazy(() => import("./project/EditProject"));
const SendCredentials = lazy(() => import("./project/SendCredentials"));

const AcademyAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "project",
      element: <Project />,
      children: [
        {
          path: "",
          element: <Navigate to="/project/courses" />,
        },
        {
          path: "courses/new",
          element: <CreateCourse />,
        },
        {
          path: "courses/edit/:courseId",
          element: <EditCourse />,
        },
        {
          path: "courses/sendCredentials",
          element: <SendCredentials />,
        },
        {
          path: "courses/:courseId",
          element: <Course />,
        },
        {
          path: "courses",
          element: <Courses />,
        },
      ],
    },
  ],
};

export default AcademyAppConfig;
