import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import Page from "src/component/Page";
import { mergeClasses } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import ArtWork from "../FeatureAuction/ArtWork";
import Creators from "../FeatureAuction/Creators";
import NFTCard from "src/component/NFTCard";
import CreatorCard from "src/component/CreatorCard";
import Items from "./Items";
import Users from "./Users";
import CollectionCard from "../Create-NFT/CollectionCard";
import Collection from "./Collection";
const useStyles = makeStyles((theme) => ({
  Padding_Top: {
    paddingTop: "120px",
  },
  PageHeading: {
    fontWeight: "600",
    fontSize: "26px",
    lineHeight: "39px",
    color: "#898989",
    paddingBottom: "50px",
    "& span": {
      color: "#000",
    },
  },
}));
function Search(props) {
  const classes = useStyles();
  const [tabview, setTabView] = useState("item");
  const location = useLocation();
  const user = useContext(UserContext);
  const [searchText, setSearchText] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const [searchOrderList, setSearchOrderList] = useState([]);
  const [searchCollectionList, setSearchCollectionList] = useState([]);
  const [searchResult, setSearchResult] = useState();

  const searchHandler = async (cancelTokenSource) => {
    try {
      const res = await axios.get(apiConfig.dashboardSearch, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          search: searchText,
        },
      });
      if (res.data.statusCode == 200) {
        setSearchResult(res.data.result);
      } else {
        setSearchResult();
      }
    } catch (error) {
      console.log("ERROR", error);
      setSearchResult();
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (searchText) {
      searchHandler(cancelTokenSource);
    } else {
      setSearchResult();
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [searchText]);
  useEffect(() => {
    if (location.search && location.search.slice(1, location.search.length)) {
      let text = location.search.slice(1, location.search.length);
      setSearchText(text);
    } else {
      setSearchText("");
    }
  }, [location]);

  return (
    <Page title="Marketplace for NFTs">
      <Box className={classes.Padding_Top}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.PageHeading}>
            Search results for{" "}
            <span
              style={{
                wordBreak: "break-all",
              }}
            >
              {searchText}
            </span>
          </Typography>
          <Box className="TabButtonsBox">
            <Button
              className={tabview === "item" ? "active" : " "}
              onClick={() => setTabView("item")}
            >
              Items<span>{searchResult?.orderResult?.length}</span>
            </Button>
            <Button
              className={tabview === "users" ? "active" : " "}
              onClick={() => setTabView("users")}
            >
              Users<span>{searchResult?.userResult?.length}</span>
            </Button>
            <Button
              className={tabview === "collection" ? "active" : " "}
              onClick={() => setTabView("collection")}
            >
              Collection<span>{searchResult?.collectionResult?.length}</span>
            </Button>
          </Box>
          <Box className="TabButtonsContant">
            {tabview === "item" ? (
              <Items orderList={searchResult?.orderResult} />
            ) : (
              ""
            )}
            {tabview === "users" ? (
              <Users searchUserList={searchResult?.userResult} />
            ) : (
              ""
            )}
            {tabview === "collection" ? (
              <Collection collectionList={searchResult?.collectionResult} />
            ) : (
              ""
            )}
          </Box>
        </Container>
      </Box>
    </Page>
  );
}

export default Search;
