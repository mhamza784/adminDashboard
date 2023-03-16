import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function CustomSeparator({ value }) {
    console.log(value);
    const breadcrumbs = [
        <Link underline="hover" key="1" fontWeight="bold" color="#A60363" href="/admin" onClick={handleClick}>
            Admin Panel
        </Link>,
        <Typography key="3" fontWeight="bold" color="#1EB0C4">
            {value} User
        </Typography>,
    ];

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
