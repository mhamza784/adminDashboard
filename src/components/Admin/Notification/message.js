import React, { useState } from 'react';
import { Box, Divider, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { messageHeading, dividerStyle, buttonContainer, buttonStyle } from "./style";


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
                style={{ height: 335 }}
            >
                <Stack spacing={2}>
                    <Divider sx={dividerStyle} />

                    <TextField
                        sx={{
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    borderColor: "#1976d2"
                                },
                            },

                        }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        label="Title"
                        id="outlined-size-small"
                        size="small"

                    />
                    <TextField
                        value={message}
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={6}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    borderColor: "#1976d2"
                                },
                            }
                        }}
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