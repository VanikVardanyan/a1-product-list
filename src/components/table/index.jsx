import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/selectors/productSelector";
import {
  deleteProductsAction,
  editProductsAction,
  editProductSaveAction,
} from "../../store/actionCreator/productsAction";
import { TableRows } from "../tableRows";
import { TableTitles } from "../tableTitles";
import { OpenNewroductForm } from "../newProduct/openNewproducForm";

const useStyles = makeStyles({
  container: {
    paddingTop: "15px",
    position: "relative",
  },
  table: {
    width: "850px",
    margin: "auto",
    minWidth: 650,
    border: "1px solid #2babe2",
  },
  switch: {
    width: "850px",
    minWidth: 650,
    margin: "auto",
  },
  endText: {
    color: "green",
    fontSize: 18,
    padding: "6px",
  },
});

export const ProductTable = () => {
  const [switches, setSwitches] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const buttonDisables = useCallback(() => {
    return !!products.filter((elem) => elem.isEdit).length;
  }, [products]);
  const totalAmountSum = useCallback(
    (isSwitches) => {
      if (isSwitches) {
        setTotalAmount(products.reduce((num, item) => num + +item.sale * item.quantity, 0));
      } else {
        setTotalAmount(products.reduce((num, item) => num + +item.sale, 0));
      }
    },
    [products],
  );

  useEffect(() => {
    totalAmountSum(switches);
  }, [products, switches, totalAmountSum]);

  const handleChange = () => {
    setSwitches((prev) => !prev);
    totalAmountSum(!switches);
  };
  const handleDelete = (id) => {
    dispatch(deleteProductsAction(id));
  };

  const editProducts = (id) => {
    dispatch(editProductsAction(id));
  };

  const handleNewProducts = (data) => {
    dispatch(editProductSaveAction(data));
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <OpenNewroductForm />
        <Table className={classes.table} aria-label='caption table'>
          <TableTitles />
          <TableBody>
            {products.length ? (
              products.map((row) => (
                <TableRows
                  key={row.id}
                  id={row.id}
                  name={row.name}
                  sale={row.sale}
                  quantity={row.quantity}
                  handleDelete={handleDelete}
                  editProducts={editProducts}
                  handleNewProducts={handleNewProducts}
                  classes={classes}
                  isEdit={row.isEdit}
                  buttonDisables={buttonDisables}
                />
              ))
            ) : (
              <tr>
                <td colSpan='5'>
                  <div className={classes.endText}>
                    At the moment there are no products, in order to add a product, click on the blue circle with a plus
                  </div>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
        <div className={classes.switch}>
          <FormControlLabel
            control={<Switch checked={switches} onChange={handleChange} name='checkedB' color='primary' />}
            label='amount with calculation of quantity'
          />
          <div>total amount: {totalAmount} $</div>
        </div>
      </TableContainer>
    </>
  );
};
