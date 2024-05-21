// components/HomePage.js
import React from 'react';
import NavBar from './Navbar';
import SideBar from './Sidebar';
import PieChart from './PieChart';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SideBar />
      <div style={{ flex: 1 }}>
        <NavBar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card text-white bg-primary mb-3" style={{ maxWidth: '24rem', width: '100%', marginTop: '20px' }}>
                <div className="card-header text-center" style={{ fontSize: '20px', fontWeight: 'bold' }}>Number of Participants</div>
                <div className="card-body">
                  <h5 className="card-title text-center" style={{ fontSize: '18px', fontWeight: 'bold' }}>137</h5>
                </div>
              </div>
              <h2 className="text-center mb-3" style={{ color: 'black' }}>Diabetes Likelihood</h2> {/* Chart title */}
              <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(80vh - 150px)' }}>
                <PieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
