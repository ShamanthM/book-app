import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TablePagination,
  InputAdornment,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import axios from 'axios';
import { faTrash, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';

import DeleteUser from './DeleteUser';

import './ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('User_id');

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const fetchUsers = useCallback(() => {
    axios
      .get('http://localhost:8080/users')
      .then((response) => {
        const data = response.data.users;

        if (Array.isArray(data) && data.length > 0) {
          const transformedData = data.map((item) => ({
            User_id: item.User_id,
            Name: item.Name,
            Address: item.Address,
            Profession: item.Profession,
            Age: item.Age,
            Hobbies: item.Hobbies,
          }));
          setUsers(transformedData);
          setLoading(false);
        } else {
          throw new Error('API response is an empty array or not an array');
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.User_id.toString().includes(searchTerm)
    );

    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleEdit = (user) => {
    setEditedUser(user);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setUserToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = (user) => {
    axios
      .delete(`http://localhost:8080/users/${user.User_id}`)
      .then((response) => {
        console.log(`User with ID ${user.User_id} deleted successfully`);
        
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((u) => u.User_id !== user.User_id));

        // Close the delete dialog
        setDeleteDialogOpen(false);
      })
      .catch((error) => {
        console.error(`Error deleting user with ID ${user.User_id}:`, error);
      });
  };

  const handleTableHeaderClick = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleUpdateUser = () => {
    if (!editedUser) {
      return;
    }

    axios
      .put(`http://localhost:8080/users/${editedUser.User_id}`, editedUser)
      .then((response) => {
        console.log(`User with ID ${editedUser.User_id} updated successfully`);

        // Update the user data in the state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.User_id === editedUser.User_id ? editedUser : user
          )
        );

        // Close the edit dialog
        setEditDialogOpen(false);
        setEditedUser(null); // Clear the edited user
      })
      .catch((error) => {
        console.error(`Error updating user with ID ${editedUser.User_id}:`, error);
      });
  };

  const sortedData = [...filteredUsers].sort((a, b) => {
    const isAsc = sortOrder === 'asc';
    const column = sortColumn;

    if (a[column] < b[column]) {
      return isAsc ? -1 : 1;
    } else if (a[column] > b[column]) {
      return isAsc ? 1 : -1;
    } else {
      return 0;
    }
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div className="view-users-container">
      <Typography variant="h4" gutterBottom>
      </Typography>
      <TextField
        type="text"
        placeholder="Search by Name or User ID"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className="view-users-search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonSearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper} className="view-users-table-container">
        <Table className="view-users-table">
          <TableHead>
            <TableRow>
              <TableCell
                className="view-users-table-header"
                onClick={() => handleTableHeaderClick('User_id')}
              >
                User ID
                {sortColumn === 'User_id' && (
                  <span>
                    {sortOrder === 'asc' ? (
                      <KeyboardArrowUpRounded />
                    ) : (
                      <KeyboardArrowDownRounded />
                    )}
                  </span>
                )}
              </TableCell>
              <TableCell
                className="view-users-table-header"
                onClick={() => handleTableHeaderClick('Name')}
              >
                Name
                {sortColumn === 'Name' && (
                  <span>
                    {sortOrder === 'asc' ? (
                      <KeyboardArrowUpRounded />
                    ) : (
                      <KeyboardArrowDownRounded />
                    )}
                  </span>
                )}
              </TableCell>
              <TableCell
                className="view-users-table-header"
                onClick={() => handleTableHeaderClick('Address')}
              >
                Address
                {sortColumn === 'Address' && (
                  <span>
                    {sortOrder === 'asc' ? (
                      <KeyboardArrowUpRounded />
                    ) : (
                      <KeyboardArrowDownRounded />
                    )}
                  </span>
                )}
              </TableCell>
              <TableCell
                className="view-users-table-header"
                onClick={() => handleTableHeaderClick('Profession')}
              >
                Profession
                {sortColumn === 'Profession' && (
                  <span>
                    {sortOrder === 'asc' ? (
                      <KeyboardArrowUpRounded />
                    ) : (
                      <KeyboardArrowDownRounded />
                    )}
                  </span>
                )}
              </TableCell>
              <TableCell
                className="view-users-table-header"
                onClick={() => handleTableHeaderClick('Age')}
              >
                Age
                {sortColumn === 'Age' && (
                  <span>
                    {sortOrder === 'asc' ? (
                      <KeyboardArrowUpRounded />
                    ) : (
                      <KeyboardArrowDownRounded />
                    )}
                  </span>
                )}
              </TableCell>
              <TableCell className="view-users-table-header">Hobbies</TableCell>
              <TableCell className="view-users-table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(startIndex, endIndex).map((user) => (
              <TableRow key={user.User_id}>
                <TableCell className="view-users-table-cell">
                  {user.User_id}
                </TableCell>
                <TableCell className="view-users-table-cell">{user.Name}</TableCell>
                <TableCell className="view-users-table-cell">{user.Address}</TableCell>
                <TableCell className="view-users-table-cell">
                  {user.Profession}
                </TableCell>
                <TableCell className="view-users-table-cell">{user.Age}</TableCell>
                <TableCell className="view-users-table-cell">{user.Hobbies}</TableCell>
                <TableCell className="view-users-table-cell">
                  <IconButton
                    onClick={() => handleEdit(user)}
                    color="primary"
                    aria-label="Edit"
                  >
                    <FontAwesomeIcon icon={faSquarePen} />
                  </IconButton>
                  <IconButton
                    onClick={() => openDeleteDialog(user)}
                    color="error"
                    aria-label="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          className="view-users-pagination"
        />
      </TableContainer>

      <DeleteUser
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        userToDelete={userToDelete}
        onDelete={handleDelete}
      />

      {/* Edit User Dialog */}
      {editedUser && (
        <Dialog
          open={isEditDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          className="edit-user-modal"
        >
          <DialogTitle className="edit-user-title">Edit User</DialogTitle>
          <DialogContent className="edit-user-content">
            <TextField
              label="Name"
              name="Name"
              value={editedUser.Name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, Name: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="Address"
              value={editedUser.Address}
              onChange={(e) =>
                setEditedUser({ ...editedUser, Address: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Profession"
              name="Profession"
              value={editedUser.Profession}
              onChange={(e) =>
                setEditedUser({ ...editedUser, Profession: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Age"
              name="Age"
              type="number"
              value={editedUser.Age}
              onChange={(e) =>
                setEditedUser({ ...editedUser, Age: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hobbies"
              name="Hobbies"
              value={editedUser.Hobbies}
              onChange={(e) =>
                setEditedUser({ ...editedUser, Hobbies: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions className="edit-user-actions">
          <Button
              onClick={handleUpdateUser}
              color="primary"
              className="edit-user-save"
            >
              Save
            </Button>

            <Button
              onClick={() => setEditDialogOpen(false)}
              color="primary"
              className="edit-user-cancel"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ViewUsers;
