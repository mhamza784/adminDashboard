const handleSelectAllClick = (event, setCheckedData, item, setSelected, list) => {
    if (event.target.checked) {
        setCheckedData((prevCheckedData) => [...prevCheckedData, ...item]);
    } else {
        setCheckedData([])
    }

    if (event.target.checked) {
        const newSelected = list.map((n) => n.name);
        setSelected(newSelected);
        return;
    }
    setSelected([]);

};
export default handleSelectAllClick;
