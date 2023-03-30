import DataNotFound from "src/component/DataNotFound";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
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
      borderRadius: "15px",
      "& img": {
        maxHeight: "100%",
        // maxWidth: "100%",
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
    padding: "10px",
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
}));
const act1 = [
  {
    image: "/images/nft/img6.jpeg",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 7:53 PM",
  },
  {
    image: "/images/nft/img7.jpeg",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 9:53 PM",
  },
  {
    image: "/images/nft/img1.jpeg",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 3:53 PM",
  },
  {
    image: "/images/nft/img8.jpeg",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 5:53 PM",
  },
];
export default function AllActivity(props) {
  const classes = useStyles();
  const { type, data, activityNFTList } = props;

  return (
    <Box>
      {activityNFTList &&
        activityNFTList.map((data, index) => {
          return (
            <Box className={classes.colorbox}>
              <Box className={classes.nftimg}>
                <figure>
                  <img src={data?.userId?.coverPic} alt="" />
                </figure>
              </Box>
              <Box className={classes.textbox} ml={2}>
                <Typography variant="h3">{data?.userId?.name}</Typography>
                <Typography variant="h4">{data?.userId?.instagram}</Typography>
                <Typography variant="h5">{data?.createdAt}</Typography>
              </Box>
            </Box>
          );
        })}
      {!activityNFTList ||
        (activityNFTList && activityNFTList.length === 0 && (
          <Box style={{ width: "100%", textAlign: "center", color: "#aeadad" }}>
            {props.tabview === "all" ? (
              <>
                <Typography variant="h4">
                  you don't have any recent activity
                </Typography>
              </>
            ) : (
              <>
                {/* <Typography variant="h4">no following</Typography> */}
                <Box style={{ marginTop: ".5rem" }}>
                  <DataNotFound />
                </Box>
              </>
            )}
          </Box>
        ))}
    </Box>
  );
}
