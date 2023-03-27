import React, { useState } from 'react';
import { Box } from "@mui/material";
import { mainHeading } from "./style";
import Main from "./notificationBody"
import { useDispatch } from 'react-redux';
import { SEND_USER_NOTIFICATION } from "@/redux/types";

const Index = () => {

    const [checkedData, setCheckedData] = useState([]);
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const dispatch = useDispatch();

    const selectedMembers = [...new Set(checkedData)];
    const membersEmail = selectedMembers.map(item => item.email)
    const handleMessage = () => {
        // console.log("checked data parents ", "title:", title, "description:", message, "users:", membersEmail)
        dispatch({
            type: SEND_USER_NOTIFICATION,
            payload: {
                title,
                description: message,
                users: membersEmail,
            },
        });
    }
    return (
        <>
            <Box component="text" sx={mainHeading}>
                Notification
            </Box>
            <Main setCheckedData={setCheckedData} checkedData={checkedData} setTitle={setTitle} setMessage={setMessage} handleMessage={handleMessage} selectedMembers={selectedMembers} />
        </ >
    );
};

export default Index;
