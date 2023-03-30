import apiConfig from "src/connectors/config/ApiConfig";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import ExploreCard from "src/component/ExploreCard";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    marginTop: "70px",
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
    padding: "20px",
    border: "4px solid rgb(167 162 162 / 70%)",
    "@media(max-width:360px)": {
      padding: "13px",
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
  root2: { paddingTop: "30px" },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15px",
    "& h1": {
      color: "#fff",
      fontWeight: "700",
      fontSize: "40px",
      "@media(max-width:767px)": {
        fontSize: "26px",
      },
      "@media(max-width:360px)": {
        paddingTop: ".5rem",
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

const Explore = (index, data) => {
  const classes = useStyles();
  const [hotCollection, setHotCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const hotCollectionList = async () => {
    try {
      const res = await axios({
        metho: "GET",
        url: apiConfig.hotCollections,
        params: {
          limit: 12,
          page: page,
        },
      });

      if (res.data.statusCode === 200) {
        const filterFun = res?.data?.result?.docs?.filter((data) => {
          return data?.placeNftCount !== 0;
        });

        setHotCollection(filterFun);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    hotCollectionList();
  }, [page]);

  return (
    <Box className={classes.root}>
      <Box className={classes.topIcon}>
        <img src=' ./images/firebase.png' alt='' style={{ width: "40px" }} />
      </Box>
      <Box className={classes.headsection} mt={2}>
        <Box display='flex'>
          <Typography variant='h1'>Hot Collections</Typography>
        </Box>
      </Box>

      {isLoading && <DataLoading />}
      <Box mt={1} style={{ paddingLeft: "1rem" }}>
        {!isLoading && hotCollection && hotCollection.length === 0 && (
          <DataNotFound />
        )}
      </Box>
      <Box className={classes.root2}>
        <Grid container spacing={3}>
          {hotCollection &&
            hotCollection?.map((data, index, type) => {
              return (
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <ExploreCard data={data} type='creator' index={index} />
                  {/* {data?.collectionType === "REGULAR" && (
                    <ExploreCard data={data} type="creator" index={index} />
                  )} */}
                </Grid>
              );
            })}
        </Grid>
        <Box mt={2} display='flex' justifyContent='center'>
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Explore;
