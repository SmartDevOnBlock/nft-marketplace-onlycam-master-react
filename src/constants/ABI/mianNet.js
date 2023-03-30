export const NetworkContextName = "Smart Chain";
export const ACTIVE_NETWORK_ETH = 1;
export const ACTIVE_NETWORK_BNB = 56;
export const bscApiKey = "MSQGYEXNG19DG6DF6R6KXNJFQ6S2GEFFPW";
export const ethApiKey = "YFPX2UAJHFYKZ5S52URHJPXEIBIP2WAUT2";

export const RPC_URL = "https://mainnet.infura.io/v3";

export const RPC_URL_BNB = "https://bsc-dataseed.binance.org/";

export const MarketplaceContractSignatureETH =
  "0x350e497892d15e6dd8ed9d4149038b1efc648cad";

export const MarketplaceContractSignatureBNB =
  "0x2Cd58E7C7249f3f8868F15FfC41d367E9F465eC1";

export const MarketplaceContractETH =
  "0x9722b20702D66Fe1fd01B4D7C8848AC09679A6B2";

export const MarketplaceContractBNB =
  "0x21a928154f3b60189bd06e5b187b9dff5d8849a2";

export const deadAddress = "0x0000000000000000000000000000000000000000";

export const payableTokenAddewssBinanceBNB =
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const payableTokenAddewssBinanceBUSD =
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
export const payableTokenAddewssBinanceOnlyCam =
  "0x639928999f491A21858Bb38adE14eAA19210a38F";
export const payableTokenAddewssEthereunETH =
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const payableTokenAddewssEthereunETHLazy =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const payableTokenAddewssBinanceBNBLazy =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const approveAmount =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const getMarketplaceContractAddress = (chianId) => {
  switch (chianId.toString()) {
    case "1":
      return MarketplaceContractSignatureETH;
    case "56":
      return MarketplaceContractSignatureBNB;
  }
};

export const getPayableTokenContractAddress = (
  chianId,
  tokenName,
  isLazyMinting = ""
) => {
  switch (chianId.toString() + tokenName + isLazyMinting) {
    case "1ETHNo":
      return payableTokenAddewssEthereunETHLazy;
    case "56BNBNo":
      return payableTokenAddewssBinanceBNBLazy;
    case "1ETH":
      return payableTokenAddewssEthereunETH;
    case "1QWS":
      return payableTokenAddewssEthereunETH;
    case "56BNB":
      return payableTokenAddewssBinanceBNB;
    case "56BUSD":
      return payableTokenAddewssBinanceBUSD;
    case "56OnlyCam":
      return payableTokenAddewssBinanceOnlyCam;
  }
};

export const getNormalMarketplaceContractAddress = (chianId) => {
  switch (chianId.toString()) {
    case "1":
      return MarketplaceContractETH;
    case "56":
      return MarketplaceContractBNB;
  }
};

export const getNetworkDetails = (chianId) => {
  switch (chianId.toString()) {
    case "1":
      return [
        {
          chainId: "0x1",
          chainName: "Kovan Test Network",
          nativeCurrency: {
            name: "Kovan Test Network",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: [RPC_URL],
          blockExplorerUrls: ["https://ropsten.etherscan.io"],
        },
      ];
    case "56":
      return [
        {
          chainId: "0x38",
          chainName: "Smart Chain",
          nativeCurrency: {
            name: "Smart Chain",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls: [RPC_URL_BNB],
          blockExplorerUrls: ["https://bscscan.com"],
        },
      ];
  }
};

export const networkList = [
  {
    name: "Ethereum Mainnet",
    chainId: "1",
    description: "",
    symbol: "ETH",
  },
  {
    name: "Smart Chain",
    chainId: "56",
    description: "",
    symbol: "BNB",
  },
];
