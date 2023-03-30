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
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getContract, sortAddress, getWeb3ContractObject } from "src/utils";
import { useHistory } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { useWeb3React } from "@web3-react/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import * as XLSX from "xlsx";

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
  { id: "name", label: "Name", align: "left", minWidth: "160px" },
  { id: "Gender", label: "Gender", align: "left", maxWidth: "160px" },
  {
    id: "Address",
    label: "Address",
    align: "left",
    minWidth: "160px",
  },
  {
    id: "Id Number",
    label: "Id Number",
    align: "left",
    minWidth: "130px",
  },

  {
    id: "kycStatus",
    label: "KYC Status",
    align: "left",
    minWidth: "160px",
  },
  { id: " Action", label: " Action", align: "left", minWidth: "160px" },
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

export default function CreatorList() {
  const history = useHistory();
  const classes = useStyles();
  const { account, library, chainId } = useWeb3React();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [requestList, setRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lazyMintFee, setLazyMintFee] = useState("");
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [status, setStatus] = useState();
  const [network, setNetwork] = useState({
    name: "select",
  });

  const getkycRequestListHandler = async (cancelTokenSource) => {
    try {
      const res = await axios.post(
        apiConfig.kycRequestList,
        {},
        // { },
        {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
          params: {
            page: page,
            limit: 15,
            search: search,
            kycStatus: status,
            fromDate: fromData
              ? `${moment(fromData).format("YYYY-MM-DD")}`
              : null,
            toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : null,
          },
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setNoOfPages(res.data.result.pages);
          setRequestList(res.data.result.docs);
        } else {
          setNoOfPages(1);
          setRequestList([]);
        }
      } else {
        setNoOfPages(1);
        setRequestList([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setNoOfPages(1);
      setRequestList([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    getkycRequestListHandler(cancelTokenSource);

    return () => {
      cancelTokenSource.cancel();
    };
  }, [page, search, fromData, toData, status]);
  const pagCheck = page === 1 ? 15 : 0;

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(requestList);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "requestList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "user_list.xlsx");
  };
  return (
    <Box>
      <Box className={classes.colorbox} mt={10}>
        <Box className={classes.root2}>
          <Box className={classes.heading}>
            <Typography variant="h4">Creators Management</Typography>
          </Box>
          <Box className="d-flex" style={{ padding: "5px" }}>
            <InputBase
              fullWidth
              type="text"
              className="field"
              placeholder="Search Creator"
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
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3} lg={3} sm={6}>
            <Typography style={{ color: "#3B0D60" }}>From</Typography>

            <KeyboardDatePicker
              className={classes.date}
              style={{ width: "100%", height: "45px" }}
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              inputVariant="outlined"
              disableFuture
              name="dateOfBirth"
              value={fromData}
              onChange={(date) => setFromData(date)}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3} sm={6}>
            <Typography style={{ color: "#3B0D60" }}>To</Typography>
            <KeyboardDatePicker
              className={classes.date}
              style={{ width: "100%", height: "45px" }}
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              inputVariant="outlined"
              disableFuture
              name="dateOfBirth"
              value={toData}
              onChange={(date) => setToData(date)}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3} sm={6}>
            <Typography style={{ color: "#3B0D60" }}>Status</Typography>
            <Select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              fullWidth
              variant="outlined"
              style={{ height: "38px" }}
            >
              <MenuItem value="APPROVE">Approve</MenuItem>
              <MenuItem value="REJECT">Reject</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={3} lg={3} sm={6}>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={downloadExcel}
              >
                DOWNLOAD CSV
              </Button>
            </Box>
          </Grid>
        </Grid>
        {isLoading ? (
          <DataLoading />
        ) : (
          <>
            {requestList.length === 0 ? (
              <DataNotFound />
            ) : (
              <Box style={{ border: "1px solid #3b0d60" }} mt={2}>
                <TableContainer>
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
                      {requestList.map((row, index) => {
                        return (
                          <TableRow
                            key={index}
                            className={classes.tablesection}
                          >
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
                                textTransform: "capitalize",
                              }}
                            >
                              {row.firstName} {row.lastName}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {row.gender}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {(row.address1, row.city, row.state, row.country)}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {row.idType}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {row.kycStatus}
                            </TableCell>

                            <TableCell
                              style={{
                                width: 5,
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                                minWidth: "80px",
                              }}
                              align="right"
                            >
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                <BootstrapTooltip title="View Creators Details">
                                  <VisibilityIcon
                                    onClick={() => {
                                      history.push({
                                        pathname: "/author",
                                        search: row?.userId?.toString(),
                                        hash: row?._id,
                                      });
                                    }}
                                    style={{
                                      fontSize: "25px",
                                      cursor: "pointer",
                                      marginRight: "5px",
                                    }}
                                  />
                                </BootstrapTooltip>

                                {/* <BootstrapTooltip title='Block Creators'>
                                  <BlockIcon
                                    fontSize="small"
                                    style={{
                                      fontSize: "22px",
                                      cursor: "pointer",
                                      marginTop: "2px",
                                    }}
                                  />
                                </BootstrapTooltip> */}
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            <Box mt={2} display="flex" justifyContent="center">
              {requestList && requestList.length >= pagCheck && (
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
