import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Avatar, } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { tableSize, tableCell, tablePage, ProfileContainer, tablePaginationRow, AvatarSize, profileData, profileEmail, iconContainer, iconColor, tableDivider, MainContainer, deleteUserContainer, warningIcon, deleteBtn, cancelBtn } from "./style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_USERS } from "@/redux/types";
import { BASE_URL_API } from "@/redux/service/base.config";
import { DELETE_USER_BY_ID } from "@/redux/types";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { searchData } from "@/redux/slices/users";
import SearchBar from "./tableSearchBar";
import TableHead from '@mui/material/TableHead';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={tablePage}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable({ item, handleSearch, searchQuery, list, setUserList }) {
    const { allUser, user } = useSelector((state) => state.users);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [deleteID, setDeleteID] = React.useState();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();



    const deleteUser = (id) => {
        setDeleteID(id)
        setOpen(true);
    }
    const handleDelete = () => {
        dispatch({ type: DELETE_USER_BY_ID, payload: { id: deleteID } });
        dispatch(searchData(allUser.filter((item) => item._id !== deleteID)));

        setUserList((list.filter((item) => item._id !== deleteID)))
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(list).length) : 0;
    useEffect(() => {
        dispatch({
            type: GET_ALL_USERS,
        });
        handleSearch()

    }, [searchQuery, item]);
    return (
        <Paper sx={{ boxShadow: 3 }} >

            <TableContainer sx={MainContainer}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Box sx={deleteUserContainer}>
                        <ErrorOutlineOutlinedIcon sx={warningIcon} />
                        <DialogTitle sx={{ fontWeight: 600, fontSize: "2rem" }} id="alert-dialog-title">
                            {"Are you sure?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                You are really want to delete this user
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} sx={cancelBtn}>Cancel</Button>
                            <Button onClick={handleDelete} type="danger" sx={deleteBtn} autoFocus>
                                Yes, Delete it!
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
                <Table sx={tableSize} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: "600", paddingLeft: "4.2rem" }} >Name</TableCell>
                            <TableCell sx={{ fontWeight: "600" }} align="center">Gender</TableCell>
                            <TableCell sx={{ fontWeight: "600" }} align="center">Age</TableCell>
                            <TableCell sx={{ fontWeight: "600" }} align="center">Email</TableCell>
                            <TableCell sx={{ fontWeight: "600", }} align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {(rowsPerPage > 0
                            ? list?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : list
                        )?.map((row) => (
                            <TableRow key={row.name} sx={{ height: 57.5 }} >
                                <TableCell component="th" scope="row" align="center" sx={tableCell}>
                                    <Box sx={ProfileContainer}>
                                        <Avatar
                                            sx={AvatarSize}
                                            alt="logo"
                                            src={
                                                row?.myPictures?.length
                                                    ? `${BASE_URL_API}${row?.myPictures[0]}`
                                                    : "photo.png"
                                            }
                                        />
                                        <Box sx={profileData} >
                                            {row.name}
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={profileData}>
                                        {row.gender}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={profileData}>{row.age}</Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={profileEmail}>{row.email}</Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={iconContainer}>
                                        <Box onClick={() => deleteUser(row._id)} component="img" src="deleteicon.png" width="15px" height="15px" sx={iconColor} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 69 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                sx={tablePaginationRow}
                rowsPerPageOptions={[3, 5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={list ? list.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Paper >
    );
}
