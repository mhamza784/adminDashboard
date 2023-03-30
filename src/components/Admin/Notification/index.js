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

    const handleMessage = (e) => {
        e.preventDefault();
        dispatch({
            type: SEND_USER_NOTIFICATION,
            payload: {
                title,
                description: message,
                users: membersEmail,
            },
        });
        setTitle('');
        setMessage('');
    }
    return (
        <>
            <Box component="text" sx={mainHeading}>
                Notification
            </Box>
            <Main setCheckedData={setCheckedData} checkedData={checkedData} setTitle={setTitle} message={message} title={title} setMessage={setMessage} handleMessage={handleMessage} selectedMembers={selectedMembers} />
        </ >
    );
};

export default Index;
