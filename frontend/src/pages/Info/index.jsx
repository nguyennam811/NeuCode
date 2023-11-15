import React from "react";
import { Box, Typography } from "@mui/material";
import { NavLink, Outlet, useLoaderData, useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { getCurrentUser } from "../../utils/auth";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #00f;
    font-size: 17px;
  }

  &.active {
    color: #00f;
    font-size: 17px;
  }
`;

const InforUser = () => {
  const user = useParams();
// const currentUser = getCurrentUser();
const currentUser = useLoaderData();
  const location = useLocation();

    return (
<>

    <Box
      width={"100%"}
      height={"100%"}
      sx={{ backgroundColor: "#c7c7c740", padding: "2.5% 15%" }}
    >
      <Box
        sx={{ backgroundColor: "white" }}
        width={"100%"}
        height={"100%"}
        display={"flex"}
      >
        <Box height={"100%"} width={"28%"} p={5}>
          <Box height={"100%"}>
            <Typography>
              <StyledNavLink
                to={`/user/${user.id}/`}
                isActive={() => location.pathname === `/user/${user.id}/`}
              >
                Information & Contact
              </StyledNavLink>
            </Typography>
            
            { currentUser.sub === user.id &&
            <Typography mt={1.5}>
            <StyledNavLink
              to={`/user/${user.id}/changepassword`}
              isActive={() =>
                location.pathname === `/user/${user.id}/changepassword`
              }
            >
              Change Password
            </StyledNavLink>
          </Typography>
            }
          </Box>
        </Box>

        <Box
          height={"100%"}
          width={"2%"}
          sx={{ backgroundColor: "#c7c7c740" }}
        />

        <Box height={"100%"} width={"70%"} p={4}>
          <Outlet />
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default InforUser;
