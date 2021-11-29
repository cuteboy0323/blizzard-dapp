export const BuyTokenLink = "https://www.traderjoexyz.com/#/trade?inputCurrency=0xB147656604217a03Fe2c73c4838770DF8d9D21B8";
export const DocLink = "https://docs.blizzard.network";
export const TelegramLink = "https://t.me/BlizzardYield";
export const GithubLink = "https://github.com/Blizzard-AVAX/";
export const TwitterLink = "https://twitter.com/BlizzardAVAX?s=09";
export const MediumLink = "https://medium.com/@blizzardavalanche";
export const BugBountyLink = "https://immunefi.com/bounty/blizzardnetwork/";

export const updateIntervalDuration = 12000;
export const netId = 43114;
export const erc20 = require("../config/abis/erc20.json");

export const abi = {
    "joe": require("../config/abis/joe-token.json"),
    "avax": require("../config/abis/avax-token.json"),
    "png": require("../config/abis/png-token.json"),
    "usdc": require("../config/abis/usdc-token.json")
}

export const mintRate = 100;
export const swapFee = 1 - 0.0025;

export const soAPY = {
    "joe": 0.379,
    "avax": 0.21,
    "usdc": 0.22
}
export const avax = {
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
}

export const reward = {
    abi: {
        png: require("../config/abis/png-reward-pool.json"),
        spng: require("../config/abis/png-sas-reward-pool.json"),
        joe: require("../config/abis/joe-reward-pool.json"),
        ojoe: require("../config/abis/joe-reward-pool-o.json"),
        avax: require("../config/abis/avax-reward-pool.json")
    },
    address: {
        png: "0x574d3245e36Cf8C9dc86430EaDb0fDB2F385F829",
        spng: "0xD49B406A7A29D64e081164F6C3353C599A2EeAE9",
        ojoe: "0xd6a4F121CA35509aF06A0Be99093d08462f53052",
        joe: "0x188bED1968b795d5c9022F6a0bb5931Ac4c18F00",
        avax: "0xd0c23f8a3777d96e7561b0b5c5ce8b5afc0c2fa1"
    }
}

export const blizz = {
    abi: require("../config/abis/blizz.json"),
    address: "0xB147656604217a03Fe2c73c4838770DF8d9D21B8",
    price_address: "0xf72596354D0CFafc2891AFCDBB57995a9cf18AF0",
    price_abi: require("../config/abis/blizz-price.json")
}

export const networks = {   
    1: {
        chainId: 1,
        name: "Ethereum Mainnet"
    },
    3: {
        chainId: 3,
        name: "Ropsten Test Network"
    },
    4: {
        chainId: 4,
        name: "Rinkeby Test Network"
    },
    5: {
        chainId: 5,
        name: "Goerli Test Network"
    },
    42: {
        chainId: 42,
        name: "Kovan Test Network"
    },
    137: {
        chainId: 137,
        name: "Matic Network"
    },
    56: {
        chainId: 56,
        name: "Binance Smart Chain"
    },
    100: {
        chainId: 100,
        name: "xDai"
    },
    66: {
        chainId: 66,
        name: "OKEx"
    },
    1666600000: {
        chainId: 1666600000,
        name: "Harmony"
    },
    43114: {
        chainId: 43114,
        name: "Avalanche"
    },
}

export const Languages = [
    {
        id: "english",
        code: "us",
        name: "English"
    },
    {
        id: "russian",
        code: "ru",
        name: "Русский"
    },
    {
        id: "korean",
        code: "kr",
        name: "한국어"
    },
    {
        id: "japanese",
        code: "jp",
        name: "日本語"
    },
]
export const tokenList = [
    "blizz",
    "avalanche-2",
    "joe",
    "pangolin",
    "usd-coin",
    "weth"
];

export const tokens = [
    {
        id: "blizzard-network",
        name: "BLIZZ",
    },
    {
        id: "avalanche-2",
        name: "AVAX",
    },
    {
        id: "joe",
        name: "JOE",
    },
    {
        id: "pangolin",
        name: "PNG",
    },
    {
        id: "usd-coin",
        name: "USDC",
    },
    {
        id: "weth",
        name: "WETH"
    }
]