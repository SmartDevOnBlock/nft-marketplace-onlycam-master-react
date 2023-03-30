import { Box, Grid } from "@material-ui/core";

import ExploreCard from "src/component/ExploreCard";
import React from "react";

const Created = ({ createdCount }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        {createdCount?.map((data, index, type) => {
          return (
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <ExploreCard data={data} type="creator" index={index} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Created;
