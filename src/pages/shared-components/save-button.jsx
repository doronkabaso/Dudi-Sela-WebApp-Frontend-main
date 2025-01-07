import React from 'react';

export const SaveButton = ({ label = "שמור", onSave, disabled=false }) => {
  return (
    <button disabled={disabled} onClick={(e) => onSave(e)}>
      {label}
    </button>
  );
}