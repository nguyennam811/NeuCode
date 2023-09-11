import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import NeuCode from "../../assets/brand/NeuCode.png";
import { Link, NavLink } from "react-router-dom";
import "../../styles/HeaderStyles.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link to="/">
        <img
          src={NeuCode}
          alt="Logo"
          style={{ height: "70px", padding: "5px", cursor: "pointer" }}
        />
      </Link>
      <Divider />
      <ul className="mobile-navigation">
        {/* <li>
          <NavLink activeClassName="active" to={"/"}>
            HOME
          </NavLink>
        </li> */}
        <li>
          <NavLink to={"/problems"}>PROBLEMS</NavLink>
        </li>
        <li>
          <NavLink to={"/submissions"}>SUBMISSIONS</NavLink>
        </li>
        <li>
          <NavLink to={"/users"}>USERS</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>ABOUT</NavLink>
        </li>
      </ul>
    </Box>
  );
  return (
    <>
      <Box sx={{ height: "74px" }}>
        <AppBar component={"nav"} sx={{ bgcolor: "white" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                sx={{
                  mr: 2,
                  display: { sm: "none" },
                }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon
                  sx={{
                    fontSize: "30px",
                  }}
                />
              </IconButton>
              <Link to="/">
                <img
                  src={NeuCode}
                  alt="Logo"
                  style={{ height: "70px", padding: "5px", cursor: "pointer" }}
                />
              </Link>
              {/* 
xs - Đại diện cho các màn hình có độ rộng nhỏ hơn hoặc bằng 600px. Thường được sử dụng cho các thiết bị di động, như điện thoại di động.
sm - Đại diện cho các màn hình có độ rộng lớn hơn 600px. Thường được sử dụng cho các thiết bị như máy tính bảng và các thiết bị có màn hình trung bình.
md - Đại diện cho các màn hình có độ rộng lớn hơn 960px. Thường được sử dụng cho các máy tính và màn hình lớn. 
*/}
              <Box sx={{ display: { xs: "none", sm: "block" }}}>
                <ul className="navigation-menu">
                  {/* <li>
                    <NavLink to={"/"}>HOME</NavLink>
                  </li> */}
                  <li>
                    <NavLink to={"/problems"}>PROBLEMS</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/submissions"}>SUBMISSIONS</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/users"}>USERS</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/about"}>ABOUT</NavLink>
                  </li>
                </ul>
              </Box>
            </Box>

            <Box>
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Josefin Sans",
                  backgroundColor: "#466a8a",
                  borderRadius: "50px",
                  padding: "10px 25px",
                  width: "150px",
                }}
              >
                Đăng nhập
              </Button>

              {/* <Button
                variant="contained"
                sx={{
                  fontFamily: "Josefin Sans",
                  backgroundColor: "#466a8a",
                  borderRadius: "50px",
                  padding: "10px 25px",
                  marginLeft: '20px',
                  width: "150px",
                }}
              >
                Đăng ký
              </Button> */}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "260px",
              },
              // Điều này đặt kiểu dáng cho các phần tử con của .MuiDrawer-paper
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        {/* <Box sx = {{ p: 10 , backgroundColor: 'red'}}>
          <Toolbar sx = {{ backgroundColor: 'blue'}} />
          <AppBar sx = {{ backgroundColor: 'pink'}} />
        </Box> */}
      </Box>
    </>
  );
};

export default Header;

// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Layout, theme, Row, Col, Avatar } from "antd";
// import React, { useState } from "react";
// // import Router from "../router/Router";
// import { Link } from "react-router-dom";

// import ListSubheader from "@mui/material/ListSubheader";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";

// import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
// import UpgradeIcon from "@mui/icons-material/Upgrade";
// import PersonIcon from '@mui/icons-material/Person';
// import { NavLink, useNavigate } from "react-router-dom";
// // import App from "../../App";

// const { Header, Sider, Content } = Layout;

// const Navbar = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   const [selectedItem, setSelectedItem] = useState('dashboard');
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//   };

//   // const user = useSelector((state) => state.auth.login.currentUser);

//   // const user = true;
//   // const accessToken = user?.accessToken;
//   // const id = user?._id;
//   // const dispatch = useDispatch();
//   const navigate = useNavigate();

//   return (
//     <div>
//       <nav className="" style={{ paddingTop: "0 !important " }}>
//         <div>

//           { (
//             <>

