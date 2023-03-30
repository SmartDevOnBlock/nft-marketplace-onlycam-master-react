import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiFormLabel: {
      root: { color: "#222" },
      colorSecondary: {
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiDialogContent: {
      root: {
        padding: "8px !important",

        "&:first-child": {
          paddingTop: "0px",
        },
      },
    },
    MuiPickersYear: {
      root: {
        color: "#3B0D60",
      },
    },
    MuiDialogActions: {
      root: { padding: "0px" },
    },
    MuiSelect: {
      icon: {
        color: "#fff",
      },
      selectMenu: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#FFFFFF",
        padding: "14px",
      },
    },

    MuiAccordion: {
      root: {
        "&::before": {
          backgroundColor: "rgba(0, 0, 0, 0)",
        },
      },
      rounded: {
        "&:first-child": {
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        },
        "&:last-child": {
          borderBottomLeftRadius: "15pxpx",
          borderBottomRightRadius: "15px",
        },
      },
    },

    MuiInput: {
      underline: {
        "&:hover": {
          "&:not": {
            "&.Mui-disabled": {
              "&::before": {
                borderBottom: "0px solid",
              },
            },
            borderBottom: "0px solid",
          },
        },
        "&::before": {
          left: "0",
          right: "0",
          bottom: "0",
          content: '"\\00a0"',
          position: "absolute",
          transition:
            "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderBottom: "1px solid #898989",
          pointerEvents: "none",
        },
        "&::after": {
          borderBottom: "0px solid",
        },
      },
    },
    // .MuiInput-underline:hover:not(.Mui-disabled):before
    MuiListSubheader: {
      root: {
        color: "#000000",
        fontSize: "22px !important",
        fontWeight: "600 !important",
        lineHeight: "33px !important",
      },
    },

    MuiOutlinedInput: {
      colorSecondary: {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          color: "#222",
          borderColor: "#222",
        },
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiPaper: {
      outlined: {
        padding: "20px",
        width: "100%",
      },
    },
    MuiPopover: {
      root: {
        zIndex: 99999,
        padding: "15px",
      },
      paper: {
        padding: "2px 15px",
      },
    },
    PrivateSwitchBase: {
      root: {
        padding: "0 5px",
      },
    },
    MuiListItem: {
      root: {
        alignItems: "self-start",
      },
      gutters: {
        paddingLeft: 0,
      },
    },
    MuiCheckbox: {
      root: {
        padding: "4px",
        fontSize: "12px",
      },
      colorSecondary: {
        "&.Mui-checked": { color: "#000" },
      },
    },

    MuiFormControlLabel: {
      root: {
        paddingBottom: "0",
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        right: 0,
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        Width: 450,
        maxWidth: "100%",
      },
      paper: {
        overflowY: "unset",
      },
      paperWidthSm: {
        maxWidth: "672px !important",
        borderRadius: "25px",
        overflow: "hidden !important",
      },
      paperWidthXs: {
        maxWidth: "370px !important",
        maxHeight: "600px !important",
        borderRadius: "25px",
      },
      paperWidthLg: {
        borderRadius: "25px",
        padding: "10px",
      },
    },
    MuiPopover: {
      paper: {
        padding: "5px 15px",
        marginTop: "44px !important",
        "@media(max-width:400px)": {
          marginTop: "34px !important",
        },
      },
    },

    MuiInputBase: {
      input: {
        fontSize: 14,
        color: "#000",
        height: "0.1876em",
        padding: "13px 0 15px",
      },
    },
    MuiBackdrop: {
      root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
    },
    MuiButton: {
      containedSecondary: {
        borderRadius: "50px",
        color: "#fff",
        fontSize: "14px",
        // backgroundColor:"#f30065",
        padding: "8px 25px",
      },
      contained: {
        borderRadius: "50px",
        color: "#fff",
        fontWeight: 600,
        padding: "5px 19px",
      },
      containedPrimary: {
        boxShadow:
          "0px 19px 75px -11px rgba(219, 0, 255, 0.36), inset -1px -2px 1px rgba(0, 0, 0, 0.25), inset 1px 2px 1px rgba(255, 255, 255, 0.25)",
        borderRadius: "50px",
        color: "#fff",
        fontSize: "15px",
        height: "40px",
        lineHeight: " 21px",
        padding: "10px 29px",

        "&:hover": {
          color: "#fff",
          backgroundColor: "#3B0D60",
        },
      },

      outlinedPrimary: {
        borderRadius: "50px",
        color: "#fff",
        fontWeight: 600,
        padding: "5px 19px",
        border: "2px solid #D200A5",
        "&:hover": {
          border: "2px solid #D200A5",
        },
      },
      MuiPaginationItem: {
        "& page": {
          "& .Mui-selected": {
            backgroundColor: "rgba(0, 0, 0, 0.58)",
          },
        },
      },
      outlinedSecomdary: {
        borderRadius: "50px",
        color: "#3B0D60",
        fontWeight: 600,
        padding: "5px 19px",
        border: "2px solid #3B0D60",
        "&:hover": {
          border: "2px solid #D200A5",
        },
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "0",
      },
    },
    MuiMenu: {
      paper: { top: "47px" },
    },
    MuiTableCell: { root: { borderBottom: "0px" } },
    MuiTypography: {
      subtitle1: {
        color: "#fff",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: " 16px",
        colorSecondary: {
          color: "#8d8989",
        },
      },
    },
  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Montserrat', sans-serif",
    color: "#D200A5",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#FBFBFD",
      dark: "#f3f7f9",
      paper: colors.common.white,
    },
    primary: {
      main: "#D200A5",
      dark: "#de0d0d",
      light: "#de0d0d",
    },
    secondary: {
      main: "#3B0D60",
      dark: "#1e0432",
      light: "#642397",
      white: "#fff",
    },
    warning: {
      main: "#ffae33",
      dark: "#ffae33",
      light: "#fff1dc",
    },
    success: {
      main: "#54e18c",
      dark: "#54e18c",
      light: "#e2faec",
    },
    error: {
      main: "#ff7d68",
      dark: "#ff7d68",
      light: "#ffe9e6",
    },
    text: {
      primary: "#52565c",
      secondary: "#999999",
    },
    common: {
      black: "#222222",
    },
  },
};

export const createTheme = (config = {}) => {
  let theme = createMuiTheme(_.merge({}, baseOptions, themesOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
