import { AppBar, Box, Divider, Drawer, IconButton, Toolbar } from "@mui/material";
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
        <li>
          <NavLink activeClassName="active" to={"/"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/menu"}>Menu</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li>
          <NavLink to={"/contact"}>Contact</NavLink>
        </li>
      </ul>
    </Box>
  );
  return (
    <>
      <Box sx = {{height: '74px'}}>
        <AppBar component={"nav"} sx={{ bgcolor: "white"}}>
          <Toolbar>
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
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/menu"}>Menu</NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>About</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"}>Contact</NavLink>
                </li>
              </ul>
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
