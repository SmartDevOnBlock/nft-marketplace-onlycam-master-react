import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getContract, sortAddress, swichNetworkHandler } from "src/utils";
import { useWeb3React } from "@web3-react/core";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import LazyMarketPlaceABI from "src/constants/ABI/MarketPlaceABI.json";

const useStyles = makeStyles((theme) => ({
  bidsDetails: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    border: "0.5px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 0px 22px 22px",
    padding: "10px",
    marginBottom: 5,
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },

  unlockContent: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    border: "0.5px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "22px",
    alignItems: "center",
    padding: "22px 0px 22px 22px",
    padding: "10px",
    marginTop: 14,
    [theme.breakpoints.down("sm")]: {
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
}));
const details1 = [
  {
    name: "Owner",
    add: "0xC3d7...7A1b",
  },
];
export const Details = ({ orderDetails, properties }) => {
  const classes = useStyles();
  const { account, chainId, library } = useWeb3React();
  const [unlockContent, setUnlockContent] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const unlockContentHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      try {
        setIsLoading(true);
        let contractObj = undefined;
        if (
          !orderDetails?.collectionId[0]?.isLazyMinting ||
          (!orderDetails?.collectionId[0]?.isLazyMinting &&
            orderDetails?.nftId[0]?.isResale)
        ) {
          contractObj = getContract(
            orderDetails?.collectionId[0].contractAddress,
            NftTokenABI,
            library,
            account
          );
        } else {
          contractObj = getContract(
            orderDetails?.collectionId[0].contractAddress,
            LazyMarketPlaceABI,
            library,
            account
          );
        }
        if (contractObj) {
          const unlockContent = await contractObj.unlockContent(
            orderDetails?.nftId[0].tokenId
          );

          setUnlockContent(unlockContent);
          setIsLoading(false);
        } else {
          toast.error("Something went to wrong");
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(
          "To see the content you have to buy this NFT, or Please try again"
        );
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn("Please switch network");
    }
  };

  useEffect(() => {
    setUnlockContent();
  }, [account]);

  return (
    <Box>
      <Box className={classes.bidsDetails}>
        <Box className={classes.price1}>
          <Typography Typography variant='h6'>
            Alternative Text For NFT :{" "}
            {orderDetails?.nftId[0]?.alternativeTextForNFT}
          </Typography>
        </Box>
        <Box className={classes.price1}>
          <Typography Typography variant='h6'>
            Property First :{" "}
            {properties?.propertyFirst ? properties?.propertyFirst : "NA"}
          </Typography>
        </Box>

        <Box className={classes.price1}>
          <Typography Typography variant='h6'>
            Property Second :{" "}
            {properties?.properySecond ? properties?.properySecond : "NA"}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.bidsDetails}>
        <Box className={classes.price1}>
          <Typography variant='h5'>Owner</Typography>
          <Typography variant='h6'>
            {" "}
            {orderDetails?.userId[0]?.name
              ? orderDetails?.userId[0]?.name
              : sortAddress(orderDetails?.userId[0]?.walletAddress)}
          </Typography>
        </Box>

        <Box>
          <Button
            variant='contained'
            size='small'
            color='primary'
            fullWidth
            disabled={isLoading}
            onClick={() => unlockContentHandler()}
          >
            Unlock Content {isLoading && <ButtonCircularProgress />}
          </Button>
        </Box>
      </Box>
      {unlockContent && (
        <Box className={classes.unlockContent}>
          <Typography>Unlock Content</Typography>
          {unlockContent && (
            <Typography variant='h6'>{unlockContent}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
