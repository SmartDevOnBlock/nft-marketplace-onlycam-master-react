import React from "react";

import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Link
} from "@material-ui/core";
import Page from "src/component/Page";
import { BiImageAlt, BiGridAlt } from "react-icons/bi";



const useStyles = makeStyles((theme) => ({
  NftBreed: {
    background: "#09080d",
    paddingTop: theme.spacing(18),
    paddingBottom: theme.spacing(10),
   
  },
  innerCollection:{
    position:"absolute",
    width:"calc(100% - 40px)",
    bottom:"0px",
    left:"50%",
    transform:"translateX(-50%)",
    borderRadius:"20px 20px 0 0",
    padding:"20px",
    background: "#1a1919",


  },
  selectOption:{
    width:"300px",
    display: "flex",
    justifyContent: "space-around",
  
    flexDirection: "row",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    justifyContent: "space-around",
    width:"100%",
    margin:"0 10px",
    flexDirection: "row",
  },
  sectionTitleHead:{
    display:"flex",
    justifyContent:"space-between",
    alignContent:"center",
    margin: "10px 0 ",
    padding:"0 0",
    width:"100%",
    [theme.breakpoints.down("sm")]: {
      display:"block",
    },
  },
  title: {
    borderBottom: "1px solid #eaeaea",
  },
 
  createIcon:{
    width: 100,
    height: 100,
    color:"#222",
  },
  walletSet:{
    padding:"0 15px 0 0",
  },

}));

export default function ResumeCreation() {
  
  const classes = useStyles();
  
  return (
    <Page title="Create Token">
      <Box className={classes.NftBreed}>
        {" "}
        <Box>
         <Container maxWidth="sm">
            <Grid container spacing={2} className="sectionHeading">
              <Grid item xs={12}>
                <Box>
                  <Typography variant="h2" >
                  Create New
                  </Typography>
                  <Typography variant="body2" >
                  Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one collectible multiple times
                  </Typography>
                 
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* featured */}
        <Box mt={4} mb={2}>
          <Container maxWidth="sm">
            <Box>
            <Grid container spacing={2} className="counterSection" >
              <Grid item xs={12} sm={12} md={6}>
              <Link href="/create-nft">
                <Box className="createBox">
               <BiImageAlt className={classes.createIcon}/>
            
            
                <Typography variant="h3" >
                 Single
                  </Typography>
                
              
                </Box>
                </Link>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
              <Link href="/create-collection">
                <Box className="createBox">
               <BiGridAlt className={classes.createIcon}/>
              
                <Typography variant="h3" >
                 Multiple
                  </Typography>
                </Box>
                </Link>
              </Grid>
              
           </Grid>
        
            </Box>
            <Box mt={4}>
            <Typography variant="h5" className="text-black" >
            We do not own your private keys and cannot access your funds without your confirmation
                  </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
  </Page>
  );
}
