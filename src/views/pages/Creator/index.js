import {
  Box,
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputBase,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import CreatorCard from "src/component/CreatorCard";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { BiSearchAlt2 } from "react-icons/bi";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "15px",
    "@media(max-width:380px)": {
      display: "block",
    },
    "& h1": {
      color: "#3B0D60",
      fontWeight: "700",
      fontSize: "40px",
      "@media(max-width:767px)": {
        fontSize: "20px",
      },
      "@media(max-width:380px)": {
        fontSize: "20px",
        paddingBottom: "10px",
      },
    },
  },
  boxsection: {
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "18px",
      paddingTop: "7px",
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
  mainimg: { paddingTop: "24px", width: "100%" },
  imgsec: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "-35px",
  },
  follower: {
    marginTop: "40px",
    background: "#FCF2FA",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "30px",
    paddingRight: "30px",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
      color: "#D200A5",
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  namesection: {
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
      paddingTop: "10px",
    },
  },
  bio: {
    paddingTop: "15px",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#7E6196",
    },
  },
  nftImg: {
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
  select1: {
    background: "rgba(0, 0, 0, 0.2)",
    boxShadow: "0px 6px 9px rgba(110, 0, 149, 0.15)",
    borderRadius: "20px",
    color: theme.palette.secondary.main,
  },
  selectitem: {
    display: "flex",
    alignItems: "center",
  },
}));

const CreatorCrad = () => {
  const classes = useStyles();
  const [follow, setFollow] = React.useState("");
  const [createrList, setCreaterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState();
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const getCreaterListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.approveUserList,
        params: {
          search: search ? search : null,
          limit: 16,
          page: page,
        },
      });

      if (res.data.statusCode == 200) {
        setCreaterList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);

        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (setSearch == "") {
      getCreaterListHandler();
    } else {
      getCreaterListHandler();
    }
  }, [search, page]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.headsection} mt={2}>
          <Box>
            <Typography variant='h1'>Creators</Typography>
          </Box>
          <Box style={{ background: "rgba(59, 13, 96, 0.4)" }}>
            <InputBase
              type='text'
              style={{ height: "100%", width: "100%" }}
              className='field'
              placeholder='Search User'
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              endAdornment={
                <InputAdornment position='end'>
                  <BiSearchAlt2
                    style={{
                      color: "#fff",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </InputAdornment>
              }
            />
          </Box>
        </Box>
        <Box className={classes.root2}>
          <Box mt={2} style={{ paddingLeft: "1rem" }}>
            {isLoading && <DataLoading />}
            {!isLoading && createrList && createrList.length === 0 && (
              <DataNotFound />
            )}
          </Box>
          <Grid container spacing={3}>
            {createrList &&
              createrList.map((data, index, type) => {
                return (
                  <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Box mt={2}>
                      <CreatorCard data={data} type='creator' index={index} />
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
          {createrList && createrList.length !== 0 && (
            <Box mt={3} display='flex' justifyContent='center'>
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

export default CreatorCrad;
