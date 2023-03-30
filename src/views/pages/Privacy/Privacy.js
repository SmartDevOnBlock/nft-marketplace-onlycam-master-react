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
const Privacy = () => {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} termParent`}>
      <Container>
        <Box className={classes.colorbox} mt={5}>
          <Box className={classes.heading}>
            <Typography variant="h1">Privacy Policy</Typography>
          </Box>
          <Box className={classes.details} mt={2}>
            <Typography variant="h4">
              We at Onlycam, LLC, our owners, subsidiaries, and agents
              (collectively “us,” “we,” “our,” the “Company”) respect your
              privacy, pseudonymity, and right to confidentiality. We welcome
              you to carefully review the following Privacy Policy concerning
              how we process, handle, and disclose any information we collect
              from you in the course of operating our websites and Services.
              Should you have any concerns or questions about our Privacy
              Policy, please see the final section of this Policy, “How To
              Contact Us”.
              <br /> Onlycam is a nft platform allowing age-verified, legal
              users to share and locate cryptographic assets and traditional
              adult content, distributed by third-party distributed ledger
              technology platforms or proprietary services, that can be
              acquired, viewed, or supported in exchange for subscription,
              tipping, or barter transactions that we help to initiate for both
              parties and which are fulfilled by third-party extensions and
              applications leveraging a distributed ledger.
              <br />
              This Privacy Policy will detail the personal and private
              information we collect from you in order to, and in the course of,
              operating our Service, registering and maintaining user accounts,
              and is applicable to our websites located at onlycam.art and
              only.cam, and the services, products, features, and official
              communications channels that we provide as auxiliary services to
              our websites, and any services that we may offer from time to time
              through our websites or official channels, including but not
              limited to our social media channels (for example Twitter,
              Instagram) and our community channels (for example Telegram,
              Discord), or otherwise through our interactions together in the
              course of doing business, all collectively referred to as the
              “Services”.
              <br />
              By using our Service you agree to the following Privacy Policy, so
              you must ensure you have carefully read and familiarize yourself
              with these terms and conditions, and the rights and obligations,
              they provide and entail. We may change this Privacy Policy from
              time to time and it is your responsibility to ensure you check
              periodically to remain informed of any changes to these
              conditions.
            </Typography>{" "}
            <br />
            <br />
            <Typography variant="h5">1.How We Acquire Your Data:</Typography>
            <Typography variant="h4">
              We acquire your data electronically:
              <Container>
                <Typography variant="h4">
                  1. from you directly, in the course of registering for a user
                  account and when we request it additional verification
                  information for necessary purposes, and; <br />
                  2. automatically and indirectly from you in the course of
                  using our website and Services, for example we will collect IP
                  addresses, regional and geographical information pertaining to
                  usage of the Service, browser types, third-party applications
                  used to interface with distributed ledger technology, and
                  similar anonymized or automatically collected usage
                  information, as well as using cookies to track user sessions
                  as permitted, and other usage data and related analytical
                  information, and; <br /> 3. from third-party extensions,
                  applications, services, and entities.
                </Typography>
              </Container>{" "}
              <br /> <br />
              In any case, there is a distinction between your private, personal
              information and anonymized data. We only collect, retain, use, and
              track personal information directly relevant to fulfilling our
              obligations as a service provider. <br /> <br />
              We will collect anonymized data and usage information, at our
              discretion, in accordance with permitted law and obligations and
              in the pursuit of best business practice.
            </Typography>
            <Typography variant="h5">2.What Data We Collect:</Typography>
            <Typography variant="h4">
              We collect identifying information, and any personal information
              necessary to satisfy KYC/AML (Know Your Customer and Anti-Money
              Laundering) laws and regulations, as applicable. <br /> <br />
              a.This will include your account username, full real name,
              personal alias, address, city, state, province, or country of
              residency, postal information, and any other identifying
              information; b.Verification information, and related documentation
              or information, such as driver’s license or driver’s license
              number, passport, social security or social insurance number, or
              other similar identifying information; <br /> <br />
              a.This will include your account username, full real name,
              personal alias, address, city, state, province, or country of
              residency, postal information, and any other identifying
              information; b.Verification information, and related documentation
              or information, such as driver’s license or driver’s license
              number, passport, social security or social insurance number, or
              other similar identifying information; <br />
              <br />
              We collect whatever information, data, or media you upload, post,
              or share to our website in or through the use of our Services,
              including but not limited to photo and video in 2D or 3D, VR
              media, audio, livestream material, data, metadata, text, and any
              other media that you might submit to us, pursuant to these Terms
              and in the course of carrying out our business. <br /> <br />
              At this time, we do not share any categories of personal
              information, as defined by California Consumer Records statue,
              with any third parties, with the exception of what is necessary to
              share with third party applications and extension for facilitating
              transactions or services, such as MetaMask, or as otherwise
              required by law or contractual obligations contained in our Terms
              of Service, such as with a third party KYC (Know Your Customer)
              identity and age verification services.
            </Typography>
            <Typography variant="h5">
              3.How We Use Your Data:
            </Typography> <br /> <br />
            <Typography variant="h4">
              We strive to provide an efficient and useful service, with
              tasteful, lawful, and ethical content delivery in a respectful
              social media environment, and to adapt readily and swiftly to
              shifting market conditions, legislative and regulatory
              requirements, and other unforeseen circumstances. To do so we
              collect, anonymize, and analyze user information to satisfy the
              following business and commercial practices: <br /> <br />
              a.Develop, operate and maintain our website and Services; <br />
              b.Enforce our Terms of Service and any parts constituent to them;
              <br />
              c.Comply with any and all applicable laws and regulations, and any
              valid requests by authorized law enforcement agencies;
              <br />
              d.Facilitate user account creation and registration, and the
              verification of personal information in accordance with applicable
              laws and regulations, for both Users and Creators; <br /> e.Secure
              your account and provide alternative access methods in the event
              of a password loss;
              <br /> f.Perform general administrative and management functions
              to ensure the efficiency and effectiveness of our operations and
              Service;
              <br />
              g.Identify who is, and is not, a legitimate user of our Service;
              <br /> h.To protect the rights, interests, and property, including
              intellectual property, of third-parties including our own users,
              as necessary and appropriate;
              <br /> i.Communicate with users of our Service, including but not
              limited to a user account, provided email address, or any other
              contact information provided as necessary in the pursuit of
              business practice or satisfying a valid request from an authorized
              law enforcement agency;
              <br /> j.Respond to inquiries, support requests, or to validate
              the identity of a third-party representative, using alternative
              means of communication as provided for in your account preferences
              or provided personal information; <br />
              k.Market, promote, advertise, as well as provide news updates,
              announcements, and other information to our users as permitted by
              law, including but not limited to email newsletters, promotional
              campaigns, and other concerted marketing efforts; <br />
              l.Perform any auditing of transactions initiated on or through the
              Service in relation to any user of our Service; <br />
              m.Protect the Service, and users of the Service, from unauthorized
              misuse of the Service or from violations of these Terms; <br />
              n.Perform our own quality assurance, quality control, and
              debugging as we deem appropriate in the course of normal business
              operations; <br />
              o.Detecting, preventing, and securing against security threats,
              breaches, and malicious behavior, including concerted denial of
              service attacks, malware, viruses, counterfeit or false
              information or representation, bots, scammers, phishers, and any
              illegal or unethical behavior; <br />
              p.Facilitate or provide access to third party distributed ledger
              technology for our users and affiliates, which may in turn
              facilitate asset exchange, financial transactions, or other third
              party services governed by the Terms of Service and Privacy
              Policies of those relevant extensions, applications, and
              technologies. <br />
            </Typography>
            <Typography variant="h5">
              4.What Data We Share and With Whom:
            </Typography>{" "}
            <Typography variant="h4">
              We only share your personal data where absolutely necessary, and
              only according to all relevant laws and regulations, and taking
              consideration of the trust you have provided. As such, we will
              never share your personal, private, sensitive, or confidential
              information with any unsuitable third parties. The information we
              might share is limited to identifying information, such as
              usernames, email addresses, blockchain addresses, IP addresses,
              browser cookies, to the extent they’re necessary, and whatever
              Media and Content you might elect to share with us. For example,
              we might share your wallet address with a distributed
              ledger-interfacing extension, and we might share your account
              username with other users, but we will not arbitrarily share your
              wallet address with other users publicly -- you may always elect
              in your account preferences to share that information yourself, if
              we provide you with the ability to do so. If you have any
              questions or concerns about what information we share and with
              who, please see the final section of this Policy, concerning How
              To Contact Us. We will only ever share your information with the
              following entities, and only to the extent necessary: <br />{" "}
              a.Government agencies, regulators, authorities, and law
              enforcement agencies, as called for by law in applicable
              jurisdictions; <br /> b.Third-party service providers, including
              but not limited to third-party extensions, applications, software,
              and interfaces, principally those that facilitate a transaction on
              the blockchain or distributed ledger technology, including for
              example MetaMask, or third-party identification and verification
              services; <br /> c.Third-party affiliates of ours, including
              partners and other entities, as constituted by our broader Terms
              of Service.
            </Typography>
            <Typography variant="h5">5.How We Protect Data:</Typography>
            <br /> <br />
            <Typography variant="h4">
              We use commercially feasible efforts and best practices in the
              security and protection of all Company data, including collected
              personal data and anonymised data, and any other data,
              information, Media, or intellectual property references under our
              purview. Protection of customer and consumer data, and especially
              the protection of user pseudonymity and confidentiality are of
              utmost concern to us. We understand and respect the rights of our
              users to their pseudonymity, confidentiality, and general data
              protection, and if you have any concerns, questions or comments
              relating to our information protection policies, please see the
              final section of the Privacy Policy, “How To Contact Us”. <br />{" "}
              We utilize encryption, backups, regular security audits, including
              pre-auditing of any smart contract code to be provisioned on a
              distributed ledger, and other industry best practices to ensure
              the security of our stored data. We may, at our discretion, and
              from time to time, make use of bounties, auditors, or third-party
              security analysis or auditing firms to test, evaluate, or provide
              other feedback on our security practices. Ultimately no digital
              safeguards can be verified to be completely secure or provide
              perfect protection, and while we endeavour to take every
              precaution we cannot guarantee that our security measures are or
              will be sufficient or effective at all times. We cannot warrant
              that the information you provide to us is now secure or will be
              secure in the future.
            </Typography>
            <Typography variant="h5">6.Your Rights and Choices:</Typography>
            <br /> <br />
            <Typography variant="h4">
              We at Onlycam.art hold ourselves to the highest standards of
              privacy and data protection, and afford to all users the same
              rights guaranteed by the EU’s General Data Protections Regulations
              articles 12-23 (“GDPR”), regardless of jurisdiction. Where we are
              not legally bound to GDPR compliance in all cases, we will
              nonetheless hold ourselves to the same high standard wherever
              commercially feasible. <br />
              To exercise any of your rights, or for any questions or concerns
              relating to your rights, please see the final section of this
              Privacy Policy, “How To Contact Us”. You may exercise your rights
              at any time, and we will do our best to action your requests
              promptly. In any case, we shall give all commercially feasible
              efforts to ensure compliance with GDPR. You have at least the
              following rights:
              <Container>
                <Typography variant="h4">
                  1. Right to Information: You have the right to know everything
                  about our processing of your information, including what
                  information we collect about you, how we collect it, what we
                  do with it and who we share it with, how long it may be stored
                  for, and under what legal basis. <br />
                  2. Right to Access: You have the right to ask about your data
                  and whether we have it, and to ask for a copy of any data of
                  yours that we may hold. This may also be known as a Subject
                  Access Request, which you may use in the subject of an email
                  sent to the agent responsible for our Privacy Policy. <br />
                  3. Right to Rectification: You have the right to ensure that
                  any data we hold is accurate and consistent, and you may
                  request or notify us at any time of inaccurate or incomplete
                  information and how we may rectify it. <br />
                  4. Right to Erasure: You have the right to request deletion of
                  any of your personal data, understanding that this is a
                  termination of your account and forfeiture of your right to
                  use our services. We may not be able to comply with your
                  request if your information is required for legal purposes or
                  by request of relevant authorities. If we cannot ensure your
                  Right to Erasure request, we will attempt to treat it as a
                  Right to Restriction of Processing. <br />
                  5. Right to Restriction of Processing: You have the right to
                  request we restrict how we process some or all of your
                  personal data in a particular way. We will satisfy these
                  requests to the extent that we are able and required to do so,
                  and will generally avoid doing anything with restricted data
                  but storing it as required. <br />
                  6. Right to Data Portability: You have the right to request
                  that we transfer to you any personal data which you have
                  optionally consented to providing, in a format that it may be
                  delivered to another provider, or otherwise stored, at your
                  discretion. <br />
                  7. Right to Object: You have the right to object to any direct
                  marketing, and we will act promptly if you object to any
                  direct marketing. In any case, our direct marketing efforts
                  will include methods to object, unsubscribe, opt-out, or
                  otherwise end further direct marketing efforts. <br />
                  8. The Right to Avoid Automated Decision-Making: You shall
                  have the right not to be subject to a decision based solely on
                  automated processing, including profiling, which produces
                  legal effects concerning you or similarly affects you. At this
                  time we do not employ automated decision making that impacts
                  your rights. If we do start using Automated Systems in the
                  future, this section will be updated accordingly.
                </Typography>
              </Container>{" "}
              <br />
              Further, you may have rights afforded by California Customer
              Records law, including to request that we provide you with a list
              of any and all categories of personal information that we have
              provided to third-parties and for direct marketing in the last
              calendar year. We do not sell to any third parties or direct
              marketers any categories of personal information. Note that while
              we can delete customer information and data held by us, we have no
              control over any data hosted using distributed ledger technology.
              This means any content minted to the blockchain as a digital asset
              is outside our control, whether it has been purchased or resold by
              a third party or not. Blockchain-enabled content cannot be
              destroyed, and your rights cannot be extended to such digital
              assets directly.
            </Typography>
            <Typography variant="h5">7.How To Contact Us:</Typography>
            <Typography variant="h4">
              If you have any questions or concerns about our Privacy Policy,
              wish to report a violation of this Privacy Policy by any user or
              individual, seek to avail yourself of any of your rights provided
              by these Terms or applicable law, or any other inquiry pertinent
              to your data, privacy rights, or this Privacy <br /> Policy
              generally, please contact us at the following: <br />{" "}
              privacy@onlycam.art <br /> Only Cam LLC is a registered Saint
              Vincent and the Granadines corporation. Registered mailing
              address: P.O Box 1574, Kingstown, VC0100, St Vincent and the
              Granadines. <br />
              <br />
              Notwithstanding the above, we may provide additional guidance on
              our understanding, definition, and interpretation of this Creator
              Policy through other means and channels as we see fit, including
              in particular through official technical and customer support
              channels and published memoranda, in addition to modifications to
              this Policy and these Terms. <br /> We will endeavour to provide
              forthright and clear guidance on how best to use, and avoid the
              misuse of, our Service. If you have any questions or concerns
              about these Terms or the Creator Policy, please reach out to us at
              support@onlycam.art or through other official support channels.
            </Typography>{" "}
            <br />
            <Typography variant="h5">Last Updated: April 21, 2022</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Privacy;
