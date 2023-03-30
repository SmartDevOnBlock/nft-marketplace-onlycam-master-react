import { Box, Typography, Grid, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaThumbsUp } from "react-icons/fa";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { sortAddress } from "src/utils";
import { toast } from "react-toastify";
import DataNotFound from "src/component/DataNotFound";
import { useHistory } from "react-router-dom";

const settings = {
  dots: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  centerMode: false,
  centerPadding: "60px",
  className: "recomended",
  autoplaySpeed: 3000,
  infinite: false,
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        centerMode: false,

        centerPadding: "50px",
        autoplay: true,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        centerMode: false,

        centerPadding: "40px",
        autoplay: true,
      },
    },
  ],
};

export default function MoreFromCollection({
  classes,
  collectionId,
  orderId,
  user,
}) {
  const [orderList, setOrderList] = useState([]);
  const history = useHistory();
  const collectionOrderListHandler = async (id, cancelTokenSource) => {
    try {
      axios({
        method: "GET",
        url: apiConfig.collectionOrderList,
        data: {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
        },
        params: {
          _id: id,
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          const filterData = res.data.result.filter(
            (data) => data._id != orderId
          );
          setOrderList(filterData);
        } else {
          setOrderList([]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const likeDislikeNftHandler = async (id) => {
    if (user.isLogin && id) {
      try {
        const res = await axios.get(apiConfig.likeDislikeOrder + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          collectionOrderListHandler(collectionId);
        } else {
          toast.warn(res.data.responseMessage);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warn("Please login");
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (collectionId && orderId) {
      collectionOrderListHandler(collectionId, cancelTokenSource);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [collectionId, orderId]);

  return (
    <Box className={classes.headbox} mt={3}>
      <Box className={classes.more} mb={4}>
        <Typography variant="h4">More from this collection</Typography>
      </Box>
      <Grid container spacing={2}>
        {orderList && orderList.length === 0 && (
          <Box pl={1}>
            <Typography
              variant="h5"
              style={{ color: "#fff", fontSize: "16px" }}
            >
              NO OTHER ITEMS FOUND
            </Typography>
          </Box>
        )}
        <Slider {...settings} className="width100">
          {orderList.map((data, index) => {
            let isLike = false;
            if (user.userData && data?.likesUsers) {
              const likesUsers = data?.likesUsers?.filter(
                (order) => order === user.userData._id
              );
              isLike = likesUsers?.length > 0;
            }
            return (
              <Grid lg={12} md={12} sm={12} xs={12} key={index}>
                <Box px={1}>
                  <Box className={classes.boxsection}>
                    <Box
                      className={classes.nftImg}
                      onClick={() => {
                        history.push({
                          pathname: "/nft",
                          search: data._id,
                        });
                      }}
                    >
                      <img src={data.nftId?.coverImage} alt="" />
                    </Box>
                    <Box className={classes.box3}>
                      <figure
                        onClick={() => {
                          history.push({
                            pathname: "/author",
                            search: data?.userId?._id,
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={
                            data?.userId?.profilePic
                              ? data?.userId?.profilePic
                              : "/images/onlycamimg.png"
                          }
                          alt="nftimg"
                        />
                      </figure>
                      <Typography
                        variant="h6"
                        title={
                          data?.userId?.userName
                            ? data?.userId?.userName
                            : data?.userId?.walletAddress
                        }
                      >
                        {data?.userId?.userName
                          ? data?.userId?.userName.slice(0, 5) + ".."
                          : sortAddress(data?.userId?.walletAddress)}
                      </Typography>
                    </Box>
                    <Box className={classes.price3}>
                      <Typography variant="h5">{data.price}</Typography>
                      <Typography className={classes.likecount}>
                        {data?.likesUsers?.length}&nbsp;&nbsp;
                        <IconButton>
                          <FaThumbsUp
                            onClick={() => likeDislikeNftHandler(data._id)}
                            style={
                              isLike
                                ? { cursor: "pointer", color: "#D200A5" }
                                : { cursor: "pointer", color: "#E4C3DE" }
                            }
                          />
                        </IconButton>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Slider>
      </Grid>
    </Box>
  );
}
