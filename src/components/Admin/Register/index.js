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

const NewMessagesUI = ({ handleListItemClick }) => {

    const [selectItem, setSelectedItem] = useState([]);

    return (
        <>
            <Box component="text" sx={mainHeading}>
                Registered Members
            </Box>
            <Paper elevation={2} sx={{ padding: "1rem", marginBottom: "1.5rem", marginTop: "1rem" }}>
                <SearchButton />
            </Paper>
            <Box sx={tableContainer}>
                <Box component="text" sx={tableHeading}>
                    Members
                </Box>
                <Divider sx={tableDivider} />
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <>
                        <ListItem
                            handleListItemClick={handleListItemClick}
                            item={item}
                            selectItem={selectItem}
                            setSelectedItem={setSelectedItem}
                        />
                        <Divider />
                    </>
                ))}
            </Box>
            <Box
                sx={tablePagination}
            >
                <Pagination count={5} color="secondary" />
            </Box>
        </>
    );
};

export default NewMessagesUI;
