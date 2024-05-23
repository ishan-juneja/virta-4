import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import SideBar from './Sidebar';

const FormPage = () => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/submit', formData); // Change to port 3001
      console.log(response.data);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <SideBar />
      <div className="flex-grow-1">
        <NavBar />
        <div className="container mt-4">
          <h2>Submit Data</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((field, index) => (
              <div className="form-group" key={index}>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  className="form-control"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
