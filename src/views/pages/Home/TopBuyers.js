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
import { sortAddress } from "src/utils";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    paddingTop: "3rem",
    paddingBottom: "2rem",
    width: "100%",
  },

  cornerBox: {
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "50px",
    height: "auto",
    width: "100%",
    marginBottom: "3rem",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  textImg: {
    display: "flex",
    justifyContent: "space-between",
  },

  imageBox: {
    border: "5px solid #E5E5E5",
    boxSizing: "border-box",
    borderRadius: "11px",
    marginTop: "-44px",
    background: "#fff",
    minHeight: "82px",
    minWidth: "87px",
    height: "87px",
    textAlign: "center",
    "@media(max-width:360px)": {
      minHeight: "76px",
      minWidth: "72px",
      height: "76px",
      marginTop: "-39px",
    },
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

export default function TopBuyers() {
  const classes = useStyles();
  const history = useHistory();
  const [topBuyers, setTopBuyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);

  const topBuyer = async () => {
    try {
      const res = await axios.get(apiConfig.topBuyers, {
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
          (data) => Number(data.topBuyer) > 0
        );
        setTopBuyers(filterData);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERRROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    topBuyer();
  }, [page]);
  return (
    <Box className={classes.bannerBox}>
      <Container>
        <Box className={classes.cornerBox}>
          <Container style={{ paddingBottom: "50px" }}>
            <Box className={classes.textImg} variant='h4'>
              <Box className={classes.topcreators}>
                <Typography variant='h1'>Top Buyers</Typography>
              </Box>

              <Box className={classes.imageBox}>
                <img
                  src=' ./images/Frame.png'
                  alt=''
                  style={{ width: "50%", paddingTop: "18px" }}
                />
              </Box>
            </Box>
            <Box mt={2}>
              {isLoading && <DataLoading />}
              {!isLoading && topBuyers && topBuyers.length === 0 && (
                <DataNotFound />
              )}
            </Box>
            <Grid container spacing={2}>
              {topBuyers &&
                topBuyers?.map((data, index) => {
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
                                Buys : &nbsp;
                                {data?.topBuyer}
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

            {/* </Box> */}
          </Container>
        </Box>
      </Container>
    </Box>
  );
}
