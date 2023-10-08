import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { setTodoReset } from "../../redux/reducer/todoReducerSlider";
import { setUserReset } from "../../redux/reducer/userSlider";
import { delayFunction } from "../../utils";

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
    delayFunction(() => {
      dispatch(setTodoReset());
      dispatch(setUserReset());
      localStorage.removeItem("token");
      navigate("/");
    }, 2000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          {Object.values(user).length > 0 && (
            <>
              <Tooltip title="Deashboard" arrow>
                <IconButton color="inherit" onClick={onHandleSwitchToDashboard}>
                  <DashboardIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Setting" arrow>
                <IconButton color="inherit" onClick={onHandleSwitchToSetting}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sign out" arrow>
                <IconButton color="inherit" onClick={onHandleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
