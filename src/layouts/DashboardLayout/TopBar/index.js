import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Hidden,
  SvgIcon,
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import  TopBarData  from './TopBarData';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.secondary.main,
  },
  toolbar: {
    height: 70,
    padding: '0 10px',
    float:"right",
    width:"calc(100% - 256px)",
    right: 0,
    position: "absolute",
    top: -2,
    padding: 0,
    background: "#3b0d60",
    "@media (max-width: 1279px)": {
      width:"100%",
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      elevation={0}
      className={clsx(classes.root, className)}
      color="inherit"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="#fff"
            onClick={onMobileNavOpen}
            style={{ marginRight: 10, padding:"5px" }}
          >
            <SvgIcon fontSize="small">
              <MenuIcon style={{ color: '#fff' }} />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <TopBarData />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
