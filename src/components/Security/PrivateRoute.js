import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import LoaderSpinner from "../LoaderSpinner";
import { UserContext } from "./UserContext";

export default function PrivateRoute(props) {
  const { user, isLoading } = useContext(UserContext);
  const { component: Component, ...rest } = props;

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (user === "anonymousUser") {
    return <Redirect to="/sign-in" />;
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
}
