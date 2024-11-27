import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Alert, AlertTitle, Snackbar } from '@mui/material';
import './AddUsers.css'; // Import the CSS file
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

function AddUsers() {
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    Profession: '',
    Age: '',
    Hobbies: '',
  });

  const navigate = useNavigate();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isButtonGreen, setIsButtonGreen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST API call to save user data
    axios.post('http://localhost:8080/users', formData)
      .then((response) => {
        // Handle success
        console.log('Data saved successfully:', response.data);
        setSuccessMessage('User created successfully');
        setShowSuccessAlert(true);

        // Clear the form data
        setFormData({
          Name: '',
          Address: '',
          Profession: '',
          Age: '',
          Hobbies: '',
        });

        // Change button color to green
        setIsButtonGreen(true);

        // Reset button color after 3 seconds
        setTimeout(() => {
          setIsButtonGreen(false);
          navigate('/users/all-users');
        }, 1000);
      })
      .catch((error) => {
        // Handle error
        console.error('Error saving data:', error);
      });
  };

  return (
    <Container className="add-users-container" maxWidth="sm">
      <div className="add-users-form">
        <Typography variant="h4" align="center" gutterBottom>
          Add Users Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="Name"
                variant="outlined"
                value={formData.Name}
                onChange={handleChange}
                required
                size="medium"
                className={formData.Name ? 'filled' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="Address"
                variant="outlined"
                value={formData.Address}
                onChange={handleChange}
                required
                size="medium"
                className={formData.Address ? 'filled' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Profession"
                name="Profession"
                variant="outlined"
                value={formData.Profession}
                onChange={handleChange}
                required
                size="medium"
                className={formData.Profession ? 'filled' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="Age"
                type="number"
                variant="outlined"
                value={formData.Age}
                onChange={handleChange}
                required
                size="medium"
                className={formData.Age ? 'filled' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hobbies"
                name="Hobbies"
                variant="outlined"
                value={formData.Hobbies}
                onChange={handleChange}
                size="medium"
                className={formData.Hobbies ? 'filled' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className={`submit-button ${isButtonGreen ? 'green' : ''}`}
                fullWidth
                size="large"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        <div className="success-alert-container">
          {showSuccessAlert && (
            <Snackbar
              open={showSuccessAlert}
              autoHideDuration={3000}
              onClose={() => setShowSuccessAlert(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                {successMessage}
              </Alert>
            </Snackbar>
          )}
        </div>
      </div>
    </Container>
  );
}

export default AddUsers;