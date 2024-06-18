import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import SideBar from './Sidebar';
import '../App.css'; // Ensure the correct path to your CSS file

const DataPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [count, setCount] = useState(1);

    useEffect(() => {
        fetchCount();
        fetchData();
    }, []); // This effect will run once when the component mounts

    const fetchCount = async () => {
        try {
            const result = await axios.get('http://localhost:3001/api/count');
            console.log('Count fetched test 1:', result.data.count); // Log the count to see its structure
            setCount(result.data.count); // Store the count in state
        } catch (error) {
            console.error('Error fetching count:', error);
        }
    };
    
    // const toggleCheckbox = (index) => {
    //     const newData = [...data];
    //     const actualIndex = index + (currentPage - 1) * entriesPerPage;
    //     newData[actualIndex].isChecked = !newData[actualIndex].isChecked;
    //     setData(newData);
    //   };

    const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:3001/api/data');
            console.log(result.data); // Log the data to see its structure
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const clearData = async () => {
        try {
            const response = await axios.delete('http://localhost:3001/api/data');
            console.log(response.data); // Log the server response
            fetchData(); // Refetch data after clearing
        } catch (error) {
            console.error('Error clearing data:', error.response ? error.response.data : error.message);
        }
    };

    const handleButtonClick = async (index) => {
        const actualIndex = index + (currentPage - 1) * entriesPerPage;
        const rowData = data[actualIndex];
    
        try {
            // Step 1: Fetch the row data by ID
            const rowResponse = await axios.get(`http://localhost:3001/api/data/${rowData.id}`);
            const rowDataJson = rowResponse.data;
    
            // Step 2: Send the JSON to the Node.js server for further processing
            const processResponse = await axios.post('http://localhost:3001/api/diagnose', rowDataJson);
    
            // Step 3: Get the result from the server response
            const processResult = processResponse.data.result;
    
            // Step 4: Update the local state to reflect the change
            const newData = [...data];
            newData[actualIndex] = { ...newData[actualIndex], field9: processResult, clicked: true };
            setData(newData);
    
        } catch (error) {
            console.error('Error processing data:', error);
        }
    };

    const filteredData = searchTerm
        ? data.filter(entry =>
            Object.values(entry).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : data;

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                                    {/* <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        Export
                                    </button> */}
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a className="dropdown-item" href="#">Copy</a></li>
                                        <li><a className="dropdown-item" href="#">Print</a></li>
                                        <li><a className="dropdown-item" href="#">Excel</a></li>
                                        <li><a className="dropdown-item" href="#">CSV</a></li>
                                        <li><a className="dropdown-item" href="#">PDF</a></li>
                                    </ul>
                                    <button className="btn btn-danger" onClick={clearData}>Clear</button>
                                </div>
                            </div>
                            <table className="table table-bordered mt-4">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Pregnancies</th>
                                        <th>Glucose</th>
                                        <th>Blood Pressure</th>
                                        <th>Skin Thickness</th>
                                        <th>Insulin</th>
                                        <th>BMI</th>
                                        <th>Diabetes Pedigree</th>
                                        <th>Age</th>
                                        <th>Click to Diagnose</th>
                                        <th>Diabetic Likelihood</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((entry, index) => (
                                        <tr key={index}>
                                            {/* <td><input type="checkbox" checked={entry.isChecked} onChange={() => toggleCheckbox(index)} /></td> */}
                                            <td>{entry.id}</td>
                                            <td>{entry.field1}</td>
                                            <td>{entry.field2}</td>
                                            <td>{entry.field3}</td>
                                            <td>{entry.field4}</td>
                                            <td>{entry.field5}</td>
                                            <td>{entry.field6}</td>
                                            <td>{entry.field7}</td>
                                            <td>{entry.field8}</td>
                                            <td className="text-center"><button className="btn btn-primary" onClick={() => handleButtonClick(index)}>{entry.clicked ? <span>&#10003;</span> : 'Diagnose'} </button></td>
                                            <td>{entry.field9}</td>
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