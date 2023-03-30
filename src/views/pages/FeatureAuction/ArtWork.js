import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import apiConfig from "src/connectors/config/ApiConfig";
import NFTCard from "src/component/NFTCard";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "60px" },
  root2: { paddingTop: "30px" },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:767px)": {
      display: "block",
      "& button": {
        marginTop: "15px",
      },
    },
    "& h1": {
      color: theme.palette.secondary.main,
      fontWeight: "700",
      fontSize: "40px",
      marginLeft: "15px",
      "@media(max-width:767px)": {
        fontSize: "20px",
      },
    },
  },
  boxsection: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "18px",
      paddingTop: "7px",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    paddingTop: "13px",
    "& h6": {
      color: "#C6BECC",
      marginLeft: "10px",
      paddingBottom: "10px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
      },
    },
  },
  text3: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h5": {
      color: "#E4C3DE",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  text4: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h4": {
      color: "#D200A5",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  price: {
    paddingBottom: "11px",
    "& h6": {
      fontWeight: "bold",
      fontSize: "10px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  box4: {
    backgroundColor: "#FCF2FA",
    borderRadius: "16px",
  },
  dotimg: {
    background: "#D200A5",
    boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
  },
  nftImg: {
    width: "100%",
    height: "165px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "210px",
      borderRadius: "40px 40px 10px 10px",
      overflow: "hidden",
      background: "rgba(0 , 0, 0, 0.041)",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
}));

const ArtWorkCard = (index, data) => {
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
        data: {
          limit: 12,
          page: page,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
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
      <Box className={classes.headsection}>
        <Typography variant='h1'>Artworks</Typography>
        {/* <Box>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            alignItems="center"
          >
            View all artworks
          </Button>
        </Box> */}
      </Box>
      <hr style={{ border: "1px solid rgba(255, 255, 255, 0.16)" }} />

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
    </Box>
  );
};

export default ArtWorkCard;
