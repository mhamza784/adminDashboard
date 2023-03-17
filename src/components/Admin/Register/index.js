import {
    Box,
    Divider,
    Paper,
} from "@mui/material";
import React, { useState } from "react";
import ListItem from "./ListItem";
import Pagination from "@mui/material/Pagination";
import SearchButton from "./SearchButton";
import { mainHeading, tableContainer, tableHeading, tableDivider, tablePagination } from "./style";
import Table from "./table";

const NewMessagesUI = ({ handleListItemClick }) => {

    const [selectItem, setSelectedItem] = useState([]);

    return (
        <>
            <Box component="text" sx={mainHeading}>
                Registered Members
            </Box>
            <Paper elevation={2} sx={{ padding: "1rem", marginBottom: "1rem", marginTop: ".6rem" }}>
                <SearchButton />
            </Paper>
            <Box >
                <Table />
            </Box>
        </>
    );
};

export default NewMessagesUI;
