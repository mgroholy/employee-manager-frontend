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
            <tr key={employee.ID}>
              <td>{employee.Name}</td>
              <td>{employee.Email}</td>
              <td>{employee.Department}</td>
              <td>{employee.Position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
