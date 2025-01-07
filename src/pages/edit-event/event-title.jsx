import React from 'react';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

export const EventTitle = ({title, setTitle}) => {

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off">
            <TextField value={title} onChange={(e) => setTitle(e.target.value)} id="event-title" label="כותרת האירוע" variant="outlined" sx={{ marginBlock: "unset !importsnt"}} />
        </Box>
    )
}
