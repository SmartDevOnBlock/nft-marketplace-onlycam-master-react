import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import apiConfig from "src/connectors/config/ApiConfig";
import NFTCard from "src/component/NFTCard";
import axios from "axios";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "50px",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  topIcon: {
    position: "absolute",
    top: "-35px",
    right: "15px",
    background: "#FFFFFF",
    borderRadius: "15px",
    padding: "27px",
    border: "4px solid rgb(167 162 162 / 70%)",
    "@media(max-width:360px)": {
      padding: "22px",
    },
    "& div": {
      "& span": {
        background: "#D200A5",
        boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
        width: "25px",
        height: "25px",
        borderRadius: "25px",
        display: "block",
      },
    },
  },
  root2: { paddingTop: "30px", paddingBottom: "1rem" },
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
      color: "#fff",
      fontWeight: "700",
      fontSize: "40px",
      marginLeft: "15px",
      "@media(max-width:767px)": {
        fontSize: "26px",
      },
      "@media(max-width:360px)": {
        paddingTop: ".5rem",
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
    // paddingTop: "10px",
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

const Card = () => {
  const classes = useStyles();
  const [order, setOrder] = useState([]);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const allListOrder = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.allListOrder,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          limit: 12,
          page: page,
        },
      });
      if (res.data.statusCode == 200) {
        setOrder(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    allListOrder();
  }, [page]);

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.topIcon}>
          <Box>
            <span></span>
          </Box>
        </Box>
        <Box className={classes.headsection} mt={2}>
          <Box display='flex'>
            <Typography variant='h1'>Live Auctions</Typography>
          </Box>
        </Box>
        <Box mt={2} style={{ paddingLeft: "1rem" }}>
          {isLoading && <DataLoading />}
          {!isLoading && order && order.length === 0 && <DataNotFound />}
        </Box>
        <Box className={classes.root2}>
          <Grid container spacing={3}>
            {order &&
              order.map((data, index) => {
                return (
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    <NFTCard
                      data={data}
                      index={index}
                      type='auction'
                      callbackFun={allListOrder}
                    />
                  </Grid>
                );
              })}
          </Grid>
          {order && order.length !== 0 && (
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
    </>
  );
};

export default Card;
