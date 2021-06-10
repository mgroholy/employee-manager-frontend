import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  Add,
  AccountTree,
  AccountCircle,
  ExitToApp,
  VerifiedUser,
  Work,
} from "@material-ui/icons/";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../Security/UserContext";
import PopUp from "./PopUp";

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
  const { user, setUser, roles, setRoles } = useContext(UserContext);
  const [error, setError] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(process.env.REACT_APP_LOGOUT_URL, {
        withCredentials: true,
      });
      setUser("anonymousUser");
      setRoles([]);
    } catch (error) {
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
  };

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
            {user !== null && user !== "anonymousUser" && (
              <>
                <ListItem>
                  <ListItemIcon style={{ color: "white" }}>
                    <VerifiedUser />
                  </ListItemIcon>
                  <ListItemText primary={user} />
                </ListItem>

                <ListItem button onClick={handleLogout}>
                  <ListItemIcon style={{ color: "white" }}>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItem>

                <Divider style={{ backgroundColor: "white" }} />
              </>
            )}

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
                <Work />
              </ListItemIcon>
              <ListItemText primary={"Positions"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <PopUp open={error} handleClose={handleClose} />
    </div>
  );
};

export default SideBar;
