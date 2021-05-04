import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TopBar from "./components/bars/TopBar";
import SideBar from "./components/bars/SideBar";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import Toolbar from "@material-ui/core/Toolbar";
import { Route, useLocation } from "react-router-dom";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import EmployeeDetail from "./components/EmployeeDetails/EmployeeDetail";
import DepartmentList from "./components/DepartmentList/DepartmentList";
import Login from "./components/Login/Login";
import { UserContext } from "./components/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import CurrentUser from "./components/CurrentUser";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  const location = useLocation();

  const { user, setUser, isLoading } = CurrentUser();

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      <div className={classes.root}>
        <CssBaseline />
        <TopBar />
        {location.pathname !== "/sign-in" && <SideBar />}

        <main className={classes.content}>
          <Toolbar />
          <PrivateRoute exact path="/" component={EmployeeList} />
          <PrivateRoute exact path="/employees" component={EmployeeList} />
          <PrivateRoute exact path="/add-employee" component={AddEmployee} />
          <PrivateRoute
            exact
            path="/employees/:id"
            component={EmployeeDetail}
          />
          <PrivateRoute exact path="/departments" component={DepartmentList} />
          <Route exact path="/sign-in" component={Login} />
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
