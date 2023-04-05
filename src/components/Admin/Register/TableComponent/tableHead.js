import React from 'react';
import { tableHeadName, tableHead, } from "../style";
import { TableHead, TableCell, TableRow } from '@mui/material';



const TableHeadLabel = () => {
    return (
        <TableHead>
            <TableRow >
                <TableCell sx={tableHeadName} >Name</TableCell>
                <TableCell sx={tableHead} align="left">Email</TableCell>
                <TableCell sx={tableHead} align="center">Gender</TableCell>
                <TableCell sx={tableHead} align="center">Age</TableCell>
                <TableCell sx={tableHead} align="left">Action</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TableHeadLabel