import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CustomSnackbars from "../../sharedComponent/customSnackbars";

import { passwordValidate, validateEmail } from "../../utils";
import {
  forgotDivStyle,
  forgotFontStyle,
  iconStyle,
  lockIconStyle,
  mainDiv,
  textInputStyle,
  wrapperDiv,
} from "./styles";
import { signup } from "../../services/apiCollection";
import CustomMessageModal from "../../sharedComponent/customMessageModal";

function Signin() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: ``,
    email: ``,
    password: ``,
  });

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

  const onHandleChange = (event, field) => {
    setSignupData({ ...signupData, [field]: event.target.value });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (
      !Boolean(signupData["username"].length) ||
      !Boolean(signupData["email"].length) ||
      !Boolean(signupData["password"].length)
    ) {
      setToggle({
        val: true,
        message: `All fields are mandatroy`,
        severity: "warning",
      });
      return;
    }

    let val = validateEmail(signupData, setToggle);
    let pwd = passwordValidate(signupData, setToggle);
    if (val && pwd) {
      let res = await signup({ ...signupData });
      if (res?.text !== `error`) {
        setMessage({
          toggle: true,
          title: `Auth Signup Response`,
          description: res.message,
          value: "success",
        });
      } else {
        setMessage({
          toggle: true,
          title: `Auth Signup Response`,
          description: res?.error?.message,
          value: "error",
        });
      }
    } else {
      let msg =
        !val && !pwd
          ? `Email and Password are not validate`
          : !val
          ? `Email is not validate`
          : `Password is not validate`;
      setToggle({
        val: true,
        message: msg,
        severity: "error",
      });
    }
  };

  const onHandleClose = () => {
    setMessage({
      toggle: false,
      title: ``,
      description: ``,
      value: ``,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToggle({ val: false, message: "", severity: "" });
  };

  const onHandleNavigateLogin = () => {
    navigate("/");
  };

  const onHandleOk = () => {
    if (message["value"] === `success`) {
      navigate("/");
    } else {
      onHandleClose();
    }
  };

  return (
    <Box component="span" display={"flex"} justifyContent={"center"}>
      <Box>
        <Box sx={wrapperDiv} component="form" onSubmit={onHandleSubmit}>
          <Box component={"span"} sx={mainDiv}>
            <Box component={"span"} sx={lockIconStyle}>
              <PersonIcon sx={iconStyle} />
            </Box>
            <Typography variant="h5">{`Sign up`}</Typography>
          </Box>
          <TextField
            id="username"
            label="User Name"
            variant="outlined"
            sx={textInputStyle}
            onChange={(e) => onHandleChange(e, `username`)}
            required
          />
          <TextField
            id="email-id"
            label="Email Id"
            variant="outlined"
            sx={textInputStyle}
            onChange={(e) => onHandleChange(e, `email`)}
            required
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            sx={textInputStyle}
            onChange={(e) => onHandleChange(e, `password`)}
            required
          />
          <Button variant="contained" onClick={onHandleSubmit} type="submit">
            Submit
          </Button>
        </Box>
        <Box
          component={"span"}
          display={"flex"}
          justifyContent={"space-between"}
          sx={forgotDivStyle}
        >
          <Typography
            component={"span"}
            paragraph
            sx={forgotFontStyle}
            onClick={() => {
              console.log("forgot password");
            }}
          >{``}</Typography>
          <Typography
            component={"span"}
            paragraph
            sx={forgotFontStyle}
            onClick={onHandleNavigateLogin}
          >{`Already have an account? Sign in`}</Typography>
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
          onHandleOkay={onHandleOk}
          onHandleClose={onHandleClose}
        />
      )}
    </Box>
  );
}

export default Signin;
