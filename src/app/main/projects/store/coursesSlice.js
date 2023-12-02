import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getCourses = createAsyncThunk(
  "academyApp/courses/getCourses",
  async () => {
    const response = await axios.get(
      "http://DESKTOP-5DJOOF3:9001/api/gnr_projects"
    );
    const data = await response.data;
    return data;
  }
);

const coursesAdapter = createEntityAdapter({});

export const { selectAll: selectCourses, selectById: selectCourseById } =
  coursesAdapter.getSelectors((state) => state.academyApp.courses);

const coursesSlice = createSlice({
  name: "academyApp/courses",
  initialState: coursesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getCourses.fulfilled]: coursesAdapter.setAll,
  },
});

export default coursesSlice.reducer;
