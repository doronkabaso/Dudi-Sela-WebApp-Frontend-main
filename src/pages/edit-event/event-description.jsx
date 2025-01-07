import React from 'react';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

export const EventDescription = ({description, setDescription}) => {

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off">
            <TextField value={description} onChange={(e) => setDescription(e.target.value)} id="event-description" label="תיאור האירוע" variant="outlined" sx={{ marginBlock: "unset !importsnt"}} />
        </Box>
    )
}
