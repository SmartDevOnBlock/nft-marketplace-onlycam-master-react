import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
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
  faqhead: {
    marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
  },
  title: {
    "& h4": {
      fontSize: "18px",
    },
  },
  description: {
    display: "flex",
    flexDirection: "column",
    "& h4": {
      fontSize: "14px",
      paddingTop: "15px",
    },
    "& h6": {
      fontSize: "14px",
      color: "#fff",
    },
  },
  icon: { color: "#fff" },
}));

export default function Faq() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading} mt={5}>
          <Typography variant="h1">Frequently Asked Questions</Typography>
        </Box>
        <Box mt={5}>
          <Accordion className={classes.faqhead}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.icon} />}
              className={classes.title}
            >
              <Typography variant="h4">
                1- How to I create an account on OnlyCam.art?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.description}>
              <Typography variant="h4">
                You'll need digital currency, a crypto wallet, and an
                Onlycam.art account to start buying or selling NFTs using our
                platform. Let's get started!
              </Typography>
              <Typography variant="h4">a- CRYPTO WALLET</Typography>
              <Typography variant="h4">
                A crypto wallet, such as TRUST WALLET, SAFEPAL and MetaMask,
                stores your coins / tokens ($ONLY, BNB, ETH, BUSD) and processes
                transactions on the different blockchains (in our case Binance
                Smart Chain or Ethereum). A unique wallet address will be
                generated for you, and you'll use this address to complete
                transactions.
              </Typography>
              <Typography variant="h4">
                All transactions connected to your wallet address can be found
                on bscscan.com (for Binance Smart Chain) or etherscan.io (for
                the Ethereum chain), an independent blockchain explorer. It's a
                good idea to check Etherscan after completing each transaction.
              </Typography>
              <Typography variant="h4">
                Please check our videos below on how to install and create
                METAMASK and TRUSTWALLET wallets:
              </Typography>
              <Typography variant="h4">METAMASK VIDEO:</Typography>
              <Typography variant="h4">TRUST WALLET VIDEO:</Typography>
              <Typography variant="h4">
                Why do I need a wallet before buying and selling on OnlyCam.art?
                OnlyCam.art is a tool you use to interact with the blockchain.
                We never take possession of your items or store your NFTs.
                Instead, we provide a system for peer-to-peer exchanges. Since
                you’ll be using OnlyCam.art to interact directly with others on
                the blockchain, you’ll need a wallet to help you turn your
                actions in the browser into transactions on the blockchain. Now
                that you have a crypto wallet installed, you can connect your
                wallet address to OnlyCam.art.
              </Typography>
              <Typography variant="h4">
                b- Digital Currency (BNB, $ONLY, ETH, BUSD)
              </Typography>
              <Typography variant="h4">
                Now that you have you wallet. You can get BNB or ETH, the
                digital currencies that fuels transactions on the blockchains we
                use (Binance Smart Chain and Ethereum). Those can be acquired
                directly from wallets like TRUST WALLET and SAFEPAL or from a
                digital currency exchange like Binance , Coinbase and Crypto.com
                . You will need our native token $ONLY, BNB or ETH to "mint" an
                NFT or purchase an NFT, and BNB or ETH for gas fees to complete
                transactions depending on the blockchain your NFT is at.
              </Typography>
              <Typography variant="h4">c- Connecting to OnlyCam.art</Typography>
              <Typography variant="h4">
                Let's connect your wallet to OnlyCam.art and edit your profile
                so you're ready to begin interacting on our platform. Navigate
                to OnlyCam.art, head to the top-right profile icon, and
                select CONNECT.
              </Typography>
              <Typography variant="h4">
                Select your preferred wallet to login – Use Metamask or choose
                Wallet Connect to connect through any WEB3 wallet, like TRUST
                WALLET or SAFEPAL
              </Typography>
              <Typography variant="h4">
                For Metamask, just select it using a browser where you have it
                installed and follow on-screen instructions.
              </Typography>
              <Typography variant="h4">
                For other wallets or if you would like to connect using QR
                Scanner – choose wallet connect and read the scanner from your
                favourite mobile wallet, like TrustWallet or SafePal.
              </Typography>
              <Typography variant="h4">
                To use METAMASK on Binance Smart Chain – please follow these
                steps here to add the MAINNET to your Metamask as it is not
                there by default. Alternatively use TRUST WALLET or SAFEPAL for
                an easier setup.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.faqhead}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.icon} />}
              className={classes.title}
            >
              <Typography variant="h4">
                2- What if my wallet is not connecting?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.description}>
              <Typography variant="h4">
                Sometimes your wallet extension and computer browser might get a
                little out of sync. We all need a reset sometimes!
              </Typography>
              <Typography variant="h4">
                Usually, wallet connection issues can be resolved by following
                these troubleshooting steps: 
              </Typography>
              <Container style={{ paddingTop: "1rem" }}>
                <ul>
                  <li style={{ color: "#fff", fontSize: "14px" }}>
                    Make sure your browser and wallet extension are fully
                    updated.
                  </li>
                  <li style={{ color: "#fff", fontSize: "14px" }}>
                    Clear your cache and restart your browser.
                  </li>
                  <li style={{ color: "#fff", fontSize: "14px" }}>
                    Make sure your wallet is set to Binance Smart Chain OR
                    Ethereum mainnet, with no ad blockers running, as they may
                    interfere.
                  </li>
                  <li style={{ color: "#fff", fontSize: "14px" }}>
                    Try to connect using a desktop computer browser, such as
                    Chrome.
                  </li>
                </ul>
              </Container>
              <Typography variant="h4">
                If you're still having issues, you can always reach out to our
                support team.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.faqhead}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.icon} />}
              className={classes.title}
            >
              <Typography variant="h4">
                3- How do I reset my login information?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.description}>
              <Typography variant="h4">
                You may be used to logging into an account with a username and
                password, but your account is a little different on
                OnlyCam.art. 
              </Typography>
              <Typography variant="h6">
                Your OnlyCam.art account is tied to your wallet. Each wallet you
                have connected to OnlyCam.art is its own account. It's important
                to note that OnlyCam.art isn't a wallet provider, so we never
                take possession of your assets or store your NFTs. Additionally,
                that means that we can't provide password resets.
              </Typography>
              <Typography variant="h6">
                In order to reset your password for your wallet, you'll need to
                contact your wallet provider directly. 
              </Typography>
              <Typography variant="h6">
                You can, however, edit the email address for your account by
                going to your profile section once connected and clicking on the
                Edit Profile menu.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.faqhead}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.icon} />}
              className={classes.title}
            >
              <Typography variant="h4">
                4- Which blockchains does OnlyCam.art support?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.description}>
              <Typography variant="h4">
                OnlyCam.art offers cross-blockchain support across the Ethereum
                and Binance Smart Chain blockchains. 
              </Typography>
              <Typography variant="h4">
                Lets talk about them a little bit:
              </Typography>
              <Typography variant="h4">
                Binance Smart Chain (BSC) is a blockchain network built for
                running smart contract-based applications. BSC runs in parallel
                with Binance’s native Binance Chain (BC), which allows users to
                get the best of both worlds: the high transaction capacity of BC
                and the smart contract functionality of BSC. 
              </Typography>
              <Typography variant="h4">
                Furthermore, Binance Smart Chain also implements the Ethereum
                Virtual Machine (EVM), which allows it to run Ethereum-based
                applications like MetaMask.
              </Typography>
              <Typography variant="h4">
                BNB is used to pay transaction fees (known as gas fees) on the
                BSC blockchain. OnlyCam.art has no say in setting gas fees -
                they are determined by supply/demand and fluctuate according to
                network usage.
              </Typography>
              <Typography variant="h6">
                Ethereum is a decentralized, open-source blockchain with smart
                contract functionality launched in 2015.
              </Typography>
              <Typography variant="h6">
                Ether is the native currency of the Ethereum network and it’s
                commonly abbreviated to ETH, which is its ticker
                symbol. Ethereum, like Bitcoin, currently uses a
                proof-of-work mining model. In proof-of-work, miners are
                decentralized computers that use their computing power to
                process and confirm transactions. In Ethereum, new transactions
                get added in "blocks" every 15 seconds. Miners are a built-in
                mechanism of the Ethereum blockchain and get paid in ETH. 
              </Typography>
              <Typography variant="h6">
                ETH is used to pay transaction fees (known as gas fees) on the
                Ethereum blockchain. OnlyCam.art has no say in setting gas
                fees - they are determined by supply/demand and fluctuate
                according to network usage.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.faqhead}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.icon} />}
              className={classes.title}
            >
              <Typography variant="h4">
                5- Video Tutorials (PLEASE EMBED THESE ON THE PAGE)
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.description}>
              <Typography variant="h4">
                a- How to install Trust Wallet and create your first crypto
                wallet -{" "}
                <a href="https://youtu.be/RNXj6KDPlLQ" target="_blank">
                  https://youtu.be/RNXj6KDPlLQ
                </a>
              </Typography>
              <Typography variant="h6">
                b- ALTERNATIVE TO STEP 1 (more advanced - if you have done step
                1, jump to step 3) --- How to install Metamask Wallet and add
                BSC mainnet to it -{" "}
                <a href="https://youtu.be/Re8bUWwIjFM" target="_blank">
                  https://youtu.be/Re8bUWwIjFM
                </a>
              </Typography>
              <Typography variant="h6">
                b- How to connect your wallet to Onlycam.art -{" "}
                <a href="https://youtu.be/kApLhQpjris" target="_blank">
                  https://youtu.be/kApLhQpjris
                </a>
              </Typography>
              <Typography variant="h6">
                d- How to become a content creator on OnlyCam.art -{" "}
                <a href=" https://youtu.be/Be-kEE3352I" target="_blank">
                  https://youtu.be/Be-kEE3352I
                </a>
              </Typography>
              <Typography variant="h6">
                e- How to create your first NFT on ONLYCAM.art -{" "}
                <a href="https://youtu.be/5cgnOb61W5Y" target="_blank">
                  https://youtu.be/5cgnOb61W5Y
                </a>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Box>
  );
}
