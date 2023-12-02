import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getCourse = createAsyncThunk(
  "academyApp/course/getCourse",
  async (courseId) => {
    const response = await axios.get(
      `http://DESKTOP-5DJOOF3:9001/api/gnr_projects/${courseId}`
    );

    const data = await response.data;

    return data;
  }
);

export const updateCourse = createAsyncThunk(
  "academyApp/course/updateCourse",
  async (_data, { dispatch }) => {
    try {
      const response = await axios.put(
        `http://DESKTOP-5DJOOF3:9001/api/gnr_projects`,
        _data
      );

      const data = await response.data;

      dispatch(showMessage({ message: "Proyecto actualizado correctamente" }));

      return data;
    } catch (error) {
      console.log(error.response);
      switch (error.response.status) {
        case 484:
          dispatch(
            showMessage({ message: "Error: el nombre del proyecto ya existe" })
          );
          break;
        case 485:
          dispatch(
            showMessage({
              message: "Error: el nombre del rol de base de datos ya existe",
            })
          );
          break;
        case 486:
          dispatch(
            showMessage({
              message: "Error: el nombre de la base de datos ya existe",
            })
          );
          break;
        default:
          dispatch(
            showMessage({
              message: "Ocurrió un error inesperado",
            })
          );
          break;
      }
      return rejectWithValue({ error: error.message });
    }
  }
);

export const createCourse = createAsyncThunk(
  "academyApp/course/createCourse",
  async (_data, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://DESKTOP-5DJOOF3:9001/api/gnr_projects`,
        _data
      );

      const data = await response.data;

      dispatch(showMessage({ message: "Proyecto creado correctamente" }));

      return data;
    } catch (error) {
      console.log(error.response);
      switch (error.response.status) {
        case 484:
          dispatch(
            showMessage({ message: "Error: el nombre del proyecto ya existe" })
          );
          break;
        case 485:
          dispatch(
            showMessage({
              message: "Error: el nombre del rol de base de datos ya existe",
            })
          );
          break;
        case 486:
          dispatch(
            showMessage({
              message: "Error: el nombre de la base de datos ya existe",
            })
          );
          break;
        case 487:
          dispatch(
            showMessage({
              message: "Error: el nombre del repositorio ya existe",
            })
          );
          break;
        case 488:
          dispatch(
            showMessage({
              message: "Error: la URL del repositorio ya existe",
            })
          );
          break;
        case 489:
          dispatch(
            showMessage({
              message:
                "Error: el nombre del repositorio no es permitido porque es igual al nombre de una dependencia usada en la automatización del código",
            })
          );
          break;
        default:
          dispatch(
            showMessage({
              message: "Ocurrió un error inesperado",
            })
          );
          break;
      }
      return rejectWithValue({ error: error.message });
    }
  }
);

export const sendEmailWithCredentials = createAsyncThunk(
  "academyApp/course/sendCredentials",
  async (_data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://DESKTOP-5DJOOF3:9001/api/gnr_projects/sent_email_with_credentials`,
        _data
      );

      const data = await response.data;

      dispatch(showMessage({ message: "Credenciales enviadas correctamente" }));

      return data;
    } catch (error) {
      dispatch(showMessage({ message: "Credenciales enviadas correctamente" }));

      return rejectWithValue({ error: error.message });
    }
  }
);

const courseSlice = createSlice({
  name: "academyApp/course",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getCourse.fulfilled]: (state, action) => action.payload,
    [updateCourse.fulfilled]: (state, action) => action.payload,
    [createCourse.fulfilled]: (state, action) => action.payload,
  },
});

export const selectCourse = ({ academyApp }) => academyApp.course;

export default courseSlice.reducer;
