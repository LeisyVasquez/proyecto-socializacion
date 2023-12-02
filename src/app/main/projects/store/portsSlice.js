import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getPorts = createAsyncThunk(
  "notesApp/labels/getPorts",
  async () => {
    const response = await axios.get(
      "http://DESKTOP-5DJOOF3:9001/api/gnr_db_ports"
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
        `http://DESKTOP-5DJOOF3:9001/api/gnr_db_ports`,
        _data
      );
      const data = await response.data;

      dispatch(getPorts());
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
        `http://DESKTOP-5DJOOF3:9001/api/gnr_db_ports/${id}`
      );
      const data = await response.data;
      dispatch(getPorts());
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
} = labelsAdapter.getSelectors((state) => state.academyApp.ports);

const labelsSlice = createSlice({
  name: "notesApp/labels",
  initialState: labelsAdapter.getInitialState({ labelsDialogOpen: false }),
  reducers: {
    openPortsDialog: (state, action) => {
      state.labelsDialogOpen = true;
    },
    closeLabelsDialog: (state, action) => {
      state.labelsDialogOpen = false;
    },
  },
  extraReducers: {
    [getPorts.fulfilled]: labelsAdapter.setAll,
    [updateLabel.fulfilled]: labelsAdapter.upsertOne,
    [removeLabel.fulfilled]: labelsAdapter.removeOne,
    [createLabel.fulfilled]: labelsAdapter.addOne,
  },
});

export const { openPortsDialog, closeLabelsDialog } = labelsSlice.actions;

export const selectPortsDialogOpen = ({ academyApp }) =>
  academyApp.ports.labelsDialogOpen;

export default labelsSlice.reducer;
