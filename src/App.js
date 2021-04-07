import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TopBar from "./components/bars/TopBar";
import SideBar from "./components/bars/SideBar";
import EmployeeList from "./components/EmployeeList";
import Toolbar from "@material-ui/core/Toolbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Fragment } from "react";
import AddEmployee from "./components/AddEmployee";

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

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <TopBar />
        <SideBar />
        <main className={classes.content}>
          <Toolbar />
          <Route exact path="/" component={EmployeeList} />
          <Route exact path="/employees" component={EmployeeList} />
          <Route exact path="/add-employee" component={AddEmployee} />
          <Route exact path="/departments" component={Fragment} />
          <Route exact path="/add-department" component={Fragment} />
        </main>
      </div>
    </Router>
  );
}

export default App;
