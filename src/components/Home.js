import React from 'react';
import './Home.css'; 

const Home = () => {
  // Placeholder data for demonstration
  const totalBooks = 150;
  const availableBooks = 100;
  const assignedBooks = totalBooks - availableBooks;

  return (
    <div className="home-container">
      <div className="card">
        <h2>Total Users</h2>
    
      </div>
      <div className="card">
        <h2>Available Users</h2>
      
      </div>
      <div className="card">
        <h2>All Users</h2>
       
      </div>
    </div>
  );
};

export default Home;
