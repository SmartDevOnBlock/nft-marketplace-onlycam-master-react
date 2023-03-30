import apiConfig from "src/connectors/config/ApiConfig";
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  TextField,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { makeStyles, withStyles } from "@material-ui/styles";
import moment from "moment";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useLocation } from "react-router-dom";
import MuiDialogContent from "@material-ui/core/DialogContent";
const useStyles = makeStyles((theme) => ({
  colorbox: {
    // marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
    "& h4": {
      color: "#fff",
      fontSize: "17px",
    },
    "& h5": {
      color: "#FDF",
      fontSize: "17px",
    },
  },
  figimg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    "@media(max-width:650px)": {
      display: "block",
    },
    "& figure": {
      justifyContent: "center",
      alignItems: "center",
      height: "210px",
      overflow: "hidden",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  grid: {
    padding: "10px",
    overflowY: "hidden !important",
    overflowX: "hidden !important",
  },
}));
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    overflow: "hidden !important",
  },
}))(MuiDialogContent);

export default function KYCDetails({ kycDetails, getKycDetailsHandler }) {
  const classes = useStyles();
  const [isUpdating, setIsUpdating] = useState();
  const [openImageBox, setOpenImageBox] = useState(false);
  const [openImageBack, setOpenImageBack] = useState(false);
  const [openImageSelfie, setOpenImageSelfie] = useState(false);

  const [frontImageOpen, setFrontImage] = useState();
  const [imageBackOpen, setFrontBackImage] = useState();
  const [imageSelfieOpen, setFrontSelfieImage] = useState();
  const [reject, setReject] = useState(false);
  const [message, setMessage] = useState(false);
  const [reason, setReason] = useState();

  const frontimage = (data) => {
    setOpenImageBox(true);
    setFrontImage(data);
  };
  const backimage = (data) => {
    setOpenImageBack(true);
    setFrontBackImage(data);
  };
  const selfieimage = (data) => {
    setOpenImageSelfie(true);
    setFrontSelfieImage(data);
  };
  const kycApproveRejectHandler = async (kycStatus) => {
    setIsUpdating(kycStatus);
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.kycApproveReject,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: kycDetails?._id,
          kycStatus: kycStatus,
          reason: reason,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        getKycDetailsHandler();
        setReject(false);
        setMessage(false);
      } else {
        toast.warn(res.data.responseMessage);
      }
      setIsUpdating();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }

      setIsUpdating();
    }
  };

  const sendMessageHandler = async () => {
    setIsUpdating("SEND");
    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.sendKycMail,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: kycDetails?._id,
          message: reason,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        getKycDetailsHandler();
        setReject(false);
        setMessage(false);
      } else {
        toast.warn(res.data.responseMessage);
      }
      setIsUpdating();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }

      setIsUpdating();
    }
  };

  return (
    <Box>
      <Box className={classes.colorbox} mt={5}>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <Typography variant='h5'>Name</Typography>
            <Typography variant='h5'>Gender</Typography>
            <Typography variant='h5'>Id Type</Typography>
            <Typography variant='h5'>Kyc Status</Typography>
            <Typography variant='h5'>Address</Typography>
            <Typography variant='h5'>State</Typography>
            <Typography variant='h5'>Zip Code</Typography>
            <Typography variant='h5'>Date of Birth</Typography>
            <Typography variant='h5'>E-mail</Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant='h5'>
              {kycDetails?.firstName} {kycDetails?.lastName}
            </Typography>
            <Typography variant='h5'>{kycDetails?.gender}</Typography>
            <Typography variant='h5'>{kycDetails?.idType}</Typography>
            <Typography variant='h5'>{kycDetails?.kycStatus}</Typography>
            <Typography variant='h5'>
              {kycDetails.address1} {kycDetails?.address2}
            </Typography>
            <Typography variant='h5'>{kycDetails?.state}</Typography>
            <Typography variant='h5'>{kycDetails?.zipCode}</Typography>
            <Typography variant='h5'>
              {" "}
              {kycDetails?.dateOfBirth
                ? moment(kycDetails.dateOfBirth).format("DD/MM/YYYY")
                : "0"}
            </Typography>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant='h5'>{kycDetails?.email}</Typography>&nbsp;
              <Button
                variant='contained'
                color='primary'
                onClick={() => setMessage(true)}
              >
                SEND MSG
              </Button>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}></Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}></Grid>
        </Grid>
        <Box className={classes.figimg} mt={1}>
          <Box>
            <Typography variant='h4'>Front Side Photo</Typography>
            <figure
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <img
                src={kycDetails?.idPhotoFront}
                alt=''
                style={{ cursor: "pointer" }}
                onClick={() => frontimage(kycDetails?.idPhotoFront)}
              />
            </figure>
          </Box>
          {openImageBox && (
            <Lightbox
              mainSrc={frontImageOpen}
              onCloseRequest={() => setOpenImageBox(false)}
              style={{ width: "300px", height: "200px" }}
            />
          )}

          <Box>
            <Typography variant='h4'>Back Side Photo</Typography>
            <figure
              style={{
                marginLeft: "10px",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <img
                src={kycDetails?.idPhotoBack}
                alt=''
                style={{ cursor: "pointer" }}
                onClick={() => backimage(kycDetails?.idPhotoBack)}
              />
            </figure>{" "}
          </Box>
          {openImageBack && (
            <Lightbox
              mainSrc={imageBackOpen}
              onCloseRequest={() => setOpenImageBack(false)}
              style={{ width: "300px", height: "200px" }}
            />
          )}
          <Box>
            <Typography variant='h4'>Selfie With Id</Typography>
            <figure
              style={{
                marginLeft: "10px",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <img
                src={kycDetails?.selfieWithId}
                alt=''
                style={{ cursor: "pointer" }}
                onClick={() => selfieimage(kycDetails?.selfieWithId)}
              />
            </figure>{" "}
          </Box>
          {openImageSelfie && (
            <Lightbox
              onCloseRequest={() => setOpenImageSelfie(false)}
              mainSrc={imageSelfieOpen}
              style={{ width: "300px", height: "200px" }}
            />
          )}
        </Box>
        <Box mt={2} textAlign='center'>
          <Button
            disabled={isUpdating}
            variant='contained'
            size='large'
            color='primary'
            onClick={() => kycApproveRejectHandler("APPROVE", kycDetails._id)}
          >
            APPROVE {isUpdating == "APPROVE" && <ButtonCircularProgress />}
          </Button>
          <Button
            disabled={isUpdating}
            variant='contained'
            color='secondary'
            size='large'
            onClick={() => {
              setReject(true);
            }}
            style={{ marginLeft: "10px" }}
          >
            REJECT {isUpdating == "REJECT" && <ButtonCircularProgress />}
          </Button>
        </Box>
      </Box>
      <Dialog
        className='modalkyc'
        open={reject}
        maxWidth='sm'
        fullWidth
        onClose={() => setReject(false)}
      >
        <DialogTitle>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item lg={12} md={12} sm={12}>
              <Box style={{ padding: "15px !important" }}>
                REASON FOR REJECTION
              </Box>
              <Box
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                <TextField
                  variant='outlined'
                  multiline
                  rows='4'
                  fullWidth
                  placeholder='Enter reason'
                  onChange={(e) => setReason(e.target.value)}
                />
                <Box style={{ marginTop: "1rem" }}>
                  <Button
                    variant='contained'
                    size='large'
                    color='secondary'
                    onClick={() => setReject(false)}
                  >
                    Close
                  </Button>
                  &nbsp;
                  <Button
                    variant='contained'
                    size='large'
                    color='primary'
                    onClick={() => kycApproveRejectHandler("REJECT")}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
      </Dialog>
      <Dialog
        className='modalkyc'
        open={message}
        maxWidth='sm'
        fullWidth
        onClose={() => setMessage(false)}
      >
        <DialogTitle>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item lg={12} md={12} sm={12}>
              <Box style={{ padding: "15px !important" }}>Message</Box>
              <Box
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                <TextField
                  variant='outlined'
                  multiline
                  rows='4'
                  fullWidth
                  placeholder='Enter your message'
                  onChange={(e) => setReason(e.target.value)}
                />
                <Box style={{ marginTop: "1rem" }}>
                  <Button
                    variant='contained'
                    size='large'
                    color='secondary'
                    onClick={() => setMessage(false)}
                    disabled={isUpdating}
                  >
                    Close
                  </Button>
                  &nbsp;
                  <Button
                    variant='contained'
                    size='large'
                    color='primary'
                    onClick={() => sendMessageHandler()}
                    disabled={isUpdating}
                  >
                    Send{isUpdating == "SEND" && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
      </Dialog>
    </Box>
  );
}
