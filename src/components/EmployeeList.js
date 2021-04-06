import React, { useState, useEffect } from "react";
import axios from "axios";

const EMPLOYEES_REST_API_URL = "http://localhost:8080/";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get(EMPLOYEES_REST_API_URL);
      setEmployees(response.data);
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employees List</h1>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Department</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
