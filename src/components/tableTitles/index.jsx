import { TableHead } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import styles from "./style.module.scss";

export const TableTitles = () => {
  return (
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
        <TableCell align='right'>
          <div className={styles.title}>
            Edit <EditIcon color='primary' fontSize='small' className={styles.title_icon} />
          </div>
        </TableCell>
        <TableCell align='right'>
          <div className={styles.title}>
            Delete <DeleteForeverIcon color='error' fontSize='small' className={styles.title_icon} />
          </div>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
