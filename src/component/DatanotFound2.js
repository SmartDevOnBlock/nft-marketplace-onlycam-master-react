import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function DataNotFound2() {
  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <Typography style={{ color: "#3B0D60", fontSize: "16px" }}>
        No data found
      </Typography>
    </Box>
  );
}
