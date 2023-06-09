import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SearchBar from "./tableSearchBar";
import { toolbarSelected } from "../style"

const EnhancedTableToolbar = (props) => {
    const { numSelected, userList, setSelectData, searchQuery, handleSearch } = props;
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={toolbarSelected}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={toolbarSelected}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    User List
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Filter list">
                    <SearchBar userList={userList} setSelectData={setSelectData} handleSearch={handleSearch} searchQuery={searchQuery} />
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <SearchBar userList={userList} setSelectData={setSelectData} handleSearch={handleSearch} searchQuery={searchQuery} />
                </Tooltip>
            )}
        </Toolbar>
    );
}
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar