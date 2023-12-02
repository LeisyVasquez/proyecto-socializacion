import { combineReducers } from "@reduxjs/toolkit";
import course from "./courseSlice";
import courses from "./coursesSlice";
import categories from "./categoriesSlice";
import hosts from "./hostsSlice";
import licenses from "./licensesSlice";
import ports from "./portsSlice";

const reducer = combineReducers({
  categories,
  courses,
  course,
  hosts,
  licenses,
  ports,
});

export default reducer;
