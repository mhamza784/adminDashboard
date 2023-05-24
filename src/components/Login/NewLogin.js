import { Box, InputAdornment } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import style from "./login.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PublicIcon from "@mui/icons-material/Public";
import { ADMIN_LOGIN } from "@/redux/types";
import { useDispatch } from "react-redux";
import { container, logo, logoImg, languageBtn, languageText, loginBoxContainer, loginTable, inputLabel, togglePasswordVisibility, loginBtn } from "./style"

const NewLogin = () => {

  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = useCallback(() => {
    if (!email || !password) {
      alert("please enter email or password");
    }
    dispatch({ type: ADMIN_LOGIN, payload: { email, password } });
  }, [email, password, dispatch]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };
  return (
    <Box
      sx={container}
      className={style.background}
    >
      <Box
        sx={logo}
      >
        <Link href="/">
          <Box
            component="img"
            alt="logos"
            src="/transparentlogowhite.png"
            sx={logoImg}
          />
        </Link>
        <Box>
          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            startIcon={<PublicIcon />}
            sx={languageBtn}
            aria-label="split button"
          >
            <Box sx={languageText}> English</Box>
          </Button>
        </Box>
      </Box>
      <Box
        sx={loginBoxContainer}
      >
        <Box component="h1" className={style.title}>
          Log In
        </Box>
        <Box sx={loginTable}>
          <Box className={style.box}>
            <Box marginTop={1}>
              <FormControl fullWidth>
                <FormLabel sx={inputLabel}>Email</FormLabel>
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
                <FormLabel sx={inputLabel}>Password</FormLabel>
                <TextField
                  className={style.formFiled}
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          sx={togglePasswordVisibility}
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
            <Button
              className={style.joinButton}
              sx={loginBtn}
              onClick={handleLogin}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default NewLogin;
