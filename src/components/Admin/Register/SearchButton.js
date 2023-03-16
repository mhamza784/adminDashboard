import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState } from "react";
import style from "./home.module.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconButton from "@mui/material/IconButton";
import NativeSelect from "@mui/material/NativeSelect";
import { arr } from "utils";
import { Country, State, City } from "country-state-city";
import API from "@/redux/service/base.service";
import { BASE_URL_API } from "@/redux/service/base.config";
import { useSelector } from "react-redux";

const SearchButton = ({ setSearchData }) => {
  const { token } = useSelector((state) => state.users);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [startAge, setStartAge] = useState(19);
  const [endAge, setEndAge] = useState(35);
  const [gender, setGender] = useState(null);

  const handleSearch = () => {
    const data = {
      age: [Number(startAge), Number(endAge)],
      gender,
      country: selectedCountry?.name,
      state: selectedState?.name,
      city: selectedCity?.name,
    };
    console.log("data", data);
    API.post(`${BASE_URL_API}/api/user/search`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setSearchData(res.data.data);
    });
  };
  return (
    <Box sx={{ marginTop: "1.2rem", paddingX: "1.5rem" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { sm: "space-between", xs: "flex-start" },
          alignItems: "center",
          gap: { sm: "1rem", xs: ".5rem" },
          marginBottom: "1rem",
        }}
      >
        <FormControl sx={{}} size="small">
          <InputLabel id="demo-select-small">Seeking</InputLabel>
          <Select
            className={style.select}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <Box
          className={style.ageBox}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ padding: ".4rem" }}>Age</Box>
          <NativeSelect
            className={style.buttonAge}
            value={startAge}
            onChange={(e) => setStartAge(e.target.value)}
          >
            {arr.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </NativeSelect>

          <Box sx={{ padding: ".4rem", textTransform: "lowercase" }}>to</Box>
          <NativeSelect
            className={style.buttonAge}
            value={endAge}
            onChange={(e) => setEndAge(e.target.value)}
          >
            {arr.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </NativeSelect>
        </Box>
        <FormControl sx={{}} size="small">
          <InputLabel id="demo-select-small">Country</InputLabel>
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
        <FormControl sx={{}} size="small">
          <InputLabel id="demo-select-small">State</InputLabel>
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
        <FormControl sx={{}} size="small">
          <InputLabel id="demo-select-small">City</InputLabel>
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
        <Button className={style.button} endIcon={<ArrowDropDownIcon />}>
          Within
        </Button>
        <Button
          className={style.searchButton}
          sx={{
            fontFamily: "Helvetica !important",
            textTransform: "capitalize !important",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Divider />
    </Box>
  );
};

export default SearchButton;