//               <Layout>
//                 <Sider
//                   trigger={null}
//                   collapsible
//                   collapsed={collapsed}
//                   style={{ backgroundColor: "white" }}
//                 >
//                   {!collapsed && (
//                     <NavLink className="logo" to="/">
//                       Admin
//                     </NavLink>
//                   )}
//                   <List
//                     sx={{
//                       width: "100%",
//                       bgcolor: "background.paper",
//                       color: "black",
//                     }}
//                     component="nav"
//                     aria-labelledby="nested-list-subheader"
//                     subheader={
//                       <ListSubheader component="div" id="nested-list-subheader">
//                         Admin Manager
//                       </ListSubheader>
//                     }
//                   >
//                     <Link to="/">
//                       <ListItemButton
//                         selected={selectedItem === "dashboard"}
//                         onClick={() => handleItemClick("dashboard")}
//                       >
//                         <ListItemIcon>
//                           <DashboardIcon />
//                         </ListItemIcon>
//                         {!collapsed && <ListItemText primary="Dashboard" />}
//                       </ListItemButton>
//                     </Link>

//                     <Link to="/user">
//                       <ListItemButton
//                         selected={selectedItem === "user"} // check if this is the selected item
//                         onClick={() => handleItemClick("user")}
//                       >
//                         <ListItemIcon>
//                           <PersonIcon />
//                         </ListItemIcon>
//                         {!collapsed && <ListItemText primary="User" />}
//                       </ListItemButton>
//                     </Link>

//                     <Link to="/product">
//                       <ListItemButton
//                         selected={selectedItem === "products"} // check if this is the selected item
//                         onClick={() => handleItemClick("products")}
//                       >
//                         <ListItemIcon>
//                           <ProductionQuantityLimitsIcon />
//                         </ListItemIcon>
//                         {!collapsed && <ListItemText primary="Products" />}
//                       </ListItemButton>
//                     </Link>

//                     <Link to="/order">
//                       <ListItemButton
//                         selected={selectedItem === "Order"} // check if this is the selected item
//                         onClick={() => handleItemClick("Order")}
//                       >
//                         <ListItemIcon>
//                           <RequestQuoteIcon />
//                         </ListItemIcon>
//                         {!collapsed && <ListItemText primary="Order" />}
//                       </ListItemButton>
//                     </Link>

//                     <Link to="/contact">
//                       <ListItemButton
//                         selected={selectedItem === "Contact"} // check if this is the selected item
//                         onClick={() => handleItemClick("Contact")}
//                       >
//                         <ListItemIcon>
//                           <ConnectWithoutContactIcon />
//                         </ListItemIcon>
//                         {!collapsed && <ListItemText primary="Contact" />}
//                       </ListItemButton>
//                     </Link>
//                   </List>
//                   <List
//                     sx={{
//                       width: "100%",
//                       bgcolor: "background.paper",
//                       color: "black",
//                     }}
//                     component="nav"
//                     aria-labelledby="nested-list-subheader"
//                     subheader={
//                       <ListSubheader component="div" id="nested-list-subheader">
//                         Create
//                       </ListSubheader>
//                     }
//                   >
//                     <Link to="/upload">
//                       <ListItemButton
//                         selected={selectedItem === "Create Product"}
//                         onClick={() => handleItemClick("Create Product")}
//                       >
//                         <ListItemIcon>
//                           <UpgradeIcon />
//                         </ListItemIcon>
//                         {!collapsed && (
//                           <ListItemText primary="Create Product" />
//                         )}
//                       </ListItemButton>
//                     </Link>
//                   </List>
//                 </Sider>
//                 <Layout className="site-layout">
//                   <Header
//                     style={{
//                       padding: 0,
//                       background: colorBgContainer,
//                     }}
//                   >
//                     <Row>
//                       <Col md={18}>
//                         {React.createElement(
//                           collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
//                           {
//                             className: "trigger",
//                             onClick: () => setCollapsed(!collapsed),
//                           }
//                         )}
//                       </Col>
//                       <Col md={6}>
//                         <div>
//                           <Avatar
//                             size="default"
//                             icon={<UserOutlined />}
//                           ></Avatar>
//                           <button className="btn ms-2 btn-outline-light">
//                             {" "}
//                             <i class="fa fa-user"></i>
//                             <span> hahaa </span>
//                           </button>
//                           <NavLink
//                             to="/logout"
//                             className="ms-2"
//                           >
//                             <button className="btn ms-2 btn-outline-secondary">
//                               {" "}
//                               <i className="fa fa-sign-out me-1"></i>
//                               <span> Log out </span>
//                             </button>
//                           </NavLink>
//                         </div>
//                       </Col>
//                     </Row>
//                   </Header>
//                   <Content
//                     style={{
//                       margin: "24px 16px",
//                       padding: 24,
//                       minHeight: "100vh",
//                       background: colorBgContainer,
//                     }}
//                   >
//                   </Content>
//                 </Layout>
//               </Layout>
//             </>
//           ) }
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;