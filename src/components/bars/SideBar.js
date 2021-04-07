import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Add from "@material-ui/icons/Add";
import AccountTree from "@material-ui/icons/AccountTree";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";

const drawerWidth = 250;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#333",
    color: "white",
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

const SideBar = () => {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key={1} component={NavLink} to="/employees">
              <ListItemIcon style={{ color: "white" }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={"Employees"} />
            </ListItem>

            <ListItem button key={2} component={NavLink} to="/add-employee">
              <ListItemIcon style={{ color: "white" }}>
                <Add />
              </ListItemIcon>
              <ListItemText primary={"Add new employee"} />
            </ListItem>

            <Divider style={{ backgroundColor: "white" }} />

            <ListItem button key={3} component={NavLink} to="/departments">
              <ListItemIcon style={{ color: "white" }}>
                <AccountTree />
              </ListItemIcon>
              <ListItemText primary={"Departments"} />
            </ListItem>

            <ListItem button key={4} component={NavLink} to="/add-department">
              <ListItemIcon style={{ color: "white" }}>
                <Add />
              </ListItemIcon>
              <ListItemText primary={"Add new department"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
