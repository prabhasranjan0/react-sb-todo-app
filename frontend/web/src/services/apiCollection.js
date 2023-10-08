import { AUTH_SERVICE_URL, TODO_SERVICE_API } from ".";
import { setActiveLoader } from "../redux/reducer/userSlider";
import store from "../redux/store";

export const login = async (param) => {
  try {
    store.dispatch(setActiveLoader(true));
    const endPoint = `${process.env.REACT_APP_AUTH_SERVICE_URL_SIGNIN}`;
    let response = await AUTH_SERVICE_URL.post(endPoint, param);
    store.dispatch(setActiveLoader(false));
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    store.dispatch(setActiveLoader(false));
    return err;
  } finally {
    store.dispatch(setActiveLoader(false));
  }
};

export const signup = async (param) => {
  try {
    store.dispatch(setActiveLoader(true));
    const endPoint = `${process.env.REACT_APP_AUTH_SERVICE_URL_SIGNUP}`;
    let response = await AUTH_SERVICE_URL.post(endPoint, param);
    store.dispatch(setActiveLoader(false));
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    store.dispatch(setActiveLoader(false));
    return err;
  } finally {
    store.dispatch(setActiveLoader(false));
  }
};

export const fetchAllTodo = async () => {
  try {
    store.dispatch(setActiveLoader(true));
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}`;
    let response = await TODO_SERVICE_API.get(endPoint);
    store.dispatch(setActiveLoader(false));
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    store.dispatch(setActiveLoader(false));
    return err;
  } finally {
    store.dispatch(setActiveLoader(false));
  }
};

export const createTodo = async (param) => {
  try {
    store.dispatch(setActiveLoader(true));
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}`;
    let response = await TODO_SERVICE_API.post(endPoint, param);
    store.dispatch(setActiveLoader(false));
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    store.dispatch(setActiveLoader(false));
    return err;
  } finally {
    store.dispatch(setActiveLoader(false));
  }
};

export const todoPagination = async (pageNumber = 1, pageSize = 5) => {
  try {
    store.dispatch(setActiveLoader(true));
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=title`;
    let response = await TODO_SERVICE_API.get(endPoint);
    store.dispatch(setActiveLoader(false));
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    store.dispatch(setActiveLoader(false));
    return err;
  } finally {
    store.dispatch(setActiveLoader(false));
  }
};

export const fetchTodoById = async (id) => {
  try {
    store.dispatch(setActiveLoader(true));
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}/${id}`;
    let response = await TODO_SERVICE_API.get(endPoint);
    store.dispatch(setActiveLoader(false));
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    store.dispatch(setActiveLoader(false));
    return err;
  } finally {
    store.dispatch(setActiveLoader(false));
  }
};

export const updateTodo = async (id, param) => {
  try {
    store.dispatch(setActiveLoader(true));
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}/${id}`;
    let response = await TODO_SERVICE_API.put(endPoint, param);
    store.dispatch(setActiveLoader(false));
    return response.data;
  } catch (error) {
    let err = { text: "error", error };
    store.dispatch(setActiveLoader(false));
    return err;
  } finally {
    store.dispatch(setActiveLoader(false));
  }
};

export const deleteTodo = async (id) => {
  try {
    store.dispatch(setActiveLoader(true));
    const endPoint = `${process.env.REACT_APP_TODO_SERVICE_MID_POINT}/${id}`;
    let response = await TODO_SERVICE_API.delete(endPoint);
    store.dispatch(setActiveLoader(false));
    return response.data;
  } catch (error) {
    store.dispatch(setActiveLoader(false));
    let err = { text: "error", error };
    return err;
  } finally {
    store.dispatch(setActiveLoader(false));
  }
};
