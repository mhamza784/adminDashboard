const handleClick = (event, name, email, setSelected, setCheckedData, selected) => {

    const checked = event.target.checked;
    if (checked) {
        setCheckedData((prevCheckedData) => [...prevCheckedData, email]);
    } else {
        setCheckedData((prevCheckedData) => prevCheckedData.filter((prevRow) => prevRow !== email));
    }

    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
    }
    setSelected(newSelected);
};
export default handleClick