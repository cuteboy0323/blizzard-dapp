import React, { useEffect, useState } from "react";

import Web3 from "web3";

import { useWeb3React } from "@web3-react/core";

// ** Import Material-Ui Components
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Import Components
import Cwallet from "../components/Cwallet";

// ** Import Assets
import { useApi } from "../hooks";
import Logo from "../assets/img/logo.png";
import useStyles from "../assets/constants/styles";

// ** Import Icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NetworkCellRoundedIcon from '@mui/icons-material/NetworkCellRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import OpenInBrowserRoundedIcon from '@mui/icons-material/OpenInBrowserRounded';
import NetworkCheckRoundedIcon from '@mui/icons-material/NetworkCheckRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

// ** Import Config
import { BuyTokenLink, tokens, DocLink, netId, blizz, networks } from "../config/app";
import { ConnectedWallet } from "../assets/constants/wallets";
import { useHistory } from "react-router-dom";

import {
    TelegramLink,
    GithubLink,
    TwitterLink,
    MediumLink
} from "../config/app";

const Header = () => {
    // ** Maintaiers
    const api = useApi();
    const classes = useStyles();
    const history = useHistory();
    // ** Context
    const cWallet = ConnectedWallet();
    const isMobile = useMediaQuery("(max-width:600px)");

    const { account, active, chainId, library } = useWeb3React();

    // ** State
    const [activeTab, setActiveTab] = useState("swap");
    const [balance, setBalance] = useState(0);
    const [market, setMarket] = useState({});
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const addBLIZZ = () => {
        if (window.ethereum) {
            window.ethereum
                .request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20', // Initially only supports ERC20, but eventually more!
                        options: {
                            address: "0xB147656604217a03Fe2c73c4838770DF8d9D21B8", // The address that the token is at.
                            symbol: "BLIZZ", // A ticker symbol or shorthand, up to 5 chars.
                            decimals: 18,
                            image: require("../assets/img/tokens/blizz.png").default
                        },
                    },
                });
        }
    }

    const switchNetwork = () => {
        if (window.ethereum) {
            window.ethereum
                .request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: `0x${netId.toString(16)}`,
                            chainName: "Avalanche Network",
                            rpcUrls: [
                                "https://api.avax.network/ext/bc/C/rpc",
                            ],
                            nativeCurrency: {
                                name: "AVAX",
                                symbol: "AVAX",
                                decimals: 18,
                            },
                            blockExplorerUrls: [
                                "https://cchain.explorer.avax.network/",
                            ],
                        },
                    ],
                });
        }
    };

    const updateMarket = async () => {
        try {
            let ids = null;
            let fmarket = {};
            for (let i in tokens) {
                const id = tokens[i].id;
                ids = ids ? ids += `,${id}` : ids = id;
            }
            const market = await api.getCurrentMarket(ids, "usd");
            for (let i in tokens) {
                const id = tokens[i].id;
                const findMarket = market.find(list => list.id === id);
                fmarket[id] = findMarket ? findMarket : {};
            }
            const market2string = JSON.stringify(fmarket);
            localStorage.setItem("cached-market", market2string);
            return fmarket;
        } catch (e) {
            const cache = localStorage.getItem("cached-market");
            if (cache) {
                const string2market = JSON.parse(cache);
                return string2market;
            } else {
                return {}
            }
        }
    }

    useEffect(() => {
        const pathName = location.pathname;
        const cpath = pathName.split("/")[1];
        setActiveTab(cpath);
    }, [history.location.pathname])

    useEffect(() => {
        if (active && chainId !== netId) {
            switchNetwork();
        }
    }, [active, chainId, account])

    useEffect(() => {
        let interval = null;
        (async () => {
            const markets = await updateMarket();
            setMarket(markets);
        })();
        interval = setInterval(async () => {
            const markets = await updateMarket();
            if (account && chainId === netId && library) {
                const web3 = new Web3(library.provider);
                const blizzC = new web3.eth.Contract(
                    blizz.abi,
                    blizz.address
                );
                const balance = web3.utils.fromWei(await blizzC.methods.balanceOf(account).call());
                setBalance(balance);
            }
            setMarket(markets);
        }, 20000);
        return () => clearInterval(interval);
    }, [account, chainId, library]);
    return (
        <AppBar position="static" className={classes.appbar}>
            {
                !isMobile && (
                    <Toolbar className="pre-header">
                        <Button
                            variant="text"
                            className="token-price"
                            color="secondary"
                            component="span"
                            disableRipple
                            style={{
                                color: "#96969b",
                                textTransform: "none"
                            }}
                            disableElevation
                            startIcon={
                                <img src="https://www.coingecko.com/favicon.ico" alt="coingeko" />
                            }
                        >
                            CoinGecko
                        </Button>
                        <Divider
                            orientation="vertical"
                            flexItem
                        />
                        <Tabs
                            value={false}
                            className="tabs"
                            indicatorColor="secondary"
                            textColor="secondary"
                            scrollButtons={true}
                            variant="scrollable"
                        >
                            {
                                tokens.map((item, idx) => {
                                    const cm = market[item.id] ? market[item.id] : {};
                                    const status = cm.price_change_24h > 0 ? true : false;
                                    return (
                                        <Tab
                                            key={idx}
                                            disableRipple
                                            label={
                                                <Button
                                                    variant="text"
                                                    className={
                                                        status ?
                                                            "token-price up" :
                                                            "token-price down"
                                                    }
                                                    color="secondary"
                                                    component="span"
                                                    disableRipple
                                                    disableElevation
                                                    startIcon={
                                                        <img src={cm.image} alt={cm.id} />
                                                    }
                                                    endIcon={
                                                        status ?
                                                            <ArrowDropUpRoundedIcon className="up-arrow" />
                                                            : <ArrowDropDownRoundedIcon className="up-down" />
                                                    }
                                                >
                                                    ${Number(cm.current_price ? cm.current_price : 0).toFixed(2)}
                                                    {"  "}
                                                    {`(${Number(cm.price_change_percentage_24h ? cm.price_change_percentage_24h : 0).toFixed(2)}%)`}
                                                </Button>
                                            }
                                        />
                                    )
                                })
                            }
                        </Tabs>
                        <Divider
                            orientation="vertical"
                            flexItem
                        />
                        <Box className="social-group">
                            <Link underline="none" href={TelegramLink} target="_blank">
                                <IconButton color="secondary" className="social-button">
                                    <TelegramIcon />
                                </IconButton>
                            </Link>
                            <Link underline="none" href={GithubLink} target="_blank">
                                <IconButton color="secondary" className="social-button">
                                    <GitHubIcon />
                                </IconButton>
                            </Link>
                            <Link underline="none" href={TwitterLink} target="_blank">
                                <IconButton color="secondary" className="social-button">
                                    <TwitterIcon />
                                </IconButton>
                            </Link>
                            <Link underline="none" href={MediumLink} target="_blank">
                                <IconButton color="secondary" className="social-button medium">
                                    <svg version="1.1" id="Bold"
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px" y="0px" viewBox="0 0 512 512">
                                        <path fill="rgb(191, 191, 191)" className="st0" d="M170.6,454.9c0,14.8-11.1,20.9-23.4,14.8L14.3,403.3c-4-1.9-7.4-5.1-10.1-9.5S0,384.9,0,380.5V55.7
                                c0-12.1,7.3-17.6,23.7-9.4l146,73C171.8,121.3,170.3,106.8,170.6,454.9L170.6,454.9z M188.9,149.4l152.6,246.8l-152.6-75.8
                                L188.9,149.4z M512,154.6v300.4c0,4.8-1.3,8.6-4,11.5c-2.7,2.9-6.3,4.4-10.9,4.4c-4.6,0-9-1.2-13.4-3.7l-126-62.7L512,154.6z
                                 M511.1,120.4c0,0.6-24.4,40.4-73.3,119.5S360.4,365.3,352,378.8L240.6,198.1L333.1,48c5-8.3,15.4-9.7,22.3-6.3L510,118.7
                                C510.8,119,511.1,119.6,511.1,120.4L511.1,120.4z"/>
                                    </svg>
                                </IconButton>
                            </Link>
                        </Box>
                        <Divider
                            orientation="vertical"
                            flexItem
                            style={{
                                marginRight: 24
                            }}
                        />
                        <Box className="action-group">
                            <Link underline="none" href={BuyTokenLink} target="_blank">
                                <Button
                                    color="secondary"
                                    variant="text"
                                    startIcon={
                                        <AddShoppingCartIcon />
                                    }
                                >
                                    Buy Token
                                </Button>
                            </Link>
                            <Link underline="none" href={DocLink} target="_blank">
                                <Button
                                    color="secondary"
                                    variant="text"
                                    startIcon={
                                        <LocalLibraryRoundedIcon />
                                    }
                                >
                                    Documentation
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                )
            }
            <Toolbar className="toolbar">
                <Link underline="none" href="https://blizzard.network">
                    <img src={Logo} className="logo" />
                </Link>
                {
                    !isMobile && (
                        <Box className="page-route">
                            <Button
                                size="large"
                                color={activeTab === "swap" ? "primary" : "secondary"}
                                onClick={() => history.push("/swap")}
                            >
                                Swap
                            </Button>
                            <Button
                                size="large"
                                color={activeTab === "vaults" ? "primary" : "secondary"}
                                onClick={() => history.push("/vaults")}
                            >
                                Vaults
                            </Button>
                        </Box>
                    )
                }
                <Box className={classes.space} />
                {(() => {
                    if (!isMobile) {
                        return (
                            <>
                                <Button
                                    size="large"
                                    variant="outlined"
                                    className="add-token"
                                    onClick={addBLIZZ}
                                    color="secondary"
                                    startIcon={
                                        <img src={require("../assets/img/tokens/blizz.png").default} alt="Avalanche" />
                                    }
                                >
                                    BLIZZ
                                </Button>
                                <Button
                                    size="large"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={switchNetwork}
                                    className="network"
                                    startIcon={
                                        <img src="https://raw.githubusercontent.com/sushiswap/icons/master/token/avax.jpg" alt="Avalanche" />
                                    }
                                >
                                    Avalanche
                                </Button>
                                {
                                    active ? (
                                        chainId === netId ? (
                                            <Button
                                                size="large"
                                                color="secondary"
                                                variant="outlined"
                                                className="connect-button"
                                                onClick={() => setIsOpenDialog(true)}
                                                startIcon={
                                                    <Typography className="token-balance">{Number(Number(balance).toFixed(2))} BLIZZ</Typography>
                                                }
                                                endIcon={
                                                    <img src={cWallet.logo} alt={cWallet.name} />
                                                }
                                            >
                                                <Box className="account">
                                                    {account.substring(0, 8)} ... {account.substring(account.length - 4)}
                                                </Box>
                                            </Button>
                                        ) : (
                                            <Button
                                                size="large"
                                                color="error"
                                                variant="outlined"
                                                onClick={switchNetwork}
                                            >
                                                Wrong Network
                                            </Button>
                                        )
                                    ) : (
                                        <Button
                                            size="large"
                                            color="secondary"
                                            variant="contained"
                                            className="connect-wallet"
                                            onClick={() => setIsOpenDialog(true)}
                                        >
                                            Connect Wallet
                                        </Button>
                                    )
                                }
                            </>
                        )
                    } else {
                        return (
                            <>
                                <IconButton onClick={() => setMobileOpen(true)} className="menu-open">
                                    <MenuOpenIcon />
                                </IconButton>
                                <Drawer
                                    anchor="bottom"
                                    open={mobileOpen}
                                    className={classes.mobileDrawer}
                                    onClose={() => setMobileOpen(false)}
                                >
                                    <Box className="top-divider">
                                        <Box />
                                    </Box>
                                    {
                                        active ? (
                                            <Box className="wallet-status">
                                                <Box className="wallet-item">
                                                    <Button
                                                        color="secondary"
                                                        startIcon={<NetworkCellRoundedIcon />}
                                                    >
                                                        Network
                                                    </Button>
                                                    <Button color="secondary">
                                                        :
                                                    </Button>
                                                    <Button color="secondary">
                                                        {networks[chainId].name}
                                                    </Button>
                                                </Box>
                                                <Box className="wallet-item">
                                                    <Button
                                                        color="secondary"
                                                        startIcon={<AccountBoxRoundedIcon />}
                                                    >
                                                        Account
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                    >
                                                        :
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                    >
                                                        {account.substring(0, 8)} ... {account.substring(account.length - 4)}
                                                    </Button>
                                                </Box>
                                                <Box className="wallet-item">
                                                    <Button
                                                        color="secondary"
                                                        startIcon={<AccountBalanceRoundedIcon />}
                                                    >
                                                        Balance
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                    >
                                                        :
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                    >
                                                        {Number(Number(balance).toFixed(2))}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Button
                                                size="large"
                                                color="primary"
                                                variant="contained"
                                                className="main-button"
                                                onClick={() => setIsOpenDialog(true)}
                                            >
                                                Connect Wallet
                                            </Button>
                                        )
                                    }
                                    <Divider />
                                    <Box className="actions">
                                        <Box className="wallet-item">
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                startIcon={<OpenInBrowserRoundedIcon />}
                                                onClick={() => setIsOpenDialog(true)}
                                            >
                                                Open Wallet
                                            </Button>
                                            <Link underline="none" href={DocLink} target="_blank">
                                                <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    startIcon={
                                                        <LocalLibraryRoundedIcon />
                                                    }
                                                >
                                                    Documentation
                                                </Button>
                                            </Link>
                                        </Box>
                                        <Box className="wallet-item">
                                            <Link underline="none" href={BuyTokenLink} target="_blank">
                                                <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    startIcon={
                                                        <AddShoppingCartIcon />
                                                    }
                                                >
                                                    Buy token (1 BLIZZ = ${Number(Number(market["blizz"] ? market["blizz"].current_price : 0).toFixed(2))})
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={addBLIZZ}
                                                variant="contained"
                                                color="secondary"
                                                startIcon={
                                                    <AddBoxRoundedIcon />
                                                }
                                            >
                                                Add BLIZZ
                                            </Button>
                                        </Box>
                                        <Button
                                            fullWidth
                                            color="secondary"
                                            variant="contained"
                                            className="main-button"
                                            onClick={switchNetwork}
                                            startIcon={
                                                <NetworkCheckRoundedIcon />
                                            }
                                        >
                                            Change Network To Avalanche
                                        </Button>
                                    </Box>
                                </Drawer >
                            </>
                        )
                    }
                })()}
            </Toolbar>
            <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
        </AppBar>
    )
}

export default Header;