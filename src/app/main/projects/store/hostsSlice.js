import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getLabels = createAsyncThunk(
  "notesApp/labels/getLabels",
  async () => {
    const response = await axios.get(
      "http://DESKTOP-5DJOOF3:9001/api/gnr_db_hosts"
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
        `http://DESKTOP-5DJOOF3:9001/api/gnr_db_hosts`,
        _data
      );
      const data = await response.data;
      dispatch(getLabels());
      dispatch(showMessage({ message: "Host creado correctamente" }));

      return data;
    } catch (error) {
      switch (error.response.status) {
        case 484:
          dispatch(
            showMessage({
              message: "Error: la URL del host ya existe",
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
        `http://DESKTOP-5DJOOF3:9001/api/gnr_db_hosts/${id}`
      );
      const data = await response.data;
      dispatch(getLabels());
      dispatch(showMessage({ message: "Host eliminado correctamente" }));

      return data;
    } catch (error) {
      switch (error.response.status) {
        case 441:
          dispatch(
            showMessage({
              message:
                "Error: el host se puede eliminar sino se encuentra asociado a algún proyecto",
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
} = labelsAdapter.getSelectors((state) => state.academyApp.hosts);

const labelsSlice = createSlice({
  name: "notesApp/labels",
  initialState: labelsAdapter.getInitialState({ labelsDialogOpen: false }),
  reducers: {
    openLabelsDialog: (state, action) => {
      state.labelsDialogOpen = true;
    },
    closeLabelsDialog: (state, action) => {
      state.labelsDialogOpen = false;
    },
  },
  extraReducers: {
    [getLabels.fulfilled]: labelsAdapter.setAll,
    [updateLabel.fulfilled]: labelsAdapter.upsertOne,
    [removeLabel.fulfilled]: labelsAdapter.removeOne,
    [createLabel.fulfilled]: labelsAdapter.addOne,
  },
});

export const { openLabelsDialog, closeLabelsDialog } = labelsSlice.actions;

export const selectLabelsDialogOpen = ({ academyApp }) =>
  academyApp.hosts.labelsDialogOpen;

export default labelsSlice.reducer;
