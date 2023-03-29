import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from "./Breadcrumb";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RegisteredList from "./Register";
import NotificationTab from "./Notification";
import { TabContainer, TabsBox, TabsLink, TabsBody, BoxMargin, iconColor, TabsBoxMb } from "./style";
import { Hidden } from '@mui/material';
import AppBar from '@mui/material/AppBar';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, pt: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
    const [label, setLabel] = React.useState("Registered");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setLabel(event.target.name);
    };

    return (
        <Box
            sx={TabContainer}
        >
            <Hidden only={['sm', 'xs']}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={TabsBox}
                    indicatorColor="none"
                >
                    <Tab icon={<NavigateNextIcon sx={iconColor} />} name="Members User" iconPosition="start" label="Registered User" sx={TabsLink} {...a11yProps(0)} />
                    <Tab icon={<NavigateNextIcon sx={iconColor} />} name="Notification" iconPosition="start" label="Notification" sx={TabsLink} {...a11yProps(1)} />
                    {/* <Tab icon={<NavigateNextIcon sx={iconColor} />} name="Email" iconPosition="start" label="Email Users" sx={TabsLink} {...a11yProps(2)} /> */}
                </Tabs>
            </Hidden>
            <Hidden only={['xl', 'lg', 'md',]}>
                <AppBar position="static" sx={{ backgroundColor: "transparent", marginBottom: "1rem", }} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        // textColor="inherit"
                        // variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={TabsBoxMb}


                        indicatorColor="none"
                    >
                        <Tab icon={<NavigateNextIcon sx={iconColor} />} name="Members User" iconPosition="start" label="Registered User" sx={TabsLink} {...a11yProps(0)} />
                        <Tab icon={<NavigateNextIcon sx={iconColor} />} name="Notification" iconPosition="start" label="Notification" sx={TabsLink} {...a11yProps(1)} />
                        {/* <Tab icon={<NavigateNextIcon sx={iconColor} />} name="Email" iconPosition="start" label="Email Users" sx={TabsLink} {...a11yProps(2)} /> */}
                    </Tabs>
                </AppBar>
            </Hidden>
            <Box sx={TabsBody} fullWidth={true}>
                <TabPanel value={value} index={0} >
                    <Box >
                        <Breadcrumbs value={label} />
                    </Box>
                    <Box sx={BoxMargin}>
                        <RegisteredList />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box>
                        <Breadcrumbs value={label} />
                    </Box>
                    <Box sx={BoxMargin}>
                        <NotificationTab />
                    </Box>
                </TabPanel >
            </Box>
        </Box >
    );
}
