import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ConfirmModal from "../FeedbackModal/ConfirmModal";
import AddToList from "./AddToList";

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: "bold",
    background: "#333",
    color: "#fff",
  },
  headerCell: {
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  formControl: {
    minWidth: "150px",
  },
  tableCell: {},
  trashIcon: {
    cursor: "pointer",
  },
}));

const ItemList = ({ apiUrl, name }) => {
  const [data, setData] = useState([]);

  const [dialogContent, setDialogContent] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const fetchData = async () => {
    const response = await axios.get(apiUrl, {
      withCredentials: true,
    });
    console.log(response);
    setData(response.data);
  };

  const deleteItem = async (itemId) => {
    console.log("delete", itemId);
    try {
      await axios.delete(`${apiUrl}/${itemId}/delete`, {
        withCredentials: true,
      });
      toggleDialog();
      setDialogContent(`${name} has been deleted.`);
    } catch {
      toggleDialog();
      setDialogContent("An unexpected error occured.");
    } finally {
      fetchData();
    }
  };

  const classes = useStyles();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell className={classes.headerCell}>
                {`${name} name:`}
              </TableCell>
              <TableCell className={classes.headerCell}>
                Number of Employees
              </TableCell>
              <TableCell className={classes.headerCell}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className={classes.tableRow}>
                <TableCell>{item.name}</TableCell>
                <TableCell className={classes.tableCell}>
                  {item.employeeCount}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <DeleteIcon
                    className={classes.trashIcon}
                    onClick={
                      item.employeeCount === 0
                        ? () => deleteItem(item.id)
                        : () => {
                            toggleDialog();
                            setDialogContent(
                              `${name} with employees cannot be deleted.`
                            );
                          }
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <AddToList fetchData={fetchData} apiUrl={apiUrl} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmModal
        open={dialogOpen}
        toggleOpen={toggleDialog}
        dialogContent={dialogContent}
        setDialogContent={setDialogContent}
        dialogButtonOneText="OK"
      />
    </Container>
  );
};

export default ItemList;
