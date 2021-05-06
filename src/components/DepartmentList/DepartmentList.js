import React from "react";
import ItemList from "../ItemList/ItemList";

const DepartmentList = () => {
  const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";
  return <ItemList apiUrl={DEPARTMENTS_REST_API_URL} name={"Department"} />;
};

export default DepartmentList;
