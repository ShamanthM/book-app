const db = require('../config/dbConfig');

// Create a new user
exports.createUser = async (req, res) => {
  const { Name, Address, Profession, Age, Hobbies } = req.body;
  try {
    const [results] = await db.execute(
      'INSERT INTO Users_table (Name, Address, Profession, Age, Hobbies) VALUES (?, ?, ?, ?, ?)',
      [Name, Address, Profession, Age, Hobbies]
    );
    res.json({ message: 'User created successfully', userID: results.insertId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM Users_table');
    res.json({ users: results });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

// Retrieve a user by ID
exports.getUserByID = async (req, res) => {
  const userID = req.params.userID;
  try {
    const [results] = await db.execute('SELECT * FROM Users_table WHERE User_id = ?', [userID]);
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ user: results[0] });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const userID = req.params.userID;
  const { Name, Address, Profession, Age, Hobbies } = req.body;
  const updateFields = [];
  const updateValues = [];

  if (Name) {
    updateFields.push('Name = ?');
    updateValues.push(Name);
  }
  if (Address) {
    updateFields.push('Address = ?');
    updateValues.push(Address);
  }
  if (Profession) {
    updateFields.push('Profession = ?');
    updateValues.push(Profession);
  }
  if (Age) {
    updateFields.push('Age = ?');
    updateValues.push(Age);
  }
  if (Hobbies) {
    updateFields.push('Hobbies = ?');
    updateValues.push(Hobbies);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: 'No fields to update provided' });
  }

  try {
    const query = `UPDATE Users_table SET ${updateFields.join(', ')} WHERE User_id = ?`;
    const updateValuesWithUserID = [...updateValues, userID];
    const [results] = await db.execute(query, updateValuesWithUserID);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const userID = req.params.userID;
  try {
    const [results] = await db.execute('DELETE FROM Users_table WHERE User_id = ?', [userID]);
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};
