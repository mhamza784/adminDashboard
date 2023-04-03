import {
    Box,
    Divider,
    Paper,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchButton";
import { mainHeading, searchBarBox } from "./style";
import { GET_ALL_USERS } from "@/redux/types";
import Table from "./table";

const NewMessagesUI = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_USERS,
        });
    }, [dispatch]);

    return (
        <>
            <Box component="text" sx={mainHeading}>
                Registered User
            </Box>
            <Paper elevation={2} sx={searchBarBox}>
                <SearchBar />
            </Paper>
            <Table />
        </>
    );
};

export default NewMessagesUI;
