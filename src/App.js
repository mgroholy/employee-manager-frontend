import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Bar from "./components/bars/Bar";
import EmployeeList from "./components/EmployeeList";
import Toolbar from "@material-ui/core/Toolbar";

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
    <div className={classes.root}>
      <Bar />
      <main className={classes.content}>
        <Toolbar />
        <EmployeeList />
      </main>
    </div>
  );
}

export default App;
