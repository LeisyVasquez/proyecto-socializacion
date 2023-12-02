import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getLicenses = createAsyncThunk(
  "notesApp/labels/getLicenses",
  async () => {
    const response = await axios.get(
      "http://DESKTOP-5DJOOF3:9001/api/gnr_licenses"
    );
    const data = await response.data;

    return data;
  }
);

export const createLabel = createAsyncThunk(
  "notesApp/labels/createLabel",
  async (_data, { dispatch }) => {
    try {
      const response = await axios.post(
        `http://DESKTOP-5DJOOF3:9001/api/gnr_licenses`,
        _data
      );
      const data = await response.data;

      dispatch(getLicenses());
      dispatch(showMessage({ message: "Licencia creada correctamente" }));

      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "Ocurrió un error inesperado",
        })
      );

      return rejectWithValue({ error: error.message });
    }
  }
);

export const updateLabel = createAsyncThunk(
  "notesApp/labels/updateLabel",
  async (label) => {
    const response = await axios.put(`/api/notes/labels/${label.id}`, label);
    const data = await response.data;

    return data;
  }
);

export const removeLabel = createAsyncThunk(
  "notesApp/labels/removeLabel",
  async (id, { dispatch }) => {
    try {
      const response = await axios.delete(
        `http://DESKTOP-5DJOOF3:9001/api/gnr_licenses/${id}`
      );
      const data = await response.data;
      dispatch(getLicenses());
      dispatch(showMessage({ message: "Licencia eliminada correctamente" }));

      return data;
    } catch (error) {
      switch (error.response.status) {
        case 441:
          dispatch(
            showMessage({
              message:
                "Error: la licencia se puede eliminar sino se encuentra asociado a algún proyecto",
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

const labelsAdapter = createEntityAdapter({});

export const {
  selectAll: selectLabels,
  selectEntities: selectLabelsEntities,
  selectById: selectLabelById,
} = labelsAdapter.getSelectors((state) => state.academyApp.licenses);

const labelsSlice = createSlice({
  name: "notesApp/labels",
  initialState: labelsAdapter.getInitialState({ labelsDialogOpen: false }),
  reducers: {
    openLicensesDialog: (state, action) => {
      state.labelsDialogOpen = true;
    },
    closeLabelsDialog: (state, action) => {
      state.labelsDialogOpen = false;
    },
  },
  extraReducers: {
    [getLicenses.fulfilled]: labelsAdapter.setAll,
    [updateLabel.fulfilled]: labelsAdapter.upsertOne,
    [removeLabel.fulfilled]: labelsAdapter.removeOne,
    [createLabel.fulfilled]: labelsAdapter.addOne,
  },
});

export const { openLicensesDialog, closeLabelsDialog } = labelsSlice.actions;

export const selectLicensesDialogOpen = ({ academyApp }) =>
  academyApp.licenses.labelsDialogOpen;

export default labelsSlice.reducer;
