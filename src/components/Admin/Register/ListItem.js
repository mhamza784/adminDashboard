import React from "react";
import { Avatar, Box } from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RemoveFromQueueOutlinedIcon from '@mui/icons-material/RemoveFromQueueOutlined';
import { MainContainer, ProfileContainer, AvatarSize, profileData, iconContainer, iconColor, } from "./style";

const ListItem = ({
  handleListItemClick,
  item,
}) => {
  return (
    <Box
      sx={MainContainer}
    >
      <Box sx={ProfileContainer}>
        <Avatar
          sx={AvatarSize}
          alt="logo"
          onClick={(e) => handleListItemClick(e, item)}
          src="/imagecricle.png"
        />
        <Box
          sx={profileData}
        >
          Richard John
        </Box>
      </Box>
      <Box sx={profileData}>
        Feb 15, 2022
      </Box>
      <Box sx={profileData}>Male</Box>
      <Box sx={profileData}>richard@gmail.com</Box>
      <Box sx={iconContainer}>
        <Box component="img" src="deleteicon.png" width="15px" height="15px" sx={iconColor} />
        <Box component="img" src="removeicon.png" sx={{ marginTop: ".6rem", marginRight: "1rem" }} />
      </Box>
    </Box>
  );
};

export default ListItem;
