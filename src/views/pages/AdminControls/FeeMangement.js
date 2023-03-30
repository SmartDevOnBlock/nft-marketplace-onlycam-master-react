import React, { useState, useEffect } from "react";
import {
  getMarketplaceContractAddress,
  getNetworkDetails,
  getNormalMarketplaceContractAddress,
  networkList,
  ACTIVE_NETWORK_BNB,
  ACTIVE_NETWORK_ETH,
} from "src/constants";
import {
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  InputAdornment,
  InputBase,
  TextField,
  Grid,
  Button,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  makeStyles,
  Container,
} from "@material-ui/core";
import LazyMinterETH from "src/constants/LazyMinterETH";
import { getContract, sortAddress, getWeb3ContractObject } from "src/utils";

import LazyMinterBNB from "src/constants/LazyMinterBNB";
import { toast } from "react-toastify";
import MarketPlaceABI from "src/constants/ABI/MarketPlaceABI.json";
import MarketplaceABINormal from "src/constants/ABI/MarketplaceABINormal.json";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
  root2: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:420px)": {
      display: "block",
    },
  },
  heading: {
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  tablesection: {
    "& td": {
      color: "#fff",
    },
  },
  colorbox: {
    // marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
}));

export default function FeeMangement() {
  const classes = useStyles();
  const { account, library, chainId } = useWeb3React();
  const [marketPlaceFee, setMarketPlaceFee] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdatingMarketFee, setIsUpdatingMarketFee] = useState(false);
  const [isUpdatingLazyFee, setIsUpdaingLazyFee] = useState(false);
  const [lazyMintFee, setLazyMintFee] = useState("");
  const [network, setNetwork] = useState({
    name: "select",
  });

  const updateMarketPlaceFee = async () => {
    if (chainId == network.chainId) {
      if (marketPlaceFee > "0") {
        setIsUpdatingMarketFee(true);
        try {
          const MarketplaceContractAddress = getMarketplaceContractAddress(
            network.chainId
          );

          const contractObj = getContract(
            MarketplaceContractAddress,
            MarketplaceABINormal,
            library,
            account
          );

          const setOwnerCutPerMillion = await contractObj.setOwnerCutPerMillion(
            parseFloat(marketPlaceFee) * 10000
          );
          await setOwnerCutPerMillion.wait();
          setIsUpdatingMarketFee(false);
          toast.success("Market fee has been updated successfully");
        } catch (error) {
          console.log(error);
          setIsUpdatingMarketFee(false);
          toast.error(error);
        }
      } else {
        toast.error("Please enter a valid amount");
        setIsUpdatingMarketFee(false);
      }
    } else {
      swichNetworkHandler();
      toast.warn("Please swich network to " + network.name);
    }
  };
  const swichNetworkHandler = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            { chainId: "0x" + parseFloat(network.chainId).toString(16) },
          ],
        });
      } catch (error) {
        console.log("ERROR", error);
        // toast.warn(error.message);
        if (error.code === 4902) {
          addNetworkHandler();
        }
      }
    }
  };

  const addNetworkHandler = async () => {
    const NetworkDetails = getNetworkDetails(network.chainId);
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: NetworkDetails,
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
    }
  };
  const updateLazyMintFeeHandler = async () => {
    if (chainId == network.chainId) {
      if (Number(lazyMintFee) > 0) {
        setIsUpdaingLazyFee(true);
        try {
          const MarketplaceContractAddress = getMarketplaceContractAddress(
            network.chainId
          );

          const contract = getContract(
            MarketplaceContractAddress,
            MarketPlaceABI,
            library,
            account
          );

          const setOwnerCutPerMillion = await contract.setOwnerCutPerMillion(
            parseFloat(lazyMintFee) * 10000
          );
          await setOwnerCutPerMillion.wait();
          setIsUpdaingLazyFee(false);
        } catch (error) {
          console.log(error);
          toast.error(error);
          setIsUpdaingLazyFee(false);
        }
      } else {
        toast.error("Please enter a valid amount");
        setIsUpdaingLazyFee(false);
      }
    } else {
      swichNetworkHandler();
      toast.warn("Please swich network to " + network.name);
    }
  };
  return (
    <Box>
      <Container>
        <Box className={classes.colorbox} mt={10}>
          <Box className={classes.root2}>
            <Box className={classes.heading}>
              <Typography variant="h4">Fee Management</Typography>
            </Box>
            <Box mt={2} mb={2}>
              <FormControl className={`${classes.formControl} createSelect`}>
                <label style={{ color: "#fff" }}>Please select a network</label>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  <MenuItem
                    value={{
                      name: "select",
                    }}
                  >
                    Select
                  </MenuItem>
                  {/* <MenuItem value="select">Select</MenuItem> */}
                  {networkList.map((data, i) => {
                    return (
                      <MenuItem key={data.name} value={data}>
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {isSubmit && network === "select" && (
                  <FormHelperText error>Please select network</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={6} md={6} xs={12}>
              <label style={{ color: "#fff" }}>Lazy Minting Fee</label>
              <TextField
                variant="outlined"
                placeholder="Enter fee"
                style={{
                  color: "#fff",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
                // onChange={(e) => setLazyMintFee(e.target.value)}
                onKeyPress={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (e.target.value && e.target.value != "-") {
                    setLazyMintFee(Math.abs(Number(e.target.value)));
                  } else {
                    setLazyMintFee();
                  }
                }}
                value={lazyMintFee}
                type="number"
              />
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={updateLazyMintFeeHandler}
                disabled={lazyMintFee === "" || isUpdatingLazyFee}
              >
                Submit {isUpdatingLazyFee && <ButtonCircularProgress />}
              </Button>
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={12}>
              <label style={{ color: "#fff" }}>Marketplace Fee</label>
              <TextField
                variant="outlined"
                placeholder="Enter fee"
                style={{
                  color: "#fff",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
                // onChange={(e) => setMarketPlaceFee(e.target.value)}
                onKeyPress={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (e.target.value && e.target.value != "-") {
                    setMarketPlaceFee(Math.abs(Number(e.target.value)));
                  } else {
                    setMarketPlaceFee();
                  }
                }}
                value={marketPlaceFee}
                type="number"
              />
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={updateMarketPlaceFee}
                disabled={marketPlaceFee === "" || isUpdatingMarketFee}
              >
                Submit {isUpdatingMarketFee && <ButtonCircularProgress />}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
