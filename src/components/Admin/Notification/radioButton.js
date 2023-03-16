import * as React from 'react';
import {
    Box,
    Divider,
} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { radioContainer, radioButton, radioButtonTitle } from "./style"

export default function RowRadioButtonsGroup() {
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
                        <FormControlLabel value="other" control={<Radio size="small" />} label="All" />
                        <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                        <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                    </RadioGroup>
                </Box>
            </Box>
        </FormControl>
    );
}