import React from "react";
import ItemList from "../ItemList/ItemList";

const DepartmentList = () => {
  const DEPARTMENTS_REST_API_URL = process.env.REACT_APP_DEPARTMENT_URL;
  return <ItemList apiUrl={DEPARTMENTS_REST_API_URL} name={"Department"} />;
};

export default DepartmentList;
