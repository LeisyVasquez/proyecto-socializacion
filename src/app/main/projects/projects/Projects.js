import _ from "@lodash";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { selectCategories } from "../store/categoriesSlice";
import { getCourses, selectCourses } from "../store/coursesSlice";
import CourseCard from "./ProjectCard";

function Courses(props) {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  // const theme = useTheme();
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
  
  useEffect(() => {
    function getFilteredArray() {
      if (
        searchText.length === 0 
      ) {
        return courses;
      }

      return _.filter(courses, (item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    if (courses) {
      setFilteredData(getFilteredArray());
    }
  }, [courses, hideCompleted, searchText, selectedCategory]);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }
  return (
    <FusePageSimple
      header={
        <Box
          className="relative overflow-hidden flex shrink-0 items-center justify-center px-16 py-32 md:p-64"
          sx={{
            backgroundColor: "primary.main",
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.primary.main),
          }}
        >
          <div className="flex flex-col items-center justify-center  mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0 } }}
            >
              <Typography
                color="inherit"
                className="text-center text-32 sm:text-48 font-extrabold tracking-tight mt-4"
              >
                Proyectos de la Corporación
              </Typography>
            </motion.div>
          </div>

          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              className="text-gray-700 opacity-25"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </g>
          </svg>
        </Box>
      }
      content={
        <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
          <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
              <TextField
                label="Buscar proyecto"
                placeholder="Ingrese nombre"
                className="flex w-full sm:w-256 mx-8"
                value={searchText}
                type="search"
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={handleSearchText}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <Button
              className=""
              component={Link}
              to="/project/courses/new"
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              Agregar
            </Button>
          </div>
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            };

            const item = {
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            };

            return (
              filteredData &&
              (filteredData.length > 0 ? (
                <motion.div
                  className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredData.map((course) => {
                    return (
                      <motion.div variants={item} key={course.id}>
                        <CourseCard course={course} />
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <Typography color="text.secondary" className="text-24 my-24">
                    No courses found!
                  </Typography>
                </div>
              ))
            );
          }, [filteredData])}
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default Courses;
