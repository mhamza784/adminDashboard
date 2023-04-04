import {
    Box,
    Divider,
    Paper,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./tableSearchBar";
import { mainHeading, searchBarBox } from "./style";
import { GET_ALL_USERS } from "@/redux/types";
import Table from "./table";

const NewMessagesUI = () => {
    const { allUser, user } = useSelector((state) => state.users);
    const [list, setUserList] = useState(allUser);

    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();


    const onSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    }

    const handleSearch = () => {
        if (searchQuery == "") {
            setUserList(allUser);
            return
        }
        const filteredUsers = allUser.filter((user) => {
            return (
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.gender.slice(0, 2).toLowerCase() == searchQuery.toLowerCase() ||
                user.gender.slice(0, 3).toLowerCase() == searchQuery.toLowerCase() ||
                user.gender.slice(0, 4).toLowerCase() == searchQuery.toLowerCase() ||
                user.gender.slice(0, 5).toLowerCase() == searchQuery.toLowerCase() ||
                user.gender.slice(0, 6).toLowerCase() == searchQuery.toLowerCase() ||
                user.age.toString().slice(0, 1) === searchQuery.toLowerCase() ||
                user.age.toString().slice(0, 2) === searchQuery.toLowerCase()
            );
        });
        setUserList(filteredUsers);
    };

    return (
        <>
            <Box component="text" sx={mainHeading}>
                Registered User <SearchBar sx={{ marginTop: "1rem", }} onSearchChange={onSearchChange} searchQuery={searchQuery} />
            </Box>
            <Box sx={{ justifyContent: "end", display: "flex", marginY: "1rem" }}>

            </Box>
            <Table item={allUser} searchQuery={searchQuery} handleSearch={handleSearch} list={list} setUserList={setUserList} />
        </>
    );
};

export default NewMessagesUI;
