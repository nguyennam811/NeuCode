import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import {
  FullscreenOutlined,
  SettingOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";

function EditorNav(props) {
  const { languages, setLanguage, theme, setTheme, fontSizes, setFontSizes } =
    props;

  const [open, setOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const themeButtons = ["vs-dark", "light"];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const currencies = [
    "12px",
    "13px",
    "14px",
    "15px",
    "16px",
    "17px",
    "18px",
    "19px",
    "20px",
    "21px",
    "22px",
    "23px",
    "24px",
    "25px",
    "26px",
    "27px",
    "28px",
    "29px",
    "30px",
  ];

  const toggleFullScreen = () => {
    const elem = document.documentElement;
    //elem là một tham chiếu đến phần tử gốc của trang web (thường là phần tử <html>).

    if (!isFullScreen) {
      // if (!document.fullscreenElement) {
      // Đây là một thuộc tính của đối tượng document trong DOM (Document Object Model) của trang web.
      //Nó được sử dụng để kiểm tra xem trang web có đang ở chế độ toàn màn hình hay không.
      //Nếu trang web đang ở chế độ toàn màn hình, thuộc tính này sẽ chứa một tham chiếu đến phần tử đang hiển thị
      //trên toàn màn hình; nếu không, nó sẽ bằng null.

      // Nếu chưa ở chế độ toàn màn hình, thì bật chế độ đó.
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      // Nếu đã ở chế độ toàn màn hình, thì tắt chế độ đó.
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };
  return (
    <Box
      p={1}
      sx={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #c2c7d0",
        borderLeft: "none"
      }}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <TextField
        select
        value={languages}
        onChange={handleLanguageChange}
        sx={{ minWidth: "150px", backgroundColor: "#ffffff" }}
        size="small"
      >
        <MenuItem value="cpp">C++</MenuItem>
        <MenuItem value="php">PHP</MenuItem>
        <MenuItem value="python">Python</MenuItem>
        {/* <MenuItem value="javascript">Javascript</MenuItem> */}
      </TextField>

      <Box
        sx={{
          "& svg": {
            fontSize: "25px",
            cursor: "pointer",
            margin: "7px 10px",
          },
          "& svg:hover": {
            color: "#e52626",
          },
        }}
      >
        <Tooltip title={isFullScreen ? "Exit full screen" : "Full screen"}>
          {isFullScreen ? (
            <FullscreenExitOutlined onClick={toggleFullScreen} />
          ) : (
            <FullscreenOutlined onClick={toggleFullScreen} />
          )}
        </Tooltip>

        <Tooltip title="Open settings">
          <SettingOutlined onClick={handleClickOpen} />
        </Tooltip>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Settings
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={5}>
                  <Typography variant="subtitle1">Editor Theme</Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined primary button group"
                  >
                    {themeButtons.map((selectedTheme) => (
                      <Button
                        key={selectedTheme}
                        variant={
                          theme === selectedTheme ? "contained" : "outlined"
                        }
                        onClick={() => setTheme(selectedTheme)}
                      >
                        {selectedTheme}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Grid>

                <Grid item xs={6} md={5}>
                  <Typography variant="subtitle1">Font size</Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    value={fontSizes}
                    sx={{ width: "150px" }}
                    size="small"
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                          },
                        },
                      },
                    }}
                    onChange={(e) => setFontSizes(e.target.value)}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

export default EditorNav;
