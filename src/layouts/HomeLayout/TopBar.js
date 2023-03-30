import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  InputBase,
  Grid,
  MenuItem,
  Box,
  Container,
  Menu,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  withStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { BsFillCaretDownFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import Logo from "./../../component/Logo";
import ConnectWallet from "src/component/ConnectWallet";
import EnterName from "src/component/EnterName";
import { UserContext } from "src/context/User";
import { sortAddress } from "src/utils";
import { toast } from "react-toastify";
import SearchBox from "../DashboardLayout/SearchBox";
import { GiCancel } from "react-icons/gi";
import MuiDialogContent from "@material-ui/core/DialogContent";

const headersData = [
  {
    label: "Explore",
    href: "/auction",
  },
  {
    label: "Erotic NFT's",
    href: "/erotic",
  },
  {
    label: "Creators",
    href: "/creators",
  },
  {
    label: "Top Sellers",
    href: "/seller",
  },
];

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "600",
    borderRadius: 0,
    minWidth: "auto",
    color: "#fff",
    height: "31px",
    padding: "0px 7px",
    letterSpacing: "1px",
    marginLeft: "15px",
    "@media (max-width: 900px)": {
      color: "#FFF",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&:active": {
      color: theme.palette.secondary.dark,
    },
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  menuButton1: {
    width: "100%",
    justifyContent: "flex-start",
  },
  toolbar: {
    display: "flex",
    padding: "10px 0",
    justifyContent: "space-between",
    height: "100%",
    "@media (max-width: 900px)": {
      paddingLeft: "75px",
      paddingRight: "20px",
      height: "100%",
    },
  },
  customizedButton: {
    fontSize: "20px",
    padding: "5px 10px 10px 0px",
    display: "flex",
    justifyContent: "end",
  },
  customizedButton1: {
    display: "flex !important",
    justifyContent: "end",
    "& div": {
      display: "flex !important",
    },
  },
  maindrawer: {
    height: "100%",
    background: "#0c0731",
    width: "260px",
  },
  logoDrawer: {
    paddingLeft: "10px",
    width: "140px",
    marginBottom: "30px",
  },
  drawerContainer: {
    padding: "20px 0px ",
    height: "100%",
    backgroundColor: "rgb(60 39 89)",
    width: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawericon: {
    color: "#000",
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize: "25px",
  },
  logoImg: {
    width: "75px",
    // height: '44.5px',
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
    },
  },
  flexButton: {
    display: "flex",
    justifyContent: "flex-between",
    alignItems: "center",
  },
  menuMobile: {
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: "-0.6px",
    lineHeight: "1.75",
    color: "#fff",
    borderBottom: "1px solid #3e3e3e",
    padding: "16px",
    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
    },
  },
  paper1: {
    background: "black",
    color: "white",
  },
  containerHeight: {
    height: "100%",
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "0px 7px",
  },
  search: {
    height: "35px",
    position: "relative",
    background: " rgba(255, 255, 255, 0.2)",
    boxShadow: "0px 6px 9px rgba(110, 0, 149, 0.15)",
    borderRadius: "40px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    marginLeft: 10,
    marginRight: 10,
    width: "150px",
    maxWidth: "150px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "204px",
      maxWidth: "204px",
      height: "42px",
    },
  },
  searchIcon: {
    fontSize: "16px",
    padding: theme.spacing(0, 1),
    color: "#fff",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#fff",
    fontSize: "12px",
    width: "100%",
  },
  wallet: {
    fontSize: "14px",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "21px",
    color: "#fff",
    border: "1px solid #ec0066",
    padding: "0 15px",
    background: "#ec0066",
    borderRadius: "50px",
    height: "31px",
    "&:hover": {
      background: "#fff",
      color: "#ec0066",
    },
    "@media (max-width: 900px)": {
      marginLeft: "12px",
      marginTop: "12px",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: "13px",
    color: "#fff",
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100px",
    height: "20px",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
      height: "25px",
      "&:focus": {
        width: "100%",
      },
    },
  },
  submenu: {
    borderTop: "3px solid #300760",
    top: "25px !important",
  },
  menuMobile1: {
    marginLeft: "10px",
    backgroundColor: " #FCF2FA",
    borderRadius: "40px",
    "& h4": {
      fontSize: "14px",
      lineHeight: " 17px",
      color: "#D200A5",
      margin: "0 5px",
    },
    "&:hover": {
      backgroundColor: " #FCF2FA",
      borderRadius: "40px",
    },
    "& figure": {
      margin: 0,
      width: 40,
      height: 40,
      borderRadius: "50px",
      overflow: "hidden",
      display: "flex",
      justifyContent: " center",
      alignItems: "center",
      "& img": {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        // maxHeight: "100%",
      },
    },
  },

  dailogOpen: {
    "& .MuiDialog-paperWidthMd": { maxWidth: "100%" },
    "& h5": {
      color: "#3B0D60",
      fontSize: "17px",
    },
  },
  paper: {
    overflowY: "unset",
  },
  dialogBox: {
    padding: "20px !important",
    overflow: "hidden !important",
    "& h5": {
      color: "#3B0D60",
      fontSize: "20px",
    },
  },
  marginbtn: {
    // "@media(max-width:1210px)": {
    //   marginLeft: "65px",
    // },
    // "@media(max-width:500px)": {
    //   marginLeft: "0px",
    // },
  },
}));

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { account, chainId } = useWeb3React();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useContext(UserContext);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const {
    menuMobile,
    paper,
    marginbtn,
    dialogBox,
    menuButton,
    menuButton1,
    divstake,
    toolbar,
    search,
    searchIcon,
    flexButton,
    inputInput,
    drawerContainer,
    drawericon,
    inputRoot,
    logoDrawer,
    containerHeight,
    mainHeader,
    wallet,
    menuMobile1,
    submenu,
    customizedButton,
    dailogOpen,
    customizedButton1,
  } = useStyles();
  const history = useHistory();
  const [walletPopup, setWalletPopup] = useState(false);
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const { mobileView, drawerOpen } = state;
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl1(null);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const [open1, setOpen1] = useState({ community: false, user: false });
  const anchorRef = { community: useRef(null), user: useRef(null) };
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);
  const [updateName, setUpdateName] = useState(false);

  const handleClose2 = (event, name) => {
    if (
      anchorRef[name].current &&
      anchorRef[name].current.contains(event.target)
    ) {
      return;
    }

    setOpen1({ ...open1, [name]: false });
  };

  function handleListKeyDown(event, name) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen1({ ...open1, [name]: false });
    }
  }

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      overflow: "hidden !important",
    },
  }))(MuiDialogContent);

  const displayDesktop = (searchText) => {
    return (
      <Container maxWidth='lg'>
        <Toolbar className={toolbar}>
          {femmecubatorLogo}
          <Grid
            container
            item
            direction='row'
            justify='space-between'
            alignItems='center'
            style={{ paddingLeft: "0px" }}
          >
            <div>{getMenuButtons()}</div>
            <div className={flexButton}>
              <SearchBox
                search={search}
                inputRoot={inputRoot}
                inputInput={inputInput}
                searchIcon={searchIcon}
              />
              {user?.isLogin && (
                <>
                  {user?.kycStatusRes?.kycStatus == "APPROVE" ||
                  user?.isAdmin ? (
                    <Button
                      variant='outlined'
                      color='primary'
                      component={Link}
                      to='/create-nft'
                    >
                      Create NFT
                    </Button>
                  ) : (
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={() => {
                        setWalletPopup(true);
                        // toast.warn("Please complte your KYC");
                      }}
                    >
                      Create NFT
                    </Button>
                  )}
                </>
              )}
              &nbsp;
              {user?.isLogin && (
                <>
                  {(user?.kycStatusRes?.kycStatus == "APPROVE" ||
                    user?.isAdmin) && (
                    <Button
                      variant='outlined'
                      color='primary'
                      component={Link}
                      to='/import-nft'
                    >
                      Import NFT
                    </Button>
                  )}
                </>
              )}
              {/* <Button variant="contained" color="primary">
                Connect Wallet
              </Button> */}
              {stackmenu}
            </div>
          </Grid>
        </Toolbar>
      </Container>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={mainHeader}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            <img className={logoDrawer} src='images/logo.png' alt='' />
            {getDrawerChoices()}
            {/* <Button
              className={wallet}
              aria-controls="simple-menu"
              aria-haspopup="true"
              to="/wallet"
              component={Link}
            >
              Connect wallet
            </Button> */}
            {stackmenu}
          </div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
        <Grid container>
          <Grid item xs={10}>
            <SearchBox
              search={search}
              inputRoot={inputRoot}
              inputInput={inputInput}
              searchIcon={searchIcon}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              className={drawericon}
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon
                width='60px'
                height='60px'
                style={{ color: "#fff", fontSize: "30px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: menuButton1,
            }}
          >
            <MenuItem className={menuMobile}>{label}</MenuItem>
          </Button>
        </>
      );
    });
  };

  const femmecubatorLogo = (
    <Box>
      <Link to='/'>
        <Logo className='logoImg' />
      </Link>
    </Box>
  );
  const stackmenu = (
    <div className={marginbtn}>
      {user?.isLogin ? (
        <IconButton
          aria-label='delete'
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={handleClick1}
          className={menuMobile1}
          size='small'
        >
          <figure>
            <img
              src={
                user?.userData?.profilePic
                  ? user?.userData?.profilePic
                  : "/images/onlycamimg.png"
              }
              alt=''
            />
          </figure>
          <Typography
            variant='h4'
            title={
              user?.userData?.userName
                ? user?.userData?.userName
                : user?.userData?.walletAddress
            }
          >
            {user?.userData?.userName
              ? user?.userData?.userName.slice(0, 5) + ".."
              : sortAddress(user?.userData?.walletAddress)}
          </Typography>
          <BsFillCaretDownFill style={{ color: "#D200A5", fontSize: "16px" }} />
        </IconButton>
      ) : (
        <IconButton
          aria-label='delete'
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={() => setUpdateMinSatkeOpen(true)}
          className={menuMobile1}
          size='small'
        >
          <figure>
            <img
              src={
                user?.userData?.profilePic
                  ? user?.userData?.profilePic
                  : "/images/onlycamimg.png"
              }
              alt=''
            />
          </figure>
          <Typography variant='h4'>Connect</Typography>
        </IconButton>
      )}

      <Box className={divstake}>
        <Menu
          id='simple-menu'
          disableScrollLock={true}
          anchorEl={anchorEl1}
          keepMounted
          open={Boolean(anchorEl1)}
          onClose={handleClose4}
        >
          {user?.userData?.userType === "User" && (
            <MenuItem
              onClick={() => {
                if (user?.kycStatusRes?.kycStatus) {
                  history.push({
                    pathname: "/creator-kyc",
                    search: user?.kycStatusRes?._id,
                    state: {
                      data: user?.kycStatusRes,
                    },
                  });
                } else {
                  history.push("/become-creator");
                }
              }}
            >
              {user?.kycStatusRes?.kycStatus ? "View KYC" : "Become a creator"}
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              history.push("/profile");
            }}
          >
            Profile
          </MenuItem>
          {!user?.userData?.name && (
            <MenuItem onClick={() => setUpdateName(true)}>Edit Name</MenuItem>
          )}

          <MenuItem
            onClick={() => {
              user.logoutHandler();
              setAnchorEl1();
            }}
          >
            Disconnect
          </MenuItem>

          {/* <MenuItem onClick={() => setUpdateMinSatkeOpen(true)}>
            Connect
          </MenuItem> */}
        </Menu>
      </Box>
    </div>
  );
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: menuButton,
            }}
          >
            {label}
          </Button>
        </>
      );
    });
  };

  return (
    <>
      <AppBar
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{
          // backgroundColor: "#ccc0",
          border: "none",
          position: "fixed",
          zIndex: "99",
          // backdropFilter: "blur(44px)",
          backgroundColor: "transparent",
          backgroundColor: "rgba(36, 16, 67, 0.87)",
          // boxShadow: "0px 1px 15px rgb(0 0 0 / 34%)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          // backdropFilter: "saturate(180%) blur(20px)",
          transition: "all 0.15s ease",
        }}
      >
        <Box
          maxWidth={history.location.pathname !== "/" ? "lg" : "fixed"}
          className={containerHeight}
        >
          {mobileView ? displayMobile() : displayDesktop()}
        </Box>
      </AppBar>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose1}
      >
        <MenuItem>
          <Link to='/profile'>My Profile</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/user'>My Nft</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/resell-nft'>Resell Nft</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/create-nft'>Create NFT</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/notification'>Notification</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/search'>Search</Link>
        </MenuItem>
      </Menu>

      {updateMinSatkeOpen && (
        <Dialog
          open={updateMinSatkeOpen}
          onClose={() => {
            setUpdateMinSatkeOpen(false);
          }}
          maxWidth='sm'
        >
          <DialogTitle>
            <ConnectWallet
              onClose={() => {
                setUpdateMinSatkeOpen(false);
              }}
            />
          </DialogTitle>
        </Dialog>
      )}
      {updateName && (
        <Dialog
          open={updateName}
          onClose={() => {
            setUpdateName(false);
          }}
          maxWidth='sm'
        >
          <DialogTitle>
            <EnterName
              user={user}
              onClose={() => {
                setUpdateName(false);
              }}
            />
          </DialogTitle>
        </Dialog>
      )}
      <Box>
        {walletPopup && (
          <Dialog
            open={walletPopup}
            onClose={() => setWalletPopup(false)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            maxWidth='sm'
            style={{ overflow: "hidden !important" }}
            className={dailogOpen}
          >
            {/* <DialogActions
              style={{
                background: "#fff",
                borderRadius: "25px",
              }}
            >
              <IconButton
                onClick={() => setWalletPopup(false)}
                className={customizedButton}
              >
                <GiCancel />
              </IconButton>
            </DialogActions> */}
            <DialogContent
              style={{
                // width: "500px",
                background: "#fff",
                borderRadius: "25px",
                padding: "10px !important",
              }}
            >
              <Box
                className={customizedButton1}
                style={{ display: "flex !important" }}
              >
                <IconButton
                  onClick={() => setWalletPopup(false)}
                  className={customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </Box>
              <Box mb={2}>
                <Typography variant='h6'>
                  We are required by law to verify content creators in our
                  platform due to the nature of our business. Please verify
                  below in order to become a creator.
                </Typography>
              </Box>
              <Box>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => history.push("/become-creator")}
                >
                  Verify
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </>
  );
}
