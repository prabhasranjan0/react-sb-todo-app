import { AUTH_SERVICE_URL, TODO_SERVICE_API } from ".";

export const login = async (param) => {
  try {
    const endPoint = `${process.env.REACT_APP_AUTH_SERVICE_URL_SIGNIN}`;
    let response = await AUTH_SERVICE_URL.post(endPoint, param);
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    return err;
  }
};

export const signup = async (param) => {
  try {
    const endPoint = `${process.env.REACT_APP_AUTH_SERVICE_URL_SIGNUP}`;
    let response = await AUTH_SERVICE_URL.post(endPoint, param);
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    return err;
  }
};

export const fetchAllTodo = async () => {
  try {
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}`;
    let response = await TODO_SERVICE_API.get(endPoint);
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    return err;
  }
};

export const createTodo = async (param) => {
  try {
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}`;
    let response = await TODO_SERVICE_API.post(endPoint, param);
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    return err;
  }
};

export const todoPagination = async (pageNumber = 1, pageSize = 5) => {
  try {
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=title`;
    let response = await TODO_SERVICE_API.get(endPoint);
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    return err;
  }
};

export const fetchTodoById = async (id) => {
  try {
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}/${id}`;
    let response = await TODO_SERVICE_API.get(endPoint);
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    return err;
  }
};

export const updateTodo = async (id, param) => {
  try {
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}/${id}`;
    let response = await TODO_SERVICE_API.put(endPoint, param);
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    return err;
  }
};

export const deleteTodo = async (id) => {
  try {
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}/${id}`;
    let response = await TODO_SERVICE_API.delete(endPoint);
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    return err;
  }
};
