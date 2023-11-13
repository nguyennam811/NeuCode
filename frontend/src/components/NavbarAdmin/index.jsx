import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, theme, Avatar } from "antd";
import React, { useState } from "react";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from '@mui/icons-material/ViewList';
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Logout, Settings } from "@mui/icons-material";
import NeuCode from "../../assets/brand/NeuCode.png";
import NeuCodeMini from "../../assets/brand/NeuCode - Mini.png";
import SchoolIcon from '@mui/icons-material/School';
import BackupIcon from '@mui/icons-material/Backup';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const { Header, Sider, Content } = Layout;

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
          {!collapsed ? (
            <NavLink className="logo" to="/admin">
              <img
                src={NeuCode}
                alt="Logo"
                style={{
                  height: "70px",
                  padding: "5px",
                  cursor: "pointer",
                }}
              />
            </NavLink>
          ) : (
            <NavLink className="logo" to="/admin">
              <img
                src={NeuCodeMini}
                alt="Logo"
                style={{
                  height: "50px",
                  padding: "3px",
                  cursor: "pointer",
                  marginTop: "7px",
                }}
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
            <Link to="/admin">
              <ListItemButton
                selected={selectedItem === "dashboard"}
                onClick={() => handleItemClick("dashboard")}
                style={{ color: "black", backgroundColor: location.pathname === "/admin" && "#1037e314" }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Dashboard" />}
              </ListItemButton>
            </Link>

            <Link to="/admin/problems">
              <ListItemButton
                selected={selectedItem === "problems"} // check if this is the selected item
                onClick={() => handleItemClick("problems")}
                style={{ color: "black", backgroundColor: location.pathname === "/admin/problems" && "#1037e314" }}
              >
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Problems" />}
              </ListItemButton>
            </Link>

            <Link to="/admin/courses">
              <ListItemButton
                selected={selectedItem === "courses"} // check if this is the selected item
                onClick={() => handleItemClick("courses")}
                style={{ color: "black", backgroundColor: location.pathname === "/admin/courses" && "#1037e314"  }}
              >
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Courses" />}
              </ListItemButton>
            </Link>

            <Link to="/admin/submissions">
              <ListItemButton
                selected={selectedItem === "submissions"} // check if this is the selected item
                onClick={() => handleItemClick("submissions")}
                style={{ color: "black", backgroundColor: location.pathname === "/admin/submissions" && "#1037e314"  }}
              >
                <ListItemIcon>
                  <BackupIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Submissions" />}
              </ListItemButton>
            </Link>

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
            <Link to="/admin/users">
              <ListItemButton
                selected={selectedItem === "users"}
                onClick={() => handleItemClick("users")}
                style={{ color: "black", backgroundColor: location.pathname === "/admin/users" && "#1037e314"  }}
              >
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Users" />}
              </ListItemButton>
            </Link>
          </List>
        </Sider>

        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{fontSize: '18px'}} ml={1}>
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
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="medium" />
                    </ListItemIcon>
                    {`${user.sub}`}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
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
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Navbar;
