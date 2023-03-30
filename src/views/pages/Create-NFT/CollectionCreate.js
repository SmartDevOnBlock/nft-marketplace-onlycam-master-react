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
import { getNetworkDetails, networkList } from "src/constants";
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

export default function CollectionCreate({
  getCollectionList,
  handleClose,
  selectedNetwork,
  isCreateOrder,
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
    const isValidShortURL =
      formValue.shortUrl !== "" ? isUrlValid(formValue.shortUrl) : true;
    if (
      bannerImageBlob !== "" &&
      network !== "select" &&
      formValue.name !== "" &&
      formValue.collectionIMG !== "" &&
      formValue.symbol !== "" &&
      isValidShortURL
    ) {
      setIsLoading(true);

      if (formValue.collectionIMG !== "") {
        await addImageHandler(formValue.collectionIMG)
          .then(async (res) => {
            let receipt = "";
            await uploadContractHandler(
              formValue.name,
              formValue.symbol,
              res,
              formValue.collectionIMG,
              account,
              (result) => {
                receipt = result;
              }
            );
            if (receipt != false) {
              const resResult = await createCollectionAPIHanlder(
                formValue.name,
                formValue.symbol ? formValue.symbol : "NA",
                res,
                formValue.collectionIMG,
                receipt,
                formValue.shortUrl ? formValue.shortUrl : "NA",
                formValue.description ? formValue.description : "NA",
                network.chainId,
                bannerImage,
                isCreateOrder,
                "createCollection"
              );
              // setSuccessMSG(resResult.data.responseMessage);
              setIsLoading(false);

              if (resResult && resResult.data.statusCode === 200) {
                toast.success(resResult.data.responseMessage);
                // await getCollectionListHanlder();
                // setSuccessMSG('');
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
            } else {
              setIsLoading(false);
              // setSuccessMSG('Please try again');
              toast.error("Something went to wrong");
            }
          })
          .catch((err) => {
            toast.error("Something went to wrong");
            setIsLoading(false);
            console.log("err", err);
          });
      }
    }
  };

  const swichNetworkHandler = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            { chainId: "0x" + parseFloat(network.chainId).toString(16) },
          ],
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
    const NetworkDetails = getNetworkDetails(network.chainId);
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
    if (network !== "select") {
      if (chainId !== network.chainId) {
        swichNetworkHandler();
      }
    }
  }, [network]);

  useEffect(() => {
    if (selectedNetwork !== "select") {
      setNetwork(selectedNetwork);
    }
  }, [selectedNetwork]);

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
            <FormControl fullWidth className={`${classes.margin} createSelect`}>
              <label>Select Blockchain (required)</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                // value={network.name}
                onChange={(e) => setNetwork(e.target.value)}
              >
                <MenuItem
                  value={{
                    name: "select",
                  }}
                >
                  Select
                </MenuItem>
                {networkList.map((data, i) => {
                  return (
                    <MenuItem key={data.name} value={data}>
                      {data.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {isSubmit && network === "select" && (
                <FormHelperText error>Please select network</FormHelperText>
              )}
            </FormControl>
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
                Symbol (required){" "}
                <Button>
                  <Tooltip
                    title={
                      <>
                        <Typography
                          color="inherit"
                          style={{ paddingTop: ".5rem" }}
                        >
                          Short name
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
                </Button>{" "}
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
              <label>Description (optional)</label>
              <TextField
                placeholder="Enter description"
                name="description"
                value={formValue.description}
                onChange={(e) => _onInputChange(e)}
                multiline
                maxRows={3}
                // error={isSubmit && formValue.description === ''}
                // helperText={
                //   isSubmit &&
                //   formValue.description === '' &&
                //   'Please enter description'
                // }
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
              <label>Short url (optional)</label>

              <TextField
                name="shortUrl"
                value={formValue.shortUrl}
                onChange={(e) => _onInputChange(e)}
                error={
                  isSubmit &&
                  formValue.shortUrl !== "" &&
                  !isUrlValid(formValue.shortUrl)
                }
                helperText={
                  isSubmit &&
                  formValue.shortUrl !== "" &&
                  !isUrlValid(formValue.shortUrl)
                    ? "Please Enter valid URL"
                    : ""
                }
                placeholder="Enter short url"
                startAdornment={
                  <InputAdornment position="start">
                    Metaarts.com/
                  </InputAdornment>
                }
              />

              <small>Will be used as public URL</small>
            </FormControl>
          </Box>
          <Box mt={3} mb={4} textAlign="Center">
            <Button
              disabled={isLoading || network.chainId != chainId}
              onClick={handleSubmit}
              variant="contained"
              size="large"
              color="secondary"
            >
              Create Collection {isLoading && <ButtonCircularProgress />}
            </Button>
            <Box mt={2}>
              {network !== "select" && network.chainId != chainId && (
                <FormHelperText error>
                  Please switch network to {network.name}
                </FormHelperText>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
