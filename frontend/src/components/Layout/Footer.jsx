import { Link, NavLink } from "react-router-dom";
import NeuLogo from "../../assets/brand/NeuCode.png";
import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PlaceIcon from '@mui/icons-material/Place';

import "../../styles/FooterStyles.css";

const Footer = () => {
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
          src={NeuLogo}
          alt="Logo"
          style={{ height: "100%", padding:'25px'}}
        />
        <Box>
          <Typography
            variant="h4"
            sx={{
              marginTop: "20px",
              fontFamily: "Josefin Sans",
              color: "#0d4e8b",
              "@media (max-width: 600px)": {
                fontSize: "1.3rem",
              },
            }}
          >
            Truy cập nhanh
          </Typography>
          <ul className="footer-menu">
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
        {/* <Typography
          variant="h5"
          sx={{
            "@media (max-width: 600px)": {
              fontSize: "1.3rem",
            },
          }}
        >
          All Rights Reserved &copy; Techinfo YT
        </Typography> */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              marginTop: "20px",
              fontFamily: "Josefin Sans",
              color: "#0d4e8b",
              "@media (max-width: 600px)": {
                fontSize: "1.3rem",
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
            variant="h4"
            sx={{
              marginTop: "20px",
              fontFamily: "Josefin Sans",
              color: "#0d4e8b",
              "@media (max-width: 600px)": {
                fontSize: "1.3rem",
              },
            }}
          >
            Liên Hệ
          </Typography>
          <ul className = "footer-menu" style={{paddingBottom: '20px', marginLeft: '0'}}>
            <li>
              <PlaceIcon style={{fontSize: '20px'}}/>
              <a href="https://www.neu.edu.vn/">Trường Đại Học Kinh Tế Quốc Dân</a>
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
