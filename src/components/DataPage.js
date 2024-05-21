import React, { useState } from 'react';
import NavBar from './Navbar';
import SideBar from './Sidebar';

const DataPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  const [data, setData] = useState(Array.from({ length: 15 }, (_, i) => ({
    timestamp: `2024-05-${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
    id: i + 1,
    status: '',
    clicked: false,
    isChecked: false // Manage checkbox state
  })));

  const filteredData = searchTerm
    ? data.filter(entry =>
        entry.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleButtonClick = (index) => {
    const newData = [...data];
    const actualIndex = index + (currentPage - 1) * entriesPerPage;
    newData[actualIndex] = {
      ...newData[actualIndex],
      clicked: true,
      status: Math.random() > 0.5 ? 'Likely' : 'Not Likely'
    };
    setData(newData);
  };

  const toggleCheckbox = (index) => {
    const newData = [...data];
    const actualIndex = index + (currentPage - 1) * entriesPerPage;
    newData[actualIndex].isChecked = !newData[actualIndex].isChecked;
    setData(newData);
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <SideBar />
      <div className="flex-grow-1">
        <NavBar />
        <div className="container-fluid mt-4">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="d-flex justify-content-between mb-2">
                <h2>Diabetes Diagnosis Data</h2>
                <div>
                  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Export
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="#">Copy</a></li>
                    <li><a className="dropdown-item" href="#">Print</a></li>
                    <li><a className="dropdown-item" href="#">Excel</a></li>
                    <li><a className="dropdown-item" href="#">CSV</a></li>
                    <li><a className="dropdown-item" href="#">PDF</a></li>
                  </ul>
                </div>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: '10%' }}>Select</th>
                    <th>Timestamp</th>
                    <th>ID</th>
                    <th>Click to Diagnose</th>
                    <th>Diabetic Likelihood</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" checked={entry.isChecked} onChange={() => toggleCheckbox(index)} />
                      </td>
                      <td>{entry.timestamp}</td>
                      <td>{entry.id}</td>
                      <td className="text-center">
                      <button className="btn btn-primary" onClick={() => handleButtonClick(index)}>
                        {entry.clicked ? <span>&#10003;</span> : 'Diagnose'}
                      </button>
                      </td>
                      <td>{entry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav>
                <ul className="pagination">
                  {[...Array(Math.ceil(filteredData.length / entriesPerPage)).keys()].map(number => (
                    <li key={number + 1} className="page-item">
                      <a onClick={() => paginate(number + 1)} className="page-link">
                        {number + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
