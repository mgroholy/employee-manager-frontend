import React from "react";
import ItemList from "../ItemList/ItemList";

const PositionList = () => {
  const POSITION_REST_API_URL = process.env.REACT_APP_POSITION_URL;

  return <ItemList apiUrl={POSITION_REST_API_URL} name={"Position"} />;
};

export default PositionList;
