import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { TextBox } from '../shared-components/text-box';
import { SelectMenu } from '../shared-components/select-menu';
import { TypeGames } from '../club-manager/club-manager/club-helper';

export const EditCourtModal = ({selectedCourt, openEditCourt, closeEditCourt, saveSelectedCourt, removeSelectedCourt }) => {
 const [courtName, setCourtName] = useState(selectedCourt.name);
 const [courtType, setCourtType] = useState(selectedCourt.type);

 const handleSaveCourt = () => {
    saveSelectedCourt(courtName, courtType)
 }

 const handleRemoveCourt = () => {
    removeSelectedCourt(selectedCourt)
 }

  return (
    <>
      <Modal
        open={openEditCourt}
        onClose={closeEditCourt}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-overlay">
        <Box className="modal-box">
          <Container className="modal-content">
            <Box className="modal-body">
            <div>
                <TextBox label="שם" value={courtName} setValue={setCourtName} />
                <SelectMenu inputLabel="סוג מגרש" defaultValue={courtType} values={TypeGames} setValue={setCourtType} />
            </div>

            <div className='flex align-center justify-between save-cancel-btn-container'>
                <button onClick={handleSaveCourt} className='save-btn'>
                  שמירה
                </button>
                <button onClick={handleRemoveCourt} className='save-btn'>
                  הסר מגרש
                </button>
                <div>
                  <button onClick={closeEditCourt} className='cancel-btn'>
                    ביטול
                  </button>
                </div>
              </div>
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
}
