import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  Container,
  Typography,
  Box,
  makeStyles,
  Grid,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { sortAddress } from "src/utils";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    paddingTop: "3rem",
    paddingBottom: "2rem",
    width: "100%",
    position: "relative",
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
    },
  },
  cornerBox: {
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "50px",
    height: "auto",
    width: "100%",
    position: "relative",
    margin: "4rem 0 3rem",
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  textImg: {
    display: "flex",
    justifyContent: "space-between",
  },

  imageBox: {
    position: "absolute",
    top: "21px",
    right: "15px",
    background: "#FFFFFF",
    borderRadius: "15px",
    padding: "20px",
    border: "4px solid rgb(167 162 162 / 70%)",
  },

  topcreators: {
    paddingTop: "50px",
    " & h1": {
      fontSize: "40px",
      color: "#fff",
      fontWeight: "700",
      "@media(max-width:767px)": {
        fontSize: "26px",
      },
    },
  },

  BabycornerBox: {
    background: "rgba(255, 255, 255, 0.16)",
    boxShadow: "0px 14px 14px rgba(59, 13, 96, 0.1)",
    backdropFilter: "blur(104px)",
    borderRadius: "20px",

    width: "100%",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    marginTop: "1rem",
  },

  BabycornerBoxText: {
    paddingLeft: "7px",

    "& h2": {
      paddingTop: "12px",
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "20px",
      textTransform: "capitalize",
      color: "#FFFFFF",
    },
    "& h3": {
      paddingTop: "3px",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "17px",
      textTransform: "capitalize",
      color: "rgba(255, 255, 255, 0.6)",
    },
  },

  BabycornerBoxFlex: {
    display: "flex",

    // justifyContent: "space-between",
  },

  BabycornerBoxAvtar: {
    height: "65px",
    width: "65px",
    marginTop: "-19px",
    cursor: "pointer",
    background: "rgb(121 77 169)",
  },
  BabycornerBox1: {
    marginTop: "-100px",
  },
}));

export default function TopCreator() {
  const classes = useStyles();
  const history = useHistory();
  const [seller, setSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const topSeller = async () => {
    try {
      const res = await axios.get(apiConfig.topSeller, {
        params: {
          limit: 8,
          page: page,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        const filterData = res.data.result.docs.filter(
          (data) => Number(data.orderCount) > 0
        );
        setSeller(filterData);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERRROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    topSeller();
  }, [page]);
  return (
    <Container>
      <Box className={classes.cornerBox}>
        <Box className={classes.topIcon}>
          <img src=' ./images/heart.png' alt='' style={{ width: "40px" }} />
        </Box>
        <Box className={classes.headsection} mt={2}>
          <Box display='flex'>
            <Typography variant='h1'>Top Creators</Typography>
          </Box>
        </Box>
        <Box style={{ paddingBottom: "2rem" }}>
          {isLoading && <DataLoading />}
          {!isLoading && seller && seller.length === 0 && <DataNotFound />}
        </Box>
        <Grid container spacing={2}>
          {seller &&
            seller?.map((data, index) => {
              return (
                <Grid item lg={3} md={3} sm={6} xs={12} key={index}>
                  <Box className={classes.BabycornerBox}>
                    <Container>
                      <Box className={classes.BabycornerBoxFlex}>
                        <Box>
                          <Badge
                            badgeContent={data.badgeContent}
                            color='secondary'
                          ></Badge>
                          <Avatar
                            alt='Remy Sharp'
                            src={
                              data?.profilePic
                                ? data?.profilePic
                                : "images/onlycamimg.png"
                            }
                            className={classes.BabycornerBoxAvtar}
                            onClick={() => {
                              history.push({
                                pathname: "/author",
                                search: data._id,
                              });
                            }}
                          />
                        </Box>
                        <Box className={classes.BabycornerBoxText}>
                          <Typography
                            style={{ cursor: "pointer" }}
                            variant='h2'
                            onClick={() => {
                              history.push({
                                pathname: "/author",
                                search: data._id,
                              });
                            }}
                          >
                            {data?.name
                              ? data?.name
                              : sortAddress(data?.walletAddress)}
                          </Typography>
                          <Typography variant='h3'>
                            NFTs Created : &nbsp;
                            {data?.orderCount}
                          </Typography>
                        </Box>
                      </Box>
                    </Container>
                  </Box>
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
    </Container>
  );
}
