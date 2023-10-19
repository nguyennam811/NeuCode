import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import NeuCode from "../../../assets/brand/NeuCode.png";
import {
  Link,
  NavLink,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "../../../styles/globals.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar } from "antd";
import { Logout, Settings } from "@mui/icons-material";
import { useSubmit } from "react-router-dom";
import { toast } from "react-toastify";
import slide2 from "../../../assets/images/Slice2.jpg";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  const user = useLoaderData();
  const location = useLocation();
  const isCurrentPage = (path) => location.pathname.includes(path);

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link to={`${user.role}`}>
        <img
          src={NeuCode}
          alt="Logo"
          style={{ height: "70px", padding: "5px", cursor: "pointer" }}
        />
      </Link>
      <Divider />
      {user.role === "student" && (
        <ul className="mobile-navigation">
          <li>
            <NavLink
              to={"/student/problems"}
              style={{
                color: isCurrentPage("/problems") ? "red" : "",
              }}
            >
              PROBLEMS
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/student/submissions"}
              style={{
                color: isCurrentPage("/submissions") ? "red" : "",
              }}
            >
              SUBMISSIONS
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/student/users"}
              style={{ color: isCurrentPage("/users") ? "red" : "" }}
            >
              USERS
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/student/about"}
              style={{ color: isCurrentPage("/about") ? "red" : "" }}
            >
              ABOUT
            </NavLink>
          </li>
        </ul>
      )}
      {user.role === "teacher" && (
        <ul className="mobile-navigation">
          <li>
            <NavLink
              to={"/teacher/problems"}
              style={{ color: isCurrentPage("/problems") ? "red" : "" }}
            >
              PROBLEMS
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/teacher/create_problem"}
              style={{ color: isCurrentPage("/create_problem") ? "red" : "" }}
            >
              CREATE PROBLEM
            </NavLink>
          </li>
        </ul>
      )}
    </Box>
  );
  return (
    <>
      <Box sx={{ height: "74px" }}>
        <AppBar component={"nav"} sx={{ bgcolor: "white" }} position="fixed">
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
              <Link to={`/${user.role}`}>
                <img
                  src={NeuCode}
                  alt="Logo"
                  style={{
                    height: "70px",
                    padding: "5px",
                    cursor: "pointer",
                    display: "flex",
                  }}
                />
              </Link>
              {/* 
  xs - Đại diện cho các màn hình có độ rộng nhỏ hơn hoặc bằng 600px. Thường được sử dụng cho các thiết bị di động, như điện thoại di động.
  sm - Đại diện cho các màn hình có độ rộng lớn hơn 600px. Thường được sử dụng cho các thiết bị như máy tính bảng và các thiết bị có màn hình trung bình.
  md - Đại diện cho các màn hình có độ rộng lớn hơn 960px. Thường được sử dụng cho các máy tính và màn hình lớn. 
  */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {user.role === "student" && (
                  <ul className="navigation-menu">
                    <li
                      style={{
                        borderBottom: isCurrentPage("/problems")
                          ? "3px solid #ff0000"
                          : "none",
                      }}
                    >
                      <NavLink
                        to={"/student/problems"}
                        style={{
                          color: isCurrentPage("/problems") ? "red" : "",
                        }}
                      >
                        PROBLEMS
                      </NavLink>
                    </li>

                    <li
                      style={{
                        borderBottom: isCurrentPage("/submissions")
                          ? "3px solid #ff0000"
                          : "none",
                      }}
                    >
                      <NavLink
                        to={"/student/submissions"}
                        style={{
                          color: isCurrentPage("/submissions") ? "red" : "",
                        }}
                      >
                        SUBMISSIONS
                      </NavLink>
                    </li>
                    <li
                      style={{
                        borderBottom: isCurrentPage("/users")
                          ? "3px solid #ff0000"
                          : "none",
                      }}
                    >
                      <NavLink
                        to={"/student/users"}
                        style={{ color: isCurrentPage("/users") ? "red" : "" }}
                      >
                        USERS
                      </NavLink>
                    </li>
                    <li
                      style={{
                        borderBottom: isCurrentPage("/about")
                          ? "3px solid #ff0000"
                          : "none",
                      }}
                    >
                      <NavLink
                        to={"/student/about"}
                        style={{ color: isCurrentPage("/about") ? "red" : "" }}
                      >
                        ABOUT
                      </NavLink>
                    </li>
                  </ul>
                )}
                {user.role === "teacher" && (
                  <ul className="navigation-menu">
                    <li
                      style={{
                        borderBottom: isCurrentPage("/problems")
                          ? "3px solid #ff0000"
                          : "none",
                      }}
                    >
                      <NavLink
                        to={"/teacher/problems"}
                        style={{ color: isCurrentPage("/problems") ? "red" : "" }}
                      >
                        PROBLEMS
                      </NavLink>
                    </li>

                    <li
                      style={{
                        borderBottom: isCurrentPage("/create_problem")
                          ? "3px solid #ff0000"
                          : "none",
                      }}
                    >
                      <NavLink
                        to={"/teacher/create_problem"}
                        style={{ color: isCurrentPage("/create_problem") ? "red" : "" }}
                      >
                        CREATE PROBLEM
                      </NavLink>
                    </li>
                  </ul>
                )}
              </Box>
            </Box>

            {user ? (
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src={slide2} size={"large"} />
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
            ) : (
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
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </Button>
              </Box>
            )}
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
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default Header;
