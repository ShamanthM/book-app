// EditUser.js

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const EditUser = ({ isOpen, onClose, userToEdit, onUpdateUser }) => {
  const [editedUser, setEditedUser] = useState({ ...userToEdit });

  useEffect(() => {
    setEditedUser({ ...userToEdit });
  }, [userToEdit]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8080/users/${userToEdit.User_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        onUpdateUser(updatedUser); // Call the onUpdateUser callback
        onClose();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="Name"
          value={editedUser.Name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="Address"
          value={editedUser.Address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Profession"
          name="Profession"
          value={editedUser.Profession}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          name="Age"
          type="number"
          value={editedUser.Age}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Hobbies"
          name="Hobbies"
          value={editedUser.Hobbies}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;