import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Avatar, Divider } from '@mui/material';
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
import { tableHeading, ProfileContainer, AvatarSize, profileData, iconContainer, iconColor, tableDivider } from "./style";

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

export default function CustomPaginationActionsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
                <TableBody >
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <TableRow key={row.name} >
                            <TableCell component="th" scope="row" align="center" sx={{ paddingLeft: "3rem" }}>
                                <Box sx={ProfileContainer}>
                                    <Avatar
                                        sx={AvatarSize}
                                        alt="logo"
                                        onClick={(e) => handleListItemClick(e, item)}
                                        src="/imagecricle.png"
                                    />
                                    <Box sx={profileData} >
                                        {row.name}
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={profileData}>
                                    {row.calories}
                                </Box>

                            </TableCell>
                            <TableCell align="center">
                                <Box sx={profileData}>{row.fat}</Box>
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={profileData}>{row.email}</Box>
                            </TableCell>
                            <TableCell align="right">
                                <Box sx={iconContainer}>
                                    <Box component="img" src="deleteicon.png" width="15px" height="15px" sx={iconColor} />
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
                            count={rows.length}
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
