import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './estyle.css';

const AllEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/employees/${id}`);
            console.log(response);
            window.alert('Employee Deleted Successfully');
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Employee List</h1>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
                            <td>{employee.mobileNumber}</td>
                            <td>{employee.dateOfBirth}</td>
                            <td>
                                <button className='btn delete-btn' onClick={() => handleDelete(employee.id)}>Delete</button>
                                {' '}
                                <button className='btn update-btn'><Link to={`update/${employee.id}`}>Update</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button className='btn'><Link to="/add">Add New Employee</Link></button>
        </div>
    );
};

export default AllEmployees;
