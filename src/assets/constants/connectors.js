import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
const RPC_URL = "https://api.avax.network/ext/bc/C/rpc";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 137, 56, 100, 66, 1666600000, 43114],
});

export const walletconnect = new WalletConnectConnector({
    rpc: { 43114: RPC_URL },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
});