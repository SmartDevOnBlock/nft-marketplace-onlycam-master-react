import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundRepeat: "no-repeat",
    background: "#fff",
    backgroundImage: "url(/images/line.png)" /* fallback */,
    backgroundSize: "100%",
    backgroundPosition: "top",
    backgroundImage:
      " url(/images/line.png), linear-gradient(105deg, #feeefd 1.25%, #4606b9 99.18%)" /* W3C */,
  },
  MainLayout: {
    minHeight: "calc(100vh - 415px)",
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <TopBar />
      <div
        style={
          history.location.pathname !== "/"
            ? { display: "block" }
            : { display: "none" }
        }
      ></div>

      <div className={classes.MainLayout}>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
