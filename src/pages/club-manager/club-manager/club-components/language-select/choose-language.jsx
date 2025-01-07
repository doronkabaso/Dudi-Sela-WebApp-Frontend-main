import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const ChooseLanguage = ({price, setPrice, isHebrewLang, setIsHebrewLang, closeChooseLang}) => {

  const handleChooseLanguage = (e) => {
    setIsHebrewLang(e.target.value)
  }
  return (
    <Modal
        open={true}
        onClose={closeChooseLang}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-overlay">
        <Box className="modal-box modal-language">
            <Container className="modal-content">
                <Box className="modal-body modal-language">
                    <RadioGroup
                        aria-labelledby="controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={isHebrewLang}
                        row
                        onChange={(e) => handleChooseLanguage(e)}
                        className="flex align-center">
                        <FormControlLabel value={true} control={<Radio />} label="עברית" />
                        <FormControlLabel value={false} control={<Radio />} label="אנגלית" />
                    </RadioGroup>
                </Box>
            </Container>
        </Box>
    </Modal>
  )
}



