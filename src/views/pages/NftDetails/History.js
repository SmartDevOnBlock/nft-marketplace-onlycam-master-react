import { Box, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import MyActivityCard, { FolloWUnfollowCard } from "./MyActivityCard";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "120px" },
  nftcard: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
  tabBtn: {
    margin: "20px 0px 10px 0px",
    backgroundColor: "#FCF2FA",
    borderRadius: "22px",
    padding: "14px",
    "& button": { borderRadius: "15px" },
  },
  bidsDetails: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    border: "0.5px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    padding: "5px",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      width: "75px",
      height: "75px",
      marginRight: "20px",
    },
    "& img": {
      maxHeight: "100%",
      maxWidth: "100%",
      height: "auto",
      width: "auto",
      display: "block",
    },
  },
  price1: {
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
      color: "#3B0D60",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#3B0D60",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
      "& span": {
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#D200A5",
        [theme.breakpoints.down("sm")]: {
          fontSize: "13px",
        },
      },
    },
  },
  time: {
    paddingRight: "25px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0",
      marginTop: "10px",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
    },
  },
}));
const history1 = [
  {
    avatar: "/images/catprofile.png",
    name: "asas",
    bidby: "1 edition bided by",
    bidname: "Chirag Varshney (price : 0.0120)",
    date: "03-02-2022",
    time: "12:29 PM",
  },
  {
    avatar: "/images/catprofile.png",
    name: "asas",
    bidby: "1 edition bided by",
    bidname: "Chirag Varshney (price : 0.0120)",
    date: "03-02-2022",
    time: "12:29 PM",
  },
  {
    avatar: "/images/catprofile.png",
    name: "asas",
    bidby: "1 edition bided by",
    bidname: "Chirag Varshney (price : 0.0120)",
    date: "03-02-2022",
    time: "12:29 PM",
  },
  {
    avatar: "/images/catprofile.png",
    name: "asas",
    bidby: "1 edition bided by",
    bidname: "Chirag Varshney (price : 0.0120)",
    date: "03-02-2022",
    time: "12:29 PM",
  },
];
export default function History({ orderDetails }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState();
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showNftHistoryhandler = async (_id, cancelTokenSource) => {
    try {
      const res = await axios.get(apiConfig.showNftHistory, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          _id,
          page,
          limit: 5,
        },
      });
      if (res.data.statusCode === 200) {
        setHistoryList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      } else {
        setHistoryList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (orderDetails?.nftId[0]?._id) {
      showNftHistoryhandler(orderDetails.nftId[0]._id, cancelTokenSource);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [orderDetails, page]);

  return (
    <Box>
      {isLoading ? (
        <DataLoading />
      ) : (
        <>
          {historyList && historyList.length === 0 && <DataNotFound />}
          {historyList &&
            historyList.map((data, index) => {
              return (
                <>
                  {data.type === "UNFOLLOW" || data.type === "FOLLOW" ? (
                    <FolloWUnfollowCard data={data} classes={classes} />
                  ) : (
                    <MyActivityCard
                      data={data}
                      type="timing"
                      index={index}
                      classes={classes}
                    />
                  )}
                </>
              );
            })}
          {noOfPages && noOfPages > 1 && (
            <Box display="flex" justifyContent="space-evenly">
              <Button
                disabled={parseInt(page) === 1}
                onClick={() => {
                  if (page > 1) {
                    setPage(parseInt(page) - 1);
                  }
                }}
              >
                Prev
              </Button>{" "}
              <Button
                disabled={page >= noOfPages}
                onClick={() => {
                  if (page <= noOfPages) {
                    setPage(parseInt(page) + 1);
                  }
                }}
              >
                Next
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
