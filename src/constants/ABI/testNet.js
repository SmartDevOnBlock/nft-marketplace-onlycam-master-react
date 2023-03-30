export const NetworkContextName = "Kovan Test Network";
export const ACTIVE_NETWORK_ETH = 42;
export const ACTIVE_NETWORK_BNB = 97;
export const bscApiKey = "MSQGYEXNG19DG6DF6R6KXNJFQ6S2GEFFPW";
export const ethApiKey = "YFPX2UAJHFYKZ5S52URHJPXEIBIP2WAUT2";

export const RPC_URL =
  "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

export const RPC_URL_BNB = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export const MarketplaceContractSignatureETH =
  "0x3D3E856B5AA335a244dB2A18A878B8A8844f2830";

export const MarketplaceContractSignatureBNB =
  "0x2f0A75dccE29c78C1bfE85c40e54F74b6f5E2cE8";

export const MarketplaceContractETH =
  "0x7eAa8E8bb63b190E8aA7264b77ED4B86A132f93c";

export const MarketplaceContractBNB =
  "0x6CB2Bc51F59B1C20394838eDAFCAFfB5BC3f5C24";

export const deadAddress = "0x0000000000000000000000000000000000000000";

export const payableTokenAddewssBinanceBNB =
  "0x6Cf329be51eB137941eC60b602318116DbfF452b";
export const payableTokenAddewssBinanceBUSD =
  "0x21783C0Ce32e1859F6bccC6e575Ae6019765e443";
export const payableTokenAddewssBinanceOnlyCam =
  "0x639928999f491A21858Bb38adE14eAA19210a38F";
export const payableTokenAddewssEthereunETH =
  "0x6dE4Cb9136AEE1a258a9C4838bAB0C11c0f574Ba";

export const payableTokenAddewssEthereunETHLazy =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const payableTokenAddewssBinanceBNBLazy =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const approveAmount =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const getMarketplaceContractAddress = (chianId) => {
  switch (chianId.toString()) {
    case "42":
      return MarketplaceContractSignatureETH;
    case "97":
      return MarketplaceContractSignatureBNB;
  }
};

export const getPayableTokenContractAddress = (
  chianId,
  tokenName,
  isLazyMinting = ""
) => {
  switch (chianId.toString() + tokenName + isLazyMinting) {
    case "42ETHNo":
      return payableTokenAddewssEthereunETHLazy;
    case "97BNBNo":
      return payableTokenAddewssBinanceBNBLazy;
    case "42ETH":
      return payableTokenAddewssEthereunETH;
    case "42QWS":
      return payableTokenAddewssEthereunETH;
    case "97BNB":
      return payableTokenAddewssBinanceBNB;
    case "97BUSD":
      return payableTokenAddewssBinanceBUSD;
    case "56OnlyCam":
      return payableTokenAddewssBinanceOnlyCam;
  }
};

export const getNormalMarketplaceContractAddress = (chianId) => {
  switch (chianId.toString()) {
    case "42":
      return MarketplaceContractETH;
    case "97":
      return MarketplaceContractBNB;
  }
};

export const getNetworkDetails = (chianId) => {
  switch (chianId.toString()) {
    case "42":
      return [
        {
          chainId: "0x2A",
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
    case "97":
      return [
        {
          chainId: "0x61",
          chainName: "Smart Chain - Testnet",
          nativeCurrency: {
            name: "Smart Chain - Testnet",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls: [RPC_URL_BNB],
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
      ];
  }
};

export const networkList = [
  {
    name: "Kovan Test Network",
    chainId: "42",
    description: "",
    symbol: "ETH",
  },
  {
    name: "Smart Chain - Testnet",
    chainId: "97",
    description: "",
    symbol: "BNB",
  },
];
