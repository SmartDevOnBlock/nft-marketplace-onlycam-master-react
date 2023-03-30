import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { GiCancel } from "react-icons/gi";
import { Form, Formik } from "formik";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "src/context/User";
import moment from "moment";
import { getWeb3Obj } from "src/utils";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: { padding: "70px 0" },
  heading: {
    "& h1": {
      color: theme.palette.secondary.main,
      fontWeight: "700",
      fontSize: "40px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  boxHolder: {
    marginTop: "35px",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "20px",
    height: "auto",
    width: "100%",
    padding: "20px",
    "& th": {
      color: "#fff",
      fontWeight: "700",
      whiteSpace: "pre",
    },
    "& td": {
      color: "#fff",
      whiteSpace: "pre",
    },
  },
  formControl: {
    "& selectMenu": {
      color: "#000",
    },
    "& li": {
      color: "#000 !important",
    },
  },
}));
const row = [
  {
    date: "Feb 15 2022",
    type: "Metamask",
    add: "0x1218431894861",
    primary: "Primary",
  },
  {
    date: "March 15 2022",
    type: "Metamask",
    add: "0x12fefe4d861",
    primary: "Secondary",
  },
];
const Wallet = () => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [walletPopup, setWalletPopup] = useState(false);
  const [userWalletList, setUserWalletList] = useState([]);
  const [userWalletList1, setUserWalletList1] = useState([]);
  const [userWalletAdmin, setUserWalletAdmin] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [walletConnect, setWalletConnect] = useState({
    walletAddress: "",
    walletType: "SECONDARY",
  });

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...walletConnect, [name]: value };
    setWalletConnect(temp);
  };

  const walletAddHandler = async () => {
    setIsLoading(true);
    try {
      const web3 = await getWeb3Obj();
      const dataRes = web3.utils.isAddress(walletConnect.walletAddress);

      if (dataRes) {
        const res = await axios({
          method: "POST",
          url: apiConfig.addWallet,
          data: {
            walletAddress: walletConnect.walletAddress,
            walletType: walletConnect.walletType,
          },

          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setWalletConnect(res.data.result);
          toast.success(res.data.responseMessage);
          setWalletPopup(false);
          listWalletHandler();
          listAdminHandler();
        }
      } else {
        toast.error("Please enter valid address");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
      setIsLoading(false);
    }
  };

  const listWalletHandler = async () => {
    try {
      const res = await axios.get(apiConfig.listWallet, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setUserWalletList(res.data.result);
        setUserWalletList1(res.data.result[0].userId.walletAddress);
      }
      setIsLoadingData(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        // toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
      setIsLoadingData(false);
    }
  };

  const listAdminHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.listWalletAdmin,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setUserWalletAdmin(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makePrimaryHandler = async (_id) => {
    setIsLoading(_id);
    try {
      const res = await axios.put(
        apiConfig.editWallet + `?walletId=${_id}&walletType=PRIMARY`,
        {},
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode === 200) {
        listWalletHandler();
        listAdminHandler();
        toast.success(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
      }
      setIsLoading();
    } catch (error) {
      setIsLoading();

      console.log(error);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (user.userData) {
      listWalletHandler();
      listAdminHandler();
    }
  }, [user.userData]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading} mt={2}>
          <Typography variant="h1">Wallet</Typography>
        </Box>
        <Box className={classes.boxHolder}>
          {isLoadingData ? (
            <DataLoading />
          ) : (
            <TableContainer component={Box}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date Added</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Is Primary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">{userWalletList1}</TableCell>
                    <TableCell align="right">Current Wallet Address</TableCell>
                  </TableRow> */}
                  {userWalletList.map((row, index) => {
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {moment(row.createdAt).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="right">
                          {row.walletAddress}&nbsp;
                          <CopyToClipboard text={row.walletAddress}>
                            <FaRegCopy
                              size={14}
                              style={{
                                cursor: "pointer",
                                width: "15px",
                                height: "15px",
                                padding: "0",
                              }}
                              onClick={() => toast.info("Copied")}
                            />
                          </CopyToClipboard>
                        </TableCell>
                        {row.walletType == "SECONDARY" ? (
                          <TableCell align="right">
                            {" "}
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => makePrimaryHandler(row._id)}
                              disabled={isLoading}
                            >
                              Make Primary{" "}
                              {isLoading === row._id && (
                                <ButtonCircularProgress />
                              )}
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                            >
                              Primary
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {!isLoadingData && userWalletList.length === 0 && (
                <DataNotFound />
              )}
            </TableContainer>
          )}
        </Box>
        <Box mt={3}>
          {/* <Button variant="contained" color="primary">Reset Wallet</Button> */}

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setWalletPopup(true)}
          >
            Add New Wallet
          </Button>
        </Box>
      </Container>
      <Box>
        {walletPopup && (
          <Dialog
            open={walletPopup}
            onClose={() => setWalletPopup(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="lg"
          >
            <DialogActions
              style={{
                background: "rgba(59, 13, 96, 0.4)",
                backdropFilter: "blur(44px)",
              }}
            >
              <IconButton
                onClick={() => setWalletPopup(false)}
                className={classes.customizedButton}
              >
                <GiCancel />
              </IconButton>
            </DialogActions>
            <DialogContent
              style={{
                width: "500px",
                background: "rgba(59, 13, 96, 0.4)",
                backdropFilter: "blur(44px)",
              }}
            >
              <Formik>
                <Form>
                  <Box mb={5}>
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="walletAddress"
                        onChange={_onInputChange}
                        value={walletConnect.walletAddress}
                        placeholder="Enter your wallet address"
                      />
                    </FormControl>
                  </Box>
                  {/* <Box mb={5}>
                    <FormControl
                      fullWidth
                      variant='outlined'
                      className={classes.formControl}
                    >
                      <Select
                        labelId='demo-simple-select-outlined-label2'
                        id='demo-simple-select-outlined2'
                        name='walletType'
                        onChange={_onInputChange}
                        value={walletConnect.walletType}
                        fullWidth
                      >
                        <MenuItem value='PRIMARY'>PRIMARY</MenuItem>
                        <MenuItem value='SECONDARY'>SECONDARY</MenuItem>
                      </Select>
                      <FormHelperText error>
                      </FormHelperText>
                    </FormControl>
                  </Box> */}
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={walletAddHandler}
                      disabled={isLoading}
                    >
                      Submit
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Form>
              </Formik>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default Wallet;
