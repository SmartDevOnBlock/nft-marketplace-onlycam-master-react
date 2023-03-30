import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
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
    "& h3": {
      fontSize: "18px",
      lineHeight: "25px",
      color: "#fff",
    },
    "& h5": {
      color: "#fff",
      fontSize: "13px",
      paddingBottom: "5px",
      fontStyle: "italic",
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
export default function UserPolicy() {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} termParent`}>
      <Container>
        <Box className={classes.colorbox} mt={5}>
          <Box className={classes.heading}>
            <Typography variant="h1">User Account Policy:</Typography>
          </Box>
          <Box className={classes.details} mt={2}>
            <Typography variant="h4">
              This Policy governs requirements to register a User Account, how
              we handle and manage your data, and the rights and obligations
              entailed by all parties. You should read this section carefully
              and be sure you understand and regularly review or re-read it to
              remain fully informed of any changes governing this agreement.
              This Policy is a constituent of our Terms, and incorporates its
              terminology.
              <br />
              <br />
              By using our Platform you agree to the User Account Policy as
              follows:
              <br /> <br />
            </Typography>{" "}
            <br />
            <Container>
              <Typography variant="h4">
                1. No Illegal Use: Users, including Creators, are prohibited
                from engaging in any activity that is illegal under Saint
                Vincent and the Granadines or any other applicable law while
                using the platform. All illegal use is Prohibited. <br />
                <br /> 2.Consent to Privacy Policy: By accessing our Platform,
                or using our Service, you affirm that you have read and
                understood our Privacy Policy, and that you expressly consent to
                the collection, use, and disclosure of your information as
                provided for in our Privacy Policy.
                <br /> <br />
                3. Consent to Sales Process: By accessing our Platform, or using
                our Service, you agree to the conditions set forth in our Sales
                Process, including but not limited to understanding that we
                merely initiate transactions that are facilitated by third-party
                extensions, applications, and technology, such as distributed
                ledger technology, and that we have no direct control or
                authority over the management of these third-parties nor of any
                distributed ledger technology. This means that we cannot be
                liable for any content on the blockchain, or any other kind of
                distributed ledger, and that we only control our website and
                Services ability to interface with, surface, or present
                distributed transactions and assets to Users. We will take all
                reasonable steps to ensure our Service does not interface with
                any unethical, illegal, or prohibited Content or Media. You
                agree to report any violations of our Terms of Service to us
                promptly at support@only.cam
                <br /> <br />
                4. Personal Information Requirements for Creators: By accessing
                our Platform, or using our Service, you agree to submit and
                provide only up-to-date, accurate, and verifiable information
                about yourself, and to maintain the accuracy of this information
                from time to time as necessitated by circumstances beyond our
                control, including any change to your personal information.
                <br /> <br />
                5. Password Security: You agree to be responsible for
                maintaining the confidentiality and security of your own seed
                and private key and accept all risks of unauthorized access to
                your account arising from your own failure to maintain the
                confidentiality of the seed and private key hat gives access to
                your BSC or Ethereum wallet. <br /> <br />
                6. Only One User Account: You agree that you may have only one
                account. You are prohibited from making multiple accounts. We
                will suspend or terminate any account found to be in
                contravention of this condition, at our sole discretion. You may
                not register for an account if you are under 18 years old or are
                under the age of majority to consume adult content in your
                jurisdiction, whichever is greater.
                <br /> <br />
                7. Only One User per Account: You are prohibited from sharing
                your account, or password, with anyone. You may never buy, sell,
                lease, or rent your account to another person or entity, under
                any circumstances.
                <br />
                8. No Replacement Accounts: If your account has been suspended
                or terminated you may not create a new account or use any other
                account without our prior written authorization. <br /> <br />
                9. Restriction on Access: You are prohibited from logging in or
                accessing our Services through any third-party client, website,
                interface, or other entity without our prior written
                authorization. You may never allow your account to be used by,
                or to be accessible by, minors. <br /> <br />
                10. Electronic Communications: You agree to allow us to
                communicate with you by email, which you will provide
                voluntarily. including but not limited to written or paper
                correspondence, notification via the website messaging or
                indication, or similar. You understand that and agree that any
                communications, notifications, agreements, disclosures, or other
                communications we provide to you by electronic means will
                satisfy the legal requirements for communications by writing. It
                is your responsibility to maintain electronic and paper copies
                of these communications for your records. <br /> <br />
                11. Promotional Communications: We may elect to send you
                promotional communications by electronic means, or any other
                communications medium you provide for in your account
                preferences, as allowed by law, including but not limited to
                updates, giveaways, special offers, surveys, and other
                advertisements or promotions, when you have given us permission
                to do so. You may at any time opt out of receiving these and any
                other promotional communications, or optional notifications,
                through your account preferences and any other acceptable
                methods of opting-out that we may provide. You will not receive
                promotional communications, by default, until and unless you
                opt-in. <br /> <br />
                12. Right to Suspend or Terminate: We reserve the right to
                suspend or terminate a User’s Account at any time, for any
                reason, at our sole discretion, without notice. We may not be
                able to notify you, or may not be able to notify you beforehand,
                but we will endeavor to notify you of any suspension or
                termination of your account insofar as we deem it necessary. We
                may deactivate, archive, suspend, or terminate an account at any
                time for what we deem to be a reasonable period of inactivity,
                at our sole discretion. <br /> <br />
                13. Additional Terms Apply for Creators: Registration of all
                User Account’s are bound by these terms and conditions. Further
                terms and conditions will apply if a User elects or intends to
                verify as a Creator. The terms and conditions governing
                registration of a Creator’s Account are included in our Creator
                Policy.
              </Typography>
            </Container>
            <br />
            <br />
            <Typography variant="h4">
              Notwithstanding the above, we may provide additional guidance on
              our understanding, definition, and interpretation of this User
              Account Policy through other means and channels as we see fit,
              including in particular through official technical and customer
              support channels and published memoranda, in addition to
              modifications to this Policy and these Terms. We will endeavour to
              provide forthright and clear guidance on how best to use, and
              avoid the misuse of, our Service. If you have any questions or
              concerns about these Terms or the User Account Policy, please
              reach out to us at support@only.cam.
            </Typography>{" "}
            <br />
            <br />
            <Typography variant="h5">Last Updated: April 21, 2022</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
