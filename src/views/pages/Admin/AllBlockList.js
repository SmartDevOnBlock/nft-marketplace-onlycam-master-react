import apiConfig from "src/connectors/config/ApiConfig";
import {
  makeStyles,
  Box,
  Typography,
  Container,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Dialog,
  DialogContent,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import BlockIcon from "@material-ui/icons/Block";

import { Tooltip } from "@material-ui/core";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import { sortAddress } from "src/utils";
import moment from "moment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Pagination } from "@material-ui/lab";

import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  tablesection: {
    "& td": {
      color: "#fff",
    },
  },
  img: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& img": {},
    },
  },
}));
const TableHeading = [
  // {
  //   id: "Sr.No",
  //   label: "Sr.No",
  //   align: "left",
  //   minWidth: "25px",
  //   maxWidth: "70px",
  // },
  // { id: "ID", label: "User Id", align: "left", maxWidth: "160px" },
  { id: "Username", label: "User Name", align: "left", minWidth: "160px" },

  {
    id: "status",
    label: "Status",
    align: "left",
    minWidth: "130px",
  },
  { id: "title", label: "Message", align: "left", minWidth: "160px" },
  // { id: "type", label: "Type", align: "left", minWidth: "160px" },
  { id: "update", label: "Date", align: "left", minWidth: "160px" },

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
export default function AllBlockList({ getuserListHandler, data }) {
  const history = useHistory();
  const classes = useStyles();
  const [allListData, setAllListData] = useState([]);

  const [isBlockPop, setIsBlockPop] = useState(false);
  const [userBlockId, setUserBlockId] = useState("");

  const [page, setPage] = useState(1);

  const blockListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.unblockRequestList,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });

      if (res.data.statusCode === 200) {
        setAllListData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    blockListHandler();
  }, []);

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
        blockListHandler();
        setIsBlockPop(false);
      }
    } catch (error) {
      console.log(error);
      setIsBlockPop(false);
    }
  };
  const onClickHandler = (data) => {
    setIsBlockPop(true);
    setUserBlockId(data);
  };

  return (
    <Box style={{ border: "1px solid #3b0d60" }}>
      <TableContainer className="tableHead">
        <Table stickyHeader aria-label="sticky table">
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
            {allListData.map((data, i) => {
              return (
                <TableRow className={classes.tablesection}>
                  <TableCell
                    align="left"
                    style={{
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {data.userName ? data.userName : "N/A"}
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {data.status}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {data.message}
                  </TableCell>
                  {/* <TableCell
                    align="left"
                    style={{
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {data.type}
                  </TableCell> */}
                  <TableCell
                    align="left"
                    style={{
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {moment(data.createdAt).format("DD/MM/YYYY")}
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
                              search: data._id,
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
                        title={data?.status === "BLOCK" ? "Unblock" : "Block"}
                      >
                        {data?.userType !== "Admin" ? (
                          <BlockIcon
                            fontSize="small"
                            style={
                              data?.status === "BLOCK"
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
                            // onClick={() => blockUserHandler(data?._id)}
                            onClick={() => onClickHandler(data)}
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

            {/* {allListData &&
              allListData?.map((row, index) => {
                return (
                
              })} */}
            {/* {!isLoading && userList && userList.length === 0 && (
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
            {isLoading && <ButtonCircularProgress />} */}
          </TableBody>
        </Table>
      </TableContainer>
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
              {userBlockId?.status === "BLOCK" ? "UNBLOCK" : "BLOCK"}?
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
            </Button>{" "}
            &nbsp;&nbsp;
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
