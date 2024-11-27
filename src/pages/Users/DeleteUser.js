// DeleteUser.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import './DeleteUser.css';

const DeleteUser = ({ isOpen, onClose, userToDelete, onDelete }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="customDialog">
      <div className="modalContainer">
        <DialogTitle className="dialogTitle">Confirm Delete</DialogTitle>
        <DialogContent>
          {userToDelete && (
            <Typography className="confirmationText">
              Are you sure you want to delete the user with ID {userToDelete.User_id}?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete(userToDelete);
              onClose();
            }}
            className="deleteButton"
          >
            Delete
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default DeleteUser;
