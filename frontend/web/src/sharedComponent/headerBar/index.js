import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { setTodoReset } from "../../redux/reducer/todoReducerSlider";
import { setUserReset } from "../../redux/reducer/userSlider";

export default function HeaderBar(props) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onHandleSwitchToSetting = () => {
    navigate("/profile-setting");
  };

  const onHandleSwitchToDashboard = () => {
    navigate("/dashboard");
  };

  const onHandleLogout = () => {
    dispatch(setTodoReset());
    dispatch(setUserReset());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          {Object.values(user).length > 0 && (
            <>
              <IconButton color="inherit" onClick={onHandleSwitchToDashboard}>
                <DashboardIcon />
              </IconButton>
              <IconButton color="inherit" onClick={onHandleSwitchToSetting}>
                <SettingsIcon />
              </IconButton>
              <IconButton color="inherit" onClick={onHandleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
