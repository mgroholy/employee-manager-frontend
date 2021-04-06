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

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "green",
  },
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  itemIcon: {
    color: "white",
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
            {["Employees", "Add new employee"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon style={{ color: "white" }}>
                  {index === 0 ? <AccountCircle /> : <Add />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider style={{ backgroundColor: "white" }} />
          <List>
            {["Departments", "Add new department"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon style={{ color: "white" }}>
                  {index === 0 ? <AccountTree /> : <Add />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
