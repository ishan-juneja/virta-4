import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import SideBar from './Sidebar';
import PieChart from './PieChart';

const HomePage = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [likelycount, setLikelyCount] = useState(0);
  const [notlikelycount, setNotLikelyCount] = useState(0);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    fetchData();
    fetchData2();
    fetchCount();
    fetchCount2();
    fetchLikelyCount();
    fetchNotLikelyCount();
  }, []);

  const fetchCount = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/count');
      console.log('Count fetched:', result.data.count);
      setCount(result.data.count);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const fetchCount2 = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/count2');
      console.log('Count2 fetched:', result.data.count);
      setCount2(result.data.count);
    } catch (error) {
      console.error('Error fetching count2:', error);
    }
  };

  const fetchLikelyCount = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/likelycount');
      console.log('Likelycount fetched:', result.data.likelycount);
      setLikelyCount(result.data.likelycount);
    } catch (error) {
      console.error('Error fetching likelycount:', error);
    }
  };

  const fetchNotLikelyCount = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/notlikelycount');
      console.log('NotLikelycount fetched:', result.data.notlikelycount);
      setNotLikelyCount(result.data.notlikelycount);
    } catch (error) {
      console.error('Error fetching notlikelycount:', error);
    }
  };

  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/data');
      console.log('Data fetched:', result.data);
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData2 = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/data2');
      console.log('Data2 fetched:', result.data);
      setData2(result.data);
    } catch (error) {
      console.error('Error fetching data2:', error);
    }
  };

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
                  <h5 className="card-title text-center" style={{ fontSize: '18px', fontWeight: 'bold' }}>{count}</h5>
                </div>
              </div>
              <h2 className="text-center mb-3" style={{ color: 'black' }}>Diabetes Likelihood</h2>
              <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(80vh - 150px)' }}>
                <PieChart likelycount={likelycount} notlikelycount={notlikelycount} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;