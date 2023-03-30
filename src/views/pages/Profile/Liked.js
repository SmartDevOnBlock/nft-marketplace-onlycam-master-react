import { Box, Grid, Typography } from "@material-ui/core";

// import ExploreCard from "src/component/ExploreCard";
import React from "react";
import LiveAuction from "../FeatureAuction/LiveAuction";
import Nft from "../NftDetails/Nft";
import NFTCard from "src/component/NFTCard";

const Liked = ({ likesCount }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        {likesCount &&
          likesCount.map((data, index, type) => {
            return (
              <Grid item xs={12}>
                <NFTCard data={data} type="creator" index={index} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default Liked;
