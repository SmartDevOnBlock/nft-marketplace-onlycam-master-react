import DataNotFound from "src/component/DataNotFound";
import { Box, Grid } from "@material-ui/core";
import React, { useState } from "react";
import NormalNFTCard from "src/component/NormalNFTCard";

const NormalNFTCardList = ({ nftList, callbackFun }) => {
  return (
    <>
      {nftList &&
        nftList.map((data, index, type) => {
          return (
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <NormalNFTCard
                data={data}
                type="creator"
                index={index}
                callbackFun={callbackFun}
              />
            </Grid>
          );
        })}

      <Box style={{ color: "#fff", paddingLeft: "15px" }}>
        {nftList && nftList.length === 0 && "NO PROFILE INFO WAS ADDED BY USER"}
      </Box>
    </>
  );
};

export default NormalNFTCardList;
