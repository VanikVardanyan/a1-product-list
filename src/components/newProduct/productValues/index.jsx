import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import ControlPointTwoToneIcon from "@material-ui/icons/ControlPointTwoTone";
import styles from "./style.module.scss";
import { Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addProductAction } from "../../../store/actionCreator/productsAction";

const useStyles = makeStyles((theme) => ({
  action: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  table: {
    widht: "100%",
  },
  root: {
    "& > span": {
      margin: theme.spacing(2),
    },
  },
}));

export const ProductValues = ({ resolveProduct }) => {
  const classes = useStyles();
  const [data, setData] = useState({
    name: "",
    sale: "",
    quantity: "0",
  });
  const [isAdd, setIsAdd] = useState(false);

  const dispatch = useDispatch();

  const saleValidate = !!data.sale.length && data.sale > 0 && data.sale[0] !== "0";

  const changeDataEditors = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    if (name !== "name") {
      if (isNaN(+value)) {
        return;
      }
    }
    setData({ ...data, [e.target.name]: value });
  };

  const handlerSave = () => {
    if (data.name.trim().length && saleValidate) {
      dispatch(addProductAction(data));
      resolveProduct();
      handleCleare();
      return;
    }
    setIsAdd(true);
  };

  const handleCleare = () => {
    setData({
      name: "",
      sale: "",
      quantity: "0",
    });
    setIsAdd(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <div className={styles.title_name}>Name</div>
            </TableCell>
            <TableCell align='left'>
              <div className={styles.title_name}>Quantity</div>
            </TableCell>
            <TableCell align='left'>
              <div className={styles.title_name}>Sale&nbsp;($)</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell scope='row'>
              <input
                type='text'
                className={isAdd && !data.name.length ? styles.fild_error : styles.fild}
                value={data.name}
                name='name'
                onChange={changeDataEditors}
                placeholder='name'
              />
            </TableCell>
            <TableCell align='left'>
              <input
                type='text'
                name='quantity'
                className={styles.fild}
                value={data.quantity}
                onChange={changeDataEditors}
              />
            </TableCell>
            <TableCell align='left'>
              <input
                type='text'
                value={data.sale}
                name='sale'
                onChange={changeDataEditors}
                className={isAdd && !saleValidate ? styles.fild_error : styles.fild}
                placeholder='sale'
              />
            </TableCell>
            <TableCell align='left'>
              <div className={classes.action}>
                <Tooltip title='add'>
                  <button type='button' className={styles.btn} onClick={handlerSave}>
                    <ControlPointTwoToneIcon color='primary' />
                  </button>
                </Tooltip>
                <Tooltip title='clear'>
                  <button type='button' onClick={handleCleare} className={styles.btn}>
                    <HighlightOffTwoToneIcon />
                  </button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
