import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function IconBtn({ label, icon }) {
    return (
        <Box>
            <Button variant="contained"
                endIcon={icon}>
                {label}
            </Button>
        </Box>
    );
}