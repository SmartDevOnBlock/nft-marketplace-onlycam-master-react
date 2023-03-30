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
    "& h6": {
      fontSize: "15px",
      lineHeight: "25px",
      fontStyle: "bold",
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
const SellerBuyerPrivacy = () => {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} termParent`}>
      <Container>
        <Box className={classes.colorbox} mt={5}>
          <Box className={classes.heading}>
            <Typography variant="h1">
              Standard Contract between Buyer and Seller:
            </Typography>
          </Box>
          <Box className={classes.details} mt={2}>
            <Typography variant="h4">
              This is the Standard Contract between Buyer and Seller who
              transact on the Onlycam.Art Platform. This contract outlines the
              terms which govern every transaction on the Platform between
              Users, including between Creator and User. You should read this
              section carefully and be sure you understand and regularly review
              or re-read it to remain fully informed of any changes governing
              the agreement between Buyers and Sellers on the Platform. This
              Policy is a constituent of our Terms, and incorporates its
              terminology.
              <Container>
                <Typography variant="h4">
                  1. Introduction: This contract governs all transactions
                  between Users, including between Users and Creators,
                  concerning Media, Content, or any dispute that arises from the
                  use of the platform, between Users. These terms and conditions
                  constitute a legally binding agreement between Users who
                  transact on the platform.
                  <br />
                  2. Entire Terms of Service Applicable: To reiterate, the
                  conditions of the Creator Policy govern Creator Accounts in
                  addition to all the terms and conditions of our Account
                  Policy, which Users must first accept before they may apply to
                  be upgraded to a Creator Account.Application: When the
                  platform facilitates a transaction between Buyer and Seller,
                  this contract will control, unless otherwise agreed to in
                  writing by the parties. <br />
                  3. Parties: The only parties to this contract are the Buyer
                  and Seller. Although this contract is part of Onlycam.Art’s
                  Terms of Service, Onlycam.Art merely facilitates transactions
                  between Users, and is therefore not a party to this contract.{" "}
                  <br />
                  4.Agreement: It is agreed that the Seller desires to sell
                  Content, owned by the Seller, for purchase by other users of
                  the Platform, and that the Buyer desires to purchase Content
                  for their personal, non-commercial use and display. <br />
                  5.Acceptance: By using the platform, Creators and Users agree
                  that they have read the Standard Contract between Creator and
                  User, understand all of its conditions, and agree to its
                  terms. <br />
                  6.Interpretation:
                  <br />{" "}
                  <Container>
                    <Typography variant="h4">
                      1. “Buyer” refers to any User of the Platform acting as a
                      purchaser of Content or Media. <br />
                      2. “Crypto Content” ( or “Content”) refers to any Media
                      that may take the form of non-fungible or fungible tokens,
                      and be implemented on the Binance Smart Chain, Ethereum,
                      or similar distributed ledger technology using smart
                      contracts, and which is accessible through our Service.{" "}
                      <br />
                      3. “Creator” refers to any User who has requested and been
                      approved for the uploading, posting, participation, sale,
                      or benefacting in Media and Content accessible on the
                      Platform, and may also be referred to as “you” or “your”
                      in the context of these Terms. <br />
                      4. “Onlycam.Art” refers to the website and related
                      services Onlycam.Art, services offered at subdomains of
                      this website, and other services added in the future, and
                      may also be referred to as the “Service,” or “Platform.”{" "}
                      <br />
                      5. “Media” refers to any media uploaded to the Service,
                      including photo and video in 2D or 3D, VR Media, audio,
                      livestream material, data, metadata, text, messages,
                      comments, reactions, and any other relevant Media that
                      take the form of a non-fungible token. <br />
                      6. “User” refers to any and all users of our Service,
                      including Creators. <br />
                      7. “Seller” refers to the selling party in a transaction
                      for Media or Content. Includes Creators selling media, or
                      newly minted content, and Users that are reselling content
                      purchased on the Platform.
                    </Typography>
                  </Container>
                  7. License of Content: Once the payment for a transaction is
                  confirmed, a limited license to access the purchased Content
                  will be granted or transferred, depending on the Status of the
                  Seller. If the Seller is the Original Creator the license will
                  be granted to the buyer. If the seller is not the Original
                  Creator the license will be transferred to the buyer.
                </Typography>{" "}
              </Container>{" "}
              <br />
              The license granted is a worldwide, non-sublicensable,
              non-exclusive, non-transferable, royalty-free, limited use license
              and permits the User to access, view, and resell, Content on the
              User’s Onlycam.Art Account, in accordance with the Acceptable Use
              Policy.
              <Container>
                <Typography variant="h4">
                  1. Application of License: The license granted applies only to
                  the extent that the User continues to own the applicable
                  Content. If at any time the User sells, transfers, or
                  otherwise disposes of Content, including Media, for any
                  reason, the license granted will immediately expire without
                  the requirement of notice, and you will have no further rights
                  in, or to, the Content or Media. <br />
                  2. Expiration of License: The license granted by a Creator to
                  a User is for the non-commercial personal use of the Content,
                  and will, without notice, expire automatically in the
                  following circumstances:
                  <Container>
                    <Typography variant="h4">
                      1. if the User transaction failed. <br />
                      2. at the end of a subscription period, unless
                      automatically renewed. <br />
                      3. if the User account is terminated for any reason.{" "}
                      <br />
                      4. Or, if the Content is removed under the “right to
                      moderate” reserved by the platform, under Section 7 of the
                      Creator Policy.
                    </Typography>
                  </Container>
                  3. Transfers of License: Sellers have the limited right to
                  transfer the licensed content provided that the transferee
                  accepts all of the terms of this agreement, Onlycam.Art’s
                  Terms of Service, and all policies incorporated by reference.
                  Under no circumstance will the Seller be allowed to transfer a
                  License that is greater, or less restricted, than the one
                  granted by the Creator. <br />
                  4. Ownership of Content: The Seller acknowledges and agrees
                  that the Creator owns all legal rights, title, and interest in
                  the Media or Content published by the Creator. The Buyer
                  agrees that the license of the Media or Content purchased does
                  not Grant the Buyer any rights in the Media or Content, beyond
                  that of personal, non-commercial use and enjoyment. <br />
                  5. Pricing: When a Buyer enters into a transaction for NFT
                  Content, the Buyer agrees to pay the Seller, in accordance
                  with the prices published by the Seller. <br />
                  6. Payments: Transactions Buyers conduct with Sellers,
                  including and principally Creators, typically for the
                  provision or resale of Content, including Media, accessible on
                  or viewable through our platform, may be conducted through the
                  Platform or through third party extensions, providers, or
                  protocols. Payments include purchases, auctions, and other
                  methods of transaction initiated on, through, or with use of,
                  the platform. <br />
                  7. No Refunds: Unless prohibited by law, the User acknowledges
                  that all transactions are final and no refunds shall be given.
                  This does not prohibit the voluntary giving of a refund in
                  instances of overpayment or error, but the Seller is under no
                  affirmative duty to do so. Buyers purchase content at their
                  own risk. Neither party to this contract warrants any third
                  party applications. <br />
                  8. Arbitration policy: the Buyer and Seller hereby agree to
                  the arbitration policy contained in Paragraph 8 of the Terms
                  of Service, and agree to submit all claims arising under this
                  contract, or use of the platform, to final and binding
                  arbitration in compliance with the same. <br />
                  9. Value and Volatility: The prices of “Crypto Content”
                  (“NFT’s”) are extremely volatile and subjective and
                  collectible blockchain assets have no inherent or intrinsic
                  value. Fluctuations in the price of other digital assets could
                  materially and adversely affect the value of NFT’s, which may
                  also be subject to significant price volatility. The Creator
                  cannot guarantee that any Content purchased will retain its
                  original value, as the value of collectibles is inherently
                  subjective and factors occurring outside of the ecosystem may
                  materially impact the value and desirability of any particular
                  NFT. <br />
                  10. Tax Calculations: The Parties are solely responsible for
                  determining what, if any, taxes apply to platform related
                  transactions. The platform is not responsible for determining
                  the taxes that apply to transactions. <br />
                  11. Inherent Risks with Internet Currency: There are risks
                  associated with using an Internet-based currency, including,
                  but not limited to, the risk of hardware, software and
                  Internet connections, the risk of malicious software
                  introduction, and the risk that third parties may obtain
                  unauthorized access to information stored within your
                  electronic wallet. You accept and acknowledge that we will not
                  be responsible for any communication failures, disruptions,
                  errors, distortions or delays you may experience when using
                  the platform, however caused. <br />
                  12. Software Risks: Upgrades to the Binance Smart Chain and
                  Ethereum, a hard fork in the Binance Smart Chain and Ethereum,
                  or a change in how transactions are confirmed on the Binance
                  Smart Chain or Ethereum may have unintended, adverse effects
                  on entities using the Binance Smart Chain’s and Ethereum NFT
                  standard, including Creators. <br />
                  13. Waiver. The Parties agree that failure to enforce any
                  provision of these Terms shall not constitute a waiver of
                  rights or responsibilities, on the part of either party, and
                  they shall have no obligation to promptly enforce any
                  provision of this agreement not otherwise mandated by law, and
                  they shall retain in perpetuity all of the rights and remedies
                  laid out by these Terms to the fullest extent permitted by
                  applicable law and the conditions of these Terms themselves.{" "}
                  <br />
                  14. Severability. The Parties accept the severability of these
                  Terms. If any or part of this Standard Contract Between
                  Creator and User are found to be unenforceable or inadmissible
                  by a relevant jurisdiction, that that clause shall be severed
                  from the Terms insofar as it’s unenforceable, without
                  affecting the remainder or spirit of these Terms, and that the
                  agreement will continue with respect to all remaining Terms
                  unaffected by the severance. <br />
                  15. Survival of Terms. The Parties agree these Terms shall
                  survive the termination of this agreement to the extent that
                  clauses of these terms and conditions are permissible to
                  survive the termination, as determined by applicable law.{" "}
                  <br />
                  16. Reliance on Third Parties. The Parties understand
                  transactions utilizing distributed ledger technology are
                  contingent upon third-party extensions and applications, such
                  as MetaMask, and through distributed ledgers (a blockchain)
                  such as the Binance Smart Chain, or Ethereum, networks.
                  Neither party to this contract warrants any third party
                  applications.
                </Typography>
              </Container>
            </Typography>{" "}
            <br />
            <Typography variant="h6">
              Notwithstanding the above, we may provide additional guidance on
              our understanding, definition, and interpretation of this contract
              through other means and channels as we see fit, including in
              particular through official technical and customer support
              channels and published memoranda, in addition to modifications to
              this contract. <br />
              We will endeavour to provide forthright and clear guidance on how
              best to use, and avoid the misuse of, our Service. If you have any
              questions or concerns about this contract, please reach out to us
              at support@onlycam.art for through other official support
              channels.
            </Typography>
            <br />
            <Typography variant="h5">Last Updated: April 21, 2022</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SellerBuyerPrivacy;
