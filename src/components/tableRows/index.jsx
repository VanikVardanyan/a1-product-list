import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  button: {
    width: 100,
  },
  editBnt: {
    width: 100,
    background: "#2babe2",
  },
  inputValue: {
    width: "100%",
    position: "relative",
  },
  cell: {
    width: "150px",
  },
});
export const TableRows = ({
  name,
  quantity,
  sale,
  id,
  isEdit,
  handleDelete,
  editProducts,
  handleNewProducts,
  buttonDisables = () => {},
}) => {
  const [dataEditors, setDataEditors] = useState({
    name: name,
    quantity: quantity,
    sale: sale,
  });
  const classes = useStyles();

  const changeDataEditors = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    if (name !== "name") {
      if (isNaN(+value)) {
        return;
      }
    }
    setDataEditors({ ...dataEditors, [e.target.name]: value });
  };

  const closeHandler = () => {
    editProducts(null);
    setDataEditors({ name, quantity, sale });
  };
  const submiteHandler = () => {
    if (dataEditors.name.trim().length && !!dataEditors.sale && dataEditors.sale > 0 && dataEditors.sale[0] !== "0") {
      handleNewProducts({ ...dataEditors, id });
    }
  };
  const handlerEdit = () => {
    editProducts(id);
  };
  return (
    <TableRow key={name}>
      <TableCell className={classes.cell} component='th' scope='row' align='left'>
        {isEdit ? (
          <TextField
            className={classes.inputValue}
            id={`${id}name`}
            value={dataEditors.name}
            name='name'
            size='small'
            onChange={changeDataEditors}
            style={{
              borderTop: !dataEditors.name.length ? "1px solid red" : "",
            }}
          />
        ) : (
          dataEditors.name
        )}
      </TableCell>
      <TableCell align='left' className={classes.cell}>
        {isEdit ? (
          <TextField
            className={classes.inputValue}
            id={`${id}quantity`}
            value={dataEditors.quantity}
            size='small'
            name='quantity'
            onChange={changeDataEditors}
          />
        ) : dataEditors.quantity ? (
          dataEditors.quantity
        ) : (
          0
        )}
      </TableCell>
      <TableCell align='left' className={classes.cell}>
        {isEdit ? (
          <>
            <TextField
              className={classes.inputValue}
              id={`${id}sale`}
              value={dataEditors.sale}
              size='small'
              name='sale'
              style={{
                borderTop: !!dataEditors.sale && dataEditors.sale > 0 ? "" : "1px solid red",
              }}
              onChange={changeDataEditors}
            />
          </>
        ) : (
          `$ ${dataEditors.sale ? dataEditors.sale : sale}`
        )}
      </TableCell>
      {isEdit ? (
        <>
          <TableCell align='right' className={classes.cell}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={submiteHandler}
            >
              Save
            </Button>
          </TableCell>
          <TableCell align='right' className={classes.cell}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={closeHandler}
            >
              cancel
            </Button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell align='right' className={classes.cell}>
            <Button
              variant='contained'
              color='primary'
              className={classes.editBnt}
              startIcon={<EditIcon />}
              onClick={handlerEdit}
              disabled={buttonDisables() && !isEdit}
            >
              Edit
            </Button>
          </TableCell>
          <TableCell align='right' className={classes.cell}>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={() => handleDelete(id)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};
