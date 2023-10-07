import { createSlice } from "@reduxjs/toolkit";

export const todoReducerSlider = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    pagination: {},
  },
  reducers: {
    addAllToDo: (state, action) => {
      let param = action.payload;
      state.todoList = action.payload.content;
      delete param.content;
      state.pagination = param;
    },
    addNewToDo: (state, action) => {
      state.todoList.push({ ...action.payload, id: state.todoList.length + 1 });
    },
    deleteTodoRTK: (state, action) => {
      let { todoList } = state;
      state.todoList = todoList.filter((item) => item.id !== action.payload.id);
    },
    editTodo: (state, action) => {
      let { todoList } = state;
      state.todoList = todoList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    setTodoReset: (state, action) => {
      state.todoList = [];
    },
  },
});

export const {
  addAllToDo,
  addNewToDo,
  addToDo,
  deleteTodoRTK,
  editTodo,
  setTodoReset,
} = todoReducerSlider.actions;

export default todoReducerSlider.reducer;
