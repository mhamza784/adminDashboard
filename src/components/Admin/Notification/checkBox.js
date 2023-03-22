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
import List from "./tableData";
import API from "@/redux/service/base.service";
import { BASE_URL_API } from "@/redux/service/base.config";
import { useDispatch, useSelector } from "react-redux";
import { searchData } from "@/redux/slices/users";

import { GET_ALL_USERS } from "@/redux/types";

export default function RowRadioButtonsGroup() {
    const { token } = useSelector((state) => state.users);
    const [gender, setGender] = useState("male");
    const [checked, setChecked] = React.useState([true, false]);
    const [selectedChecked, setSelectedChecked] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSearch = async (event) => {
        const data = {
            gender,
        };
        // console.log("data");

        try {
            const res = await API.post(`${BASE_URL_API}/api/user/search`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("res", res.data);
            // setSearchData(res.data.data);
            dispatch(searchData(res.data.data))


        } catch (err) {
            console.log("err", err);

        }

    };



    const handleChange1 = (event) => {
        if (checked[0] && checked[1]) {
            setChecked([event.target.checked, event.target.checked]);
            setSelectData(allUser)
            // setAnchorEl(event.currentTarget);
        } else {
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
            setChecked([checked[0], event.target.checked]);
            setSelectData(allUser.filter((item) => item.gender == "female"))
            setAnchorEl(event.currentTarget);
        }

    };
    const handleChange4 = (event) => {
        setSelectedChecked(event.target.checked);

    };



    const { allUser, user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_USERS,
        });
    }, [dispatch]);
    console.log(allUser, "all users");
    const [selectItem, setSelectedItem] = useState([]);

    const [selectData, setSelectData] = useState(
        allUser
    );
    const openList = (event) => {
        setAnchorEl(event.currentTarget);
        setSelectData(allUser.filter((item) => item.gender == checked[0]))

    };
    console.log(allUser.filter((item) => item.country), "gender");
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
                            control={<Checkbox checked={selectedChecked} onChange={handleChange4} onClick={openList} />}
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
                        <Typography><List item={selectData} /></Typography>
                    </Popover>
                </Box>
            </Box>
        </FormControl >
    );
}