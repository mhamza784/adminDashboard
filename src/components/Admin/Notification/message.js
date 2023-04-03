import React, { useState } from 'react';
import { Box, Divider, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { messageHeading, dividerStyle, buttonContainer, buttonStyle, titleLabel, messageLabel, messageContainer } from "./style";
import FormLabel from "@mui/material/FormLabel";

const message = (props) => {

    const { setTitle, setMessage, handleMessage, title, message } = props;
    return (
        <>
            <Box component="text" sx={messageHeading} >
                Notification
            </Box>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={messageContainer}
            >
                <Stack  >
                    <Divider sx={dividerStyle} />

                    <FormLabel sx={titleLabel}>Title</FormLabel>
                    <TextField
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        id="outlined-size-small"
                        size="small"
                        placeholder="Title"

                    />
                    <FormLabel sx={messageLabel}>Message</FormLabel>
                    <TextField
                        value={message}
                        id="outlined-multiline-static"
                        multiline
                        rows={6}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message"
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