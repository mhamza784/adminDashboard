import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { mainContainer, typography, AvatarSize, appBar, appLogo, profileMenu, profile } from "./style";
import { LOGOUT } from "@/redux/types";
import { useRouter } from 'next/router'

function DrawerAppBar(props) {
  const { user, token } = useSelector((state) => state.users);
  const { window } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    dispatch({ type: LOGOUT, payload: { id: user?._id } });
  };
  return (
    <Box sx={mainContainer}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={appBar}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={typography}
          >
            <Link href={token ? { pathname: "/admin" } : { pathname: "/" }}>
              <Box
                component="img"
                alt="logo"
                src="/MyLatinLoveLogo.png"
                sx={appLogo}
              />
            </Link>
          </Typography>
          <Box sx={profile}>
            <Box >
              <Avatar
                alt="profile"
                src="/Larry.png"
                sx={AvatarSize}
                onClick={handleClick}
              />
            </Box>
            <Menu
              sx={profileMenu}
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box >
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
