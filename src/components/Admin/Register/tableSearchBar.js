import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { searchBarContainer, searchBarInput, iconButton } from "./style";

export default function SearchBarInput(props) {

    const { onSearchChange, searchQuery } = props;

    return (

        <Paper
            component="form"
            sx={searchBarContainer}
        >

            <InputBase
                sx={searchBarInput}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={onSearchChange}
            />
            <IconButton type="button" sx={iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}