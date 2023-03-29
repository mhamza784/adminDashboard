import {
    Box,
    Divider,
    Paper,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "./ListItem";
import Pagination from "@mui/material/Pagination";
import SearchButton from "./SearchButton";
import { mainHeading, tableContainer, tableHeading, tableDivider, tablePagination } from "./style";
import { GET_ALL_USERS } from "@/redux/types";
import Table from "./table";

const NewMessagesUI = ({ handleListItemClick }) => {

    const { allUser, user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_USERS,
        });
    }, [dispatch]);
    // console.log(allUser, "all users");
    const [selectItem, setSelectedItem] = useState([]);


    return (
        <>
            <Box component="text" sx={mainHeading}>
                Registered Members
            </Box>
            <Paper elevation={2} sx={{ padding: "1rem", marginBottom: "1rem", marginTop: ".6rem" }}>
                <SearchButton />
            </Paper>


            <Table
            // key={item?._id}
            // icon="/favorite_heart.svg"
            // handleOpen={() => handleOpen(item)}
            // item={item}
            />
            {/* <Box >
                <Table />
            </Box> */}
        </>
    );
};

export default NewMessagesUI;
