import React, { useContext, useState } from "react";
import { Typography, Box, makeStyles, Grid, Button } from "@material-ui/core";
import NFTCard from "src/component/NFTCard";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ExploreCard from "src/component/ExploreCard";

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

export default function Collection(props) {
  const { type, collectionList, orderList, callBackFun } = props;
  const user = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const classes = useStyles();

  return (
    <Box>
      <Grid container spacing={3}>
        {collectionList?.map((data, i) => {
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
              <ExploreCard
                data={data}
                type="timing"
                index={i}
                callBackFun={callBackFun ? callBackFun : null}
              />
            </Grid>
          );
        })}
        {collectionList && collectionList?.length === 0 && (
          <h4 style={{ paddingLeft: "14px" }}>
            NO ITEMS FOUND FOR THE TERM SEARCH
          </h4>
        )}
      </Grid>
      {collectionList?.length !== 0 && (
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
