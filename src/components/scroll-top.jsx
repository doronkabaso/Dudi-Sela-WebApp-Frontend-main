import React, { useCallback } from "react";
import { Box, Zoom, Fab, } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const ScrollTop = () => {
    const trigger = useScrollTrigger({
        target: document.body,
        disableHysteresis: true,
        threshold: 100,
    });

    const scrollToTop = useCallback((e) => {
        const anchor = (e.target.ownerDocument || document.body).querySelector('#back-to-top-anchor');
        if (anchor) {
            anchor.scrollIntoView({ top: 0, behavior: 'smooth', block: 'center' });
        }
    }, []);

    return (
        <Zoom in={trigger}>
            <Box
                role="presentation"
                sx={{
                    position: "fixed",
                    bottom: 50,
                    left: 8,
                    zIndex: 1,
                }}
            >
                <Fab
                    onClick={(e) => scrollToTop(e)}
                    color="primary"
                    size="small"
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUp />
                </Fab>
            </Box>
        </Zoom>
    )
}

export default ScrollTop;