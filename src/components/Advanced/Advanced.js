import { Box } from "@mui/material";
import React from "react";
import style from "./advance.module.css";
import AdvanceMap from "./Advancemap";
const Advanced = () => {
  const data = [
    {
      id: 1,
      title: "Compatibility Meter",
      icon: "/Meter.png",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
    },
    {
      id: 2,
      title: "AI based broadcast generation",
      icon: "/generation.png",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
    },
    {
      id: 3,
      title: "Save profiles",
      icon: "/Profile.png",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
    },
  ];

  return (
    <Box className={style.advance}>
      <Box className={style.title} component="h1">
        Advanced Features
      </Box>
      <Box className={style.advancesection}>
        <Box className={style.leftSection}>
          <Box
            style={{
              height: "400px",
              width: "90%",
              margin: "auto",
              display: "flex",
              background: "#D9D9D9",
              borderRadius: "12px",
            }}
          >
            <Box
              component="img"
              src="/Vectorvideo.png"
              alt="video "
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            />
          </Box>
        </Box>
        <Box className={style.rightSection}>
          {data.map((item) => (
            <AdvanceMap item={item} key={item.id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Advanced;
