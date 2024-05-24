import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { lightTheme, darkTheme } from "../utils/theme";

const ThemeToggle = ({ isDark, toggleDarkMode }) => (
  <IconButton onClick={toggleDarkMode} color="inherit">
    {isDark ? <LightModeIcon /> : <DarkModeIcon />}
  </IconButton>
);

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [value, setValue] = useState(0);
  const themeMaterial = useTheme();
  const isMobile = useMediaQuery(themeMaterial.breakpoints.down("sm"));

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const toggleDarkMode = () => {
    dispatch(setDarkmode(!isDark));
  };

  return (
    <AppBar position="sticky" sx={{ background: `${theme.bg}` }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Santhosh BlogS
        </Typography>
        {isLoggedIn && !isMobile && (
          <Box display="flex" flexGrow={1}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              indicatorColor="secondary"
            >
              <Tab component={Link} to="/blogs" label="All Blogs" />
              <Tab component={Link} to="/myBlogs" label="My Blogs" />
              <Tab component={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" alignItems="center">
          {!isLoggedIn ? (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                SignUp
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleLogout}
                component={Link}
                to="/login"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Logout
              </Button>
              {isMobile && (
                <IconButton edge="end" color="inherit">
                  <MenuIcon />
                </IconButton>
              )}
            </>
          )}
          <ThemeToggle isDark={isDark} toggleDarkMode={toggleDarkMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
