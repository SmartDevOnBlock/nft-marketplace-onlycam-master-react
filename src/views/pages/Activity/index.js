import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect, useContext } from "react";
import Filter from "./Filter";
import AllActivity from "./AllActivity";
import Following from "./Following";
import MyActivity from "./MyActivity";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { UserContext } from "src/context/User";
import { Pagination } from "@material-ui/lab";
import DataNotFound from "src/component/DataNotFound";
import DataLoading from "src/component/DataLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  heading: {
    "& h3": {
      color: theme.palette.secondary.main,
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  nftimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90px",
      width: "90px",
      overflow: "hidden",
      borderRadius: "50%",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  colorbox: {
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
  },
  textbox: {
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "21px",
      color: "#D200A5",
    },
    "& h4": {
      marginTop: "3px",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
    },
    "& h5": {
      marginTop: "3px",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      color: "#E4C3DE",
    },
  },
  tabBtn: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        backgroundColor: "#D200A5",
      },
    },
  },
  hr: { border: "1px solid #D1D0D0", marginTop: "8px" },
}));

const Activity = () => {
  const [tabview, setTabView] = useState("following");
  const user = useContext(UserContext);

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [activityNFTList, setActivityNFTList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(["FOLLOW", "UNFOLLOW"]);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);

  const getActivityData = async (userId) => {
    setActivityNFTList([]);
    setIsLoading(true);
    try {
      const res = await axios.post(apiConfig.showActivity, {
        _id: userId,
        limit: 5,
        page: page,
        type: selectedFilter,
      });

      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setNoOfPages(res.data.result.pages);
          setActivityNFTList(res.data.result.docs);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const userId = user?.userData?._id;
    if (userId) {
      getActivityData(userId);
    }
  }, [user?.userData, page, selectedFilter]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading}>
          <Typography variant="h3">Activity</Typography>
        </Box>
        <Box mt={2} className={classes.tabBtn}>
          {/* <Button
            className={tabview === "all" ? "active" : ""}
            onClick={() => setTabView("all")}
          >
            All
          </Button> */}
          <Button
            className={tabview === "following" ? "active" : ""}
            onClick={() => {
              setTabView("following");
              setSelectedFilter(["FOLLOW", "UNFOLLOW"]);
            }}
          >
            Following
          </Button>
          <Button
            className={tabview === "myActivity" ? "active" : " "}
            onClick={() => {
              setTabView("myActivity");
              setSelectedFilter();
            }}
          >
            My Activity
          </Button>
        </Box>

        <hr className={classes.hr} />
        <Grid container spacing={2}>
          <Grid item lg={12}>
            {tabview === "following" ? (
              <Following activityNFTList={activityNFTList} />
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} md={7} sm={12} lg={7}>
            {!isLoading && activityNFTList && activityNFTList.length === 0 && (
              <Box mt={2} style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5" style={{ color: "#fff" }}>
                  NO ACTIVITY PERFORMED
                </Typography>
              </Box>
            )}
            {isLoading ? (
              <DataLoading />
            ) : (
              <>
                {/* {tabview === "following" ? (
                  <Following activityNFTList={activityNFTList} />
                ) : (
                  ""
                )} */}
                {tabview === "myActivity" ? (
                  <MyActivity activityNFTList={activityNFTList} />
                ) : (
                  ""
                )}
                {tabview === "all" ? (
                  <AllActivity activityNFTList={activityNFTList} />
                ) : (
                  ""
                )}
                {activityNFTList && activityNFTList.length !== 0 && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <Pagination
                      count={noOfPages}
                      page={page}
                      onChange={(e, v) => setPage(v)}
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={1} sm={12} lg={1}></Grid>
          <Grid item xs={12} md={4} sm={12} lg={4}>
            <Box>
              {/* <Filter
                selectedFilter={selectedFilter}
                setSelectedFilter={(data) => setSelectedFilter(data)}
              /> */}
              {tabview === "all" && (
                <Filter
                  selectedFilter={selectedFilter}
                  setSelectedFilter={(data) => setSelectedFilter(data)}
                />
              )}
              {/* {tabview === "following" && (
                <Filter
                  selectedFilter={selectedFilter}
                  setSelectedFilter={(data) => setSelectedFilter(data)}
                />
              )} */}
              {tabview === "myActivity" && (
                <Filter
                  selectedFilter={selectedFilter}
                  setSelectedFilter={(data) => setSelectedFilter(data)}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Activity;
