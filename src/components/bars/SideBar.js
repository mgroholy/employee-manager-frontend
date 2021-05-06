import React, { useContext } from "react";
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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import WorkIcon from "@material-ui/icons/Work";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Security/UserContext";

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
  active: {
    backgroundColor: "green",
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const { user, roles } = useContext(UserContext);

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
            <ListItem>
              <ListItemIcon style={{ color: "white" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={user} />
            </ListItem>

            <Divider style={{ backgroundColor: "white" }} />

            <ListItem
              button
              component={NavLink}
              to="/employees"
              activeClassName={classes.active}
            >
              <ListItemIcon style={{ color: "white" }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={"Employees"} />
            </ListItem>

            {roles.includes("ADMIN") && (
              <ListItem
                button
                component={NavLink}
                to="/add-employee"
                activeClassName={classes.active}
              >
                <ListItemIcon style={{ color: "white" }}>
                  <Add />
                </ListItemIcon>
                <ListItemText primary={"Add new employee"} />
              </ListItem>
            )}

            <ListItem
              button
              component={NavLink}
              to="/departments"
              activeClassName={classes.active}
            >
              <ListItemIcon style={{ color: "white" }}>
                <AccountTree />
              </ListItemIcon>
              <ListItemText primary={"Departments"} />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to="/positions"
              activeClassName={classes.active}
            >
              <ListItemIcon style={{ color: "white" }}>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={"Positions"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
