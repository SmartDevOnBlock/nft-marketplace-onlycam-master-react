import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CreatorCard from "src/component/CreatorCard";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
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
      color: "#3B0D60",
      fontWeight: "700",
      fontSize: "40px",
      marginLeft: "15px",
      "@media(max-width:767px)": {
        fontSize: "20px",
      },
    },
  },
}));

const Creators = () => {
  const classes = useStyles();

  const [createrList, setCreaterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);

  const getCreaterListHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(apiConfig.approveUserList, {
        params: {
          limit: 16,
          page: page,
        },
      });
      if (res.data.statusCode == 200) {
        setCreaterList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCreaterListHandler();
  }, [page]);

  return (
    <Box>
      <Box className={classes.headsection}>
        <Typography variant='h1'>Creators</Typography>
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
        <Box mt={5} style={{ paddingLeft: "1rem" }}>
          {isLoading && <DataLoading />}
          {!isLoading && createrList && createrList.length === 0 && (
            <DataNotFound />
          )}
        </Box>
        <Grid container spacing={3}>
          {!isLoading &&
            createrList &&
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

export default Creators;
