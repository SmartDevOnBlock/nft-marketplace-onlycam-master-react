import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, Box, Typography } from "@material-ui/core";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { sortAddress } from "src/utils";
import { useHistory, useLocation } from "react-router-dom";

export default function SearchBox({
  search,
  searchIcon,
  inputRoot,
  inputInput,
}) {
  const [searchText, setSearchText] = useState("");
  const location = useLocation();

  const [searchResult, setSearchResult] = useState();
  const [serchdata, setSerchdata] = useState("");
  const history = useHistory();
  const [searchData, setSearchData] = useState("");
  const searchTextRef = React.useRef(null);

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
      // searchHandler(cancelTokenSource);
    } else {
      setSearchResult();
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [searchText]);

  useEffect(() => {
    searchTextRef.current.focus();
    if (
      location.pathname === "/item" &&
      location.search &&
      location.search.slice(1, location.search.length)
    ) {
      let text = location.search.slice(1, location.search.length);
      setSearchText(text);
    }
  }, [location]);
  return (
    <div className={"searchField customSearch"}>
      <div className={search}>
        <div className={searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          ref={searchTextRef}
          value={searchText}
          autoFocus={true}
          onChange={(e) => {
            setSearchText(e.target.value);
            history.push({
              pathname: "/item",
              search: e.target.value,
            });
          }}
          placeholder='Search collection, user, nft'
          classes={{
            root: inputRoot,
            input: inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {/* {searchResult && (
        <SearchResults searchResult={searchResult} history={history} />
      )} */}
    </div>
  );
}

export function SearchResults({ searchResult, history }) {
  return (
    <ul className='list-group text-dark' id='search-list'>
      {/* {searchResult?.collectionResult?.length > 0 && (
        <>
          <li
            className='list-group-item'
            style={{ textAlign: "left", zIndex: 999 }}
          >
            <Box display={"flex"} justifyContent='space-between'>
              <Box display={"flex"}>
                <Typography variant='h6'>Collections</Typography>
              </Box>
            </Box>
          </li>
          {searchResult?.collectionResult?.map((data, i) => {
            return (
              <li
                key={i}
                className='list-group-item'
                style={{ textAlign: "left", zIndex: 999 }}
              >
                <Box display={"flex"} justifyContent='space-between'>
                  <Box display={"flex"}>
                    <img src={data.collectionImage} alt='' />
                    <Typography> {data.displayName}</Typography>
                  </Box>
                </Box>
              </li>
            );
          })}
        </>
      )} */}

      {searchResult?.userResult.length > 0 && (
        <>
          <li
            className='list-group-item'
            style={{ textAlign: "left", zIndex: 999 }}
          >
            <Box display={"flex"} justifyContent='space-between'>
              <Box display={"flex"}>
                <Typography variant='h6'>User's</Typography>
              </Box>
            </Box>
          </li>
          {searchResult?.userResult.map((data, i) => {
            return (
              <li
                key={i}
                className='list-group-item'
                style={{ textAlign: "left", zIndex: 999 }}
                onClick={() => {
                  history.push({
                    pathname: "/author",
                    search: data._id,
                  });
                }}
              >
                <Box display={"flex"} justifyContent='space-between'>
                  <Box display={"flex"}>
                    <img
                      src={
                        data.profilePic
                          ? data.profilePic
                          : "/images/onlycamimg.png"
                      }
                      alt=''
                    />
                    <Typography>
                      {" "}
                      {data?.userName
                        ? data?.userName
                        : data?.name
                        ? data?.name
                        : sortAddress(data?.walletAddress)}
                    </Typography>
                  </Box>
                </Box>
              </li>
            );
          })}
        </>
      )}
      {searchResult?.orderResult?.length > 0 && (
        <>
          <li
            className='list-group-item'
            style={{ textAlign: "left", zIndex: 999 }}
          >
            <Box display={"flex"} justifyContent='space-between'>
              <Box display={"flex"}>
                <Typography variant='h6'>NFT's</Typography>
              </Box>
            </Box>
          </li>
          {searchResult?.orderResult.map((data, i) => {
            return (
              <li
                key={i}
                className='list-group-item'
                style={{ textAlign: "left", zIndex: 999 }}
                onClick={() => {
                  history.push({
                    pathname: "/nft",
                    search: data._id,
                  });
                }}
              >
                <Box display={"flex"} justifyContent='space-between'>
                  <Box display={"flex"}>
                    <img src={data.nftId.coverImage} alt='' />
                    <Typography> {data.nftId.tokenName}</Typography>
                  </Box>
                </Box>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
}
