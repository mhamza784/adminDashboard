import { Box } from "@mui/material";
import React, { useState } from "react";
import CkeckBox from "./radioBtn";
import Table from "./table";
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Message from "./message";
import { gridContainer, gridMessage, tableBox } from "./style";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const NewMessagesUI = (props) => {
    const { allUser, user } = useSelector((state) => state.users);
    const [selectData, setSelectData] = useState(allUser);


    // console.log("all users", allUser);
    const { setCheckedData, setTitle, setMessage, handleMessage, checkedData, selectedMembers, title, message } = props;
    return (
        <>
            <Box sx={gridContainer}>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={6} >
                        <Item sx={{ boxShadow: 4 }}><CkeckBox setCheckedData={setCheckedData} checkedData={checkedData} selectedMembers={selectedMembers} setSelectData={setSelectData} /></Item>
                        <Item sx={gridMessage}><Message message={message} title={title} setTitle={setTitle} setMessage={setMessage} handleMessage={handleMessage} /></Item>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Item sx={tableBox} ><Table item={selectData} setCheckedData={setCheckedData} setSelectData={setSelectData} /></Item>
                    </Grid>
                </Grid>
            </Box>
        </ >
    );
};

export default NewMessagesUI;
