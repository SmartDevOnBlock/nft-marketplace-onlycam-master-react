import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { UserContext } from "src/context/User";
import moment from "moment";
import DataNotFound from "src/component/DataNotFound";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
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
  colorbox: {
    marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "10px",
  },
  img: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      marginRight: 15,
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
        width: "90px",
        height: "90px",
        borderRadius: "50%",
      },
    },
  },
  textsection: {
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
  morebtn: {
    display: "flex",
    justifyContent: "end",
    "& button": {},
  },
}));

const Notification = () => {
  const classes = useStyles();
  const user = useContext(UserContext);
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading}>
          <Typography variant="h4">Notification</Typography>
        </Box>
        {user.notificationList && user.notificationList.length === 0 && (
          <Typography
            style={{ color: "#fff", fontSize: "16px", marginTop: "1rem" }}
          >
            No data found
          </Typography>
        )}
        {user.notificationList &&
          user.notificationList.map((data, index) => {
            return (
              <Box className={classes.colorbox} key={index}>
                <Box display="flex" alignItems="center">
                  <Box className={classes.img}>
                    <figure>
                      <img
                        src={data.image ? data.image : "images/onlycamimg.png"}
                        alt="dsgg"
                      />
                    </figure>
                  </Box>
                  <Box className={classes.textsection}>
                    <Typography variant="h3">{data.title}</Typography>
                    <Typography variant="h4">{data.description}</Typography>
                    <Typography variant="h5">
                      {" "}
                      {moment(data.createdAt).format("DD/MM/YYYY, hh:mm")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Container>
    </Box>
  );
};

export default Notification;
