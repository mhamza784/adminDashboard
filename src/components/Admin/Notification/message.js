import * as React from 'react';
import { Box, Divider, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { messageHeading, dividerStyle, buttonContainer, buttonStyle } from "./style";

const message = () => {
    return (
        <>
            <Box component="text" sx={messageHeading} >
                Notification
            </Box>

            <Stack spacing={2}>
                <Divider sx={dividerStyle} />
                <TextField
                    label="Title"
                    id="outlined-size-small"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={6}
                />
                <Box sx={buttonContainer}>
                    <Button sx={buttonStyle} variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default message