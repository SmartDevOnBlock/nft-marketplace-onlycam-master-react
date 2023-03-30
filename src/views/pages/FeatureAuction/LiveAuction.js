import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import NFTCard from "src/component/NFTCard";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "70px",
    "@media(max-width:660px)": {
      marginTop: "30px",
    },
  },
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
    height: "210px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
  },
}));

const Card = (props) => {
  const { data, type, index } = props;
  const [auctionList, setAuctionList] = useState([]);

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 20;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const getAuctionListHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(apiConfig.hotBid, {
        params: {
          limit: 8,
          page: page,
        },
      });
      if (res.data.statusCode == 200) {
        setAuctionList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuctionListHandler();
  }, [page]);

  return (
    <Box className={classes.root}>
      <Box className={classes.headsection} mt={2}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <img src='/images/rect1live.png' alt='' id={`imagecard${index}`} />
          <Typography variant='h1'>Live Auctions</Typography>
        </Box>
        <Box>
          {/* <Button
            variant="contained"
            size="large"
            color="secondary"
            alignItems="center"
          >
            View all live featured auctions
          </Button> */}
        </Box>
      </Box>
      <Box className={classes.root2}>
        <Box mt={2} style={{ paddingLeft: "1rem" }}>
          {isLoading && <DataLoading />}
          {!isLoading && auctionList && auctionList.length === 0 && (
            <DataNotFound />
          )}
        </Box>
        <Grid container spacing={3}>
          {!isLoading &&
            auctionList &&
            auctionList?.map((data, index) => {
              return (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <NFTCard
                    data={data}
                    index={index}
                    type='auction'
                    callbackFun={getAuctionListHandler}
                  />
                </Grid>
              );
            })}
        </Grid>
        {auctionList && auctionList.length !== 0 && (
          <Box mt={2} display='flex' justifyContent='center'>
            <Pagination
              count={noOfPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        )}
      </Box>
      {/* </Container> */}
    </Box>
  );
};

export default Card;
