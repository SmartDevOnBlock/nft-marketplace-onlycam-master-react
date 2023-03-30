import React, { useContext, useState } from "react";
import { Typography, Box, makeStyles, Grid, Button } from "@material-ui/core";
import NFTCard from "src/component/NFTCard";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  sectionTitleHead: {
    display: "flex",
    alignContent: "center",
    margin: "10px 0 ",
    alignContent: "center",
    justifyContent: "space-between",
    padding: " 0 10px",
    width: "100%",
    marginBottom: "30px",
    color: "#000000",
  },
  loadMore: {
    width: "200px",
    maxWidth: "100%",
  },
  filterBtn: {
    border: "1px solid #2D2D2D",
    borderRadius: "50px",
    fontWeight: "500",
    fontSize: "15.7099px",
    lineHeight: "24px",
    "& img": {
      marginRight: "5px",
    },
  },
}));

const walletdetails = [
  {
    img: "images/card/1.png",
    name: "Bitcoin Miner Ani...",
    likes: "0",
  },
  {
    img: "images/card/2.png",
    name: "Atlanta Hawks coin",
    likes: "250",
  },
  {
    img: "images/card/3.png",
    name: "who am i? #11",
    likes: "10",
  },
  {
    img: "images/card/4.png",
    name: "CryptoBusters Car",
    likes: "50",
  },
  {
    img: "images/card/5.png",
    name: "LIL YOU #0021",
    likes: "100",
  },
  {
    img: "images/card/6.png",
    name: "PASSION | Special Art ",
    likes: "100",
  },
  {
    img: "images/card/7.png",
    name: "Pink Lotus",
    likes: "100",
  },
  {
    img: "images/card/8.png",
    name: "neotokyo citizen #15",
    likes: "100",
  },
  {
    img: "images/card/9.png",
    name: "Bitcoin Miner Ani...",
    likes: "100",
  },
  {
    img: "images/card/10.png",
    name: "Atlanta Hawks coin",
    likes: "100",
  },
  {
    img: "images/card/11.png",
    name: "who am i? #11",
    likes: "100",
  },
  {
    img: "images/card/12.png",
    name: "CryptoBusters Car",
    likes: "100",
  },
];
export default function Items(props) {
  const { type, searchOrderList, orderList, callBackFun } = props;
  const user = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const classes = useStyles();

  return (
    <Box>
      <Grid container spacing={3}>
        {orderList?.map((data, i) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={i}
              className="walletSet mb-20"
            >
              <NFTCard
                data={data}
                type="timing"
                index={i}
                callBackFun={callBackFun ? callBackFun : null}
              />
            </Grid>
          );
        })}
        {orderList && orderList?.length === 0 && (
          <h4 style={{ paddingLeft: "14px" }}>
            NO ITEMS FOUND FOR THE TERM SEARCH
          </h4>
        )}
      </Grid>
      {orderList?.length !== 0 && (
        <Box align="center" mb={5}>
          {user?.allListPageNumber < user?.maxPages && (
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loadMore}
              onClick={async () => {
                setIsUpdating(true);
                await user.getPlaceOrderList(true);
                setIsUpdating(false);
              }}
            >
              LOAD MORE {isUpdating && <ButtonCircularProgress />}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
