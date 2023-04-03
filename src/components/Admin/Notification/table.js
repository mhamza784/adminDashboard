import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableHead from "./TableComponents/EnhancedTableHead";
import EnhancedTableToolbar from "./TableComponents/EnhancedTableToolbar";
import { tableContainer, tableContainerHeight, tableWidth, rowHeight, tableRowName } from "./style"


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}
export default function EnhancedTable({ item, setCheckedData, setSelectData }) {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('email');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [list, setUserList] = React.useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    }

    const handleSearch = () => {
        if (searchQuery == "") {
            setUserList(item);
            return
        }
        const filteredUsers = item.filter((user) => {
            return (
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        // console.log("search bar data", filteredUsers);
        setUserList(filteredUsers);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setCheckedData((prevCheckedData) => [...prevCheckedData, ...item]);
        } else {
            setCheckedData([])
        }

        if (event.target.checked) {
            const newSelected = list.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);

    };

    const handleClick = (event, name, email,) => {

        const checked = event.target.checked;
        if (checked) {
            setCheckedData((prevCheckedData) => [...prevCheckedData, email]);
        } else {
            setCheckedData((prevCheckedData) => prevCheckedData.filter((prevRow) => prevRow !== email));
        }

        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(list).length) : 0;

    useEffect(() => {
        handleSearch()
    }, [searchQuery, item])

    return (
        <Box >
            <Paper sx={tableContainer}>
                <EnhancedTableToolbar numSelected={selected.length} userList={item} setSelectData={setSelectData} handleSearch={onSearchChange} searchQuery={searchQuery} />
                <TableContainer sx={tableContainerHeight}>
                    <Table
                        sx={tableWidth}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead

                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={list ? list.length : 0}
                        />
                        <TableBody>
                            {stableSort(list, getComparator(order, orderBy))
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                            sx={rowHeight}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                sx={tableRowName}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25, { label: 'All', value: -1 }]}
                    component="div"
                    count={list ? list.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box >
    );
}