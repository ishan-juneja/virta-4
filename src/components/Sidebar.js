// Sidebar.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bg-primary text-white" style={{ width: '250px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h3 className="p-3" style={{ fontWeight: 'bold', color: 'white', fontSize: '30px', padding: '1px' }}>Virtabot</h3>
        <div className="list-group list-group-flush">
          <Link to="/home" className="list-group-item list-group-item-action text-white bg-primary">Home</Link>
          <Link to="/data" className="list-group-item list-group-item-action text-white bg-primary">Data Page</Link>
        </div>
      </div>
      <div className="p-3">
        <button onClick={handleLogout} className="btn btn-light w-100">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
