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
import { singleUser } from '@/redux/slices/alert'

const NewMessagesUI = () => {
    const { allUser, user } = useSelector((state) => state.users);
    const filteredUsersAdmin = allUser?.filter((user) => user.role !== "ADMIN");
    const [list, setUserList] = useState(filteredUsersAdmin);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();


    const onSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    }

    const handleSearch = () => {
        if (searchQuery === "") {
            setUserList(filteredUsersAdmin);
            return
        }
        const filteredUsers = filteredUsersAdmin?.filter((user) => {
            return (
                user?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                user?.email?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                user?.gender?.slice(0, 2)?.toLowerCase() === searchQuery.toLowerCase() ||
                user?.gender?.slice(0, 3)?.toLowerCase() === searchQuery.toLowerCase() ||
                user?.gender?.slice(0, 4)?.toLowerCase() === searchQuery.toLowerCase() ||
                user?.gender?.slice(0, 5)?.toLowerCase() === searchQuery.toLowerCase() ||
                user?.gender?.slice(0, 6)?.toLowerCase() === searchQuery.toLowerCase() ||
                user?.gender?.slice(0, 7)?.toLowerCase() === searchQuery.toLowerCase() ||
                user?.age?.toString()?.slice(0, 1) === searchQuery.toLowerCase() ||
                user?.age?.toString()?.slice(0, 2) === searchQuery.toLowerCase()
            );
        });
        const uniqueFilteredUsers = Array.from(new Set(filteredUsers.map((user) => user.id))).map((id) =>
            filteredUsers.find((user) => user.id === id)
        );
        setUserList(uniqueFilteredUsers);
    };



    useEffect(() => {
        dispatch({
            type: GET_ALL_USERS,
        });
        dispatch(
            singleUser(null)
        )
        handleSearch()

    }, [dispatch]);

    return (
        <>
            <Box component="text" sx={mainHeading}>
                Registered User <SearchBar sx={{ marginTop: "1rem", }} onSearchChange={onSearchChange} searchQuery={searchQuery} />
            </Box>
            <Box sx={{ justifyContent: "end", display: "flex", marginY: "1rem" }}>

            </Box>
            <Table item={filteredUsersAdmin} searchQuery={searchQuery} handleSearch={handleSearch} list={list} setUserList={setUserList} />
        </>
    );
};

export default NewMessagesUI;
