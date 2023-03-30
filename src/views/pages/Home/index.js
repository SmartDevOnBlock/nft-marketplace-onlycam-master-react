import React, { useState, useEffect, useContext } from "react";
import { Box, Container } from "@material-ui/core";
import Page from "src/component/Page";
import Banner from "./Banner";
import TopCreator from "./TopCreator";
import TopBuyers from "./TopBuyers";
import LiveAuction from "./LiveAuction";
import Explore from "./Explore";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";
function Home(props) {
  const user = useContext(UserContext);
  const history = useHistory();
  // useEffect(() => {
  //   if (user?.walletData?.status === "BLOCK") {
  //     history.push("/request-message");
  //   }
  // }, [user?.walletData?.status]);

  return (
    <Page title="OnlyCam Marketplace">
      <Box>
        <Banner />
        <Container>
          <LiveAuction />
        </Container>
        <Container>
          <Explore />
        </Container>
        <TopCreator />

        {/* <TopBuyers /> */}
      </Box>
    </Page>
  );
}

export default Home;
