import React, { useState } from 'react';
import { Box, Divider, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { messageHeading, dividerStyle, buttonContainer, buttonStyle } from "./style";
import FormLabel from "@mui/material/FormLabel";

const message = (props) => {

    const { setTitle, setMessage, handleMessage, title, message } = props;
    // const [title, setTitle] = useState();
    // const [message, setMessage] = useState();
    // const dispatch = useDispatch();
    // const handleMessage = () => {
    //     console.log(title, message)
    //     dispatch({
    //         type: SEND_USER_NOTIFICATION,
    //         payload: {
    //             title,
    //             message,
    //         },
    //     });
    // }
    return (
        <>
            <Box component="text" sx={messageHeading} >
                Notification
            </Box>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                style={{ height: 350 }}
            >
                <Stack  >
                    <Divider sx={dividerStyle} />
                    {/* <span style={{ marginBottom: "-.7rem", fontWeight: 600, alignSelf: "start", color: "black", fontFamily: "sans-serif" }}>Title</span> */}
                    <FormLabel sx={{ textAlign: "start" }}>Title</FormLabel>
                    <TextField
                        // sx={{
                        //     "& .MuiOutlinedInput-root:hover": {
                        //         "& > fieldset": {
                        //             borderColor: "#1976d2",
                        //         },
                        //     },

                        // }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        id="outlined-size-small"
                        size="small"

                    />
                    <FormLabel sx={{ textAlign: "start", marginTop: ".8rem" }}>Message</FormLabel>
                    <TextField
                        value={message}
                        id="outlined-multiline-static"
                        multiline
                        rows={6}
                        onChange={(e) => setMessage(e.target.value)}
                    // sx={{
                    //     "& .MuiOutlinedInput-root:hover": {
                    //         "& > fieldset": {
                    //             borderColor: "#1976d2"
                    //         },
                    //     },

                    // }}
                    />

                    <Box sx={buttonContainer}>
                        <Button sx={buttonStyle} onClick={handleMessage} variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </Box>

                </Stack>
            </Box>
        </>
    )
}

export default message