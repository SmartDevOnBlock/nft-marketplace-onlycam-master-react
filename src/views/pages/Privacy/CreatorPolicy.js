import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  heading: {
    textAlign: "start",
    "& h1": {
      color: theme.palette.secondary.main,
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  details: {
    "& h4": {
      fontSize: "15px",
      lineHeight: "25px",
    },
    "& h5": {
      fontSize: "15px",
      lineHeight: "25px",
      fontStyle: "italic",
      color: "#fff",
    },
  },
  colorbox: {
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
}));
const CreatorPrivacy = () => {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} termParent`}>
      <Container>
        <Box className={classes.colorbox} mt={5}>
          <Box className={classes.heading}>
            <Typography variant="h1">Creator Policy</Typography>
          </Box>
          <Box className={classes.details} mt={2}>
            <Typography variant="h4">
              This Policy governs the additional terms and conditions applicable
              to Creators, how we handle and manage the data you submit, and the
              rights and obligations entailed by both parties. You should read
              this section carefully and be sure you understand and regularly
              review or re-read it to remain fully informed of any changes
              governing this agreement. This Policy is a constituent of our
              Terms, and incorporates its terminology. <br /> <br />
              By using our Platform you agree to the Creator Policy as follows:
              <Container>
                <Typography variant="h4">
                  1. Consent to Privacy Policy: By submitting this information
                  and agreeing to register your account as a Creator Account
                  with us you are confirming that you have read and understood
                  our Privacy Policy, and that you understand and expressly
                  consent to the collection, use, and disclosure of your
                  information as provided for in our Privacy Policy,and that you
                  are at least 18 years old or above the minimum age to create
                  and distribute adult content in your jurisdiction, whichever
                  is greater, on our Platform entirely of your own volition.{" "}
                  <br />
                  2. Entire Terms of Service Applicable: To reiterate, the
                  conditions of the Creator Policy govern Creator Accounts in
                  addition to all the terms and conditions of our Account
                  Policy, which Users must first accept before they may apply to
                  be upgraded to a Creator Account. <br />
                  3. Personal Information Requirements: You understand that, in
                  addition to the verifiable personal information provided in
                  accordance with our Account Policy, Creators may also be
                  required to provide additional verifiable personal information
                  necessary to ensure your and our compliance with all
                  applicable laws, and that you remain responsible for ensuring
                  the accuracy and completeness of any personal information we
                  ask you to provide. If the information you provide for your
                  account is not true and correct, you face the immediate
                  termination of your account and you may be subject to legal
                  sanctions. <br />
                  4. Commercial Promotion: We may ask you for your permission to
                  use your Media or Content for advertising or promotional
                  purposes, as defined by these Terms, any relevant addendums,
                  and applicable law. You do not have to provide us with this
                  permission, this permission is not granted by default, and you
                  may use our Platform as a Creator without opting-in to our
                  advertising and promotional usage of your Media and Content.
                  You may opt-out again at any time, understanding that any
                  advertisements or promotional material we may have publicly
                  produced and distributed while you allowed as much will remain
                  in the public domain and will retain the permission you have
                  granted for its advertising or promotional usage, as allowed
                  by relevant advertising regulations. We will provide you with
                  this choice as a toggleable preference in your Account
                  Settings on the website, and you may alternatively contact us
                  at support@only.cam to opt-in or out. <br />
                  5. One User Account: You understand that you may not have
                  separate Creator and non-Creator Accounts, that you may only
                  have one account on CumRocket, and that only that one account
                  may possibly be registered as a Creator account. <br />
                  6. Right to Moderate: You understand that we reserve the right
                  to administrate, secure, and moderate the Media and Content
                  uploaded to, referenced from, or made available through our
                  Service in the pursuit of our business interests or for public
                  interest and at our sole discretion, including but not limited
                  to prohibiting, removing, deleting, de-linking,
                  de-referencing, or otherwise manipulating how any Media or
                  Content is used on our Services, in addition to and without
                  limitation beyond the scope of our preexisting Acceptable Use
                  Policy. This means that should we find any Media or Content to
                  be unacceptable or inappropriate, for any reason, we may
                  remove or censor it at any time and at our sole discretion. We
                  may do this at the request of government or enforcement
                  agencies, to conform to law or regulation, for the sake of an
                  ethical or moral imperative, or for any other reason of public
                  interest. <br />
                  7. Records Keeping Requirements under 18 U.S.C. §2257: You
                  certify that the Media or Content you upload to the Website
                  has been produced and records are being kept in accordance
                  with 18 U.S.C. § 2257 et. seq., as modified from time to time,
                  with the rules and regulations set forth in 28 C.F.R. § 75 et.
                  seq., as modified from time to time, and any other applicable
                  records keeping or age verification laws. Upon our request,
                  you shall promptly deliver us legible copies (as may be
                  lawfully redacted), of valid (as of the date of production of
                  the Media or Content) recognizable governmental photo
                  identifications for any or all individuals appearing in any or
                  all of your Media or Content (demonstrating that each were at
                  least 18 years of age on the day the Media or Content was
                  produced) together with the required identification forms,
                  documents and releases. In this context, when we refer to all
                  individuals appearing in the Media or Content, we mean,
                  without limitation, photographed individuals or individuals
                  otherwise appearing in the Media or Content, whether appearing
                  nude, semi-nude or fully clothed, engaging in simulated or
                  actual sexual intercourse (including solo scenes). Your
                  failure to promptly deliver the requested information upon
                  request, may lead to the temporary or permanent suspension of
                  your account. You will, at your own expense, indemnify, defend
                  and hold us harmless from, any and all liabilities, losses,
                  damages, fines, fees, penalties, costs and expenses (including
                  reasonable attorneys’ fees) incurred or suffered by us from
                  any claim arising or resulting from your failure or negligence
                  to comply with maintenance of any legally mandated records.
                </Typography>{" "}
                <br />
                <br />
                Notwithstanding the above, we may provide additional guidance on
                our understanding, definition, and interpretation of this
                Creator Policy through other means and channels as we see fit,
                including in particular through official technical and customer
                support channels and published memoranda, in addition to
                modifications to this Policy and these Terms. We will endeavour
                to provide forthright and clear guidance on how best to use, and
                avoid the misuse of, our Service. If you have any questions or
                concerns about these Terms or the Creator Policy, please reach
                out to us at support@only.cam or through other official support
                channels.
              </Container>
            </Typography>{" "}
            <br />
            <Typography variant="h5">Last Updated: April 21, 2022</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CreatorPrivacy;
