import { UserContext } from "src/context/User";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "10rem",
    paddingBottom: "3rem",
  },
}));
export default function RequestMessage() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [formData, setFormData] = useState({
    message: "",
  });

  const requestUnblockRequest = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.requestForUnblock,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          _id: user?.walletData?.userId,
          message: formData,
        },
      });
      if (res.data.statusCode === 200) {
        setIsLoading(false);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Box className={classes.mainBox}>
      <Container maxWidth="sm">
        <Grid>
          <Grid lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h3" style={{ paddingBottom: "1rem" }}>
              Send Request Message For Unblock
            </Typography>
            <TextField
              variant="outlined"
              name="message"
              fullWidth
              type="text"
              placeholder="Type your message here"
              className={classes.textfield}
              onChange={(e) => setFormData(e.target.value)}
            />
            <Box className={classes.information} mt={2}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                onClick={requestUnblockRequest}
              >
                Send a Request
                {isLoading && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
