import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import {
  closeLabelsDialog,
  selectLabels,
  selectPortsDialogOpen,
} from "../../../store/portsSlice";
import NewLabelForm from "./NewLabelForm";
import LabelItemForm from "./LabelItemForm";

function LabelsDialog(props) {
  const dispatch = useDispatch();
  const labelsDialogOpen = useSelector(selectPortsDialogOpen);
  const labels = useSelector(selectLabels);

  return (
    <Dialog
      classes={{
        paper: "w-full p-24 md:p-40 m-24",
      }}
      onClose={(ev) => dispatch(closeLabelsDialog())}
      open={labelsDialogOpen}
    >
      <Typography className="text-20 mb-24 font-semibold">
        Gestionar puertos de base de datos
      </Typography>

      <List dense>
        <NewLabelForm />

        {labels.map((item) => (
          <LabelItemForm port={item} key={item.id} />
        ))}
      </List>
    </Dialog>
  );
}

export default LabelsDialog;
