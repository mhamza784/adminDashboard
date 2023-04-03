import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { colLabel } from "../style";

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: <Box sx={colLabel}>Name</Box>,
    },
    {
        id: 'gender',
        numeric: true,
        disablePadding: false,
        label: <Box sx={colLabel}>Gender</Box>,
    },
    {
        id: 'age',
        numeric: true,
        disablePadding: false,
        label: <Box sx={colLabel}>Age</Box>,
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: <Box sx={colLabel}>email</Box>,
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: <Box sx={colLabel}>Action</Box>,
    },


];
const EnhancedTableHead = (props) => {

    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ display: "flex", justifyContent: "start" }}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


export default EnhancedTableHead