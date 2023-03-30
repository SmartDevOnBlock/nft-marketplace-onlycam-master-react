import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArbitrationPolicy from "../Arbitrationploicy/ArbitrationPolicy";
import CreatorPrivacy from "../Privacy/CreatorPolicy";
import Privacy from "../Privacy/Privacy";
import SellerBuyerPrivacy from "../Privacy/SellerBuyerPolicy";
import UserPolicy from "../userpolicy/UserPolicy";
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
export default function Term() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreator, setIsOpenCreator] = useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);
  const [isOpenSeller, setIsOpenSeller] = useState(false);
  const [isOpenServices, setIsOpenServices] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);

  const classes = useStyles();
  return (
    <Box className={`${classes.root} termParent`}>
      <Container>
        <Box className={classes.colorbox} mt={5}>
          <Box className={classes.heading}>
            <Typography variant="h1">Terms Of Service</Typography>
          </Box>
          <Box className={classes.details} mt={2}>
            <Typography variant="h4">
              By accessing our Platform or using our Service, including
              registering for a User Account, you agree to these Terms of
              Service. If you do not agree to these Terms of Service you are
              prohibited from using our websites and must leave now. <br />
              <br />
              Introduction: Welcome to the OnlyCam.art website, we ask that you
              carefully read all of the following terms, which you agree shall
              govern our relationship as you use our Services. OnlyCam.art is an
              adult-only NFT marketplace, allowing users to monetize and share
              their adult content with each other in NFT format, and to network
              with each other. Only Cam LLC is a registered Saint Vincent and
              the Granadines corporation. Registered mailing address: P.O Box
              1574, Kingstown, VC0100, St Vincent and the Granadines These Terms
              shall be governed by the laws and regulations of St Vincent and
              the Granadines. Should you have any questions or concerns
              regarding our website or Services, you seek to report a violation
              of our Terms of Service, or for general information and inquiries,
              please contact us at support@onlycam.art. <br /> <br />{" "}
              Interpretation: OnlyCam is the property of OnlyCam, LLC, who owns
              and operates the OnlyCam websites and related intellectual
              property (“we”, “us”, “our”, the “Company”).
            </Typography>{" "}
            <br />
            <Container>
              <Typography variant="h4">
                1. “Creator” refers to any User who has requested and been
                approved for the uploading, posting, participation, or
                benefacting in Content accessible on our Service, and may also
                be referred to as “you” or “your” in the context of these Terms.
                <br /> 2. “Crypto/NFT Content” ( or “Content”) refers to any
                Media that may take the form of non-fungible or fungible tokens,
                and be implemented on the Binance Smart Chain, Ethereum, or
                similar distributed ledger technology using smart contracts, and
                which is accessible through our Service.
                <br />
                3. “Media” refers to any content uploaded to the Service,
                including media such as, but not limited to, photo and video in
                2D or 3D, VR media, audio, livestream material, data, metadata,
                text, messages, comments, reactions, and any other relevant
                media.
                <br />
                4. “Platform” refers to our websites at only.cam and
                onlycam.art, subdomains of these websites, and other websites
                added in the future. <br />
                5. “Sales” refers to the process by which we help Users locate
                and initiate transactions for Media, or Crypto Content
                facilitated by third-party extensions and fulfilled by
                distributed ledger technology, such as Binance Smart Chain,
                Ethereum, or similar distributed ledger. See our Sales Process
                section for more information.
                <br />
                6. “Service” refers to our services provided through only.cam
                and onlycam.art services offered at subdomains of these
                websites, and other services added in the future. <br />
                7. “Terms of Service” (your agreement with us) refers to the
                entire legally binding agreement between us, known collectively
                as these “Terms,” and includes: <br />
                <Container>
                  1. the “Acceptable Use Policy,” <br />
                  2. the “
                  <span
                    style={{ color: "#3B0D60", cursor: "pointer" }}
                    variant="h4"
                    // onClick={onClickHandler}
                    onClick={() => setIsOpen(true)}
                  >
                    Arbitration Policy
                  </span>{" "}
                  ,” <br />
                  3. the “
                  <span
                    variant="h4"
                    style={{ color: "#3B0D60", cursor: "pointer" }}
                    onClick={() => setIsOpenCreator(true)}
                  >
                    Creator Policy
                  </span>
                  , <br />
                  4. the “
                  <span
                    variant="h4"
                    style={{ color: "#3B0D60", cursor: "pointer" }}
                    onClick={() => setIsOpenPrivacy(true)}
                  >
                    Privacy Policy
                  </span>{" "}
                  ,”
                  <br />
                  5. the “
                  <span
                    variant="h4"
                    style={{ color: "#3B0D60", cursor: "pointer" }}
                    onClick={() => setIsOpenSeller(true)}
                  >
                    Standard Contract Between Buyer and Seller
                  </span>{" "}
                  ” <br />
                  6. these “<span variant="h4">Terms of Service</span> ,” <br />
                  7. and, the “
                  <span
                    variant="h4"
                    style={{ color: "#3B0D60", cursor: "pointer" }}
                    onClick={() => setIsOpenAccount(true)}
                  >
                    User Account Policy
                  </span>{" "}
                  ”. <br />
                </Container>
                <br />
                8. “User” refers to any and all users of our Service, including
                Creators, also referred to as “you” or “your”. <br />
                9. “User Payments” refers to the third-party transactions Users
                conduct with other Users, including and principally Creators,
                typically for the provision or resale of Content accessible on
                or viewable through our Service. These include but are not
                limited to purchases, subscriptions, tips, auctions, and other
                methods of transaction facilitated by third-party extensions,
                enabled by distributed ledger technology, and initiated on or
                through our Service, collectively referred to in the Sales
                process as User Payments.
              </Typography>
            </Container>
            <br />
            <br />
            <Typography variant="h4">
              Acceptance: By accessing our Platform or using our Service, you
              agree that you have read and understand our Terms of Service, and
              agree to its terms and conditions, including:
              <Container>
                <Typography variant="h4">
                  1. You understand that our Services are prohibited to, and not
                  intended for, minors.You represent that you are both at least
                  18-years old, and the minimum age of majority for the
                  consumption of adult material in your jurisdiction of
                  residence. <br />
                  2. You are prohibited from using our Service if you cannot or
                  are not able to accept the entirety of these Terms, to the
                  extent required by all applicable laws.
                  <br />
                  3. We bear no responsibility for ensuring your compliance with
                  this agreement is acceptable and legal in your jurisdiction.
                  Moreover, you understand and agree that you are responsible
                  for ensuring you have the necessary hardware and software
                  technology to access and utilize our Service, such as but not
                  limited to third-party extensions or applications. <br />
                  4. You are not permitted to share your password or account
                  access information with third-parties, to share accounts, or
                  to utilize multiple accounts. Users are responsible for
                  diligently following best practices to secure their own
                  personal information and access information to the best of
                  their ability.
                  <br />
                  5. You understand that third-party extensions are not provided
                  by us and are governed by their own Terms of Service and
                  Privacy Policy. By performing a User Payment facilitated by a
                  third-party extension, initiated on our Platform, you are
                  agreeing that you understand and consent to the Terms of
                  Service and Privacy Policy of these third-parties. <br />
                  6. You agree that OnlyCam.art serves as a NFT marketplace
                  network through which Users and Creators can initiate and
                  perform Sales of Content, fulfilled by third-party extensions,
                  and is not in any way a brokerage, financial institution,
                  trading entity, or any other form of direct market or direct
                  payment processor. <br />
                </Typography>
              </Container>
              <Typography variant="h4">
                Finally, to reiterate, our website is not intended for minors or
                anyone under the legal age of majority for adult content
                consumption in their jurisdiction. If you are not an adult you
                cannot use our Service.
                <br />
                <br />
                Modification of the Terms of Service: We reserve the right to
                amend these Terms of Service at any time, with or without
                notice, and it is your responsibility to review these Terms of
                Service for any changes. Your use of the Website following any
                amendment of these Terms of Service will signify your assent to
                and acceptance of its revised terms. If you do not agree to, or
                cannot agree to any revised Terms as and when they happen, you
                may not continue to use the Service. When possible we will
                notify you of any modifications of these Terms ahead of time,
                providing you with the opportunity to review the updated Terms
                prior to their implementation, and to suspend or terminate your
                participation in this agreement at any time beforehand according
                to the conditions set forth in these Terms prior to their
                planned modification <br />
                <br />
                Regarding our Privacy Policy: Our Privacy Policy describes how
                we handle the information you provide to us when you use our
                platform. You agree that through your use of the Services you
                consent to the collection and use (as set forth in the Privacy
                Policy) of this information, including the transfer of this
                information to the United States, Canada, the UK and/or other
                countries for storage, processing and use by OnlyCam and its
                affiliates. <br />
                <br />
                Regarding our User Account Policy: Our User Account Policy
                describes how you register for a User Account, how we handle and
                manage your data, and the rights and obligations entailed by all
                parties. Please read, review, and refer to our User Account
                Policy as appropriate. You agree to know what data we collect
                and require for verification, to keep it updated, and to follow
                any and all other terms as set out by our User Account Policy.{" "}
                <br /> <br />
                Regarding our Creator Policy: Our Creator Policy describes how
                Creator’s may interact with the Platform. User’s that intend to
                post any Content as a Creator agree to our Creator Policy,
                including the terms and conditions to which their registration
                is subject, the reciprocal rights granted, and the obligations
                incurred by the parties. <br /> <br />
                Regarding our Arbitration Policy: <br />
                Our Arbitration Policy describes how, with limited exceptions,
                that any disputes arising under these Terms, or by use of the
                Platform, must be submitted to binding and final arbitration as
                described. Please ensure that you have carefully read and
                understood our Arbitration Policy.
                <Container>
                  <Typography variant="h4">
                    1. By using the Platform you agree that: <br />
                    2. You will only be permitted to pursue claims and seek
                    relief against us on an individual basis, not as a plaintiff
                    or class action member to any class or representative action
                    proceeding; and that, <br />
                    3. You are agreeing to mandatory and individual arbitration
                    for the resolution of disputes; and that, <br />
                    4. You are expressly waiving your right to a trial by jury.
                  </Typography>
                </Container>
                <br />
                Regarding our Acceptable Use Policy: Our Acceptable Use Policy
                governs the actions, conditions, and content we consider
                acceptable and obligations and commitments you make in turn by
                using our Platform. Our Acceptable Use Policy governs all
                prohibited usage and disallowed content. It is especially
                important that you are familiar with our Acceptable Use Policy
                as a Creator before attempting to upload or link any Media, or
                Content, to or through our Platform or Services, before doing
                so, to prevent any potential violation of prohibited use. The
                Service may include User generated Media, including but not
                limited to comments, messages, and tip notes that are not
                verified or approved by us, and the views and values expressed
                in any such Media do not represent our own. We will make best
                efforts to prevent the initiation of any unethical or illegal
                Media or Content upload or transaction. Anybody with evidence or
                suspicion of a violation of these Terms must report the
                violation to support@onlycam.art. <br /> <br />
                Please carefully read our entire Acceptable Use Policy,
                including any addendums, regular, or announced changes we make
                as necessary over time. <br />
                <br />
                Changes to the Website and Platform: We may make updates to the
                website and Services in the required course of both development,
                maintenance, and operation of the website and Services.
                Moreover, we may suspend, terminate, archive, or deactivate any
                portion of our website or Services at any time, at our sole
                discretion. You understand that the development on the Platform
                and Services are a continuingly iterative process, that changes
                will occur, additional features may be introduced or removed
                over time, and that new content may become available or cease to
                be available. <br /> <br />
                Maintenance and Service Interruptions: <br />
                We will attempt to notify you ahead of time of all website and
                Service maintenance, and any and all interruptions related to
                maintenance or other necessary downtime. We will notify you
                ahead of time for all scheduled, planned, and premeditated
                maintenance, which we hope shall be in all cases, but this is
                not guaranteed. It will not always be possible to notify you
                ahead of time. <br /> <br />
                You understand that service interruptions may arise
                spontaneously, preventing partial or whole access to the website
                and Services, in the normal course of operations. We shall not
                be liable for any failure or delay in the performance of
                services resulting from causes beyond our reasonable control,
                including without limitation such circumstances as war,
                terrorism, riots, embargoes, civil unrest, flood, fire, natural
                disaster, general strikes or labour disputes, shortages of
                material, or acts of god. <br />
                <br />
                We must also reinforce that we are not directly facilitating the
                provision of any assets, as Crypto Content is facilitated by
                distributed ledger technology such as through the Ethereum
                blockchain, or similar technology. As a result we cannot
                directly govern these networks, and have no influence over their
                network stability, functionality, maintenance, effectiveness, or
                survivability. We may be forced to perform our own maintenance
                by third-party extensions or blockchain networks, both scheduled
                and unscheduled. <br />
                <br />
                We cannot ensure that assets or transactions facilitated through
                distributed ledger technology will survive in perpetuity or
                operate consistently, and you understand that we serve only as a
                social media and marketplace platform to locate, search, and
                access content facilitated by third-parties, and to initiate
                Sales and User Payments using third-parties not associated with
                OnlyCam. <br />
                <br />
                The Support We Provide: <br />
                OnlyCam is dedicated to providing prompt communication to our
                Users. You can reach us for general inquiries, questions,
                concerns, criticism, and support, whether relating to these
                Terms and Privacy Policy, or to OnlyCam and the Service
                generally, at support@onlycam.art. If you wish to report a
                violation of our Terms of Service, including any relevant
                regulatory or legal limitations or exceptions as applicable to a
                particular jurisdiction, please contact us at
                support@onlycam.art. For other inquiries, social media
                networking, or support you can see our available, official
                social media channels and accounts listed on our website header
                and/or footer at support@onlycam.art These support channels are
                offered as a service, at our sole discretion, in addition to our
                direct contact information listed at the top of these Terms in
                the Introduction. For legal or business inquiries, please see
                our direct contact information. <br />
                <br />
                Suspension of Services and Accounts: <br /> <br />
                We may, at our sole discretion, suspend service to an individual
                User and or account, or any collection or list of accounts. We
                may do so in the course of and as necessary legal, regulatory,
                or business practice dictates, at our sole discretion. We may
                suspend, deactivate, or terminate a User’s Account temporarily
                or permanently for any confirmed, or on suspicions of,
                violations of our Terms of Service, where we deem appropriate
                and at our sole discretion. You agree that a suspension or
                termination of your account will prevent your access to our
                website and Services, and that it will prohibit you permanently
                from using our Services on any other account, from registering a
                new account with our services, or from accessing the website or
                Services in any other way.You may not resume using our Services
                at any point without our written authorization to do so. <br />
                <br />
                You agree that it is your responsibility to ensure your account
                remains used responsibly, is inaccessible to minors, and is not
                being abused for any illegal or unethical conduct, or for any
                other reason that we may deem inappropriate, at our sole
                discretion, including for no stated reason whatsoever, for the
                suspension or termination of services to your account. Following
                the suspension or termination of an account we may unlink,
                deactivate or otherwise delist, or handle a former Users Content
                in whatever way we see most appropriate, or as deemed
                appropriate by authorized law enforcement agencies. We will make
                commercially reasonable efforts, in our estimation, to contact
                you before any potential suspension or termination should be
                warranted and as any suspension or termination occurs. It is
                your responsibility to ensure accurate and up-to-date contact
                information is associated with your User Account, and to
                promptly action any necessary directives to prevent suspension
                or termination beforehand, such as requests to update or provide
                verifying identity information as permitted by our Privacy
                Policy, as well as to ensure the safeguarding against improper,
                unethical, or illegitimate use of your account. We are entitled
                to handle any User Media as we see fit following a suspension or
                termination, within the bounds permitted by our Privacy Policy,
                including archival, deletion, and submission to authorized law
                enforcement agencies as necessary. The company will only be
                responsible for the data protection required by current
                legislation. <br />
                <br />
                Our Ownership Rights: <br />
                <br />
                Unless otherwise provided for by us in writing, the Service and
                all content and material found on our website, including,
                without limitation, the OnlyCam branding and logo and all
                designs, text graphics, pictures, data, code, audio, or other
                media, and any other files and designs and the interface,
                arrangement and style of them, otherwise referred to as “media”,
                on our websites are the proprietary property of us or our
                affiliated partners, licensors or Users, as applicable. We will
                retain all rights not expressly granted to you or implied by the
                agreement of these Terms, or as required and granted by
                applicable law. <br />
                <br />
                Our Service includes or is facilitated partly or wholly by
                third-party applications, and technology, including distributed
                ledger technology such as Binance Smart Chain or Ethereum, and
                extensions such as for example MetaMask or similar, which are
                governed by their own licensing terms and usage terms relating
                to their software, and we retain the right to limit, prevent,
                encourage the usage of third-party applications and technology
                that is not directly governed by our terms or owned by
                ourselves, and we retain the right to directly integrate,
                package, partner with, or require the usage of third-party
                applications or technology with separate terms of usage as we
                see fit, at our sole discretion, in the course of conducting
                business. We retain any and all relevant rights over our
                trademark and branding, and they may be used by third-parties
                only with prior written authorization by us. It is your
                responsibility to understand and respect both our trademarks and
                copyright, as well as that of our partners and affiliates whose
                Media, Content, intellectual property, or other trademarked
                material may be visible or accessible through our site. <br />
                <br />
                Intellectual Property Rights: You affirm that you own the
                intellectual property, and rights, to any Media or Content you
                submit, you consent to all Media or Content, and you understand
                and consent to the submission of that Media or Content to us.
                You allow, and understand that we are allowed, to use and
                distribute any submitted Media or Content as permitted by these
                Terms and applicable law, and you authorize us to act on your
                behalf to moderate Media or Content in accordance with
                copyright. We may ask for your permission to use and reuse your
                Media or Content, as permitted by applicable law, for
                advertising and promotional purposes. The conditions governing
                this usage can be found in our Creator Policy where they are not
                otherwise covered by these Terms. We will only make use of your
                Media or Content for advertising or promotional purposes if you
                elect and opt-in to allowing us to do so. It is understood that,
                regardless of your revocable preference for opting-in for
                promotional purposes, we reserve the right to use and distribute
                your Media or Content in accordance with the normal operating
                procedures of our business, including but not limited to
                enabling access to legitimate Media and Content through our
                Platform as facilitated by ourselves, third parties, or
                distributed ledger technology, providing information,
                statistics, or reference to Media and Content, and as otherwise
                determined by us in the course of normal business and as allowed
                by these Terms. <br />
                <br />
                License to Use: <br /> Subject to the terms and conditions of
                this agreement, we hereby grant you a limited, non-exclusive,
                non-transferable, non-sublicensable, personal license to access
                and use our Services.
                <Container>
                  <Typography variant="h4">
                    1. This license has the sole purpose of enabling you to use
                    and enjoy the benefit of the Services as provided by
                    OnlyCam, in the manner permitted by these Terms. <br />
                    2. Licensees are expressly prohibited from: making any
                    derivatives of our Service, or; to data mine, extract or
                    gather, information, data, or code, or; to download any
                    portion of our own Service or other proprietary material or
                    Content, except where we permit as much in writing. <br />
                    3. You agree that we may revoke this license, at any time,
                    in our sole discretion, for any cause we deem sufficient,
                    without compensation or recourse to you. If you breach any
                    provision of these Terms of Service, any license you have
                    obtained will be automatically rescinded and terminated.
                  </Typography>
                </Container>{" "}
                <br />
                License to Hyperlink: <br /> We hereby grant you a limited,
                nonexclusive, and non-transferable right to use our website
                address for the creation of hyperlinks, posting hyperlinks to or
                from our websites or Service, and provided that any such
                references and linking does not portray us, OnlyCam, our
                branding, Creators, Users, or our affiliates or any related
                third-parties in a derogatory, defamatory, or otherwise
                misleading or inappropriate manner, including but not limited to
                illegal, offensive, harassing or otherwise harmful depictions or
                statements. <br />
                <br />
                You require our express written authorization before you may
                link to our website, or any other website, using our proprietary
                logo(s), branding, or other protected graphics as detailed in
                these Terms. Furthermore, you may not post or create a link that
                suggests a formal association or partnership with us, without
                our written authorization. We may revoke these limited rights to
                hyperlinking at any time, at our sole discretion.
                Notwithstanding the above, any individual with a registered,
                verified and compliant Creator account is hereby granted
                permission to hyperlink to our Services, and to use our branding
                or logos while hyperlinking or otherwise directing traffic to
                the Services, including for the commercial purposes of marketing
                and monetizing their Media or Content through our Services.{" "}
                <br />
                <br />
                Sales Process: <br />
                Creators - The Platform acts as a service provider for Creators
                to distribute Media and mint Content, and to market and monetize
                that Media and Content to Users. Creators may provide to Users
                chat or messaging services, or other goods or services, not
                facilitated by distributed ledger technology directly, otherwise
                known as “Media”. Additionally, Creators may provide
                cryptographically secured, enabled, or distributed Content,
                which takes the form of a resalable digital asset, such as
                non-fungible tokens, otherwise known as “Content”. “Media” and
                “Content” are sold by the Creator and available for purchase by
                Users. The Platform is not a party to the sale, but merely acts
                to facilitate the transaction by bringing together Creators and
                Users. Sales are subject to the “Standard Contract between
                Creator and User”, unless otherwise agreed, by the parties to
                the sale. <br /> Users - We act as a service provider for users
                to browse, locate, view, and bid on, or purchase, Media and
                Content. We act as a marketplace and platform service provider
                for the marketing and monetization of these third-party or
                direct-to-consumer services, including the resale, trading,
                collecting, listing, enjoyment and use of Crypto Content between
                all users. <br />
                <br />
                Fee Structure - Content and Auctions: <br /> Sellers of Content-
                Sellers receive 90% of the purchase price minus whatever royalty
                fee has been set by the original creator of the NFT(in the case
                of secondary sales) in direct and auction sales of Content,
                whether the purchase is consummated using $ONLY, BUSD or ETH.
                “Sellers” includes Creators selling newly minted Content, and
                the resale of Content by a User. The remaining 10% of the
                proceeds are the platform fee for facilitating the transaction,
                which is used for continuous maintenance, marketing and referral
                programs. <br />
                <br />
                Royalties – Royalties are a fee that the original creator of an
                NFT sets at the time of creation, this Royalty % fee will be
                automatically paid to the original creator of the NFT upon every
                secondary sale and automatically deducted from the total
                proceeds of the sale, the remaining total, after Royalty
                deduction, will then be distributed between Seller (90%) and
                OnlyCam.art (10%) <br />
                <br />
                Fee Structure - All other Media: <br />
                Users of the Platform have the opportunity to purchase Media
                from Creators in the form of photo and video in 2D or 3D, VR
                media, audio, chat, super chat, livestream material, data,
                metadata, text, messages, comments, reactions, and any other
                media that the parties agree upon. In all sales, the creator
                will receive 90% of the purchase price paid (minus royalty), and
                the remaining 10% will be paid to the Platform for facilitating
                the transaction.
                <Container>
                  <Typography variant="h4">
                    1. No Representations Made: We have made no representations
                    or warranties beyond these Terms and those required by
                    governing law, and have entered into this agreement with you
                    in good faith. We have made no representations of liability
                    for, and we are not liable for, any loss or gain in the
                    purchasing power or analogous metrics of any asset
                    facilitated by distributed ledger technology, which may
                    otherwise be known as a cryptocurrency, digital asset,
                    fungible or non-fungible token, or utility token, which may
                    be useable with third party utilities and extensions such as
                    MetaMask, or similar, to facilitate payments, barter,
                    tipping, or other blockchain-enabled transaction methods,
                    that our Platform may provide access to.
                  </Typography>
                </Container>
              </Typography>
            </Typography>{" "}
            <br />
            <br />
            <Typography variant="h3">
              Disclaimers: <br />
              YOU USE THE WEBSITE AT YOUR SOLE RISK. WE PROVIDE THE WEBSITE "AS
              IS" AND "AS AVAILABLE". TO THE FULLEST EXTENT PERMITTED BY LAW,
              THE ONLYCAM WEBSITES DISCLAIM ALL WARRANTIES OF ANY KIND RELATED
              TO THE WEBSITE AND GOODS OR SERVICES OBTAINED THROUGH THE WEBSITE,
              WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE
              IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON-INFRINGEMENT. YOU WILL BE SOLELY RESPONSIBLE FOR
              ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS
              FROM YOUR USE OF THE WEBSITE. WE MAKE NO WARRANTY OR
              REPRESENTATION ABOUT THE ACCURACY OR COMPLETENESS OF THE WEBSITE’S
              CONTENT OR THE CONTENT OF ANY SITES LINKED TO THE WEBSITE OR THAT
              THE WEBSITE WILL MEET YOUR REQUIREMENTS AND ASSUME NO LIABILITY OR
              RESPONSIBILITY FOR ANY:
              <Container>
                <Typography variant="h3">
                  1. YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE
                  SERVICES; <br />
                  2. ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES,
                  INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE OR
                  ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES; <br />
                  3. ANY CONTENT OBTAINED FROM THE SERVICES; OR (iv)
                  UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS
                  OR CONTENT.
                </Typography>
              </Container>{" "}
              <br />
              IN NO EVENT SHALL THE AGGREGATE LIABILITY OF ONLYCAM ENTITIES
              EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS (U.S. $100.00) OR
              THE AMOUNT OF FEES PAID TO ONLYCAM ON THE TRANSACTION IN DISPUTE.
              THE LIMITATIONS OF THIS SUBSECTION SHALL APPLY TO ANY THEORY OF
              LIABILITY, WHETHER BASED ON WARRANTY, CONTRACT, STATUTE, TORT
              (INCLUDING NEGLIGENCE) OR OTHERWISE, AND WHETHER OR NOT ONLYCAM
              ENTITIES HAVE BEEN INFORMED OF THE POSSIBILITY OF ANY SUCH DAMAGE,
              AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF
              ITS ESSENTIAL PURPOSE. <br /> <br />
              Indemnification: <br /> TO THE MAXIMUM EXTENT PERMITTED BY
              APPLICABLE LAW, YOU AGREE TO DEFEND, INDEMNIFY AND HOLD HARMLESS
              THE WEBSITE, ITS SITE OPERATOR, ITS PARENT CORPORATION, ITS
              AFFILIATES, LICENSORS, SERVICE PROVIDERS, OFFICERS, DIRECTORS,
              EMPLOYEES, AGENTS, SUCCESSORS AND ASSIGNS FROM AND AGAINST ANY AND
              ALL CLAIMS, DAMAGES, JUDGMENTS, AWARDS, OBLIGATIONS, LOSSES,
              LIABILITIES, COSTS OR DEBT, AND EXPENSES (INCLUDING BUT NOT
              LIMITED TO ATTORNEY’S FEES) ARISING FROM:
              <Container>
                <Typography variant="h3">
                  1. YOUR USE OF AND ACCESS TO THE WEBSITE; <br />
                  2. YOUR VIOLATION OF ANY TERM OF THESE TERMS OF SERVICE;
                  <br />
                  3. YOUR VIOLATION OF ANY THIRD PARTY RIGHT, INCLUDING WITHOUT
                  LIMITATION ANY COPYRIGHT, PROPERTY, OR PRIVACY RIGHT; OR{" "}
                  <br />
                  4. ANY CLAIM THAT YOUR CONTENT CAUSED DAMAGE TO A THIRD PARTY.
                </Typography>
              </Container>{" "}
              <br />
              THIS DEFENSE AND INDEMNIFICATION OBLIGATION WILL SURVIVE THESE
              TERMS OF SERVICE AND YOUR USE OF THE WEBSITE. YOU AGREE THAT WE
              SHALL HAVE THE SOLE RIGHT AND OBLIGATION TO CONTROL THE LEGAL
              DEFENSE AGAINST ANY SUCH CLAIMS, DEMANDS, OR LITIGATION, INCLUDING
              THE RIGHT TO SELECT COUNSEL OF OUR CHOICE AND TO COMPROMISE OR
              SETTLE ANY SUCH CLAIMS, DEMANDS, OR LITIGATION.
            </Typography>
            <br />
            <Typography variant="h5">
              Assumption of Risk: <br />
              <br />
              <Container>
                <Typography variant="h4">
                  1. Value and Volatility. The prices of NFT’s (“Crypto
                  Content”) are extremely volatile and subjective and
                  collectible blockchain assets have no inherent or intrinsic
                  value. Fluctuations in the price of other digital assets could
                  materially and adversely affect the value of NFT’s, which may
                  also be subject to significant price volatility. We cannot
                  guarantee that any Content purchased will retain its original
                  value, as the value of collectibles is inherently subjective
                  and factors occurring outside of the ecosystem may materially
                  impact the value and desirability of any particular NFT.{" "}
                  <br />
                  2. Tax Calculations. You are solely responsible for
                  determining what, if any, taxes apply to your platform related
                  transactions. We are not responsible for determining the taxes
                  that apply to your transactions on the Platform. <br />
                  3. Inherent Risks with Internet Currency. There are risks
                  associated with using an Internet-based currency, including,
                  but not limited to, the risk of hardware, software and
                  Internet connections, the risk of malicious software
                  introduction, and the risk that third parties may obtain
                  unauthorized access to information stored within your
                  electronic wallet. You accept and acknowledge that we will not
                  be responsible for any communication failures, disruptions,
                  errors, distortions or delays you may experience when using
                  the platform, however caused. <br />
                  4. Regulatory Uncertainty. The regulatory regime governing
                  blockchain technologies, cryptocurrencies and tokens is
                  uncertain, and new regulations or policies may materially
                  adversely affect the development of the OnlyCam ecosystem, and
                  therefore the potential utility or value of the Platform.{" "}
                  <br />
                  5. Software Risks. Upgrades to the Binance Smart Chain or
                  Ethereum chain, a hard fork in the Binance Smart Chain or
                  Ethereum Chain, or a change in how transactions are confirmed
                  on the Binance Smart Chain or Ethereum Chain may have
                  unintended, adverse effects on entities using the Binance
                  Smart Chain’s or Ethereum Chain’s NFT standard, including
                  OnlyCam.art. <br />
                  <br />
                  General: <br />
                  <br />
                  1. Waiver. You agree that failure to enforce any provision of
                  these Terms shall not constitute a waiver of rights or
                  responsibilities, on the part of either party, and we shall
                  have no obligation to promptly enforce any provision of this
                  agreement not otherwise mandated by law, and we shall retain
                  in perpetuity all of our rights and remedies laid out by these
                  Terms to the fullest extent permitted by applicable law and
                  the conditions of these Terms themselves. <br />
                  2. Severability. You accept the severability of these Terms of
                  Service. If any or part of these Terms are found to be
                  unenforceable or inadmissible by a relevant jurisdiction, that
                  that clause shall be severed from the Terms insofar as it’s
                  unenforceable, without affecting the remainder or spirit of
                  these Terms, and that the agreement will continue with respect
                  to all remaining Terms unaffected by the severance. <br />
                  3. Survival of Terms. You agree these Terms shall survive the
                  termination of this agreement to the extent that clauses of
                  these terms and conditions are permissible to survive the
                  termination, as determined by applicable law. This means that
                  if we suspend or terminate your account, you are still
                  obligated to respect certain terms and conditions, including
                  but not limited to those Terms of indemnification and
                  limitation of liability, the jurisdiction of governing law
                  applied to this agreement, any confidentiality obligations
                  arising from your use of the Service and related Terms, and
                  other survivable Terms, insofar as they may be permitted by
                  law to survive the suspension or termination. <br />
                  4. Reliance on Third Parties. You understand transactions
                  utilizing distributed ledger technology are contingent upon
                  third-party extensions and applications, such as MetaMask, and
                  through distributed ledgers (a blockchain) such as the Binance
                  Smart Chain, or Ethereum, networks. OnlyCam does not warrant
                  any third-party applications. <br />
                  5. Throttling. In the course of protecting against malicious
                  third-parties we may limit or throttle access to the website
                  by regions or other profiling methods as necessary.
                </Typography>
              </Container>{" "}
              <br />
            </Typography>
            <Typography variant="h4">
              Notwithstanding the above, we may provide additional guidance on
              our understanding, definition, and interpretation of these Terms
              of Service through other means and channels as we see fit,
              including in particular through official technical and customer
              support channels and published memoranda, in addition to
              modifications to these Terms. <br /> <br />
              We will endeavor to provide forthright and clear guidance on how
              best to use, and avoid the misuse of, our Service. If you have any
              questions or concerns about these Terms of Service, please reach
              out to us at support@onlycam.art or through other official support
              channels.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Dialog
        open={isOpen}
        maxWidth="md"
        onClose={() => setIsOpen(false)}
        className="modalterm"
      >
        <DialogContent>
          <ArbitrationPolicy />
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        className="modalterm"
        open={isOpenCreator}
        maxWidth="md"
        onClose={() => setIsOpenCreator(false)}
      >
        <DialogContent>
          <CreatorPrivacy />
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => setIsOpenCreator(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        className="modalterm"
        open={isOpenPrivacy}
        maxWidth="md"
        onClose={() => setIsOpenPrivacy(false)}
      >
        <DialogContent>
          <Privacy />
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => setIsOpenPrivacy(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        className="modalterm"
        open={isOpenSeller}
        maxWidth="md"
        onClose={() => setIsOpenSeller(false)}
      >
        <DialogContent>
          <SellerBuyerPrivacy />
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => setIsOpenSeller(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        className="modalterm"
        open={isOpenAccount}
        maxWidth="md"
        onClose={() => setIsOpenAccount(false)}
      >
        <DialogContent>
          <UserPolicy />
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => setIsOpenAccount(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
