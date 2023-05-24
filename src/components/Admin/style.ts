
// Dashboard Tabs

export const TabContainer = {
    flexGrow: 1,
    bgcolor: 'background.paper',
    display: { xxl: "flex", xl: "flex", lg: "flex", md: "flex", sm: "inline", xs: "inline", },
    height: 224,
    alignItems: "start",
    // marginTop: ".5rem"
};
export const TabsBox = {
    display: "flex",
    borderColor: 'divider',
    padding: "0",
    alignItems: "center",
    marginLeft: "1rem",
    paddingY: 1,
    boxShadow: 4,
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
    color: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
    borderRadius: 2,
    minWidth: 203,
};
export const TabsBoxMb = {
    display: "flex",
    borderColor: 'divider',
    padding: "0",
    alignItems: "center",
    paddingY: .15,
    boxShadow: 4,
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
    color: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
    borderRadius: 1,
};
export const TabsLink = {
    '&.Mui-selected': {
        color: 'white',
        background: "#1EB0C4",
        borderRight: 1,
        borderLeft: 1,
        borderColor: 'divider',
    },
    justifyContent: "flex-start",
    minHeight: '38px',
    height: '38px',
    fontSize: ".9rem",
    // borderRight: 1,
    // borderLeft: 1,
    borderColor: 'divider',
    borderRadius: '.4rem',
    textTransform: "capitalize",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "#19191D",
    marginLeft: { xs: ".5rem", md: "0rem" }
};
export const TabsBody = {
    width: '100%',
    maxWidth: 1800,
};
export const BoxMargin = {
    mt: "1.1rem"
};
export const iconColor = {
    color: "#A60363"
}

