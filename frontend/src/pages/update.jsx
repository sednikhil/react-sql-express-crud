import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const update = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        dateOfBirth: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split('/')[2];

    const handleChange = (e) => {  
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/employees/'+bookId, formData);
            navigate("/");
            //console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    console.log(formData);

    return (
        <div className="form-container">
            <h1>Add new Employee</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder='Name' onChange={handleChange} name='name' required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder='Email' onChange={handleChange} name='email' required />
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Phone Number</label>
                    <input type="tel" id="mobileNumber" placeholder='PhoneNum' onChange={handleChange} name='mobileNumber' required />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="date" id="dateOfBirth" onChange={handleChange} name='dateOfBirth' required />
                </div>
                <button type="submit" onClick={handleClick}>Submit</button>
            </form>
        </div>
    );
}

export default update;
