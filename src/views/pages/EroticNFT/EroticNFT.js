import { Box, Container, Typography, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/styles";
import NFTCard from "src/component/NFTCard";
import apiConfig from "src/connectors/config/ApiConfig";
import axios from "axios";
import DataNotFound from "src/component/DataNotFound";
import DataLoading from "src/component/DataLoading";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
  root2: { paddingTop: "30px" },
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
const EroticNFT = () => {
  const classes = useStyles();
  const [artWork, setArtWork] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const artWorkHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.allListOrder,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          itemCategory: ["Erotic"],
          limit: 12,
          page: page,
        },
      });
      if (res.data.statusCode == 200) {
        setArtWork(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    artWorkHandler();
  }, [page]);
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading} mt={2}>
          <Typography variant='h1'>Erotic NFT's</Typography>
        </Box>
        <Box className={classes.root2}>
          <Box mt={2} style={{ paddingLeft: "1rem" }}>
            {isLoading && <DataLoading />}
            {!isLoading && artWork && artWork.length === 0 && <DataNotFound />}
          </Box>
          <Grid container spacing={3}>
            {!isLoading &&
              artWork &&
              artWork.map((data, index) => {
                return (
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    <NFTCard
                      data={data}
                      index={index}
                      type='auction'
                      callbackFun={artWorkHandler}
                    />
                  </Grid>
                );
              })}
          </Grid>
          {artWork && artWork.length !== 0 && (
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

export default EroticNFT;
