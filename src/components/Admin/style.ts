
// Dashboard Tabs

export const TabContainer = {
    flexGrow: 1,
    bgcolor: 'background.paper',
    display: 'flex',
    height: 224,
    alignItems: "start",
    marginTop: ".5rem"
};
export const TabsBox = {
    "& button": { borderRadius: 2 },
    // "& button:hover": { backgroundColor: "blue" },
    "& button:focus": { backgroundColor: "#1EB0C4", color: "white", },
    "& button:active": { backgroundColor: "#1EB0C4", color: "white" },
    display: "flex",
    borderColor: 'divider',
    padding: "0",
    borderRadius: ".4rem",
    alignItems: "center",
    width: "15%",
};
export const TabsLink = {

    // ":active": { bgcolor: "#A6A6A6", color: "white", background: "#A6A6A6" },
    justifyContent: "flex-start",
    minHeight: '38px',
    height: '40px',
    fontSize: ".9rem",
    borderRight: 1,
    borderLeft: 1,
    borderColor: 'divider',
    borderRadius: '.4rem',
    textTransform: "capitalize",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    padding: ".5rem",
    color: "#19191D"
};
export const TabsBody = {
    width: "88%"
};
export const BoxMargin = {
    mt: "1.1rem"
};
export const iconColor = {
    color: "#A60363"
}

