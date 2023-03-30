import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CreatorCard from "src/component/CreatorCard";
const walletdetails = [
  {
    profileImg: "images/users/1.png",
    name: "Sophia Valentine",
    eth: "0.99  ETH",
    check: "images/collections/check.png",
  },
  {
    profileImg: "images/users/2.png",
    name: "The Metakey",
    eth: "0.43  ETH",
    check: "images/collections/check.png",
  },
  {
    profileImg: "images/users/3.png",
    name: "Diamond HODLR",
    eth: "4.73  ETH",
  },
  {
    profileImg: "images/users/4.png",
    name: "Sophia Valentine",
    eth: "5.22  ETH",
  },
  {
    profileImg: "images/users/5.png",
    name: "Beeple Special",
    eth: "3.53  ETH",
  },
  {
    profileImg: "images/users/6.png",
    name: "RickyODonnell79",
    eth: "2.10  ETH",
  },
  {
    profileImg: "images/users/7.png",
    name: "RickyODonnell79",
    eth: "2.66  ETH",
    check: "images/collections/check.png",
  },
  {
    profileImg: "images/users/8.png",
    name: "Floyd Mayweather ",
    eth: "0.88  ETH",
    check: "images/collections/check.png",
  },
  {
    profileImg: "images/users/1.png",
    name: "Sophia Valentine",
    eth: "0.88  ETH",
    check: "images/collections/check.png",
  },
];
export default function Users(props) {
  const { type, searchUserList, userType } = props;

  return (
    <Box>
      <Grid container spacing={3}>
        {searchUserList?.map((data, i) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={i}
              className="walletSet mb-20"
            >
              <CreatorCard
                userType={userType}
                data={data}
                type="timing"
                index={i}
              />
            </Grid>
          );
        })}
        {searchUserList && searchUserList.length === 0 && (
          <h4 style={{ paddingLeft: "14px" }}>
            NO ITEMS FOUND FOR THE TERM SEARCH
          </h4>
        )}
      </Grid>
    </Box>
  );
}
