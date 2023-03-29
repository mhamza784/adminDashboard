import {
  Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState } from "react";
import style from "./home.module.css";
import { searchContainer, menuLabel, ageMenu } from "./style"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";
import NativeSelect from "@mui/material/NativeSelect";
import { arr, WithinValue } from "utils";
import { Country, State, City } from "country-state-city";
import API from "@/redux/service/base.service";
import { BASE_URL_API } from "@/redux/service/base.config";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import { searchData } from "@/redux/slices/users";

const SearchButton = () => {
  const { token } = useSelector((state) => state.users);
  const [selectedCountry, setSelectedCountry] = useState("any");
  const [selectedState, setSelectedState] = useState("any");
  const [selectedCity, setSelectedCity] = useState("any");
  const [startAge, setStartAge] = useState(18);
  const [endAge, setEndAge] = useState(90);
  const [gender, setGender] = useState("");
  const [within, setWithin] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const data = {
      age: [Number(startAge), Number(endAge)],
      gender,
      country: selectedCountry?.name,
      state: selectedState?.name,
      city: selectedCity?.name,
    };
    // console.log("data");

    try {
      const res = await API.post(`${BASE_URL_API}/api/user/search`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", res.data);
      dispatch(searchData(res.data.data))

    } catch (err) {
      console.log("err", err);

    }
  };
  return (
    <Box
      sx={searchContainer}
    >
      <FormControl size="small" variant="standard"  >
        <Box
          id="demo-select-small"
          sx={menuLabel}
        >
          Seeking
        </Box>
        <Select
          className={style.select}
          label="Seeking"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" variant="standard"  >
        <Box
          id="demo-select-small"
          sx={menuLabel}
        >
          Age
        </Box>
        <Box
          sx={ageMenu}
        >
          <Select
            value={startAge}
            IconComponent={ArrowDropDownIcon}
            onChange={(e) => setStartAge(e.target.value)}
          >
            {arr.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={endAge}
            onChange={(e) => setEndAge(e.target.value)}
          >
            {arr.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>
      <FormControl size="small" variant="standard"  >
        <Box
          id="demo-select-small"
          sx={menuLabel}
        >
          Country
        </Box>
        <Select
          value={selectedCountry}
          size="small"
          label="Country"
          className={style.select}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {Country.getAllCountries().map((item) => (
            <MenuItem value={item} key={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" variant="standard"  >
        <Box
          id="demo-select-small"
          sx={menuLabel}
        >
          State
        </Box>
        <Select
          value={selectedState}
          size="small"
          label="State"
          className={style.select}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {State?.getStatesOfCountry(selectedCountry?.isoCode).map((item) => (
            <MenuItem value={item} key={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" variant="standard"  >
        <Box
          id="demo-select-small"
          sx={menuLabel}
        >
          City
        </Box>
        <Select
          value={selectedCity}
          size="small"
          label="City"
          className={style.select}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {City?.getCitiesOfState(
            selectedCountry?.isoCode,
            selectedState?.isoCode
          )?.map((item) => (
            <MenuItem value={item} key={item?.name}>
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className={style.searchButton}
        sx={{
          fontFamily: "Helvetica !important",
          textTransform: "capitalize !important",
          marginTop: "1rem"
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchButton;
