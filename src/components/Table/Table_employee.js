import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, spinner } = props;
  const [userData, setUserData] = useState();

  useEffect(() => {
    let employeesData = [];
    if (tableData) {
      for (let i = 0; i < tableData.length; i++) {
        let item = {
          photo: tableData[i].picture.thumbnail,
          name: tableData[i].name.first + " " + tableData[i].name.last,
          gender: tableData[i].gender,
          country: tableData[i].location.country,
          email: tableData[i].email,
          phone: tableData[i].phone,
          yearsInCompany: tableData[i].registered.age,
        };
        employeesData.push(item);
      }
      setUserData(employeesData);
      console.log(employeesData);
    }
  }, [tableData]);

  CustomTable.defaultProps = {
    tableHeaderColor: "gray",
  };
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
          {userData &&
            tableData &&
            !spinner &&
            userData.map((prop, key) => {
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <>
                    {Object.keys(prop).map((item, key) => {
                      return (
                        <TableCell className={classes.tableCell} key={key}>
                          {item == "photo" ? (
                            <Avatar alt="Remy Sharp" src={prop[item]} />
                          ) : (
                            prop[item]
                          )}
                        </TableCell>
                      );
                    })}
                  </>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {!tableData && !spinner && (
        <div>
          <Typography align="center" font-size="3.25rem">
            There is no Data
          </Typography>
        </div>
      )}
      {spinner && (
        <div>
          <Typography align="center" component={"div"}>
            <CircularProgress />
          </Typography>
        </div>
      )}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "white",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf(["warning", "primary"]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
        PropTypes.objectOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.objectOf(
              PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            ),
          ])
        ),
        PropTypes.objectOf(PropTypes.string),
      ])
    )
  ),
  spinner: PropTypes.bool,
};
