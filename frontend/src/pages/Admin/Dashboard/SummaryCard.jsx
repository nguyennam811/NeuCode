import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { UserOutlined } from "@ant-design/icons";
import MainCard from "../../../components/MainCard";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
}));

const cards = [
  {
    icon: <UserOutlined />,
    total: 34,
    title: "Total Users",
  },
  {
    icon: <UserOutlined />,
    total: 34,
    title: "Total Users",
  },
  {
    icon: <UserOutlined />,
    total: 34,
    title: "Total Users",
  },
  {
    icon: <UserOutlined />,
    total: 34,
    title: "Total Users",
  },
  {
    icon: <UserOutlined />,
    total: 34,
    title: "Total Users",
  },
];

const SummaryCard = () => {
  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid item xs={3} key={index}>
        <MainCard>
          <StyledIcon sx={{ fontSize: 30 }}>
            {card.icon}
          </StyledIcon>
          <Typography variant="h4">{card.total}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {card.title}
          </Typography>
        </MainCard>
      </Grid>
      ))}
      {/* {
        <Grid item xs={3}>
          <MainCard>
            <StyledIcon sx={{ fontSize: 30 }}>
              <UserOutlined />
            </StyledIcon>
            <Typography variant="h4">23</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Total Users
            </Typography>
          </MainCard>
        </Grid>
      }

      {
        <Grid item xs={3}>
          <MainCard>
            <StyledIcon sx={{ fontSize: 30 }}>
              <UserOutlined />
            </StyledIcon>
            <Typography variant="h4">23</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Total Users
            </Typography>
          </MainCard>
        </Grid>
      }

      {
        <Grid item xs={3}>
          <MainCard>
            <StyledIcon sx={{ fontSize: 30 }}>
              <UserOutlined />
            </StyledIcon>
            <Typography variant="h4">23</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Total Devices active nearest (1M ago)
            </Typography>
          </MainCard>
        </Grid>
      }

      {
        <Grid item xs={3}>
          <MainCard>
            <StyledIcon sx={{ fontSize: 30 }}>
              <BulbOutlined />
            </StyledIcon>
            <Typography variant="h4">23</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Total Devices
            </Typography>
          </MainCard>
        </Grid>
      }

      {
        <Grid item xs={3}>
          <MainCard>
            <StyledIcon sx={{ fontSize: 30 }}>
              <ControlOutlined />
            </StyledIcon>
            <Typography variant="h4">23</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Total Device Types
            </Typography>
          </MainCard>
        </Grid>
      } */}
    </Grid>
  );
};

export default SummaryCard;
