import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { setUserDetails } from "../../redux/reducer/userSlider";
import { login, todoPagination } from "../../services/apiCollection";
import { addAllToDo } from "../../redux/reducer/todoReducerSlider";
import CustomSnackbars from "../../sharedComponent/customSnackbars";
import { passwordValidate } from "../../utils";

import {
  forgotDivStyle,
  forgotFontStyle,
  iconStyle,
  lockIconStyle,
  mainDiv,
  textInputStyle,
  wrapperDiv,
} from "./styles";
import CustomMessageModal from "../../sharedComponent/customMessageModal";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: ``,
    password: ``,
  });
  const [showPassword, setShowPassword] = useState(false);
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
    value: {},
  });

  const onHandleChange = (event, field) => {
    setUserData({ ...userData, [field]: event.target.value });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (
      !Boolean(userData["username"].length) ||
      !Boolean(userData["password"].length)
    ) {
      setToggle({
        val: true,
        message: `All fields are mandatroy`,
        severity: "warning",
      });
      return;
    }

    let pwd = passwordValidate(userData, setToggle);
    if (pwd) {
      try {
        let res = await login(userData);
        if (res?.text !== `error`) {
          let authToken = {
            tokenType: res.tokenType,
            accessToken: res.accessToken,
          };
          localStorage.setItem("token", JSON.stringify(authToken));
          delete res.tokenType;
          delete res.accessToken;
          dispatch(setUserDetails({ ...res }));
          setToggle({
            val: true,
            message: `Login Successfully`,
            severity: "success",
          });
          // await apiCall();
          navigate("/dashboard");
        } else {
          setMessage({
            toggle: true,
            title: res?.error?.response?.data?.error || "",
            description: res?.error?.response?.data?.message || "",
            value: "error",
          });
        }
      } catch (error) {
        console.log("error ====>", error);
      }
    } else {
      let msg = `Password are not validate`;
      setToggle({
        val: true,
        message: msg,
        severity: "error",
      });
    }
  };

  const apiCall = async () => {
    let res = await todoPagination(1, 5);
    if (res?.text !== `error`) {
      dispatch(addAllToDo(res));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToggle({ val: false, message: "", severity: "" });
  };

  const onHandleNavigateSignIn = () => {
    navigate("/signin");
  };

  const onHandleClose = () => {
    setMessage({
      toggle: false,
      title: ``,
      description: ``,
      value: ``,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box component="span" display={"flex"} justifyContent={"center"}>
      <Box>
        <Box sx={wrapperDiv} component="form" onSubmit={onHandleSubmit}>
          <Box component={"span"} sx={mainDiv}>
            <Box component={"span"} sx={lockIconStyle}>
              <LockOpenIcon sx={iconStyle} />
            </Box>
            <Typography variant="h5">{`Sign in`}</Typography>
          </Box>
          <TextField
            id="user-name"
            label="User Name"
            variant="outlined"
            sx={textInputStyle}
            onChange={(e) => onHandleChange(e, `username`)}
            required
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            sx={textInputStyle}
            onChange={(e) => onHandleChange(e, `password`)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" onClick={onHandleSubmit} type="submit">
            Login
          </Button>
        </Box>
        <Box component={"span"} sx={forgotDivStyle}>
          <Typography
            component={"span"}
            paragraph
            sx={forgotFontStyle}
            onClick={() => {
              console.log("forgot password");
            }}
          >{`Forgot password?`}</Typography>
          <Typography
            component={"span"}
            paragraph
            sx={forgotFontStyle}
            onClick={onHandleNavigateSignIn}
          >{`Don't have an account? Sign Up`}</Typography>
        </Box>
      </Box>
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
          isOk={true}
          okText={`Ok`}
          onHandleOkay={onHandleClose}
          onHandleClose={onHandleClose}
        />
      )}
    </Box>
  );
}

export default Login;
