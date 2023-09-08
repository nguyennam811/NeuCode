import { Box, Typography, Button, Grid } from "@mui/material";
import Layout from "../components/Layout/Layout";
import learn1 from "../assets/images/home-icon.png";
import facebook from "../assets/brand/facebook.png";
import github from "../assets/brand/github.png";
import google from "../assets/brand/google.png";
import beginer from "../assets/images/homeBegin.png";
import fontend from "../assets/images/homeFrontend.png";
import backend from "../assets/images/homeBackend.png";
import start from "../assets/images/homeRegister.png";
import data from "../assets/images/homeScience.png";
import education from "../assets/images/education.png";
import slide1 from "../assets/images/Slide1.png";
import slide2 from "../assets/images/Slice2.jpg";
import slide3 from "../assets/images/Slide3.png";
import { useEffect, useState } from "react";

const Home = () => {
  const [myIndex, setMyIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function carousel() {
      const x = document.getElementsByClassName("mySlides");
      for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      setMyIndex((prevIndex) => {
        let newIndex = prevIndex + 1;
        if (newIndex > x.length) {
          newIndex = 1;
        }
        return newIndex;
      });
      if (x[myIndex - 1]) {
        x[myIndex - 1].style.display = "block";
      }
    }

    const interval = setInterval(carousel, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [myIndex]);

  useEffect(() => {
    // Lấy kích thước màn hình khi component được mount
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Xóa event listener khi component bị unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 600;
  const isIpad = 600 < windowWidth && windowWidth <= 1023;
  return (
    <Layout>
      <Box
        sx={{
          margin: "30px 200px 0px",
          "@media screen and (max-width: 1023px)": {
            margin: "30px",
          },
        }}
      >
        <Box
          sx={{
            height: isMobile ? "100%" : "550px",
            display: "flex",
            marginBottom: "100px",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <img
            src={learn1}
            alt="Logo"
            style={{
              height: "100%",
              width: isMobile ? "100%" : "54%",
            }}
          />
          <Box
            sx={{
              width: "calc(100% - 54%)",
              "@media (max-width: 600px)": {
                height: "100%",
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                height: "290px",
                margin: isMobile ? "0px" : "130px 0px 130px 100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Josefin Sans",
                }}
              >
                Luyện tập cùng nhau
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Josefin Sans",
                  backgroundColor: "#466a8a",
                  borderRadius: "50px",
                  padding: "10px 10px",
                  width: "40%",
                }}
              >
                Đăng ký
              </Button>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Josefin Sans",
                }}
              >
                Hoặc đăng ký bằng
              </Typography>
              <Box sx={{ display: "flex" }}>
                <img
                  src={google}
                  alt="Google"
                  style={{
                    height: "50px",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={facebook}
                  alt="Facebook"
                  style={{
                    height: "50px",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={github}
                  alt="Github"
                  style={{ height: "50px", cursor: "pointer" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: isMobile ? "100%" : "600px",
            display: "flex",
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Box sx={{ width: isMobile ? "100%" : "41%" }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Josefin Sans",
              }}
            >
              MỤC TIÊU
              <br></br>
              của bạn là gì ?
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Josefin Sans",
              }}
            >
              Một trong những điều quan trọng nhất bạn cần làm khi học lập trình
              đó là xác định đúng mục tiêu học tập của mình.
            </Typography>

            <Button
              variant="contained"
              sx={{
                fontFamily: "Josefin Sans",
                backgroundColor: "#466a8a",
                borderRadius: "50px",
                marginTop: "30px",
                padding: "10px 10px",
                width: "40%",
              }}
            >
              Luyện code
            </Button>
          </Box>
          <Box
            sx={{
              width: isMobile ? "100%" : "calc(100% - 41%)",
              marginLeft: isMobile ? "0" : "53px",
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <img
                  src={beginer}
                  alt="Begin"
                  style={{
                    height: isIpad ? "220px" : isMobile ? "50%" : "300px",
                    width: isIpad ? "220px" : isMobile ? "50%" : "300px",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={fontend}
                  alt="Begin"
                  style={{
                    height: isIpad ? "220px" : isMobile ? "50%" : "300px",
                    width: isIpad ? "220px" : isMobile ? "50%" : "300px",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={backend}
                  alt="Begin"
                  style={{
                    height: isIpad ? "220px" : isMobile ? "50%" : "300px",
                    width: isIpad ? "220px" : isMobile ? "50%" : "300px",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={data}
                  alt="Begin"
                  style={{
                    height: isIpad ? "220px" : isMobile ? "50%" : "300px",
                    width: isIpad ? "220px" : isMobile ? "50%" : "300px",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box
          sx={{
            height: isMobile ? "100%" : "550px",
            display: "flex",
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <img
            src={education}
            alt="Education"
            style={{
              height: "100%",
              width: isMobile ? "100%" : "54%",
            }}
          />
          <Box
            sx={{
              width: isMobile ? "100%" : "calc(100% - 54%)",
              height: "100%",
            }}
          >
            <Box
              sx={{
                height: "290px",
                margin: isMobile ? "0px" : "130px 0px 130px 100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Josefin Sans",
                  "@media screen and (max-width: 1023px) and (min-width: 600px)":
                    {
                      fontSize: "2rem",
                    },
                }}
              >
                Bạn đang là thành viên của NeuCode?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Josefin Sans",
                  backgroundColor: "#466a8a",
                  borderRadius: "50px",
                  padding: "10px 10px",
                  width: "40%",
                }}
              >
                Luyện Code
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#466a8a",
          height: "270px",
          padding: "30px",
          display: { xs: "none", sm: "block" },
        }}
      >
        <div className="mySlides">
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            <Grid item xs={4}>
              <img
                src={slide1}
                alt="Teacher1"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Josefin Sans",
                  color: "white",
                  "@media screen and (min-width: 600px) and (max-width: 1023px)":
                    {
                      fontSize: "1rem",
                    },
                }}
              >
                Mr Do Khanh Tu <br></br>
                Software Engineer at Amazon
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Josefin Sans",
                  color: "white",
                  padding: "50px 30px",
                  marginTop: "10px",
                  "@media screen and (min-width: 600px) and (max-width: 1023px)":
                    {
                      fontSize: "1rem",
                    },
                }}
              >
                "It's scary to change careers. I only gained confidence that I
                could code by working through the hundreds of hours of free
                lessons on Cocoders. Within a year I had a six-figure job as a
                Software Engineer. CoCoders changed my life."
              </Typography>
            </Grid>
          </Grid>
        </div>

        <div className="mySlides">
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Josefin Sans",
                  color: "white",
                  padding: "50px 30px",
                  marginTop: "10px",
                  "@media screen and (min-width: 600px) and (max-width: 1023px)":
                    {
                      fontSize: "1rem",
                    },
                }}
              >
                "It's scary to change careers. I only gained confidence that I
                could code by working through the hundreds of hours of free
                lessons on Cocoders. Within a year I had a six-figure job as a
                Software Engineer. CoCoders changed my life."
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <img
                src={slide2}
                alt="Teacher2"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Josefin Sans",
                  color: "white",
                  "@media screen and (min-width: 600px) and (max-width: 1023px)":
                    {
                      fontSize: "1rem",
                    },
                }}
              >
                Mr Van Nam <br></br>
                Software Engineer at Amazon
              </Typography>
            </Grid>
          </Grid>
        </div>

        <div className="mySlides">
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            <Grid item xs={4}>
              <img
                src={slide3}
                alt="Teacher3"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Josefin Sans",
                  color: "white",
                  "@media screen and (min-width: 600px) and (max-width: 1023px)":
                    {
                      fontSize: "1rem",
                    },
                }}
              >
                Mr Do Khanh Tu <br></br>
                Software Engineer at Amazon
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Josefin Sans",
                  color: "white",
                  padding: "50px 30px",
                  marginTop: "10px",
                  "@media screen and (min-width: 600px) and (max-width: 1023px)":
                    {
                      fontSize: "1rem",
                    },
                }}
              >
                "It's scary to change careers. I only gained confidence that I
                could code by working through the hundreds of hours of free
                lessons on Cocoders. Within a year I had a six-figure job as a
                Software Engineer. CoCoders changed my life."
              </Typography>
            </Grid>
          </Grid>
        </div>

        {/* <div style={{ height: "100%", backgroundColor: "pink" }} className="mySlides">
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            <Grid item xs={4}>
              <h1>haa</h1>
            </Grid>
            <Grid item xs={8}>
              <h1>haa</h1>
            </Grid>
          </Grid>
        </div> */}
      </Box>

      <Box
        sx={{
          margin: "30px 200px",
          "@media screen and (max-width: 1023px)": {
            margin: "30px",
          },
        }}
      >
        <Box
          sx={{
            height: isMobile ? "100%" : "400px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <img
            src={start}
            alt="Start"
            style={{
              width: isMobile ? "100%" : "45%",
              height: "100%",
            }}
          />
          <Box
            sx={{
              width: isMobile ? "100%" : "calc(100% - 45%)",
              height: "100%",
            }}
          >
            <Box
              sx={{
                height: "75%",
                margin: isMobile ? "0" : (isIpad ? "20px" : " 50px 130px"),
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Josefin Sans",
                  
                }}
              >
                Tham gia ngay thôi!
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Josefin Sans",
                  
                }}
              >
                Nếu đã xem tới đây thì bạn chắc hẳn bạn đã khá tò mò rồi nhỉ.
                Đăng ký ngay để luyện và hoàn thành mục tiêu thôi nào
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Josefin Sans",
                  backgroundColor: "#466a8a",
                  borderRadius: "50px",
                  padding: "10px 10px",
                  width: "40%",
                }}
              >
                Đăng ký
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
