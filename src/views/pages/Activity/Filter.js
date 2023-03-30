import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import DataLoading from "src/component/DataLoading";
const useStyles = makeStyles((theme) => ({
  btnbox: {
    width: "auto",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "15px",
    "& h1": {
      color: theme.palette.secondary.main,
      fontSize: "25px",
      fontWeight: "700",
      "@media(max-width:767px)": {
        color: "#3B0DAD0",
      },
    },
    "& button": {
      borderRadius: "10px",
      marginBottom: "5px !important",
      marginRight: "4px",
    },
  },
}));
export default function Filter(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { type, data, setSelectedFilter } = props;

  return (
    <Box>
      <Box className={classes.btnbox} mt={2}>
        <Typography variant="h1">Filters</Typography>
        <Box mt={1}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter()}
          >
            All
            {isLoading && <DataLoading />}
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() =>
              setSelectedFilter([
                "NFT_CREATE",
                "CREATE_COLLECTION",
                "ORDER_CREATE",
              ])
            }
          >
            Listing
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter(["ORDER_SELL"])}
          >
            Purchases
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() =>
              setSelectedFilter(["SEND_NFT", "SEND_ORDER", "ORDER_CREATE"])
            }
          >
            Sales
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter(["TRANSFER"])}
          >
            Transfers
          </Button>
          {/* <Button
            variant='contained'
            size='large'
            color='primary'
            onClick={() => setSelectedFilter(["BURNS"])}
          >
            Burns
          </Button> */}
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter(["BID_CREATE"])}
          >
            Bids
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter(["LIKE", "DISLIKE"])}
          >
            Likes
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter(["FOLLOW", "UNFOLLOW"])}
          >
            Followings
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
