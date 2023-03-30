import Card from "src/component/Card";
import { Box, Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import NFTCard from "src/component/NFTCard";
import CreatorCard from "src/component/CreatorCard";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  root2: { paddingTop: "30px" },
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
  heading: {
    "& h1": {
      color: theme.palette.secondary.main,
      fontWeight: "700",
      fontSize: "40px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
}));
const TopSeller = () => {
  const classes = useStyles();
  const [topSelller, setTopSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);

  const topSellerHandler = async () => {
    try {
      const res = await axios.get(apiConfig.topSeller, {
        params: {
          limit: 12,
          page: page,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        setTopSeller(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    topSellerHandler();
  }, [page]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading} mt={2}>
          <Typography variant='h1'>Top Sellers</Typography>
        </Box>
        <Box className={classes.root2}>
          <Box mt={2} style={{ paddingLeft: "1rem" }}>
            {isLoading && <DataLoading />}
            {!isLoading && topSelller && topSelller.length === 0 && (
              <DataNotFound />
            )}
          </Box>
          <Grid container spacing={3}>
            {topSelller &&
              topSelller.map((data, index) => {
                return (
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    {/* <NFTCard data={data} index={index} type="auction" /> */}
                    <CreatorCard data={data} type='creator' index={index} />
                  </Grid>
                );
              })}
          </Grid>
          {topSelller && topSelller.length !== 0 && (
            <Box mt={2} display='flex' justifyContent='center'>
              <Pagination
                count={noOfPages}
                page={page}
                onChange={(e, v) => setPage(v)}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TopSeller;
