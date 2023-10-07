import React, { useState } from "react";
import {
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { textInputStyle } from "./styles";
import CustomSnackbars from "../customSnackbars";
import { useDispatch } from "react-redux";
import { addAllToDo, editTodo } from "../../redux/reducer/todoReducerSlider";
import {
  createTodo,
  todoPagination,
  updateTodo,
} from "../../services/apiCollection";
import CustomMessageModal from "../customMessageModal";

export default function CustomAddTodoModal(props) {
  const {
    open = false,
    handleClose = () => {},
    edit = {},
    todo = {},
    onHandleTodoChange = () => {},
    filterData = {},
  } = props;
  const isEdit = Object.values(edit).length > 0 ? true : false;
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState({
    val: false,
    message: ``,
    severity: "",
  });

  const [message, setMessage] = useState({
    toggle: false,
    title: ``,
    description: ``,
    value: ``,
  });

  const onHandleAddTodoData = async (e) => {
    if (
      !Boolean(todo["title"].length) ||
      !Boolean(todo["description"].length) ||
      !Boolean(todo["todoStatus"].length)
    ) {
      setToggle({
        val: true,
        message: `All fields are mandatroy`,
        severity: "warning",
      });
      return;
    }

    if (isEdit) {
      onHandleUpdateTodo();
    } else {
      await onHandleCreateTodo();
    }
  };

  const onHandleUpdateTodo = async () => {
    let param = {
      title: todo["title"],
      description: todo["description"],
      todoStatus: todo["todoStatus"],
    };
    try {
      let res = await updateTodo(edit.id, param);
      if (res?.text !== `error`) {
        dispatch(
          editTodo({
            ...edit,
            title: todo["title"],
            description: todo["description"],
            todoStatus: todo["todoStatus"],
          })
        );
        handleClose();
      } else {
        setMessage({
          toggle: true,
          title: `TODO Service`,
          description: res?.error?.message,
          value: "error",
        });
      }
    } catch (error) {
      console.log("update catch error ==>", error);
    }
  };

  const onHandleCreateTodo = async () => {
    let param = {
      title: todo["title"],
      description: todo["description"],
      todoStatus: todo["todoStatus"],
    };
    try {
      let res = await createTodo(param);
      if (res?.text !== `error`) {
        await onHandleFilterAPICall(filterData.pageNumber + 1);
        handleClose();
      } else {
        setMessage({
          toggle: true,
          title: `TODO Service`,
          description: res?.error?.message,
          value: "error",
        });
      }
    } catch (error) {
      console.log("catch error ==> create ==>", error);
    }
  };

  const onHandleFilterAPICall = async (value) => {
    let res = await todoPagination(value, 5);
    if (res?.text !== `error`) {
      dispatch(addAllToDo(res));
    }
  };

  const onHandleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToggle({ val: false, message: "", severity: "" });
  };

  const onHandleClose = () => {
    setMessage({
      toggle: false,
      title: ``,
      description: ``,
      value: ``,
    });
  };

  const onHandleOk = () => {
    onHandleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="todo-dialog-title"
      aria-describedby="todo-dialog-description"
      fullWidth
    >
      <DialogTitle id="todo-dialog-title">
        {isEdit ? "Update current Todo" : "Create a new Todo "}
      </DialogTitle>
      <DialogContent>
        <Box
          component={"span"}
          display={"flex"}
          flexDirection={"column"}
          sx={{
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <TextField
            id="todo-title"
            label="Title"
            variant="outlined"
            sx={textInputStyle}
            size="small"
            onChange={(e) => onHandleTodoChange(e, `title`)}
            required
            value={todo["title"]}
          />
          <TextField
            id="todo-description"
            label="Description"
            variant="outlined"
            sx={textInputStyle}
            size="small"
            onChange={(e) => onHandleTodoChange(e, `description`)}
            required
            value={todo["description"]}
          />
          <FormControl fullWidth>
            <InputLabel id="todo-status">{`Status`}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              value={todo["todoStatus"]}
              required
              onChange={(e) => onHandleTodoChange(e, `todoStatus`)}
            >
              <MenuItem value={`NOT_STARTED`}>NOT STARTED</MenuItem>
              <MenuItem value={`IN_PROGRESS`}>IN PROGRESS</MenuItem>
              <MenuItem value={`COMPLETE`}>COMPLETE</MenuItem>
              <MenuItem value={`CANCELLED`}>CANCELLED</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            textTransform: "capitalize",
          }}
        >
          cancel
        </Button>
        <Button
          onClick={onHandleAddTodoData}
          sx={{
            textTransform: "capitalize",
          }}
        >
          {isEdit ? `Update` : `Create`}
        </Button>
      </DialogActions>
      {toggle["val"] && (
        <CustomSnackbars
          open={toggle["val"]}
          autoHideDuration={4000}
          handleClose={onHandleSnackbarClose}
          message={toggle["message"]}
          severity={toggle["severity"]}
          actionHandleClose={onHandleSnackbarClose}
        />
      )}
      {message["toggle"] && (
        <CustomMessageModal
          open={message["toggle"]}
          title={message["title"]}
          description={message["description"]}
          isOk={true}
          onHandleOkay={onHandleOk}
          onHandleClose={onHandleClose}
        />
      )}
    </Dialog>
  );
}
