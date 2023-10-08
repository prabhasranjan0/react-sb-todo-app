import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Fab,
  Pagination,
  TablePagination,
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
  paginationStyle,
  searchButtonStyle,
  textInputStyle,
} from "./styles";
import { setActiveLoader } from "../../redux/reducer/userSlider";

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
    pageSize: 5,
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
    console.log("api call not happen");
    if (todoList && Object.keys(todoList).length > 0) return;
    dispatch(setActiveLoader(true));
    setTimeout(async () => {
      console.log("api call happen");
      await apiCall();
    }, 2000);
  }, []);

  const apiCall = async () => {
    let res = await todoPagination(1, 5);
    if (res?.text !== `error`) {
      dispatch(addAllToDo(res));
    }
  };

  useEffect(() => {
    if (todoList && Object.keys(todoList).length > 0) {
      setList([...todoList]);
      setFilterData({
        pageNumber: pagination?.pageable?.pageNumber,
        pageSize: pagination?.pageable?.pageSize,
        total: pagination?.totalElements,
        count: pagination?.totalPages,
        paged: pagination?.pageable?.paged,
      });
    } else {
      setList([]);
      setFilterData({
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
    if (message["value"] === "error") {
      onHandleClose();
      return;
    }
    try {
      let res = await deleteTodo(message["value"]["id"]);
      if (res?.text !== `error`) {
        dispatch(deleteTodoRTK(message["value"]));
        await onHandleFilterAPICall(
          pagination.pageable.offset + 1 === pagination.totalElements
            ? pagination.number
            : pagination.number + 1,
          filterData.pageSize
        );
        handleClose();
        onHandleClose();
      } else {
        setMessage({
          toggle: true,
          title: `TODO Remove Service`,
          description: res?.error?.message || `API Error`,
          value: "error",
        });
      }
    } catch (error) {
      console.log("catch error ==>", error);
    }
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
    });
    await onHandleFilterAPICall(value, filterData.pageSize);
  };

  const onHandleFilterAPICall = async (pageNumber, pageSize) => {
    let res = await todoPagination(pageNumber, pageSize);
    if (res?.text !== `error`) {
      dispatch(addAllToDo(res));
    }
  };

  const onRowsPerPageChange = async (event) => {
    setFilterData({
      ...filterData,
      pageNumber: 1,
      pageSize: event.target.value,
    });
    await onHandleFilterAPICall(1, event.target.value);
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
          <Box sx={paginationStyle}>
            <TablePagination
              component="div"
              count={filterData.total}
              page={filterData.pageNumber + 1}
              rowsPerPage={filterData.pageSize}
              onRowsPerPageChange={onRowsPerPageChange}
              ActionsComponent={() => null}
              onPageChange={() => {}}
              labelDisplayedRows={() => null}
              rowsPerPageOptions={[5, 10, 15]}
            />
            <Pagination
              count={filterData.count}
              onChange={onHandleChangePagination}
              page={filterData.pageNumber + 1}
              shape="rounded"
              variant="outlined"
            />
          </Box>
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
          isCancle={message["value"] === "error" ? false : true}
          isOk={true}
          okText={message["value"] === "error" ? `Ok` : `yes`}
          onHandleOkay={() => {
            dispatch(setActiveLoader(true));
            setTimeout(() => {
              onHandleConfirmDelete();
            }, 2000);
          }}
          onHandleClose={onHandleClose}
          onHandleCancel={onHandleClose}
        />
      )}
    </Box>
  );
}

export default Dashboard;
