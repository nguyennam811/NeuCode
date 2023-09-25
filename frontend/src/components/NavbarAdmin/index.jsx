import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, theme, Avatar } from "antd";
import React, { useState } from "react";
// import Router from "../router/Router";
import { Link, Outlet, useLoaderData } from "react-router-dom";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import UpgradeIcon from "@mui/icons-material/Upgrade";
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

// import App from "../../App";

const { Header, Sider, Content } = Layout;

const Navbar = () => {
  const user = useLoaderData();
  const [collapsed, setCollapsed] = useState(false);

  const [selectedItem, setSelectedItem] = useState("dashboard");
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
            <Link to="/admin/">
              <ListItemButton
                selected={selectedItem === "dashboard"}
                onClick={() => handleItemClick("dashboard")}
                style={{ color: "black" }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Dashboard" />}
              </ListItemButton>
            </Link>

            <Link to="/admin/user">
              <ListItemButton
                selected={selectedItem === "user"} // check if this is the selected item
                onClick={() => handleItemClick("user")}
                style={{ color: "black" }}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="User" />}
              </ListItemButton>
            </Link>

            <Link to="/admin/product">
              <ListItemButton
                selected={selectedItem === "products"} // check if this is the selected item
                onClick={() => handleItemClick("products")}
                style={{ color: "black" }}
              >
                <ListItemIcon>
                  <ProductionQuantityLimitsIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Products" />}
              </ListItemButton>
            </Link>

            <Link to="/admin/order">
              <ListItemButton
                selected={selectedItem === "Order"} // check if this is the selected item
                onClick={() => handleItemClick("Order")}
                style={{ color: "black" }}
              >
                <ListItemIcon>
                  <RequestQuoteIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Order" />}
              </ListItemButton>
            </Link>

            <Link to="/admin/contact">
              <ListItemButton
                selected={selectedItem === "Contact"} // check if this is the selected item
                onClick={() => handleItemClick("Contact")}
                style={{ color: "black" }}
              >
                <ListItemIcon>
                  <ConnectWithoutContactIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Contact" />}
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
                Create
              </ListSubheader>
            }
          >
            <Link to="/admin/upload">
              <ListItemButton
                selected={selectedItem === "Create Product"}
                onClick={() => handleItemClick("Create Product")}
                style={{ color: "black" }}
              >
                <ListItemIcon>
                  <UpgradeIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Create Product" />}
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
