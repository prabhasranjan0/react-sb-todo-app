import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import {
  boxSpanStyle,
  headerBoxStyle,
  headerTextStyle,
  mainBoxStyle,
  textInputStyle,
} from "./styles";
import CustomSnackbars from "../../sharedComponent/customSnackbars";

function ProfileSetting() {
  const userData = useSelector((state) => state.user.user);
  const [user, setUser] = useState(userData);
  const [toggle, setToggle] = useState({
    val: false,
    message: ``,
    severity: "",
  });

  const onHandleUpdate = (e) => {
    e.preventDefault();
    // if (user?.name?.length <= 0 || user?.name === userData.name) {
    //   setToggle({
    //     val: true,
    //     message:
    //       user?.name === userData.name
    //         ? `Please update user name`
    //         : `Name field is mandatory.`,
    //     severity: "warning",
    //   });
    //   return;
    // }

    // dispatch(setUserDetails(user));
    // setToggle({
    //   val: true,
    //   message: `User details are updated`,
    //   severity: "success",
    // });
    // console.log("onHandleUpdate");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToggle({ val: false, message: "", severity: "" });
  };

  return (
    <Box component="span" display={"flex"} justifyContent={"center"}>
      <Box component="span" sx={mainBoxStyle}>
        <Box component="span" sx={boxSpanStyle}>
          <Typography
            component={"span"}
            paragraph
            sx={headerTextStyle}
          >{`User Portfolio`}</Typography>
          <Box component="form" onSubmit={onHandleUpdate} sx={headerBoxStyle}>
            <TextField
              id="profile-setting-user-name"
              label="User Name"
              variant="outlined"
              sx={textInputStyle}
              size="small"
              value={user["username"]}
              // onChange={(event) => onHandleChange(event, "name")}
              required
              disabled
            />
            <TextField
              id="profile-setting-user-email"
              label="Email Id"
              variant="outlined"
              sx={textInputStyle}
              size="small"
              value={user["email"]}
              // onChange={(event) => onHandleChange(event, "email")}
              required
              disabled
            />
            <TextField
              id="profile-setting-user-password"
              label="Password"
              variant="outlined"
              sx={textInputStyle}
              size="small"
              value={user["password"]}
              type="password"
              disabled
              // onChange={(event) => onHandleChange(event, "password")}
              required
            />
            <Button
              variant="contained"
              fullWidth
              onClick={onHandleUpdate}
              type="submit"
              disabled
            >
              Update
            </Button>
          </Box>
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
    </Box>
  );
}

export default ProfileSetting;
