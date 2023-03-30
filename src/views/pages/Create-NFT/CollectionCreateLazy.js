import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  Typography,
  makeStyles,
  InputAdornment,
  TextField,
  MenuItem,
  Select,
  FormHelperText,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import {
  addImageHandler,
  createCollectionAPIHanlder,
  isUrlValid,
  getBase64,
  uploadContractHandler,
} from "src/services";
import { useWeb3React } from "@web3-react/core";
import {
  getNetworkDetails,
  networkList,
  getMarketplaceContractAddress,
} from "src/constants";
import { UserContext } from "src/context/User";
import { Help } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  NftBreed: {
    width: 700,
    maxWidth: "100%",
    padding: "15px",
    "& h5": {
      color: theme.palette.secondary.main,
    },
  },
  createCollection: {
    "& figure": {
      height: 100,
      width: 100,
      minWidth: 100,
      marginRight: 15,
      borderRadius: "50%",
      background: "#C4C4C4",
    },
    "& button": {
      marginTop: 15,
    },
  },
  textfiledlabel: {
    "& label": {
      color: theme.palette.secondary.main,
      marginTop: "5px",
    },
  },
}));

export default function CollectionCreateLazy({
  handleClose,
  selectedNetwork,
  isCreateOrder,
  chianId,
  setNewCollectionId,
}) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account, chainId } = useWeb3React();
  const [isSubmit, setIsSubmit] = useState(false);
  const [imgBlob, setImgBlob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [network, setNetwork] = useState({
    name: "select",
  });
  const [bannerImage, setBannerImage] = useState("");
  const [bannerImageBlob, setBannerImageBlob] = useState("");

  const [formValue, setFormValue] = useState({
    name: "",
    symbol: "",
    description: "",
    shortUrl: "",
    collectionIMG: "",
  });

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const _onInputFileChange = (e) => {
    const valueBlob = URL.createObjectURL(e.target.files[0]);
    setImgBlob(valueBlob);

    const name = e.target.name;
    const value = e.target.files[0];
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const handleSubmit = async () => {
    setIsSubmit(true);

    if (
      chianId &&
      bannerImageBlob !== "" &&
      formValue.name !== "" &&
      formValue.collectionIMG !== "" &&
      formValue.symbol !== ""
    ) {
      setIsLoading(true);

      let receipt = getMarketplaceContractAddress(chianId);

      const resResult = await createCollectionAPIHanlder(
        formValue.name,
        formValue.symbol ? formValue.symbol : "NA",
        formValue.shortUrl,
        formValue.collectionIMG,
        receipt,
        formValue.shortUrl ? formValue.shortUrl : "NA",
        formValue.description ? formValue.description : "NA",
        chianId,
        bannerImage,
        isCreateOrder,
        "createCollection"
      );

      if (resResult && resResult.data.statusCode === 200) {
        toast.success(resResult.data.responseMessage);
        setNewCollectionId(resResult.data?.result?._id);
        setImgBlob("");
        setIsSubmit(false);
        setFormValue({
          name: "",
          symbol: "",
          description: "",
          shortUrl: "",
          collectionIMG: "",
        });
        user.getCollectionList();
        handleClose();
      } else {
        if (resResult) {
          toast.error(resResult.data.responseMessage);
        } else {
          toast.error("Something went to wrong");
        }
      }
      setIsLoading(false);
    }
  };

  const swichNetworkHandler = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x" + parseFloat(chianId).toString(16) }],
        });
      } catch (error) {
        console.log("ERROR", error);
        // toast.warn(error.message);
        if (error.code === 4902) {
          addNetworkHandler();
        }
      }
    }
  };

  const addNetworkHandler = async () => {
    const NetworkDetails = getNetworkDetails(chianId);
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: NetworkDetails,
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
    }
  };

  useEffect(() => {
    if (chianId) {
      if (chainId !== chianId) {
        swichNetworkHandler();
      }
    }
  }, [chianId]);

  return (
    <>
      <Box className={classes.NftBreed}>
        <Box className="modal_text">
          <Typography variant="h5" align="center">
            Collection
          </Typography>
          <Box
            mt={4}
            className={classes.createCollection}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {imgBlob !== "" ? (
              <img
                src={imgBlob}
                alt=""
                width="120"
                height="120"
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <figure></figure>
            )}

            <Box>
              <Typography variant="h6">Select Image</Typography>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file-coll"
                type="file"
                name="collectionIMG"
                onChange={(e) => {
                  _onInputFileChange(e);
                }}
              />
              <Typography style={{ fontSize: "12px" }}>
                <i>
                  <b>(500 x 500 recommended)</b>
                </i>
              </Typography>
              <label htmlFor="raised-button-file-coll">
                <Button
                  // htmlFor="raised-button-file-coll"
                  variant="contained"
                  color="secondary"
                  component="span"
                >
                  choose file
                </Button>
              </label>
              {isSubmit && formValue.collectionIMG === "" && (
                <Typography style={{ color: "#ff7d68" }} variant="body2">
                  Please select image
                </Typography>
              )}
            </Box>
          </Box>

          <Box
            mt={4}
            className={classes.createCollection}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {bannerImageBlob !== "" ? (
              <img
                src={bannerImageBlob}
                alt=""
                width="120"
                height="120"
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <figure></figure>
            )}

            <Box>
              <Typography variant="h6">Banner Image</Typography>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file-banner"
                type="file"
                name="collectionIMG"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    getBase64(e.target.files[0], (result) => {
                      setBannerImage(result);
                    });

                    const valueBlob = URL.createObjectURL(e.target.files[0]);
                    setBannerImageBlob(valueBlob);
                  }
                }}
              />
              <Typography style={{ fontSize: "12px" }}>
                <i>
                  <b>(500 x 500 recommended)</b>
                </i>
              </Typography>
              <label htmlFor="raised-button-file-banner">
                <Button
                  // htmlFor="raised-button-file-coll"
                  variant="contained"
                  color="secondary"
                  component="span"
                >
                  choose file
                </Button>
              </label>
              {isSubmit && bannerImageBlob === "" && (
                <Typography style={{ color: "#ff7d68" }} variant="body2">
                  Please select image
                </Typography>
              )}
            </Box>
          </Box>

          <Box mt={2} className={classes.textfiledlabel}>
            <label>Display name (required)</label>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                id
                placeholder="Enter token name"
                name="name"
                value={formValue.name}
                onChange={(e) => _onInputChange(e)}
                error={isSubmit && formValue.name === ""}
                helperText={
                  isSubmit && formValue.name === "" && "Please enter name"
                }
              />
              <small>Token name cannot be changed in future</small>
            </FormControl>

            <FormControl fullWidth className={classes.margin}>
              <label>
                Symbol (Required)
                <Button>
                  <Tooltip
                    title={
                      <>
                        <Typography
                          color="inherit"
                          style={{ paddingTop: ".5rem" }}
                        >
                          SHORT NAME FOR COLLECTION (max. 10 characters)
                        </Typography>
                        <br />
                      </>
                    }
                    style={{
                      color: "#3B0D60",
                      // filter: "drop-shadow(rgb(36, 175, 172) 0px 0px 3px)",
                      fontSize: "1.6rem",
                      cursor: "pointer",
                    }}
                  >
                    <Box className={classes.iconimg}>
                      <IconButton>
                        <Help
                          style={{
                            backgroundColor: "#3B0D60",
                            color: "white",
                            borderRadius: "100%",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Tooltip>
                </Button>
              </label>

              <TextField
                placeholder="Enter token symbol"
                name="symbol"
                value={formValue.symbol}
                onChange={(e) => _onInputChange(e)}
                error={isSubmit && formValue.symbol === ""}
                helperText={
                  isSubmit && formValue.symbol === "" && "Please enter symbol"
                }
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
              <label>Base URI (Optional) </label>

              <TextField
                name="shortUrl"
                value={formValue.shortUrl}
                onChange={(e) => _onInputChange(e)}
                placeholder="Enter short url"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
              <label>Description (optional)</label>
              <TextField
                placeholder="Enter description"
                name="description"
                value={formValue.description}
                onChange={(e) => _onInputChange(e)}
                multiline
                maxRows={3}
              />
            </FormControl>
          </Box>
          <Box mt={3} mb={4} textAlign="Center">
            <Button
              disabled={isLoading || chianId != chainId}
              onClick={handleSubmit}
              variant="contained"
              size="large"
              color="secondary"
            >
              Create Collection {isLoading && <ButtonCircularProgress />}
            </Button>
            <Box mt={2}>
              {chianId && chianId != chainId && (
                <FormHelperText error>
                  Please switch network to {chianId}
                </FormHelperText>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
