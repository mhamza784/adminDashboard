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
import handleClick from "./TableComponents/handleClickList"
import getComparator from "./TableComponents/getComparator";
import stableSort from "./TableComponents/stableSort";
import handleSelectAllClick from "./TableComponents/handleSelectAllClick";

export default function EnhancedTable({ item, setCheckedData, setSelectData }) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [list, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    }
    const handleSearch = () => {
        if (searchQuery === "") {
            setUserList(item);
            return
        }
        const filteredUsers = item?.filter((user) => {
            return (
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        const uniqueFilteredUsers = Array.from(new Set(filteredUsers.map((user) => user.id))).map((id) =>
            filteredUsers.find((user) => user.id === id)
        );
        setUserList(uniqueFilteredUsers);
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
                    <Table sx={tableWidth} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={(event) => handleSelectAllClick(event, setCheckedData, item, setSelected, list)}
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
                                            onClick={(event) => handleClick(event, row.name, row, setSelected, setCheckedData, selected)}
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
                                            <TableCell component="th" id={labelId} scope="row" padding="none" sx={tableRowName}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 57.5 * emptyRows }}>
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