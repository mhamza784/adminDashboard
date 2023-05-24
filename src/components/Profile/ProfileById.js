import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Alert, Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Snackbar, Tooltip, Modal } from "@mui/material";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";
import ProfileTable from "./ProfileTable";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BLOCK_USER, ADD_HOT_LIST_USER, HOT_LIST_USER, SINGLE_USER, } from "@/redux/types";
import { BASE_URL_API } from "@/redux/service/base.config";
import { Height, Weight } from "utils";

const ProfileById = () => {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { user, users } = useSelector((state) => state.users);
  const { singleUser } = useSelector((state) => state.notifications);
  const [open, setOpen] = useState(false);
  const [openAre, setOpenAre] = useState(false);
  const dispatch = useDispatch();
  const [openChat, setOpenChat] = useState(false);



  const { userId } = router.query;

  const text = Height.filter((string) => string.startsWith(singleUser?.height));
  const textWeight = Weight.filter((string) =>
    string.startsWith(singleUser?.height)
  );

  const getStaticImages = useCallback(() => {
    let array = [];
    for (let i = 0; i < singleUser?.myPictures?.length; i++) {
      array.push({
        original: `${BASE_URL_API}${singleUser?.myPictures[i]}`,
        thumbnail: `${BASE_URL_API}${singleUser?.myPictures[i]}`,
      });
    }
    setImages(array);
  }, [singleUser]);

  const style = {
    bgcolor: "white",
    position: "absolute",
    border: "0px",
    boxShadow: 0,
    top: { sm: "51%", xs: "51%" },
    left: { xs: "50%", md: "86.5%" },
    zIndex: open ? "99999px" : "0",
    transform: "translate(-50%, -50%)",
    width: { sm: "350px", xs: "320px" },
    backgroundColor: "none"
  };

  useEffect(() => {
    getStaticImages();
  }, [getStaticImages]);

  useEffect(() => {
    if (userId) {
      dispatch({
        type: SINGLE_USER,
        payload: {
          id: userId,
        },
      });
    }
  }, [userId, dispatch,]);


  return (
    <Box
      sx={{
        width: { md: "85%", sm: "90%", xs: "98%" },
        marginX: "auto",
        marginY: { xs: "1rem", sm: "2rem" },
      }}
    >
      <Box
        sx={{
          width: { md: "100%", sm: "100%", xs: "98%" },
          display: { xs: "block", sm: "flex" },
          marginY: "1rem",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="h3"
            sx={{
              fontFamily: " Helvetica",
              textTransform: "capitalize",
            }}
          >
            {singleUser?.name}
          </Box>
          {/* {userId == user._id ?
            <Box sx={{ cursor: "pointer", width: "2.4rem", marginTop: "10px" }}>
              <Tooltip title={translations('toolTip.editProfile')}>
                <IconButton onClick={() =>
                  router.push({
                    pathname: "/profile",
                    query: { value: true, lang: query.lang },
                  })
                } sx={{ color: "black" }} >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box> :
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Tooltip title={translations('toolTip.yourHotList')} followCursor>
                <Box
                  onClick={
                    hotListYou?.some((data) => data?.hotListId?._id === userId)
                      ? handleClick
                      : handleFavorite
                  }
                  sx={{ cursor: "pointer", width: "2.4rem", marginTop: "10px" }}
                >
                  <Heart
                    fill={hotListYou?.some(
                      (data) => data?.hotListId?._id === userId
                    )}
                  />
                </Box>
              </Tooltip>
              <Tooltip title={translations('toolTip.yourMessages')} followCursor>
                <IconButton>
                  <Box
                    component="img"
                    alt="send"
                    // onClick={handleNavigate}
                    onClick={() => handleOpen(userId)}
                    sx={{
                      cursor: "pointer",
                      width: "1.7rem",
                    }}
                    src="/send.svg"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title={translations('toolTip.blockUser')} onClick={handleClickDialog}>
                <IconButton>
                  <BlockIcon sx={{ fontSize: "2.35rem !important" }} />
                </IconButton>
              </Tooltip>
            </Box>} */}
        </Box>
        <Box
          sx={{
            marginBottom: { xs: "4.7rem !important", sm: "4rem !important" },
            width: {
              xs: "98%",
              sm: "50%",
              md: "33%",
              marginX: { xs: "auto", sm: "0" },

            },
          }}
        >
          {images.length ? (
            <ImageGallery
              items={images}
              thumbnailPosition="bottom"
              showPlayButton={false}
              infinite={false}
            // showFullscreenButton={false}
            // originalHeight="small"
            />
          ) : (
            <Box
              src="/photo.png"
              component="img"
              alt="profile"
              sx={{
                marginTop: "1rem",
                marginX: "auto",
                width: "100%",
                display: "flex",
                height: "290px",
                paddingRight: { xl: "8rem", md: "9rem", sm: "6rem" }
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            marginLeft: { xs: "1rem", sm: "3rem" },
            width: { xs: "100%", sm: "50%", md: "64%" },
            marginTop: { xs: "1rem", sm: "0rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              component="h3"
              sx={{
                fontFamily: " Helvetica",
                marginTop: { xs: "1rem", sm: "" },
                textTransform: "capitalize",
                display: { xs: "none", sm: "block" },
              }}
            >
              {singleUser?.name}
            </Box>
          </Box>
          <Grid container sx={{ marginTop: { xs: "1.5rem", sm: "1rem" } }}>
            <Grid item sm={12} md={7}>
              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: "10.5rem",
                    display: "flex",
                    marginRight: ".2rem"
                  }}
                >
                  Age :
                </Box>{" "}
                {singleUser?.age} year old
              </Box>
              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                  alignItems: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: "10.5rem",
                    display: "flex",
                    marginRight: ".2rem"
                  }}
                >
                  From :
                </Box >{" "}
                <Box noWrap sx={{ width: { xs: "10.5rem", sm: "13rem" }, }} >
                  {singleUser?.country}, {singleUser?.state}, {singleUser?.city}
                </Box>
              </Box>

              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: "10.5rem",
                    display: "flex",
                    marginRight: ".2rem"
                  }}
                >
                  Last update :
                </Box>

                {moment(singleUser?.updatedAt).format("LL")}
              </Box>
              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: "10.5rem",
                    display: "flex",
                    marginRight: ".2rem"
                  }}
                >
                  Member since :
                </Box>{" "}
                {moment(singleUser?.createdAt).format("LL")}
              </Box>
              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: "10.5rem",
                    display: "flex",
                    marginRight: ".2rem"
                  }}
                >
                  Ethnicity :
                </Box>
                {singleUser?.ethnicity ?? `No Answer`}
              </Box>
            </Grid>
            <Grid item sm={12} md={5}>
              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: { xs: "10.5rem", sm: "9.5rem" },
                    marginRight: ".2rem",
                    display: "flex",
                  }}
                >
                  Height :
                </Box>
                <Box sx={{ width: "10rem" }}>
                  {text[0] ?? `No Answer`}

                  {/* 172 cm / 5`8 */}
                </Box>
              </Box>
              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: { xs: "10.5rem", sm: "9.5rem" },
                    marginRight: ".2rem",
                    display: "flex",
                  }}
                >
                  Weight :
                </Box>
                <Box sx={{ width: "10rem" }}>
                  {textWeight[0] ?? `No Answer`}
                </Box>
              </Box>
              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: { xs: "10.5rem", sm: "9.5rem" },
                    marginRight: ".2rem",
                    display: "flex",
                  }}
                >
                  Body type :
                </Box>
                <Box sx={{ width: "10rem" }}>
                  {singleUser?.bodyType ?? `No Answer`}
                </Box>
              </Box>
              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: { xs: "10.5rem", sm: "9.5rem" },
                    marginRight: ".2rem",
                    display: "flex",
                  }}
                >
                  Hair Color :
                </Box>
                <Box sx={{ width: "10rem" }}>
                  {singleUser?.hairColor ?? `No Answer`}
                </Box>
              </Box>
              <Box
                sx={{
                  fontFamily: " Helvetica",
                  color: "GrayText",
                  display: "flex",
                  marginBottom: ".5rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    width: { xs: "10.5rem", sm: "9.5rem" },
                    marginRight: ".2rem",
                    display: "flex",
                  }}
                >
                  {" "}
                  Eye Color :
                </Box>
                <Box sx={{ width: "10rem" }}>
                  {singleUser?.eyeColor ?? `No Answer`}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: ".5rem",
          paddingTop: "2rem",
          paddingX: { xs: "1rem", sm: "0" },
          marginTop: { sm: "1rem", xs: "0rem" }
        }}
      >
        <Box
          sx={{
            fontFamily: "Helvetica",
            fontSize: "1rem",
            fontWeight: "700",
            color: "#1EB0C4",
          }}
        >
          Personal Info
        </Box>
      </Box>

      <ProfileTable user={singleUser} />

      <Paper variant="outlined" sx={{ padding: "1rem", marginY: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: ".5rem",
          }}
        >
          <Box
            component="h1"
            sx={{
              fontFamily: "Helvetica",
              fontSize: "1rem",
              fontWeight: "700",

              color: "#1EB0C4",
            }}
          >
            My Favorite Readings
          </Box>
        </Box>

        <Box
          sx={{
            background: "#A60363",
            color: "white",
            paddingY: "1rem",
            paddingX: "1.5rem",
            fontSize: "1.1rem",
            fontFamily: "Helvetica",
            fontWeight: "500",
          }}
        >
          {singleUser?.favouriteReading?.length
            ? singleUser?.favouriteReading?.map((item, i) => (
              <span key={item}>
                {item}
                {i !== singleUser?.favouriteReading?.length - 1 && <>, </>}
              </span>
            ))
            : `No Answer`}
        </Box>
      </Paper>
      <Paper variant="outlined" sx={{ padding: "1rem", marginY: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: ".5rem",
          }}
        >
          <Box
            component="h1"
            sx={{
              fontFamily: "Helvetica",
              fontSize: "1rem",
              fontWeight: "700",

              color: "#1EB0C4",
            }}
          >
            My Hobbies are
          </Box>
        </Box>

        <Box
          sx={{
            background: "#A60363",
            color: "white",
            paddingY: "1rem",
            paddingX: "1.5rem",
            fontSize: "1.1rem",
            fontFamily: "Helvetica",
            fontWeight: "500",
          }}
        >
          {singleUser?.hobbies?.length
            ? singleUser?.hobbies?.map((item, i) => (
              <span key={item}>
                {item}
                {i !== singleUser?.hobbies?.length - 1 && <>, </>}
              </span>
            ))
            : `No Answer`}
        </Box>
      </Paper>
      <Paper variant="outlined" sx={{ padding: "1rem", marginY: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: ".5rem",
          }}
        >
          <Box
            component="h1"
            sx={{
              fontFamily: "Helvetica",
              fontSize: "1rem",
              fontWeight: "700",

              color: "#1EB0C4",
            }}
          >
            My Favorite Music
          </Box>
        </Box>

        <Box
          sx={{
            background: "#A60363",
            color: "white",
            paddingY: "1rem",
            paddingX: "1.5rem",
            fontSize: "1.1rem",
            fontFamily: "Helvetica",
            fontWeight: "500",
          }}
        >
          {singleUser?.favouriteMusic?.length
            ? singleUser?.favouriteMusic?.map((item, i) => (
              <span key={item}>
                {item}
                {i !== singleUser?.favouriteMusic?.length - 1 && <>, </>}
              </span>
            ))
            : `No Answer`}
        </Box>
      </Paper>

    </Box >
  );
};

export default ProfileById;
