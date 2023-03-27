import { Box } from "@mui/material";
import React from "react";
import CkeckBox from "./checkBox";
import Table from "./table";
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

const NewMessagesUI = (props) => {

    const { setCheckedData, setTitle, setMessage, handleMessage, checkedData, selectedMembers } = props;
    return (
        <>
            <Box sx={gridContainer}>
                <Grid container >
                    <Grid item xs={8} >
                        <Item><CkeckBox setCheckedData={setCheckedData} checkedData={checkedData} selectedMembers={selectedMembers} /></Item>
                        <Item sx={gridMessage}><Message setTitle={setTitle} setMessage={setMessage} handleMessage={handleMessage} /></Item>
                    </Grid>
                </Grid>
            </Box>
        </ >
    );
};

export default NewMessagesUI;
