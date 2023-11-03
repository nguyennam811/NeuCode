import { NavLink } from "react-router-dom";
import NeuCode from "../../../assets/brand/NEULogo.png";
import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PlaceIcon from "@mui/icons-material/Place";
import "../../../styles/globals.css";
import { getCurrentUser } from "../../../utils/auth";

const Footer = () => {
  const user = getCurrentUser();
  return (
    <>
      <Box
        id="awan"
        sx={{
          bgcolor: "#8fd4ff",
          color: "black",
          display: "flex",
          justifyContent: "Space-evenly",
        }}
      >
        <img
          className="logo-footer"
          src={NeuCode}
          alt="Logo"
          style={{ height: "100%", padding: "15px" }}
        />
        <Box>
          <Typography
            variant="h5"
            sx={{
              marginTop: "20px",
              fontFamily: "Josefin Sans",
              color: "#0d4e8b",
              "@media (max-width: 600px)": {
                fontSize: "1.1rem",
              },
            }}
          >
            Truy cập nhanh
          </Typography>
          {user.role === 'student' && (
            <ul className="footer-menu">
            <li>
              <NavLink to={`${user.role}/problems`}>Problems</NavLink>
            </li>
            <li>
              <NavLink to={`${user.role}/submissions`}>Submissions</NavLink>
            </li>
            <li>
              <NavLink to={`${user.role}/courses`}>Courses</NavLink>
            </li>
            <li>
              <NavLink to={`${user.role}/about`}>About</NavLink>
            </li>
          </ul>
          )}
          {user.role === 'teacher' && (
            <ul className="footer-menu">
            <li>
              <NavLink to={`${user.role}/problems`}>Problems</NavLink>
            </li>
            <li>
              <NavLink to={`${user.role}/courses`}>Courses</NavLink>
            </li>
            
          </ul>
          )}
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              marginTop: "20px",
              fontFamily: "Josefin Sans",
              color: "#0d4e8b",
              "@media (max-width: 600px)": {
                fontSize: "1.1rem",
              },
            }}
          >
            Nguồn tài liệu
          </Typography>
          <ul className="footer-menu">
            <li>
              <a href="https://codelearn.io/learning">Codelearn</a>
            </li>
            <li>
              <a href="https://www.w3schools.com/">w3schools</a>
            </li>
            <li>
              <a href="https://www.codecademy.com/">Codecademy</a>
            </li>
          </ul>
        </Box>
        <Box
          sx={{
            // my: 3,
            "& svg": {
              fontSize: "40px",
              cursor: "pointer",
              mr: 2,
            },
            "& svg:hover": {
              color: "#e52626",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
            "@media (max-width: 600px)": {
              "& svg": {
                display: "none",
              },
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginTop: "20px",
              fontFamily: "Josefin Sans",
              color: "#0d4e8b",
              "@media (max-width: 600px)": {
                fontSize: "1.1rem",
              },
            }}
          >
            Liên Hệ
          </Typography>
          <ul
            className="footer-menu"
            style={{ paddingBottom: "20px", marginLeft: "0" }}
          >
            <li>
              <PlaceIcon style={{ fontSize: "20px" }} />
              <a href="https://www.neu.edu.vn/">
                Trường Đại Học Kinh Tế Quốc Dân
              </a>
            </li>
          </ul>

          <InstagramIcon />
          <FacebookIcon />
          <GitHubIcon />
          <YouTubeIcon />
        </Box>
      </Box>
    </>
  );
};

export default Footer;
