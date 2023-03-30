/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import { FaTachometerAlt, FaClipboardCheck } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import NavItem from "./NavItem";
import PeopleIcon from "@material-ui/icons/People";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { AiOutlineControl } from "react-icons/ai";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { UserContext } from "src/context/User";
import { RiAdminLine } from "react-icons/ri";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import GroupIcon from "@material-ui/icons/Group";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
const sections = [
  {
    items: [
      // {
      //   title: "Become a Creator",
      //   icon: FaTachometerAlt,
      //   href: "/become-creator",
      // },
      {
        title: "Creators",
        icon: GroupIcon,
        href: "/creators-list",
      },
      {
        title: "Erotic NFT's",
        icon: FaTachometerAlt,
        href: "/erotic-list",
      },
      {
        title: "Live Auctions",
        icon: LiveTvIcon,
        href: "/auction-list",
      },
    ],
  },
];

const sectionsAfterLogin = [
  {
    items: [
      {
        title: "My Activity",
        icon: DashboardIcon,
        href: "/activity",
      },

      {
        title: "My Profile",
        icon: AccountCircleIcon,
        href: "/profile",
      },
      {
        title: "Edit Profile",
        icon: EditIcon,
        href: "/edit-profile",
      },

      {
        title: "Notification",
        icon: FaClipboardCheck,
        href: "/notification",
      },
    ],
  },
];

const sectionsAdmin = [
  {
    items: [
      {
        title: "Admin",
        icon: RiAdminLine,
        href: "/admin",
      },
      {
        title: "Control",
        icon: AiOutlineControl,
        href: "/control",
      },
      {
        title: "Fee Mangement",
        icon: AccountBalanceWalletIcon,
        href: "/fee-management",
      },
    ],
  },
];
const creatorForm = [
  {
    items: [
      {
        title: "Become a Creator",
        icon: FaTachometerAlt,
        href: "/become-creator",
      },
      {
        title: "Wallet Settings",
        icon: PeopleIcon,
        href: "/wallet-setting",
      },
    ],
  },
];

const sectionsBelow = [
  {
    items: [
      {
        // title: "Logout",
        icon: ExitToAppIcon,
        href: "/terms-and-condition",
      },
      // {
      //   title: "Privacy Policy",
      //   //icon: PieChartIcon,
      //   href: "/privacy-policy",
      // },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    background: "rgba(59, 13, 96, 1)",
    backdropFilter: "blur(44px)",
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    height: "100%",
    background: "rgba(59, 13, 96, 1)",
    backdropFilter: "blur(44px)",
    boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  logoicon: {
    display: "flex",
    marginTop: "16px",
    alignItems: "center",
    marginLeft: "30px",
  },
  logoutbutton: {
    justifyContent: "space-between",
    paddingLeft: 10,
    borderRadius: 0,
    width: "60px",
    textAlign: "center",
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const location = useLocation();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box pt={4}>
          {user?.kycStatusRes?.kycStatus !== "APPROVE" &&
            user?.userData?.userType === "User" &&
            creatorForm.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}

          {sections.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}

          {user?.isLogin &&
            sectionsAfterLogin.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}

          {user?.isLogin &&
            user?.isAdmin &&
            sectionsAdmin.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}
        </Box>
        <Box className="side_nev_Bottom">
          {sectionsBelow.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            ></List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
