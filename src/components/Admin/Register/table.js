import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Avatar, Table, TableBody, TableCell, TablePagination, TableRow, Paper, TableContainer, } from '@mui/material';
import { tableSize, tableCell, ProfileContainer, tablePaginationRow, AvatarSize, profileData, profileEmail, iconContainer, iconColor, MainContainer, } from "./style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL_API } from "@/redux/service/base.config";
import { DELETE_USER_BY_ID } from "@/redux/types";
import { searchData } from "@/redux/slices/users";
import DeleteUser from './TableComponent/deleteUser';
import TableHeadLabel from "./TableComponent/tableHead";
import TablePaginationRow from './TableComponent/tablePagination';

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
        <TablePaginationRow count={count} page={page} rowsPerPage={rowsPerPage} handleFirstPageButtonClick={handleFirstPageButtonClick} handleBackButtonClick={handleBackButtonClick} handleNextButtonClick={handleNextButtonClick} handleLastPageButtonClick={handleLastPageButtonClick} theme={theme} />
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable({ item, handleSearch, searchQuery, list }) {
    const { allUser, user } = useSelector((state) => state.users);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteID, setDeleteID] = useState();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const deleteUser = (id) => {
        setDeleteID(id)
        setOpen(true);
    }
    const handleDelete = () => {
        dispatch({ type: DELETE_USER_BY_ID, payload: { id: deleteID } });
        dispatch(searchData(allUser.filter((item) => item._id !== deleteID)));
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
        handleSearch()

    }, [item, searchQuery,]);

    return (
        <Paper sx={{ boxShadow: 3 }} >
            <TableContainer sx={MainContainer}>
                <DeleteUser handleClose={handleClose} handleDelete={handleDelete} open={open} />
                <Table sx={tableSize} aria-label="custom pagination table">
                    <TableHeadLabel />
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
                                <TableCell align="left">
                                    <Box sx={profileEmail}>{row.email}</Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={profileData}>{row.gender}</Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={profileData}>{row.age}</Box>
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
