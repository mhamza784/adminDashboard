import { Box } from "@mui/material";
import React from "react";
import CkeckBox from "./checkBox";
import Table from "./tableData";
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Message from "./message";
import { mainHeading, gridContainer, gridMessage, tablePadding } from "./style";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const NewMessagesUI = () => {

    return (
        <>
            <Box component="text" sx={mainHeading}>
                Notification
            </Box>
            <Box sx={gridContainer}>
                <Grid container >
                    <Grid item xs={8} >
                        <Item><CkeckBox /></Item>
                        <Item sx={gridMessage}><Message /></Item>
                    </Grid>
                </Grid>
            </Box>
        </ >
    );
};

export default NewMessagesUI;
