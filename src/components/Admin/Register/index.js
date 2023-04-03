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
    const [selectData, setSelectData] = useState(allUser);
    const [list, setUserList] = React.useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    }

    const handleSearch = () => {
        if (searchQuery == "") {
            setUserList(selectData);
            return
        }
        const filteredUsers = selectData.filter((user) => {
            return (
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.gender.toLowerCase() == searchQuery.toLowerCase() ||
                user.age == searchQuery
            );
        });
        setUserList(filteredUsers);
    };

    return (
        <>
            <Box component="text" sx={mainHeading}>
                Registered User<SearchBar onSearchChange={onSearchChange} searchQuery={searchQuery} />
            </Box>
            <Box sx={{ justifyContent: "end", display: "flex", marginY: "1rem" }}>

            </Box>
            <Table item={selectData} searchQuery={searchQuery} handleSearch={handleSearch} list={list} setUserList={setUserList} />
        </>
    );
};

export default NewMessagesUI;
