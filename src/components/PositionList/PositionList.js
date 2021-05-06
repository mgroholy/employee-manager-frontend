import React from "react";
import ItemList from "../ItemList/ItemList";

const PositionList = () => {
  const POSITION_REST_API_URL = "http://localhost:8080/positions";

  return <ItemList apiUrl={POSITION_REST_API_URL} name={"Position"} />;
};

export default PositionList;
