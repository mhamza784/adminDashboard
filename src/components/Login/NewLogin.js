import { Box, Checkbox, InputAdornment } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import style from "./login.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PublicIcon from "@mui/icons-material/Public";
import { USER_LOGIN } from "@/redux/types";
import { useDispatch } from "react-redux";

const NewLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const options = ["English", "English", "Rebase and merge"];
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = useCallback(() => {
    if (!email || !password) {
      alert("please enter email or password");
    }
    dispatch({ type: USER_LOGIN, payload: { email, password } });
  }, [email, password, dispatch]);
  return (
    <Box
      sx={{
        width: "100%",
        paddingBottom: "1rem",
      }}
      className={style.background}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: { sm: "2rem", xs: "1rem" },
          paddingY: "2rem",
          width: "100%",
        }}
      >
        <Link href="/">
          <Box
            component="img"
            alt="logos"
            src="/logo.png"
            sx={{
              display: "flex",
            }}
          />
        </Link>
        <Box>
          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            startIcon={<PublicIcon />}
            sx={{ background: "black !important" }}
            aria-label="split button"
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}> English</Box>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "600px" },
          margin: "auto",
          background: "transparent",
          borderRadius: "1rem",
        }}
      >
        <Box component="h1" className={style.title}>
          Log In
        </Box>
        <Box sx={{ width: { xs: "100%" } }}>
          <Box className={style.box}>
            <Box marginTop={1}>
              <FormControl fullWidth>
                <FormLabel sx={{ color: "white" }}>Email</FormLabel>
                <TextField
                  className={style.formFiled}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                  placeholder="email@example.com"
                  fullWidth
                />
              </FormControl>
            </Box>
            <Box marginTop={1}>
              <FormControl fullWidth>
                <FormLabel sx={{ color: "white" }}>Password</FormLabel>
                <TextField
                  className={style.formFiled}
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          sx={{ background: "white", width: "100%" }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Your LoveLatinWomen Password"
                  fullWidth
                />
              </FormControl>
            </Box>

            {/* <Box
              sx={{
                display: "flex",

                alignItems: "center",
              }}
              className={style.font}
            >
              <FormControlLabel
                control={<Checkbox size="large" sx={{ color: "white" }} />}
                label={
                  <Box
                    variant="p"
                    sx={{
                      fontSize: { xs: ".8rem", sm: "1.2rem" },
                      color: "white",
                    }}
                    className={style.font}
                  >
                    Keep me Logged in
                  </Box>
                }
              />
            </Box> */}
            {/* <Box component="p" sx={{ color: "white", marginTop: "1rem" }}>
              Don`t check this box if you`re at a public or shared computer
            </Box> */}
            <Button
              className={style.joinButton}
              sx={{
                width: "100%",
                marginY: "2rem",
                textTransform: "capitalize !important",
              }}
              // href="/home"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewLogin;
