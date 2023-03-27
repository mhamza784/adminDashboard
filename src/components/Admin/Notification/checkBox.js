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
    const { setCheckedData, checkedData, selectedMembers } = props;

    const { token } = useSelector((state) => state.users);
    const [checked, setChecked] = React.useState([true, false]);
    const [selectedChecked, setSelectedChecked] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { allUser, user } = useSelector((state) => state.users);
    const [selectData, setSelectData] = useState(allUser);
    const dispatch = useDispatch();

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange1 = (event) => {

        if (checked[0] && checked[1]) {
            setChecked([event.target.checked, event.target.checked]);
            setSelectData(allUser)
            // setAnchorEl(event.currentTarget);
        } else {
            setCheckedData([]);
            setChecked([event.target.checked, event.target.checked]);
            setSelectData(allUser)
            setAnchorEl(event.currentTarget);
        }
    };
    const handleChange2 = (event) => {

        if (checked[0]) {
            setChecked([event.target.checked, checked[1]])
            setSelectData(allUser.filter((item) => item.gender == "male"))
            // setAnchorEl(event.currentTarget);
        } else {
            setCheckedData([]);
            setChecked([event.target.checked, checked[1]])
            setSelectData(allUser.filter((item) => item.gender == "male"))
            setAnchorEl(event.currentTarget);
        }
    };

    const handleChange3 = (event) => {

        if (checked[1]) {
            setChecked([checked[0], event.target.checked]);
            setSelectData(allUser.filter((item) => item.gender == "female"))
            // setAnchorEl(event.currentTarget);
        } else {
            setCheckedData([]);
            setChecked([checked[0], event.target.checked]);
            setSelectData(allUser.filter((item) => item.gender == "female"))
            setAnchorEl(event.currentTarget);
        }

    };
    const handleChange4 = (event) => {
        setSelectedChecked(event.target.checked);
        // let uniqueData = checkedData.filter((element, index) => {
        //     return checkedData.indexOf(element) === index;
        // });

        // console.log("checked data in checked box ", selectedMembers);
        setSelectData(selectedMembers)
        setAnchorEl(event.currentTarget);

    };

    useEffect(() => {
        dispatch({
            type: GET_ALL_USERS,
        });
    }, [dispatch]);

    const openList = (event) => {
        setAnchorEl(event.currentTarget);
        setSelectData(allUser.filter((item) => item.gender == checked[0]))
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControlLabel
                label="Male"
                control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
            />
            <FormControlLabel
                label="Female"
                control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
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
                                />
                            }
                        />
                        {children}
                        <FormControlLabel
                            label="Select User"
                            control={<Checkbox checked={selectedChecked} onChange={handleChange4} />}
                        />
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
                        <Typography><List item={selectData} setCheckedData={setCheckedData} /></Typography>
                    </Popover>
                </Box>
            </Box>
        </FormControl >
    );
}