import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import FirstTable from "components/Table/Table_dept";
import SecondTable from "components/Table/Table_employee";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { departments } from "assets/data/HR";
import axios from "axios";
import { Typography } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);
// let department;

export default function TableList() {
  const [departmentData, setDepartmentData] = useState();
  const [spinner, setSpinner] = useState(false);
  const classes = useStyles();

  const getDeparmentData = (department) => {
    if (department) {
      setSpinner(true);
      return axios
        .get(`https://randomuser.me/api/?seed=${department}&results=10`)
        .then((response) => {
          setDepartmentData(response.data.results);
          setSpinner(false);
          console.log("From department of " + department);
        });
    } else {
      setDepartmentData(null);
    }
  };

  // const dept_title = getDeparmentData;
  // console.log(dept_title.department);

  // const employee = [];

  // function read() {
  //   for (let department of departments) {
  //     employee.push(<p key={department}>{department}</p>);
  //   }
  // }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Department Table</h4>
            <p className={classes.cardCategoryWhite}>
              You can select the department here.
            </p>
          </CardHeader>
          <CardBody>
            <FirstTable
              tableHeaderColor="primary"
              // tableHead={departments.department}
              tableHead={["Id", "Deparment", "Location", "Manager", "Action"]}
              tableData={departments}
              getDeparmentData={getDeparmentData}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} className="test">
        <Card plain>
          <CardHeader plain color="warning">
            <h4 className={classes.cardTitleWhite}>
              Employees from <strong>{departments[3].department} </strong>
            </h4>
            <p className={classes.cardCategoryWhite}>
              You can see the Detail Data
            </p>
          </CardHeader>
          <CardBody>
            <Typography></Typography>
            <SecondTable
              tableHeaderColor="primary"
              tableHead={[
                "Photo",
                "Full Names",
                "Gender",
                "Country",
                "Email",
                "Phone",
                "Year in the company",
              ]}
              tableData={departmentData}
              spinner={spinner}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
