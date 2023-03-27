import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Avatar, Divider, } from '@mui/material';
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
import { tableHeading, ProfileContainer, AvatarSize, profileData, profileEmail, iconContainer, iconColor, tableDivider } from "./style";
import { useCallback, useEffect, useState } from "react";
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
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
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

function createData(name, calories, fat, email) {
    return { name, calories, fat, email };
}

const rows = [
    createData('Abhishek', "Feb 15, 2022", "Male", "richard@gmail.com", 305, 3.7),
    createData('Dnuty', "Feb 15, 2022", "Male", "richard@gmail.com", 452, 25.0),
    createData('Aeclair', "Feb 15, 2022", "Male", "richard@gmail.com", 262, 16.0),
    createData('Frozaie ', "Feb 15, 2022", "Male", "richard@gmail.com", 159, 6.0),
    createData('Erbread', "Feb 15, 2022", "Male", "richard@gmail.com", 356, 16.0),
    createData('Eycomb', "Feb 15, 2022", "Male", "richard@gmail.com", 408, 3.2),
    createData('Jolly', "Feb 15, 2022", "Male", "richard@gmail.com", 237, 9.0),
    createData('Bean', "Feb 15, 2022", "Male", "richard@gmail.com", 375, 0.0),
    createData('Kitty', "Feb 15, 2022", "Male", "richard@gmail.com", 518, 26.0),
    createData('Lorain', "Feb 15, 2022", "Male", "richard@gmail.com", 392, 0.2),
    createData('Marshmallow', "Feb 15, 2022", "Male", "richard@gmail.com", 318, 0),
    createData('Nugeet', "Feb 15, 2022", "Male", "richard@gmail.com", 360, 19.0),
    createData('Orela', "Feb 15, 2022", "Male", "richard@gmail.com", 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable({ item }) {
    const { allUser, user } = useSelector((state) => state.users);
    const [selectData, setSelectData] = useState(allUser);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [deleteID, setDeleteID] = React.useState();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ALL_USERS,
        });
    }, []);


    const deleteUser = (id) => {
        setDeleteID(id)
        setOpen(true);

        // dispatch({ type: DELETE_USER_BY_ID, payload: { id: id } });


        console.log(id);
    }
    const handleDelete = () => {
        dispatch({ type: DELETE_USER_BY_ID, payload: { id: deleteID } });

        dispatch(searchData(allUser.filter((item) => item._id !== deleteID)));
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(allUser).length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    console.log("all users data", allUser);
    return (
        <TableContainer component={Paper}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", justifyItems: "center", alignItems: "center", padding: "1.3rem" }}>
                    <ErrorOutlineOutlinedIcon sx={{ color: "#F8BB86", fontSize: "5rem" }} />
                    <DialogTitle id="alert-dialog-title">

                        {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You are really want to delete this user
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ ":hover": { bgcolor: "#A6A6A6", color: "white" }, backgroundColor: "#C1C1C1", fontWeight: "600", color: "white", fontSize: "1rem", fontFamily: "sans-serif", width: "6rem", padding: ".5rem" }}>Cancel</Button>
                        <Button onClick={handleDelete} type="danger" sx={{ ":hover": { bgcolor: "#BF513D", color: "white" }, backgroundColor: "rgb(221, 107, 85)", fontWeight: "600", color: "white", width: "11rem", fontSize: "1rem", fontFamily: "sans-serif", padding: ".5rem" }} autoFocus>
                            Yes, Delete it!
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
                <TableBody >
                    {(rowsPerPage > 0
                        ? allUser?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : allUser
                    )?.map((row) => (
                        <TableRow key={row.name} >
                            <TableCell component="th" scope="row" align="center" sx={{ paddingLeft: "3rem" }}>
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
                                    {row.createdAt}
                                </Box>

                            </TableCell>
                            <TableCell align="center">
                                <Box sx={profileData}>{row.gender}</Box>
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={profileEmail}>{row.email}</Box>
                            </TableCell>
                            <TableCell align="right">
                                <Box sx={iconContainer}>
                                    <Box onClick={() => deleteUser(row._id)} component="img" src="deleteicon.png" width="15px" height="15px" sx={iconColor} />
                                    <Box component="img" src="removeicon.png" sx={{ marginTop: ".6rem", }} />
                                </Box>

                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[3, 5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={allUser ? allUser.length : 0}
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
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
