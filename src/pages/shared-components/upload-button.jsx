import React from 'react';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Stack from '@mui/material/Stack';

export default function UploadButton() {
  return (
    <>
      <IconButton color="primary" aria-label="upload picture" component="label" className='upload-btn'>
        הוסף תמונה
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
    </>
  );
}