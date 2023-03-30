import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import ButtonCircularProgress from "./ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  dataLoader: {
    height: 450,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function DataLoading() {
  const classes = useStyles();
  return (
    <div className={classes.dataLoader}>
      {/* <LinearProgress height={10} /> */}{" "}
      <Box width={300}>
        <ButtonCircularProgress />
      </Box>
    </div>
  );
}
