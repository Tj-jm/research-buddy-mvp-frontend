import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
    setDrawerOpen(false);
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Future", path: "/future" },
    ...(user
      ? [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Faculty Scraper", path: "/faculty-scraper" }, // ✅ NEW
          { label: "Logout", action: handleLogoutClick },
        ]
      : [
          { label: "Sign Up", path: "/signup" },
          { label: "Login", path: "/login" },
        ]),
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Research Buddy
          </Box>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <List sx={{ width: 250 }}>
                  {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={
                          item.action
                            ? item.action
                            : () => {
                                navigate(item.path);
                                setDrawerOpen(false);
                              }
                        }
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Box>
              {menuItems.map((item, index) =>
                item.action ? (
                  <Button key={index} color="inherit" onClick={item.action}>
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={index}
                    color="inherit"
                    component={Link}
                    to={item.path}
                  >
                    {item.label}
                  </Button>
                )
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
