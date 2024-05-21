// components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light" style={{ borderBottom: '2px solid #007bff' }}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex ms-auto">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-primary" type="submit">Go!</button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
