import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EMPLOYEE_REST_API_URL = "http://localhost:8080/employees/";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(EMPLOYEE_REST_API_URL + id);
      setEmployee(response.data);
    };

    fetchEmployee();
  }, [id]);

  return <div>{employee.name}</div>;
};

export default EmployeeDetail;
