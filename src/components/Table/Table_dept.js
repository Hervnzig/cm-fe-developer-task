import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();

  const [checked, setChecked] = useState(-1);
  const { getDeparmentData } = props;

  const _onChange = (value) => {
    if (value == checked) {
      setChecked(-1);
      localStorage.setItem("department_name", null);
      getDeparmentData(null);
    } else {
      localStorage.setItem("department_name", value);
      setChecked(value);
      getDeparmentData(value);
    }
  };

  useEffect(() => {
    const department_name = localStorage.getItem("department_name");
    if (department_name !== "null") {
      setChecked(department_name);
      _onChange(department_name);
    }
  }, []);

  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                <>
                  {Object.keys(prop).map((item, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {item == "manager"
                          ? prop[item].name.first + " " + prop[item].name.last
                          : prop[item]}
                      </TableCell>
                    );
                  })}
                  <TableCell className={classes.tableCell} key={key}>
                    <Checkbox
                      checked={prop.department == checked ? true : false}
                      onChange={() => _onChange(prop.department)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                    />
                  </TableCell>
                </>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "white",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
      ])
    )
  ),
  getDeparmentData: PropTypes.func,
};
