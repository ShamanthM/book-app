import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewUsers from './pages/Users/ViewUsers';
import AddUsers from './pages/Users/AddUsers';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/users' Component={Users} exact /> */}
          <Route path="/users/add-users" element={<AddUsers />} />
          <Route path="/users/all-users" element={<ViewUsers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;