import React, { useCallback, useEffect, useState } from "react";
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
import List from "./table";
import { useDispatch, useSelector } from "react-redux";

import { GET_ALL_USERS } from "@/redux/types";

export default function RowRadioButtonsGroup(props) {
    const { setCheckedData, checkedData, selectedMembers, setSelectData } = props;

    const { token } = useSelector((state) => state.users);
    const [checked, setChecked] = React.useState([true, false]);
    const [selectedChecked, setSelectedChecked] = React.useState(false);
    const { allUser, user } = useSelector((state) => state.users);
    const dispatch = useDispatch();


    const handleChange1 = (event) => {
        // setCheckedData([]);
        setSelectData(allUser)
    }
    const handleChange2 = (event) => {
        // setCheckedData([]);
        setSelectData(allUser?.filter((item) => item.gender == "male"))
    };

    const handleChange3 = (event) => {
        // setCheckedData([]);
        setSelectData(allUser?.filter((item) => item.gender == "female"))
    };


    useEffect(() => {
        dispatch({
            type: GET_ALL_USERS,
        });
    }, [dispatch]);




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
                        defaultValue="all"
                    >
                        <FormControlLabel
                            label="All"
                            value="all"
                            control={<Radio onClick={handleChange1} />}
                        />
                        <FormControlLabel
                            label="Male"
                            value="male"
                            control={
                                <Radio onClick={handleChange2} />
                            }
                        />
                        <FormControlLabel
                            label="Female"
                            value="female"
                            control={<Radio onClick={handleChange3} />}
                        />

                    </RadioGroup>
                </Box>
            </Box>
        </FormControl >
    );
}