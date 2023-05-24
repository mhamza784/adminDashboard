import React, { useState } from "react";
import { BASE_URL_API } from "@/redux/service/base.config";
import { PhotoCamera, Delete } from "@mui/icons-material";
import { Box, IconButton, Button, Dialog, DialogContent, DialogContentText, DialogTitle, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import API from "@/redux/service/base.service";
// import { UPDATE_USER } from "@/redux/types";
import { UpdateUserSlice } from "@/redux/slices/users";
import { useTranslation, useLanguageQuery, LanguageSwitcher } from 'next-export-i18n';



const EditPhoto = () => {
  const { t: translations } = useTranslation();
  const { user, token } = useSelector((state) => state.users);
  const [openAre, setOpenAre] = useState(false);
  const [baseImage, setBaseImage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [indx, setIndx] = useState("");

  const dispatch = useDispatch();
  // console.log("13", user?._id);
  // const Upload = () => {
  //   const formData = new FormData();
  //   formData.append("file", avatar);
  //   if (avatar) {
  //     API.put(`${BASE_URL_API}/api/user/profile/${user._id}`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }).then((res) => {
  //       if (res.status === 200) {
  //         dispatch({
  //           type: UPDATE_USER,
  //           payload: res.data.data,
  //         });
  //       }
  //     });
  //   }
  // };
  const handleCloseDialog = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAre(false);
  };
  const handleClickDialog = (index) => {
    setOpenAre(true);
    setIndx(index)
  };
  const fileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (file) {
      API.put(`${BASE_URL_API}/api/user/profile/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        if (res.status === 200) {
          dispatch(UpdateUserSlice(res.data.data));
        }
      });
    }
    setAvatar(file);
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };
  const handleDeletePhoto = () => {
    handleDeletePhoto

  }
  const handleRemove = async () => {
    const data = { id: user._id, index: indx };
    API.delete(
      `${BASE_URL_API}/api/user/profile`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        dispatch(UpdateUserSlice(res.data.data));
      }
    });
    setOpenAre(false);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader?.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <Box
        sx={{
          fontSize: "1.2rem",
          fontWeight: "600",
          fontFamily: "Helvetica",
          mb: "1rem",
        }}
      >
        {translations('userEnvironment.userSettingPage.photosTab.title')}
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexFlow: { xs: "wrap", sm: "nowrap" }, justifyContent: "center" }}>
        <Box sx={{ position: "relative", mt: 1 }} boxShadow={3}>
          <Box
            src={user?.myPictures?.length ? `${BASE_URL_API}${user?.myPictures[0]}` : "/photo.png"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/photo.png";
            }}
            component="img"
            alt="profile"
            sx={{
              marginX: "auto",
              display: "flex",
              width: "190px",
              marginLeft: "0",
              height: "200px",
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: "10px",
              left: "0",
              right: "0",
              width: "100%",
            }}
          >
            {user?.myPictures?.length && user?.myPictures[0] ? (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                component="label"
                onClick={() => handleClickDialog(0)}
              >
                <Delete fontSize="2rem" />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={fileHandler}
                />
                <PhotoCamera fontSize="2rem" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box sx={{ position: "relative", mt: 1 }} boxShadow={3}>
          <Box
            src={user?.myPictures?.length ? `${BASE_URL_API}${user?.myPictures[1]}` : "/photo.png"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/photo.png";
            }}
            component="img"
            alt="profile"
            sx={{
              marginX: "auto",
              display: "flex",
              width: "190px",
              marginLeft: "0",
              height: "200px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: "10px",
              left: "0",
              right: "0",
              width: "100%",
            }}
          >
            {user?.myPictures?.length && user?.myPictures[1] ? (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                aria-label="upload picture"
                component="label"
                onClick={() => handleClickDialog(1)}
              >
                <Delete fontSize="2rem" />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={fileHandler}
                />
                <PhotoCamera fontSize="2rem" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box sx={{ position: "relative", mt: 1 }} boxShadow={3}>
          <Box
            src={user?.myPictures?.length ? `${BASE_URL_API}${user?.myPictures[2]}` : "/photo.png"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/photo.png";
            }}
            component="img"
            alt="profile"
            sx={{
              marginX: "auto",
              display: "flex",
              width: "190px",
              marginLeft: "0",
              height: "200px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: "10px",
              left: "0",
              right: "0",
              width: "100%",
            }}
          >
            {user?.myPictures?.length && user?.myPictures[2] ? (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                aria-label="upload picture"
                component="label"
                onClick={() => handleClickDialog(2)}
              >
                <Delete fontSize="2rem" />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={fileHandler}
                />
                <PhotoCamera fontSize="2rem" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box sx={{ position: "relative", mt: 1 }} boxShadow={3}>
          <Box
            src={user?.myPictures?.length ? `${BASE_URL_API}${user?.myPictures[3]}` : "/photo.png"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/photo.png";
            }}
            component="img"
            alt="profile"
            sx={{
              marginX: "auto",
              display: "flex",
              width: "190px",
              marginLeft: "0",
              height: "200px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: "10px",
              left: "0",
              right: "0",
              width: "100%",
            }}
          >
            {user?.myPictures?.length && user?.myPictures[3] ? (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                aria-label="upload picture"
                component="label"
                onClick={() => handleClickDialog(3)}
              >
                <Delete fontSize="2rem" />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={fileHandler}
                />
                <PhotoCamera fontSize="2rem" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box sx={{ position: "relative", mt: 1 }} boxShadow={3}>
          <Box
            src={user?.myPictures?.length ? `${BASE_URL_API}${user?.myPictures[4]}` : "/photo.png"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/photo.png";
            }}
            component="img"
            alt="profile"
            sx={{
              marginX: "auto",
              display: "flex",
              width: "190px",
              marginLeft: "0",
              height: "200px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: "10px",
              left: "0",
              right: "0",
              width: "100%",
            }}
          >
            {user?.myPictures?.length && user?.myPictures[4] ? (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                aria-label="upload picture"
                component="label"
                onClick={() => handleClickDialog(4)}
              >
                <Delete fontSize="2rem" />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                sx={{ color: "GrayText", fontSize: "2.5rem" }}
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={fileHandler}
                />
                <PhotoCamera fontSize="2rem" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      <Dialog open={openAre} onClose={handleCloseDialog}>
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ fontSize: "1.5rem", paddingY: "1rem" }}
        >
          {translations('userEnvironment.userSettingPage.photosTab.deletePopup.title')}
        </DialogTitle>
        <DialogContent
          sx={{
            paddingX: "2rem",
            // width: { sm: "370px" },
          }}
        >
          <DialogContentText sx={{ fontSize: { sm: "1.3rem", xs: "1rem" } }}>
            {translations('userEnvironment.userSettingPage.photosTab.deletePopup.desc')}
          </DialogContentText>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Button
            onClick={handleCloseDialog}
            style={{ border: "1px solid gray", color: "black", textTransform: "none" }}
          >
            {translations('userEnvironment.userSettingPage.photosTab.deletePopup.cancelBtn')}
          </Button>
          <Button
            onClick={handleRemove}
            style={{
              background: "#1EB0C4",
              color: "white",
              marginLeft: "1rem",
              textTransform: "none"
            }}
          >
            {translations('userEnvironment.userSettingPage.photosTab.deletePopup.confirmBtn')}
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default EditPhoto;
