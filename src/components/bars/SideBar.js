import React, { useContext } from "react";
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
} from "@material-ui/icons/";
import { makeStyles } from "@material-ui/core/styles";
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
  const { user, setUser, roles, setRoles } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/sign-out", {
        withCredentials: true,
      });
      setUser("anonymousUser");
      setRoles([]);
    } catch (error) {
      // TODO: display error message
    }
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
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
