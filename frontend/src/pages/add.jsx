import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        dateOfBirth: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {  
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/add', formData);
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

export default AddEmployee;
