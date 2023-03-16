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
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";
import NativeSelect from "@mui/material/NativeSelect";
import { arr } from "utils";
import { Country, State, City } from "country-state-city";
import API from "@/redux/service/base.service";
import { BASE_URL_API } from "@/redux/service/base.config";
import { useSelector } from "react-redux";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";

const SearchButton = ({ setSearchData }) => {
  const { token } = useSelector((state) => state.users);
  const [selectedCountry, setSelectedCountry] = useState("any");
  const [selectedState, setSelectedState] = useState("any");
  const [selectedCity, setSelectedCity] = useState("any");
  const [startAge, setStartAge] = useState(19);
  const [endAge, setEndAge] = useState(35);
  const [gender, setGender] = useState("");

  const handleSearch = () => {
    // const data = {
    //   age: [Number(startAge), Number(endAge)],
    //   gender,
    //   country: selectedCountry?.name,
    //   state: selectedState?.name,
    //   city: selectedCity?.name,
    // };
    console.log("data");

    // API.post(`${BASE_URL_API}/api/user/search`, data, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }).then((res) => {
    //   setSearchData(res.data.data);
    // });
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { sm: "space-between", xs: "flex-start" },
          alignItems: "center",
          gap: { sm: "1rem", xs: ".5rem" },
        }}
      >
        <FormControl sx={{}} size="small" variant="standard">
          <Box
            id="demo-select-small"
            sx={{ fontWeight: "600", fontFamily: "Helvetica" }}
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
        <FormControl size="small" variant="standard">
          <Box
            id="demo-select-small"
            sx={{ fontWeight: "600", fontFamily: "Helvetica" }}
          >
            Age
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              value={startAge}
              sx={{ paddingTop: ".3rem" }}
              IconComponent={ArrowDropDownIcon}
              onChange={(e) => setStartAge(e.target.value)}
            >
              {arr.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>

            {/* <Box sx={{ padding: ".4rem", textTransform: "lowercase" }}>to</Box> */}
            <Select
              // className={style.buttonAge}
              value={endAge}
              sx={{ paddingTop: ".3rem" }}
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
        <FormControl sx={{}} variant="standard">
          <Box
            id="demo-select-small"
            sx={{ fontWeight: "600", fontFamily: "Helvetica" }}
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
        <FormControl sx={{}} variant="standard">
          <Box
            id="demo-select-small"
            sx={{ fontWeight: "600", fontFamily: "Helvetica" }}
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
        <FormControl sx={{}} variant="standard">
          <Box
            id="demo-select-small"
            sx={{ fontWeight: "600", fontFamily: "Helvetica" }}
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
        <FormControl sx={{}} size="small" variant="standard">
          <Box
            id="demo-select-small"
            sx={{ fontWeight: "600", fontFamily: "Helvetica" }}
          >
            within
          </Box>
          <Select
            className={style.select}
            label="within"
          // value={gender}
          // onChange={(e) => setGender(e.target.value)}
          >
            {selectedCity?.name && (
              <>
                <MenuItem value="">-</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="100">100</MenuItem>
                <MenuItem value="250">250</MenuItem>
                <MenuItem value="500">500</MenuItem>
              </>
            )}
          </Select>
        </FormControl>
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
      {/* <Divider /> */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginY: "1rem",
        }}
      >
        <Button className={style.button} endIcon={<ArrowDropDownIcon />}>
          Sort by date
        </Button>
      </Box> */}
    </Box>
  );
};

export default SearchButton;
