import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Link,
  Button,
  FormControl,
  Input,
  makeStyles,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import { BiLockOpen } from "react-icons/bi";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ApiConfig from "src/connectors/config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import apiConfig from "src/connectors/config/ApiConfig";

const useStyles = makeStyles((theme) => ({
  Box: {
    background: theme.palette.primary.main,
    border: "1px solid #898989",
    height: "200px",
    width: "200px",
    borderRadius: "25px",
  },

  FAQ: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  PageHeading: {
    paddingBottom: "20px",
  },
  editsection: {
    "& h2": {
      color: "#fff",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
    },
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#fff",
    },
  },
  inputfield: {
    "& label": {
      color: "#fff",
      marginTop: "22px",
      fontSize: "14px",
    },
  },
  imagefiled: {
    "& label": {
      color: theme.palette.secondary.main,
    },
    "& small": {},
  },
  inputsection: {
    color: "#52565c",
    cursor: "text",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontWeight: "400",
    lineHeight: "1.1876em",
    "& input": {
      color: "#ebebeb",
      width: "100%",
      border: "0",
      height: "1.1876em",
      margin: "0",
      display: "block",
      padding: "6px 0 7px",
      fontSize: "14px",
      minWidth: "0",
      background: "none",
      boxSizing: "content-box",
      animationName: "mui-auto-fill-cancel",
      letterSpacing: "inherit",
      animationDuration: "10ms",
      WebkitTapHighlightColor: "transparent",
    },
  },
  message: { color: theme.palette.primary.main },
  colorbox: {
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "50px",
    height: "auto",
    width: "100%",
    padding: "20px",
  },
  coverImg: {
    overflow: "hidden",
    // background: 'rgba(0,0,0,0.7)',
    position: "relative",
    backgroundPosition: "center !important",
    backgroundRepeat: " no-repeat !important",
    backgroundSize: "100% !important",
    height: "86px",
    borderRadius: "10px",
    width: "300px",

    "& img": {
      // minHeight: '100%',
      // minWidth: '100%',
      height: "auto",
      width: "100%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  box1: {
    background: theme.palette.primary.main,
    border: "1px solid #898989",
    height: "86px",
    borderRadius: "25px",
    width: "300px",
    overflow: "hidden",
  },
}));
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};

