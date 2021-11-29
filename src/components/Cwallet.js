import React, { useState, useEffect } from "react";

// ** Web3 React
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    URI_AVAILABLE,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";

// Import Material UI Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';

// Import Assets
import useStyles from "../assets/constants/styles";
import { Wallets, ConnectedWallet } from "../assets/constants/wallets";

// Import Icons
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';


import { walletconnect } from "../assets/constants/connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Cwallet = ({ isOpen, setIsOpen, switchNetwork }) => {
    const classes = useStyles();
    const triedEager = useEagerConnect();
    const {
        activate,
        active,
        account,
        deactivate,
        connector,
        error,
        setError,
    } = useWeb3React();

    const [activatingConnector, setActivatingConnector] = useState(false);
    const [isSelectingWallet, setIsSelectingWallet] = useState(true);
    const cWallet = ConnectedWallet();

    // ** Effects
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);
    // log the walletconnect URI
    useEffect(() => {
        const logURI = (uri) => {
            console.log("WalletConnect URI", uri);
        };
        walletconnect.on(URI_AVAILABLE, logURI);

        return () => {
            walletconnect.off(URI_AVAILABLE, logURI);
        };
    }, []);
    useInactiveListener(!triedEager);
    // ** Actions
    const onConnectWallet = async (item) => {
        setActivatingConnector(item.connector);
        setIsSelectingWallet(false);
        await activate(item.connector);
    };
    const onDeactiveWallet = () => {
        setIsSelectingWallet(true);
        deactivate();
    };
    const retryConnect = (activating) => {
        setError(null);
        onConnectWallet(activating);
        handleClose();
    };
    // const changeWallet = (error) => {
    //     if (!error) {
    //         return true;
    //     } else {
    //         setError(null);
    //         setIsSelectingWallet(true);
    //     }
    // }
    const handleClose = () => {
        setIsOpen(false);
    };
    const getErrorMessage = (error) => {
        if (error instanceof NoEthereumProviderError) {
            return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
        } else if (error instanceof UnsupportedChainIdError) {
            switchNetwork();
            handleClose();
            return "You're connected to an unsupported network.";
        } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect ||
            error instanceof UserRejectedRequestErrorFrame
        ) {
            return "Please authorize this website to access your Ethereum account.";
        } else {
            console.error(error);
            return "An unknown error occurred. Check the console for more details.";
        }
    };
    return (
        <Dialog
            onClose={handleClose}
            open={isOpen}
            className={classes.cwallet}
            classes={{
                paper: "cwallet-paper"
            }}
        >
            {(() => {
                if (active) {
                    return (
                        <List className="wallet-detail">
                            <ListItem className="item">
                                <ListItemIcon className="symbol">
                                    <img src={cWallet.logo} alt={cWallet.name} />
                                </ListItemIcon>
                                <ListItemText
                                    className="description"
                                    primary={`Connected to ${cWallet.name}`}
                                />
                                <ListItemSecondaryAction className="action">
                                    <Tooltip arrow title="Change wallet">
                                        <IconButton size="small" onClick={onDeactiveWallet}>
                                            <LowPriorityRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className="item">
                                <ListItemIcon className="symbol">
                                    <AccountBalanceWalletRoundedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    className="description"
                                    primary={`${account.substring(0, 8)} ... ${account.substring(account.length - 4)}`}
                                />
                                <ListItemSecondaryAction className="action">
                                    <Link
                                        href={`https://cchain.explorer.avax.network/address/${account}`}
                                        target="_blank"
                                        underline="none"
                                    >
                                        <Tooltip arrow title="View on explorer">
                                            <IconButton size="small">
                                                <LaunchRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                    <CopyToClipboard
                                        text={account}
                                    >
                                        <Tooltip arrow title="Copy address">
                                            <IconButton size="small">
                                                <AssignmentTurnedInRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    )
                } else {
                    if (isSelectingWallet) {
                        return (
                            <Grid className="wallet-list" container>
                                {Wallets.map((item, idx) => {
                                    return (
                                        <Grid className="wallet" key={idx} item xs={12} sm={6}>
                                            <Card onClick={() => onConnectWallet(item)} className="card">
                                                <CardContent>
                                                    <img src={item.logo} alt={item.logo} />
                                                    <Typography className="title">{item.title}</Typography>
                                                    <Typography className="description">{item.description}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )
                    } else {
                        const activating = Wallets.find(item => (item.connector === activatingConnector || item.connector === connector));
                        return (
                            <Box className="connect-process">
                                {error && (
                                    <Alert severity="error">
                                        {getErrorMessage(error)} — <strong onClick={() => retryConnect(activating)}>try again!</strong>
                                    </Alert>
                                )}
                                {!error && (
                                    <>
                                        <Typography className={error ? "status error" : "status"}>
                                            Initializing...
                                        </Typography>
                                        <LinearProgress />
                                    </>
                                )}
                            </Box>
                        )
                    }
                }
            })()}
            {active && (
                <Alert severity="info">
                    Your transaction detail will appear here.
                </Alert>
            )}
        </Dialog>
    );
};

export default Cwallet;
