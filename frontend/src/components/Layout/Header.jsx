import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import NeuCode from "../../assets/brand/NeuCode.png"
import { Link } from "react-router-dom";
import '../../styles/HeaderStyles.css'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

const Header = () => {
    const [mobileOpen, setMobileOpen] =useState(false)
    return ( 
        <>
            <Box>
                <AppBar component = {"nav"} sx = {{bgcolor: "white"}}>
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            sx={{
                                mr: 2,
                                display: {sm: "none"},
                            }}
                        >
                            <MenuIcon sx={{
                                fontSize: "30px",
                            }}/>
                        </IconButton>
                        <Link to="/">
                            <img
                                src={NeuCode}
                                alt="Logo"
                                style={{ height: '70px', padding: '5px', cursor: 'pointer' }}
                            />
                        </Link>
{/* 
xs - Đại diện cho các màn hình có độ rộng nhỏ hơn hoặc bằng 600px. Thường được sử dụng cho các thiết bị di động, như điện thoại di động.
sm - Đại diện cho các màn hình có độ rộng lớn hơn 600px. Thường được sử dụng cho các thiết bị như máy tính bảng và các thiết bị có màn hình trung bình.
md - Đại diện cho các màn hình có độ rộng lớn hơn 960px. Thường được sử dụng cho các máy tính và màn hình lớn. 
*/}
                        <Box sx = {{display: { xs: "none", sm: "block"}}}>
                            <ul className="navigation-menu">
                                <li>
                                    <Link to={'/'}>Home</Link>
                                </li>
                                <li>
                                    <Link to={'/menu'}>Menu</Link>
                                </li>
                                <li>
                                    <Link to={'/about'}>About</Link>
                                </li>
                                <li>
                                    <Link to={'/contact'}>Contact</Link>
                                </li>
                            </ul>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
     );
}
 
export default Header;

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// import NeuCode from "../../assets/brand/NeuCode.png"

// const pages = ['Products', 'Pricing', 'Blog'];

// const Header = () => {
//     return ( 
//         <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
//           {/* <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography> */}
//           <img
//         src={NeuCode} // Thay đổi đường dẫn đến ảnh của bạn
//         alt="Logo"
//         sx={{
//           display: { xs: 'none', md: 'flex' },
//         //   marginRight: 1,
//           height: '20px', // Thay đổi kích thước ảnh theo nhu cầu của bạn
//           width: '20px',
//         }}
//       />

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//             >
//               {/* {settings.map((setting) => (
//                 <MenuItem key={setting} >
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))} */}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//      );
// }
 
// export default Header;

