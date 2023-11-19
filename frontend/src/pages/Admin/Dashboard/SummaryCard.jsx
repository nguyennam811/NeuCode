import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { UserOutlined } from "@ant-design/icons";
import MainCard from "../../../components/MainCard";
import { useSelector } from "react-redux";
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import BackupIcon from '@mui/icons-material/Backup';
import SchoolIcon from '@mui/icons-material/School';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
}));

const SummaryCard = () => {
  const dashboard = useSelector((reducers) => reducers.student.data);
console.log(dashboard);


const cards = [
  {
    icon: <IntegrationInstructionsIcon fontSize="large"/>,
    total: dashboard.total_problem,
    title: "Total Problems",
  },
  {
    icon: <BackupIcon fontSize="large"/>,
    total: dashboard.total_submission,
    title: "Total Submissions",
  },
  {
    icon: <SchoolIcon fontSize="large"/>,
    total: dashboard.total_courses,
    title: "Total Courses",
  },
  {
    icon: <PeopleAltIcon fontSize="large"/>,
    total: dashboard.total_student,
    title: "Total Student",
  },
  {
    icon: <AdminPanelSettingsIcon fontSize="large"/>,
    total: dashboard.total_teacher,
    title: "Total Teacher",
  },
];


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
