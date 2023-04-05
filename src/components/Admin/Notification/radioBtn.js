import React, { useCallback, useEffect, useState } from "react";
import { Box, } from "@mui/material";
import { Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { radioContainer, radioButton, radioButtonTitle } from "./style"
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_USERS } from "@/redux/types";

export default function RowRadioButtonsGroup(props) {

    const { setSelectData } = props;
    const { allUser, user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleChange1 = (event) => {
        setSelectData(allUser)
    }
    const handleChange2 = (event) => {
        setSelectData(allUser?.filter((item) => item.gender == "male"))
    };

    const handleChange3 = (event) => {
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
                            control={<Radio size="small" onClick={handleChange1} />}
                        />
                        <FormControlLabel
                            label="Male"
                            value="male"
                            control={
                                <Radio size="small" onClick={handleChange2} />
                            }
                        />
                        <FormControlLabel
                            label="Female"
                            value="female"
                            control={<Radio size="small" onClick={handleChange3} />}
                        />
                    </RadioGroup>
                </Box>
            </Box>
        </FormControl >
    );
}