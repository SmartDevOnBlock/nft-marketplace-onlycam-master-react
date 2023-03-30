import { Box, Grid, Typography } from "@material-ui/core";

import ExploreCard from "src/component/ExploreCard";
import React from "react";
import DataNotFound from "src/component/DataNotFound";
import NFTCard from "src/component/NFTCard";
const card = [
  {
    image: "/images/nft/img8.jpeg",
    name: "Maira Freeman",
    avatar: "/images/onlycamimg.png",
    avatarName: "@Maira_freeman",
  },
  {
    image: "/images/nft/1st.png",
    name: "Maira Freeman",
    avatar: "/images/onlycamimg.png",
    avatarName: "@Maira_freeman",
  },
];

const Owned = ({ onOwnedCount }) => {
  return (
    <Box>
      {onOwnedCount && onOwnedCount.length === 0 && (
        <Typography variant="h6" style={{ color: "#fff" }}>
          No data found
        </Typography>
      )}
      <Grid container spacing={3}>
        {onOwnedCount.map((data, index, type) => {
          return (
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <NFTCard data={data} type="creator" index={index} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Owned;
