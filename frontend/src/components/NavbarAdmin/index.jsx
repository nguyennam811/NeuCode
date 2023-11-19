import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, theme, Avatar } from "antd";
import React, { useState } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";
import { useSubmit } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import NeuCode from "../../assets/brand/NeuCode.png";
import NeuCodeMini from "../../assets/brand/NeuCode - Mini.png";
import SchoolIcon from "@mui/icons-material/School";
import BackupIcon from "@mui/icons-material/Backup";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const { Header, Sider } = Layout;

const Navbar = () => {
  const location = useLocation();
  const user = useLoaderData();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const submit = useSubmit();
  const handleSignOut = () => {
    submit(null, { action: "/logout", method: "post" });
    toast.success("Đăng xuất thành công.");
  };

  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "white" }}
        >
          <Box position={"fixed"} width={!collapsed ? "200px" : "80px"}>
            {!collapsed ? (
              <NavLink className="logo" to="/admin/">
                <img
                  src={NeuCode}
                  alt="Logo"
                  style={{
                    height: "70px",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleItemClick("dashboard")}
                />
              </NavLink>
            ) : (
              <NavLink className="logo" to="/admin/">
                <img
                  src={NeuCodeMini}
                  alt="Logo"
                  style={{
                    height: "50px",
                    padding: "3px",
                    cursor: "pointer",
                    marginTop: "7px",
                  }}
                  onClick={() => handleItemClick("dashboard")}
                />
              </NavLink>
            )}
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                !collapsed ? (
                  <ListSubheader component="div" id="nested-list-subheader">
                    Admin Manager
                  </ListSubheader>
                ) : (
                  <ListSubheader component="div" id="nested-list-subheader">
                    Manager
                  </ListSubheader>
                )
              }
            >
              <NavLink to="/admin">
                <ListItemButton
                  selected={selectedItem === "dashboard"}
                  onClick={() => handleItemClick("dashboard")}
                  style={{
                    color: "black",
                    backgroundColor:
                      location.pathname === "/admin" && "#1037e314",
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Dashboard" />}
                </ListItemButton>
              </NavLink>

              <NavLink to="/admin/problems">
                <ListItemButton
                  selected={selectedItem === "problems"}
                  onClick={() => handleItemClick("problems")}
                  style={{
                    color: "black",
                    backgroundColor:
                      location.pathname === "/admin/problems" && "#1037e314",
                  }}
                >
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Problems" />}
                </ListItemButton>
              </NavLink>

              <NavLink to="/admin/courses">
                <ListItemButton
                  selected={selectedItem === "courses"}
                  onClick={() => handleItemClick("courses")}
                  style={{
                    color: "black",
                    backgroundColor:
                      location.pathname === "/admin/courses" && "#1037e314",
                  }}
                >
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Courses" />}
                </ListItemButton>
              </NavLink>

              <NavLink to="/admin/submissions">
                <ListItemButton
                  selected={selectedItem === "submissions"}
                  onClick={() => handleItemClick("submissions")}
                  style={{
                    color: "black",
                    backgroundColor:
                      location.pathname === "/admin/submissions" && "#1037e314",
                  }}
                >
                  <ListItemIcon>
                    <BackupIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Submissions" />}
                </ListItemButton>
              </NavLink>
            </List>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                color: "black",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  User
                </ListSubheader>
              }
            >
              <NavLink to="/admin/users">
                <ListItemButton
                  selected={selectedItem === "users"}
                  onClick={() => handleItemClick("users")}
                  style={{
                    color: "black",
                    backgroundColor:
                      location.pathname === "/admin/users" && "#1037e314",
                  }}
                >
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Users" />}
                </ListItemButton>
              </NavLink>
            </List>
          </Box>
        </Sider>

        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "fixed",
                zIndex: "2000",
                backgroundColor: "white",
              }}
              width={!collapsed ? "calc(100% - 200px)" : "calc(100% - 80px)"}
            >
              <Box sx={{ fontSize: "18px" }} ml={1}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </Box>
              <Box width={80}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src={NeuCodeMini} size={"large"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonIcon fontSize="medium" />
                    </ListItemIcon>
                    {`${user.fullname}`}
                    <br />
                    {`${user.sub}`}
                  </MenuItem>

                  <Divider />
                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Header>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 3 },
              bgcolor: "rgb(238, 242, 246, 0.8)",
              minHeight: "100vh",
              position: "relative",
              zIndex: 1201,
              transition: "0.4s",
            }}
          >
            <Outlet />
          </Box>
        </Layout>
      </Layout>
    </>
  );
};

export default Navbar;
