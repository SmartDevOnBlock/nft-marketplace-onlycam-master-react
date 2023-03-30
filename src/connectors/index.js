import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { BinanceConnector } from "@bscswap/binance-connector";
import { RPC_URL, RPC_URL_BNB } from "src/constants";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URL,
    56: RPC_URL_BNB,
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000,
});

export const binanceinjected = new BinanceConnector({
  supportedChainIds: [56, 97],
});

export const SUPPORTED_WALLETS = [
  {
    name: "METAMASK",
    data: {
      connector: injected,
      name: "MetaMask",
      iconName: "/images/metamask.png",
      description: "Easy-to-use browser extension.",
      href: null,
      color: "#E8831D",
    },
  },
  {
    name: "Wallet Connect",
    data: {
      connector: walletconnect,
      name: "Wallet Connect",
      iconName: "/images/walletconnect.png",
      description: "Easy-to-use browser extension.",
      href: null,
      color: "#E8831D",
    },
  },
  // {
  //   name: "BINANCE",
  //   data: {
  //     connector: binanceinjected,
  //     name: "Binance Smart Chain",
  //     iconName: "/images/binance.png",
  //     description: "A Crypto Wallet for Binance Smart Chain",
  //     href: null,
  //     color: "#F9A825",
  //   },
  // },
];
