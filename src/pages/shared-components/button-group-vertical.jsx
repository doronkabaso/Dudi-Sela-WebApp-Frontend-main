import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export const VerticalBtnGroup = ({ buttons, value, setValue, orientation }) => {
    return (
        <Box sx={{ display: 'flex', '& > *': { m: 1, } }}>
            <ButtonGroup
                orientation={orientation}
                aria-label="vertical outlined button group"
            >
                {buttons.map(button => (
                    <>
                        <p>{button.label}</p>
                        <Button
                            onClick={(e) => { setValue(e) }}>
                            {button.value}
                        </Button>
                    </>
                ))}
            </ButtonGroup>
        </Box>
    );
}