import React, { useState } from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

  return (
    <nav id="navbar" className="">
      <div className="nav-wrapper">
        <div className="logo">
          <Link to="/">
            <FontAwesomeIcon icon={faPeopleGroup} /> User Management
          </Link>
        </div>
        <ul id="menu">
        
          {/* <li><Link to="/">Home</Link></li> */}
          {/* <li><Link to="/users">Users</Link></li> */}
          <li><Link to="/users/add-users">Add User</Link></li>
          <li><Link to="/users/all-users">All User</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;