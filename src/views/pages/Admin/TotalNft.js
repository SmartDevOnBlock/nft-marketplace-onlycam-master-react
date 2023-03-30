import NFTCard from "src/component/NFTCard";
import { Box, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import DataNotFound from "src/component/DataNotFound";
import { Pagination } from "@material-ui/lab";

export default function TotalNft({
  nftList,
  callbackFun,
  noOfPages,
  setPage,
  page,
  hotBidListHandler,
}) {
  return (
    <Box>
      <Grid container spacing={3}>
        {nftList &&
          nftList?.map((data, index, type) => {
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
      </Grid>
      <Box style={{ marginTop: "1rem" }}>
        {nftList && nftList.length >= 1 && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        )}
      </Box>

      {nftList && nftList.length === 0 && <DataNotFound />}
    </Box>
  );
}
