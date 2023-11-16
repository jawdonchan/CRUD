import React from 'react';
import Modal from '@mui/material/Modal';
import ExportStudentsToExcel from './StudentExport';

const ExportModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'lightblue', // Change the background color to your desired color
          borderRadius: '8px', // Add border-radius for rounded corners
          padding: '16px', // Add padding to the content
        }}
      >
        <ExportStudentsToExcel />
      </div>
    </Modal>
  );
};

export default ExportModal;
