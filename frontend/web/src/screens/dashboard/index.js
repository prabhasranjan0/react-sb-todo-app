import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Fab,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";

import CustomSnackbars from "../../sharedComponent/customSnackbars";
import CustomMessageModal from "../../sharedComponent/customMessageModal";
import CustomAddTodoModal from "../../sharedComponent/customAddTodoModal";
import CustomTodoCard from "../../sharedComponent/CustomTodoCard";
import { deleteTodo, todoPagination } from "../../services/apiCollection";
import {
  addAllToDo,
  deleteTodoRTK,
} from "../../redux/reducer/todoReducerSlider";

import {
  boxListStyle,
  boxSpanStyle,
  favIcon,
  headerBoxStyle,
  headerTextStyle,
  inputStyle,
  mainBoxStyle,
  searchButtonStyle,
  textInputStyle,
} from "./styles";

function Dashboard() {
  const { todoList, pagination } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [add, setAdd] = useState({
    toggle: false,
    editable: {},
  });
  const [todo, setTodo] = useState({
    title: ``,
    description: ``,
    todoStatus: "",
  });
  const [toggle, setToggle] = useState({
    val: false,
    message: ``,
    severity: "",
  });

  const [filterData, setFilterData] = useState({
    pageNumber: 0,
    pageSize: 0,
    total: 0,
    count: 0,
    paged: false,
  });

  const [message, setMessage] = useState({
    toggle: false,
    title: ``,
    description: ``,
    value: {},
  });

  useEffect(() => {
    if (Object.keys(todoList).length > 0) {
      setList([...todoList]);
      setFilterData({
        ...filterData,
        pageNumber: pagination?.pageable?.pageNumber,
        pageSize: pagination?.pageable?.pageSize,
        total: pagination?.totalElements,
        count: pagination?.totalPages,
        paged: pagination?.pageable?.paged,
      });
    } else {
      setList([]);
      setFilterData({
        ...filterData,
        pageNumber: pagination?.pageable?.pageNumber,
        pageSize: pagination?.pageable?.pageSize,
        total: pagination?.totalElements,
        count: pagination?.totalPages,
        paged: false,
      });
    }
  }, [todoList, pagination]);

  const onHandleTodoChange = (event, field) => {
    setTodo({ ...todo, [field]: event.target.value });
  };

  const onHandleSearch = (e) => {
    e.preventDefault();
    if (list.length <= 0) {
      setToggle({
        val: true,
        message: `No todo are available, You can create one`,
        severity: "warning",
      });
      return;
    }
    if (search.length <= 0) {
      return;
    }
    let record = list.filter((item) =>
      item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    if (record.length <= 0) {
      setToggle({
        val: true,
        message: `Search records are available`,
        severity: "warning",
      });
    }
    setList(record);
  };

  const onHandleChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value?.length <= 0) {
      setList(todoList);
    }
  };

  const addNewTodo = () => {
    setAdd({
      toggle: true,
      editable: {},
    });
    setTodo({
      title: ``,
      description: ``,
      todoStatus: ``,
    });
  };

  const onHandleCloseDialog = () => {
    setAdd({
      toggle: false,
      editable: {},
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToggle({ val: false, message: "", severity: "" });
  };

  const onHandleDelete = (item) => {
    setMessage({
      toggle: true,
      title: `TODO Delete Confirm`,
      description: `Do you want to delete this todo ?`,
      value: item,
    });
  };

  const onHandleConfirmDelete = async () => {
    try {
      let res = await deleteTodo(message["value"]["id"]);
      if (res?.text !== `error`) {
        dispatch(deleteTodoRTK(message["value"]));
        await onHandleFilterAPICall(
          list.length === 1 && pagination.totalElements === 1
            ? filterData.pageNumber
            : filterData.pageNumber + 1
        );
        handleClose();
      } else {
        setMessage({
          toggle: true,
          title: `TODO Remove Service`,
          description: res?.error?.message,
          value: "error",
        });
      }
    } catch (error) {
      console.log("catch error ==>", error);
    }

    onHandleClose();
  };

  const onHandleClose = () => {
    setMessage({
      toggle: false,
      title: ``,
      description: ``,
      value: {},
    });
  };

  const onHandleEdit = (item) => {
    setAdd({
      toggle: true,
      editable: item,
    });
    setTodo({
      title: item.title,
      description: item.description,
      todoStatus: item?.todoStatus,
    });
  };

  const onHandleChangePagination = async (event, value) => {
    setFilterData({
      ...filterData,
      pageNumber: value,
      pageSize: 5,
    });
    await onHandleFilterAPICall(value);
  };

  const onHandleFilterAPICall = async (value) => {
    let res = await todoPagination(value, 5);
    if (res?.text !== `error`) {
      dispatch(addAllToDo(res));
    }
  };

  return (
    <Box component="span" display={"flex"} justifyContent={"center"}>
      <Box component="span" sx={mainBoxStyle}>
        <Box component="span" sx={boxSpanStyle}>
          <Typography
            component={"span"}
            paragraph
            sx={headerTextStyle}
          >{`What's your plan for today`}</Typography>
          <Box component="form" onSubmit={onHandleSearch} sx={headerBoxStyle}>
            <TextField
              id="search"
              label="Search Todo"
              variant="outlined"
              sx={textInputStyle}
              size="small"
              onChange={onHandleChange}
              required
              InputProps={inputStyle}
            />
            <Button
              variant="contained"
              onClick={onHandleSearch}
              type="submit"
              sx={searchButtonStyle}
            >
              Search
            </Button>
          </Box>
        </Box>
        {list?.length > 0 ? (
          [...list].map((item, index) => (
            <Box component="span" key={index} sx={boxListStyle}>
              <CustomTodoCard
                title={item.title}
                description={item.description}
                todoStatus={item.todoStatus}
                onHandleDelete={() => onHandleDelete(item)}
                onHandleEdit={() => onHandleEdit(item)}
              />
            </Box>
          ))
        ) : (
          <h2>{`No Todo are available. You can create one`}</h2>
        )}
        {filterData.paged && (
          <Pagination
            count={filterData.count}
            onChange={onHandleChangePagination}
            page={filterData.pageNumber + 1}
          />
        )}
      </Box>
      <CustomAddTodoModal
        open={add["toggle"]}
        handleClose={onHandleCloseDialog}
        user={user}
        edit={add["editable"]}
        onHandleTodoChange={onHandleTodoChange}
        todo={todo}
        filterData={filterData}
      />
      <Fab color="primary" aria-label="add" sx={favIcon} onClick={addNewTodo}>
        <AddIcon />
      </Fab>
      {toggle["val"] && (
        <CustomSnackbars
          open={toggle["val"]}
          autoHideDuration={4000}
          handleClose={handleClose}
          message={toggle["message"]}
          severity={toggle["severity"]}
          actionHandleClose={handleClose}
        />
      )}
      {message["toggle"] && (
        <CustomMessageModal
          open={message["toggle"]}
          title={message["title"]}
          description={message["description"]}
          isCancle={true}
          isOk={true}
          okText={`yes`}
          onHandleOkay={onHandleConfirmDelete}
          onHandleClose={onHandleClose}
          onHandleCancel={onHandleClose}
        />
      )}
    </Box>
  );
}

export default Dashboard;
