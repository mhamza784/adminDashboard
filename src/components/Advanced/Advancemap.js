import { Box } from "@mui/material";
import React from "react";
import style from "./advance.module.css";

const AdvanceMap = ({ item }) => {
  return (
    <Box sx={{ display: "flex", paddingInline: "1rem" }}>
      <Box
        component="img"
        src={item.icon}
        alt="icon"
        sx={{ height: "50px", width: "50px" }}
      />
      <Box sx={{ paddingInline: ".5rem", paddingBottom: "1rem" }}>
        <Box className={style.mapTitle}>{item.title}</Box>
        <Box className={style.mapdetail}>{item.detail}</Box>
      </Box>
    </Box>
  );
};

export default AdvanceMap;