export default function Editprofile() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [coverImage, setCoverImage] = useState("");
  const [coverImage64, setCoverImage64] = useState(
    user?.userData?.coverPic ? user?.userData?.coverPic : ""
  );
  const [errMessage, setImgError] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileImage64, setProfileImage64] = useState(
    user?.userData?.profilePic ? user?.userData?.profilePic : ""
  );

  const history = useHistory();

  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);

  // const formValidationSchema = yep.object().shape({
  //   name: yep
  //     .string('Enter valid name')
  //     .required('Name is a required  ')
  //     .strict(true)
  //     .nullable()
  //     .trim()
  //     .min(4, 'Your name should be atleast 4 characters long')
  //     .max(30, 'Your name should not be more than 30 characters'),
  //   userName: yep
  //     .string('Enter valid user name')
  //     .required('User name is a required  ')
  //     .strict(true)
  //     .nullable()
  //     .trim()
  //     .min(4, 'Your username should be atleast 4 characters long')
  //     .max(30, 'Your username should not be more than 30 characters'),
  //   bio: yep
  //     .string('Enter valid bio')
  //     .required('Bio is a required  ')
  //     .strict(true)
  //     .nullable()
  //     .trim()
  //     .min(10, 'Your bio should be atleast 10 characters long')
  //     .max(300, 'Your bio should not be more than 300 characters'),
  //   youtube: yep
  //     .string('Enter valid youtube url')
  //     .matches(
  //       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //       'Enter correct url!',
  //     )
  //     .trim(),
  //   facebook: yep
  //     .string('Enter valid facebook url')
  //     .matches(
  //       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //       'Enter correct url!',
  //     )
  //     .trim(),
  //   telegram: yep
  //     .string('Enter valid telegram url')
  //     .matches(
  //       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //       'Enter correct url!',
  //     )
  //     .trim(),
  //   instagram: yep
  //     .string('Enter valid instagram url')
  //     .matches(
  //       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //       'Enter correct url!',
  //     )
  //     .trim(),
  //   twitter: yep
  //     .string('Enter valid twitter url')
  //     .matches(
  //       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //       'Enter correct url!',
  //     )
  //     .trim(),
  // })

  const onBannerImageChange = (e) => {
    const value = URL.createObjectURL(e.target.files[0]);
    var reader = new FileReader();
    //Read the contents of Image File.
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      //Initiate the JavaScript Image object.
      var image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;

      //Validate the File Height and Width.
      image.onload = function () {
        var height = this.height;
        var width = this.width;

        if (height !== 400 && width !== 1400) {
          setImgError(true);
          toast.error("Height and Width must be 400*1400");
        } else {
          setImgError(false);
        }
      };
    };

    setCoverImage(value);

    getBase64(e.target.files[0], (result) => {
      setCoverImage64(result);
    });
  };

  const updateProfileHandler = async () => {
    setLoader2(true);
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.updateProfile,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          coverPic: coverImage64,
          profilePic: profileImage64,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        history.push("/profile");
        setLoader2(false);

        user.getProfileHandler(window.sessionStorage.getItem("token"));
      } else {
        toast.success(res.data.response_message);
      }
      setLoader2(false);
    } catch (error) {
      console.log(error);
      setLoader2(false);
    }
  };

  return (
    <>
      <Box className={classes.FAQ}>
        {user?.userData && (
          <Box mb={2}>
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  className={classes.editsection}
                >
                  <Formik
                    initialValues={{
                      name: user?.userData?.name ? user?.userData?.name : "",
                      userName: user?.userData?.userName
                        ? user?.userData?.userName
                        : "",
                      coverPic: user?.userData?.coverPic
                        ? user?.userData?.coverPic
                        : "",
                      profilePic: user?.userData?.profilePic
                        ? user?.userData?.profilePic
                        : "",
                      bio: user?.userData?.bio ? user?.userData?.bio : "",
                      youtube: user?.userData?.youtube
                        ? user?.userData?.youtube
                        : "",
                      facebook: user?.userData?.facebook
                        ? user?.userData?.facebook
                        : "",
                      telegram: user?.userData?.telegram
                        ? user?.userData?.telegram
                        : "",
                      instagram: user?.userData?.instagram
                        ? user?.userData?.instagram
                        : "",
                      twitter: user?.userData?.twitter
                        ? user?.userData?.twitter
                        : "",
                    }}
                    initialStatus={{
                      success: false,
                      successMsg: "",
                    }}
                    // validationSchema={formValidationSchema}
                    onSubmit={async ({
                      userName,
                      name,
                      bio,
                      twitter,
                      facebook,
                      youtube,
                      telegram,
                      instagram,
                    }) => {
                      try {
                        setLoader1(true);
                        const response = await axios({
                          method: "PUT",
                          url: ApiConfig.updateProfile,
                          headers: {
                            token: window.sessionStorage.getItem("token"),
                          },
                          data: {
                            name: name,
                            userName: userName,
                            bio: bio,
                            coverPic: coverImage64,
                            profilePic: profileImage64,
                            twitter: twitter,
                            facebook: facebook,
                            youtube: youtube,
                            telegram: telegram,
                            instagram: instagram,
                          },
                        });

                        if (response.data.statusCode === 200) {
                          toast.success(response.data.responseMessage);
                          history.push("/profile");
                          user.getProfileHandler(
                            window.sessionStorage.getItem("token")
                          );
                        } else {
                          toast.success(response.data.response_message);
                        }
                        setLoader1(false);
                      } catch (err) {
                        toast.error(err.response.data.responseMessage);
                        console.error(err.response);
                        setLoader1(false);
                      }
                    }}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      touched,
                      values,
                      setFieldValue,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Box className={classes.colorbox}>
                          <Typography
                            variant="h2"
                            className={classes.PageHeading}
                          >
                            Edit Profile
                          </Typography>
                          <Typography variant="h3">
                            You can set preferred display name, create your
                            branded profile URL and manage other personal
                            settings
                          </Typography>
                          <Box mt={2} className={classes.inputfield}>
                            <label>Display name</label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <TextField
                                name="name"
                                value={values.name}
                                placeholder="Enter your display name"
                                error={Boolean(touched.name && errors.name)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.name && errors.name}
                              </FormHelperText>
                            </FormControl>

                            <label>Username</label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                placeholder="Enter your username"
                                name="userName"
                                value={values.userName}
                                error={Boolean(
                                  touched.userName && errors.userName
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.userName && errors.userName}
                              </FormHelperText>
                            </FormControl>

                            <label>Bio</label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                placeholder="Tell about yourself in a few words"
                                name="bio"
                                value={values.bio}
                                error={Boolean(touched.bio && errors.bio)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                  maxLength: 255,
                                }}
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.bio && errors.bio}
                              </FormHelperText>
                            </FormControl>
                            <label>
                              Twitter URL
                              <small style={{ whiteSpace: "break-spaces" }}>
                                Link your Twitter account to gain more trust on
                                the marketplace
                              </small>
                            </label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                id="standard-adornment-amount"
                                placeholder="@Username"
                                name="twitter"
                                value={values.twitter}
                                error={Boolean(
                                  touched.twitter && errors.twitter
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                  <InputAdornment position="end">
                                    Link
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.twitter && errors.twitter}
                              </FormHelperText>
                            </FormControl>
                            <label> Facebook URL</label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                placeholder="@Username"
                                name="facebook"
                                value={values.facebook}
                                error={Boolean(
                                  touched.facebook && errors.facebook
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.facebook && errors.facebook}
                              </FormHelperText>
                            </FormControl>
                            <label>Youtube URL</label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                id="standard-adornment-amount"
                                placeholder="Youtube channel link"
                                name="youtube"
                                value={values.youtube}
                                error={Boolean(
                                  touched.youtube && errors.youtube
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <BiLockOpen />
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.youtube && errors.youtube}
                              </FormHelperText>
                            </FormControl>

                            <label>
                              Telegram URL
                              <small style={{ whiteSpace: "break-spaces" }}>
                                Link your Telegram account to gain more trust on
                                the marketplace
                              </small>
                            </label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                id="standard-adornment-amount"
                                placeholder="username"
                                name="telegram"
                                value={values.telegram}
                                error={Boolean(
                                  touched.telegram && errors.telegram
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                  <InputAdornment position="end">
                                    Link
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.telegram && errors.telegram}
                              </FormHelperText>
                            </FormControl>
                            <label>
                              Instagram URL
                              <small style={{ whiteSpace: "break-spaces" }}>
                                Link your Instagram account to gain more trust
                                on the marketplace
                              </small>
                            </label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                id="standard-adornment-amount"
                                placeholder="@Username"
                                name="instagram"
                                value={values.instagram}
                                error={Boolean(
                                  touched.instagram && errors.instagram
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                  <InputAdornment position="end">
                                    Link
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.instagram && errors.instagram}
                              </FormHelperText>
                            </FormControl>

                            <Box align="left" mt={2}>
                              <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                type="submit"
                                disabled={loader1}
                              >
                                UPDATE PROFILE
                                {loader1 && <ButtonCircularProgress />}
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Grid>
                <Grid item xs={12} sm={12} md={1}></Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={5}
                  className={classes.imagefiled}
                >
                  <Box className={classes.colorbox}>
                    <label>Add profile Image</label>
                    <Box className={classes.Box}>
                      {profileImage64 && (
                        <img
                          className={classes.Box}
                          src={profileImage64}
                          alt=""
                        />
                      )}
                    </Box>
                    <small style={{ whiteSpace: "break-spaces" }}>
                      We recommend a square image of at least 500x500 - Gifs
                      work too.
                    </small>
                    <Box align="left" mt={1} mb={4}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file-profile"
                        multiple
                        name="profilePic"
                        // value={profileImage64}
                        type="file"
                        onChange={(e) => {
                          setProfileImage(
                            URL.createObjectURL(e.target.files[0])
                          );
                          getBase64(e.target.files[0], (result) => {
                            setProfileImage64(result);
                          });
                        }}
                      />
                      <label htmlFor="raised-button-file-profile">
                        <Button
                          variant="contained"
                          color="secondary"
                          component="span"
                        >
                          CHOOSE FILE
                        </Button>
                      </label>
                    </Box>
                  </Box>
                  <Box className={classes.colorbox} mt={2}>
                    <label>Add Cover Image</label>
                    <Box className={classes.box1}>
                      {coverImage64 && (
                        <figure className={classes.coverImg}>
                          <img
                            className={classes.Box}
                            src={coverImage64}
                            alt=""
                          />
                        </figure>
                      )}
                    </Box>

                    <small style={{ whiteSpace: "break-spaces" }}>
                      We recommend an image of at least 1400x400. Gifs work too.
                    </small>
                    <Box align="left" mt={1} mb={4}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file-cover"
                        multiple
                        name="coverPic"
                        // value={values.profilePic}
                        type="file"
                        onChange={(e) => {
                          setCoverImage(URL.createObjectURL(e.target.files[0]));
                          getBase64(e.target.files[0], (result) => {
                            setCoverImage64(result);
                          });
                        }}
                        // onChange={onBannerImageChange}
                      />
                      <label htmlFor="raised-button-file-cover">
                        <Button
                          variant="contained"
                          color="secondary"
                          component="span"
                        >
                          CHOOSE FILE
                        </Button>
                      </label>
                      {errMessage && (
                        <FormHelperText style={{ color: "red" }}>
                          Height and Width must be 400*1400
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                  <Box
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      type="submit"
                      disabled={loader2}
                      onClick={updateProfileHandler}
                    >
                      SUBMIT
                      {loader2 && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
      </Box>
    </>
  );
}
