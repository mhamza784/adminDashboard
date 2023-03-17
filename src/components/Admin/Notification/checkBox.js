import * as React from 'react';
import {
    Box,
    Divider,
    Popover,
    Typography
} from "@mui/material";
import { Radio, Checkbox } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { radioContainer, radioButton, radioButtonTitle } from "./style"
import List from "./tableData"

export default function RowRadioButtonsGroup() {
    const [checked, setChecked] = React.useState([true, false]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openList = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControlLabel
                label="Male"
                control={<Checkbox checked={checked[0]} onChange={handleChange2} onClick={openList} />}
            />
            <FormControlLabel
                label="Female"
                control={<Checkbox checked={checked[1]} onChange={handleChange3} onClick={openList} />}
            />
        </Box>
    );

    return (
        <FormControl sx={radioContainer} >
            <Box sx={radioButton}>
                <Box sx={radioButtonTitle}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Select User</FormLabel>
                </Box>
                <Box>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                            label="All"
                            control={
                                <Checkbox
                                    checked={checked[0] && checked[1]}
                                    indeterminate={checked[0] !== checked[1]}
                                    onChange={handleChange1}
                                    onClick={openList}
                                />
                            }
                        />
                        {children}
                    </RadioGroup>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Typography sx={{}}><List /></Typography>
                    </Popover>
                </Box>
            </Box>
        </FormControl >
    );
}