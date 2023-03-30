import DataNotFound from "src/component/DataNotFound";
import { Box, Grid } from "@material-ui/core";
import React, { useState } from "react";
import NFTCard from "src/component/NFTCard";

const ProfileNft = ({ nftList, callbackFun }) => {
  return (
    <>
      {nftList &&
        nftList.map((data, index, type) => {
          return (
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <NFTCard
                data={data}
                type="creator"
                index={index}
                callbackFun={callbackFun}
              />
            </Grid>
          );
        })}

      <Box
        style={{
          textAlign: "left",
          color: "#fff",
          paddingLeft: "15px",
        }}
      >
        {nftList && nftList.length === 0 && "NO PROFILE INFO WAS ADDED BY USER"}
      </Box>
    </>
  );
};

export default ProfileNft;
