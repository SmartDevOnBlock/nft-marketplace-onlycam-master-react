import {
  Box,
  DialogContent,
  Dialog,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
import ConnectWallet from "src/component/ConnectWallet";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& h1": {
      color: theme.palette.secondary.main,
      fontWeight: "700",
      fontSize: "50px",
      marginBottom: "25px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "26px",
      },
    },
  },
}));
const BecomeCreator = () => {
  const classes = useStyles();
  const [isOpenConnect, setIsOpenWallet] = useState(false);
  const user = useContext(UserContext);
  console.log("user---", user);
  const history = useHistory();
  return (
    <Box>
      {isOpenConnect && (
        <Dialog
          open={isOpenConnect}
          onClose={() => {
            setIsOpenWallet(false);
          }}
          maxWidth="sm"
        >
          <DialogContent>
            <ConnectWallet
              onClose={() => {
                setIsOpenWallet(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      <Container>
        <Box className={classes.heading} mt={2}>
          <Box textAlign="center">
            <Typography variant="h1">Ready To Be A OnlyCam Creator?</Typography>
            {user.kycStatusRes?.kycStatus === "APPROVE" ||
            user.kycStatusRes?.kycStatus === "PENDING" ||
            user.kycStatusRes?.kycStatus === "REJECT" ? (
              <Button variant="contained" color="primary" size="large">
                You already applied.
              </Button>
            ) : (
              <>
                {user?.kycStatusRes?.kycStatus !== "APPROVE" ||
                user?.kycStatusRes?.kycStatus !== "PENDING" ||
                user?.kycStatusRes?.kycStatus !== "REJECT" ? (
                  <>
                    {user?.isLogin ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        // component={Link}
                        // to='/creator-kyc'
                        onClick={() => {
                          history.push({
                            pathname: "/creator-kyc",
                            search: user?.kycStatusRes?._id,
                            state: {
                              data: user?.kycStatusRes,
                            },
                          });
                        }}
                      >
                        Start Your Application
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => setIsOpenWallet(true)}
                      >
                        Connect Wallet
                      </Button>
                    )}
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BecomeCreator;
