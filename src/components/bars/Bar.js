import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function Bar() {
  return (
    <div>
      <CssBaseline />
      <TopBar />
      <SideBar />
    </div>
  );
}
