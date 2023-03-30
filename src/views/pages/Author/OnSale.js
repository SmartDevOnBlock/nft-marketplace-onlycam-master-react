import { Box, Grid, Typography } from "@material-ui/core";
// import ExploreCard from "src/component/ExploreCard";
import NftDetails from "src/component/NftDetails";

import React from "react";
import DataNotFound from "src/component/DataNotFound";
import NFTCard from "src/component/NFTCard";
// import NftDetails from "../Creator/NftDetails";

const OnSale = ({ onSaleList, callbackFun, userId }) => {
  return (
    <Box>
      {onSaleList && onSaleList.length === 0 ? (
        <Typography variant="h6" style={{ color: "#fff" }}>
          No data found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {onSaleList &&
            onSaleList.map((data, index) => {
              return (
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <NFTCard
                    data={data}
                    type="creator"
                    index={index}
                    callbackFun={() => callbackFun(userId)}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}
    </Box>
  );
};

export default OnSale;
