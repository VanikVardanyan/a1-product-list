import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Fab, makeStyles, TextField, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import styles from "./style.module.scss";
import { ProductValues } from "../productValues";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: { minWidth: "50%" },
}));

export const OpenNewroductForm = () => {
  const [open, setOpen] = React.useState(false);
  const [resolve, setResolve] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resolveProduct = () => {
    setResolve(true);
    setTimeout(() => setResolve(false), 3000);
  };

  return (
    <div className={styles.button_circule}>
      <Tooltip title='Add' aria-label='add' onClick={handleClickOpen}>
        <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='draggable-dialog-title'
        classes={{ paper: classes.paper }}
      >
        <DialogTitle style={{ cursor: "move" }} id='draggable-dialog-title'>
          <div className={styles.actions}>
            NEW PRODUCT
            <Alert severity='success' style={{ display: resolve ? "flex" : "none" }}>
              product added successfully!
            </Alert>
          </div>
        </DialogTitle>
        <ProductValues resolveProduct={resolveProduct} />
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
