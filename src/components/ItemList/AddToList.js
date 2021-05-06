import { Button, FormControl, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  closeIcon: {
    cursor: "pointer",
  },
}));

const AddToList = ({ fetchData, apiUrl }) => {
  const classes = useStyles();

  const [inputData, setInputData] = useState({ name: "" });
  const [error, setError] = useState("");
  const [activeForm, setActiveForm] = useState(false);

  const toggleActiveForm = () => {
    setActiveForm(!activeForm);
  };

  const sendDepartment = async () => {
    if (inputData.name !== "") {
      try {
        const response = await axios.post(apiUrl, inputData, {
          withCredentials: true,
        });
        console.log(response);
        fetchData();
        toggleActiveForm();
        setInputData({ name: "" });
      } catch (error) {
        setError(error.response.data.message);
      }
    } else {
      setError("Required field.");
    }
  };

  return (
    <>
      {activeForm ? (
        <>
          <FormControl>
            <TextField
              margin={"normal"}
              id="outlined-basic"
              label="Name:"
              variant="outlined"
              required={true}
              value={inputData.name}
              onChange={(event) => {
                setError("");
                setInputData({ ...inputData, name: event.target.value });
              }}
              helperText={error}
              error={error !== ""}
            />
            <Button
              variant="outlined"
              margin={"normal"}
              color="secondary"
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                sendDepartment();
              }}
            >
              Submit
            </Button>
          </FormControl>
          <CloseIcon
            className={classes.closeIcon}
            onClick={() => toggleActiveForm()}
          />
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            margin={"normal"}
            color="secondary"
            onClick={() => toggleActiveForm()}
          >
            Add
          </Button>
        </>
      )}
    </>
  );
};

export default AddToList;
