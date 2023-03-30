import {
  Box,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  InputBase,
  InputAdornment,
  Select,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { sortAddress } from "src/utils";
import Transaction from "./Transaction";
import OnBid from "./OnBid";
import TotalNft from "./TotalNft";
import SoldNft from "./SoldNft";
import ReportedNft from "./ReportedNft";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import ReportedNFTList from "./ReportedNFTList";
import { UserContext } from "src/context/User";
import DataNotFound from "src/component/DataNotFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";

import { BiSearchAlt2 } from "react-icons/bi";
import AllBlockList from "./AllBlockList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  btnbox1: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "@media(max-width:767px)": {
        marginTop: "1rem",
      },
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        backgroundColor: "#D200A5",
      },
    },
  },
  userHeading: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:420px)": {
      display: "block",
    },
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  img: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& img": {},
    },
  },
  yesNobtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& button": {
      marginRight: "7px",
    },
  },
  warning: {
    "& h1": {
      background:
        "linear-gradient(86.27deg, #7000E9 -14.11%, #FF00C5 14.54%, #FF0076 50.13%, #005CE3 112.46%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  table: {
    minWidth: 950,
  },
}));
const TableHeading = [
  {
    id: "Sr.No",
    label: "Sr.No",
    align: "left",
    minWidth: "25px",
    maxWidth: "70px",
  },
  // { id: "ID", label: "User Id", align: "left", maxWidth: "160px" },
  { id: "Username", label: "User Name", align: "left", minWidth: "160px" },
  {
    id: "walletAddress",
    label: "Wallet Address",
    align: "left",
    maxWidth: "160px",
  },
  { id: "orderCount", label: "Order Count", align: "left", minWidth: "160px" },
  {
    id: "Total Earning",
    label: "Total Earning",
    align: "left",
    minWidth: "130px",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    minWidth: "130px",
  },

  {
    id: "Registration Date",
    label: " Registration Date",
    align: "left",
    minWidth: "160px",
  },
  { id: " Action", label: " Action", align: "left", minWidth: "160px" },
];
const AdminTableHeading = [
  {
    id: "Sr.No",
    label: "Sr.No",
    align: "left",
    minWidth: "25px",
    maxWidth: "70px",
  },
  // { id: "ID", label: "User Id", align: "left", maxWidth: "160px" },
  { id: "name", label: "Name", align: "left", minWidth: "160px" },
  {
    id: "Email",
    label: "Email",
    align: "left",
    maxWidth: "160px",
  },
  {
    id: "walletAddress",
    label: "Wallet Address",
    align: "left",
    minWidth: "130px",
  },
  {
    id: "Mobileno",
    label: "Mobile No.",
    align: "left",
    minWidth: "130px",
  },

  {
    id: "role",
    label: "Role",
    align: "left",
    minWidth: "160px",
  },
  { id: " dob", label: " Created At", align: "left", minWidth: "160px" },
];

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
export default function Admin(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [tabview, setTabView] = useState("totalNft");
  const [allNftList, setAllNftList] = useState([]);
  const [soldNftList, setSoldNftList] = useState([]);
  const [hotBidList, setHotBidList] = useState([]);

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userBlockId, setUserBlockId] = useState("");
  const [noOfPages, setNoOfPages] = useState(1);
  const [noOfPagesBid, setNoOfPagesBid] = useState(1);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [pageBid, setPageBid] = useState(1);
  const [isBlockPop, setIsBlockPop] = useState(false);

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/");
    }
  }, [user.isAdmin]);

  const allNftListHandler = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.allListOrder,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        if (res.data.result.docs) {
          setAllNftList(res.data.result.docs);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const soldNftListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.soldNftList,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        setSoldNftList(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const hotBidListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.hotBid,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          page: pageBid,
          limit: 15,
        },
      });
      if (res.data.statusCode == 200) {
        setHotBidList(res?.data?.result.docs);
        setNoOfPagesBid(res.data.result.pages);
        console.log("hotBidList----", hotBidList);
      } else {
        setNoOfPagesBid(1);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    allNftListHandler();
    soldNftListHandler();
    hotBidListHandler();
  }, []);

  const getuserListHandler = async (cancelTokenSource) => {
    setIsLoading(true);
    try {
      const res = await axios.get(apiConfig.listUser, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          page: page,
          limit: 15,
          search: search ? search : null,
        },

        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setNoOfPages(res.data.result.pages);
          setUserList(res.data.result.docs);
          setIsLoading(false);
        } else {
          setNoOfPages(1);
          setUserList([]);
          setIsLoading(false);
        }
      } else {
        setNoOfPages(1);
        setUserList([]);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  const blockUserHandler = async (id) => {
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.blockUnblockUser,

        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });

      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        getuserListHandler();
        setIsBlockPop(false);
      }
    } catch (error) {
      console.log(error);
      setIsBlockPop(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getuserListHandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [page, search]);

  useEffect(() => {
    if (pageBid) {
      hotBidListHandler();
    }
  }, [pageBid]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.userHeading}>
          <Box>
            <Typography variant="h4">User Management</Typography>
          </Box>
        </Box>
        <UserList
          userList={userList}
          getuserListHandler={getuserListHandler}
          isLoading={isLoading}
          setSearch={setSearch}
          noOfPages={noOfPages}
          setPage={setPage}
          page={page}
          blockUserHandler={blockUserHandler}
          setUserBlockId={(data) => setUserBlockId(data)}
          userBlockId={userBlockId}
          setIsBlockPop={setIsBlockPop}
          isBlockPop={isBlockPop}
        />
        <Box className={classes.heading} mt={3}>
          <Typography variant="h4" style={{ color: "#fff" }}>
            Admin Management
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => history.push("/add-subadmin")}
          >
            Add Sub Admin
          </Button>
        </Box>
        <AdminList />
        <Box className={classes.btnbox1} mt={3}>
          <Button
            className={tabview === "totalNft" ? "active" : ""}
            onClick={() => setTabView("totalNft")}
          >
            <Typography variant="h6">Total Nft</Typography>
          </Button>
          <Button
            className={tabview === "soldNft" ? "active" : ""}
            onClick={() => setTabView("soldNft")}
          >
            <Typography variant="h6">Sold Nft</Typography>
          </Button>
          <Button
            className={tabview === "onBid" ? "active" : ""}
            onClick={() => setTabView("onBid")}
          >
            <Typography variant="h6">On Bid</Typography>
          </Button>
          <Button
            className={tabview === "report" ? "active" : ""}
            onClick={() => setTabView("report")}
          >
            <Typography variant="h6">Reported Nft</Typography>
          </Button>
          <Button
            className={tabview === "request" ? "active" : ""}
            onClick={() => setTabView("request")}
          >
            <Typography variant="h6">All Requested Blocked List</Typography>
          </Button>
        </Box>
        <Box mt={3}>
          {tabview === "totalNft" ? (
            <TotalNft nftList={allNftList} callbackFun={allNftListHandler} />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "soldNft" ? (
            <TotalNft nftList={soldNftList} callbackFun={allNftListHandler} />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "onBid" ? (
            <TotalNft
              nftList={hotBidList}
              callbackFun={allNftListHandler}
              noOfPages={noOfPagesBid}
              setPage={setPageBid}
              page={pageBid}
              hotBidListHandler={hotBidListHandler}
            />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "report" ? (
            <ReportedNFTList
              nftList={allNftList}
              callbackFun={allNftListHandler}
            />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>{tabview === "request" ? <AllBlockList /> : ""}</Box>
      </Container>
    </Box>
  );
}

export function UserList(props) {
  const {
    userList,
    isLoading,
    noOfPages,
    setSearch,
    blockUserHandler,
    page,
    setPage,
    setUserBlockId,
    userBlockId,
    isBlockPop,
    setIsBlockPop,
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const onClickHandler = (data) => {
    setIsBlockPop(true);
    setUserBlockId(data);
  };
  return (
    <Box className={classes.colorbox} mt={2}>
      <Box
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "0rem 0rem 1rem 0rem",
        }}
      >
        <InputBase
          type="text"
          style={{ height: "100%" }}
          className="field"
          placeholder="Search User"
          onChange={(e) => setSearch(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
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
      <Box style={{ border: "1px solid #3b0d60" }}>
        <TableContainer className="tableHead">
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow>
                {TableHeading.map((data) => (
                  <TableCell
                    style={{
                      backgroundColor: "#3b0d60",
                      color: "#fff",
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {data.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userList &&
                userList.map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {row.userName ? row.userName : "N/A"}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {row?.walletAddress
                          ? sortAddress(row?.walletAddress)
                          : ""}{" "}
                        <CopyToClipboard text={row.walletAddress}>
                          <FaRegCopy
                            size={14}
                            style={{ cursor: "pointer" }}
                            onClick={() => toast.info("Copied")}
                          />
                        </CopyToClipboard>
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {row.orderCount}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {row.totalEarning}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {row.status}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {moment(row.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 5,
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                        align="right"
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <BootstrapTooltip title="View User Details">
                            <VisibilityIcon
                              onClick={() => {
                                history.push({
                                  pathname: "/author",
                                  search: row?._id,
                                });
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            />
                          </BootstrapTooltip>

                          <BootstrapTooltip
                            title={
                              row?.status === "BLOCK" ? "Unblock" : "Block"
                            }
                          >
                            {row?.userType !== "Admin" ? (
                              <BlockIcon
                                fontSize="small"
                                style={
                                  row?.status === "BLOCK"
                                    ? {
                                        color: "red",
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        marginTop: "2px",
                                      }
                                    : {
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        marginTop: "2px",
                                      }
                                }
                                // onClick={() => blockUserHandler(row._id)}
                                onClick={() => onClickHandler(row)}
                              />
                            ) : (
                              <></>
                            )}
                          </BootstrapTooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {!isLoading && userList && userList.length === 0 && (
                <Box
                  style={{
                    dislay: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <DataNotFound />
                </Box>
              )}
              {isLoading && <ButtonCircularProgress />}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} mb={2} display="flex" justifyContent="center">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      </Box>

      <Dialog
        open={isBlockPop}
        onClose={() => setIsBlockPop(false)}
        // maxWidth="xl"
        className={classes.dialogSection}
      >
        <DialogContent>
          <Box className={classes.img}>
            <figure>
              <img src="/images/logo.png" alt="" />
            </figure>
          </Box>
          <Box className={classes.warning} style={{ padding: "20px" }}>
            <Typography variant="h1" style={{ fontSize: "17px" }}>
              ARE YOU SURE WANT TO&nbsp;
              {userBlockId?.status === "BLOCK" ? "UNBLOCK" : "BLOCK"}&nbsp; THIS
              USER?
            </Typography>
          </Box>
          <Box className={classes.yesNobtn}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => setIsBlockPop(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => blockUserHandler(userBlockId?._id)}
            >
              Yes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export function AdminList() {
  const classes = useStyles();
  const history = useHistory();
  const [adminList, setAdminList] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  const [isLoading1, setIsLoading1] = useState(false);

  const getAdminListHandler = async (cancelTokenSource) => {
    setIsLoading1(true);
    try {
      const res = await axios.get(apiConfig.listSubAdmin, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          page: page,
          limit: 15,
        },
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setIsLoading1(false);

        if (res.data.result) {
          setNoOfPages(res.data.result.pages);
          setAdminList(res.data.result);
          setIsLoading1(false);
        } else {
          setNoOfPages(1);
          setAdminList([]);
          setIsLoading1(false);
        }
      } else {
        setNoOfPages(1);
        setAdminList([]);
        setIsLoading1(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getAdminListHandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [page]);

  return (
    <Box className={classes.colorbox} mt={2}>
      <Box style={{ border: "1px solid #3b0d60" }}>
        <TableContainer className="tableHead">
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow>
                {AdminTableHeading.map((data) => (
                  <TableCell
                    style={{
                      backgroundColor: "#3b0d60",
                      color: "#fff",
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {data.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {adminList &&
                adminList.map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                          color: "#fff",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {row.firstName
                          ? row.firstName
                          : "N/A" + " " + row.lastName}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {sortAddress(row.walletAddress)}{" "}
                        <CopyToClipboard text={row.walletAddress}>
                          <FaRegCopy
                            size={14}
                            style={{ cursor: "pointer" }}
                            onClick={() => toast.info("Copied")}
                          />
                        </CopyToClipboard>
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.mobileNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.userType}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(row.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {!isLoading1 && adminList && adminList.length === 0 && (
                <Box
                  style={{
                    dislay: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                    marginLeft: "10px",
                  }}
                >
                  <DataNotFound />
                </Box>
              )}
              {isLoading1 && <ButtonCircularProgress />}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} mb={2} display="flex" justifyContent="center">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      </Box>
    </Box>
  );
}
