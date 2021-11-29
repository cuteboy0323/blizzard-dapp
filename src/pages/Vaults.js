import React, { useState, useEffect, useCallback } from "react";

import clsx from "clsx";

// ** Import Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from "@mui/material/useMediaQuery";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

// ** Import Assets
import useStyles from "../assets/constants/styles";
import vaultList from "../assets/constants/vaults";
import HackenLogo from "../assets/img/hacken-logo.svg";

import Web3 from "web3";
import { useApi } from "../hooks";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router";
import { tokenList, netId, erc20, blizz, avax, reward, mintRate, swapFee, updateIntervalDuration, soAPY } from "../config/app";

// ** Import Icons
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortIcon from '@mui/icons-material/Sort';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import WrapTextIcon from '@mui/icons-material/WrapText';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import MoneyOffCsredRoundedIcon from '@mui/icons-material/MoneyOffCsredRounded';

// ** define const 
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Vaults = () => {
    const api = useApi();
    const classes = useStyles();
    const history = useHistory();
    const isMobile = useMediaQuery("(max-width:600px)");
    const { account, chainId, library } = useWeb3React();

    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");
    const [totalDeposit, setTotalDeposit] = useState({});
    const [eachBalance, setEachBalance] = useState({});
    const [totalRewards, setTotalRewards] = useState({});
    const [totalEarned, setTotalEarned] = useState({});
    const [totalMarketCap, setTotalMarketCap] = useState(0);
    const [stakeOnly, setStakeOnly] = useState(false);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [apy, setApy] = useState({});

    const isOpenSortMenu = Boolean(sortAnchorEl);

    const handleClickSortMenu = (event) => {
        setSortAnchorEl(event.currentTarget);
    };
    const handleCloseSortMenu = () => {
        setSortAnchorEl(null);
    };
    const updateTotalDeposit = () => {
        let sum = 0;
        for (let i in totalDeposit) {
            sum += Number(totalDeposit[i]);
        }
        return sum;
    };
    const updateTotalEarned = () => {
        let sum = 0;
        for (let i in totalEarned) {
            sum += Number(totalEarned[i]);
        }
        return sum;
    };

    const viewDetail = (id) => {
        history.push(`/vault/${id}`);
        return;
    }

    const toWei = useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return web3.utils.toWei(val);
        } else {
            return "0"
        }
    }, []);

    const fromWei = useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return web3.utils.fromWei(val);
        } else {
            return "0"
        }
    }, []);

    const toBN = useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return new web3.utils.BN(val);
        } else {
            return "0"
        }
    }, []);

    const fn = (val, decimal = 4) => {
        if (!isNaN(Number(val))) {
            const trimVal = Number(Number(val).toFixed(decimal));
            const decimalVal = trimVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return decimalVal;
        } else {
            return Number(0);
        }
    }

    const getBlizzStakeVaultAPR = async (web3, tokenPrices, secsForYear) => {
        const blizzStakeVault = vaultList.find(item => item.id === 'blizz-stake');
        const blizzStakeVaultC = new web3.eth.Contract(
            blizzStakeVault.vault_abi,
            blizzStakeVault.vault_address
        );
        const blizzStakeVaultB = await blizzStakeVaultC.methods.totalSupply().call();
        const avaxData = await blizzStakeVaultC.methods.rewardData(avax.address).call();
        const arRate = toBN(web3, avaxData.rewardRate);
        const btSupply = toBN(web3, blizzStakeVaultB);
        const BAP = tokenPrices["avalanche-2"] / tokenPrices["blizz"];
        const blizzStakeVaultAPR = fromWei(web3, arRate.mul(secsForYear).div(btSupply)) * BAP;

        return blizzStakeVaultAPR;
    }

    const updateTokenPrices = useCallback(async (web3) => {
        try {
            let ids = null;
            let prices = {};
            for (let i = 0; i < tokenList.length; i++) {
                const id = tokenList[i];
                ids = ids ? ids += `,${id}` : ids = id;
            }
            const price = await api.getCurrentPrice(ids, "usd");
            for (let i in price) {
                prices[i] = price[i].usd;
            }
            const priceC = new web3.eth.Contract(
                blizz.price_abi,
                blizz.price_address
            );
            const blizzPrice = fromWei(
                web3,
                (await priceC.methods.priceOf(blizz.address).call()).usdPrice
            );
            prices["blizz"] = blizzPrice;
            const price2string = JSON.stringify(prices);
            localStorage.setItem("cached-token-prices-blizzard", price2string);
            return prices;
        } catch (e) {
            const cache = localStorage.getItem("cached-token-prices-blizzard");
            if (cache) {
                const string2prices = JSON.parse(cache);
                return string2prices;
            } else {
                return {}
            }
        }
    }, [api, fromWei]);

    const calcRewardTokenPrice = (token, tokenPrices, lpPrice) => {
        let result = [];
        for (let i = 0; i < token.length; i++) {
            switch (token[i]) {
                case "LP": {
                    result[i] = lpPrice;
                    break;
                }
                case "JOE": {
                    result[i] = tokenPrices["joe"]
                    break;
                }
                case "BLIZZ": {
                    result[i] = tokenPrices["blizz"]
                    break;
                }
                case "PNG": {
                    result[i] = tokenPrices["pangolin"]
                    break;
                }
                case "WAVAX": {
                    result[i] = tokenPrices["avalanche-2"]
                    break;
                }
                default: {
                    return 0
                }
            }
        }
        return result;
    }

    const updateData = async () => {
        const web3 = new Web3(library.provider);
        const tokenPrices = await updateTokenPrices(web3);
        const blizzC = new web3.eth.Contract(
            blizz.abi,
            blizz.address
        );

        const multipler = tokenPrices["blizz"] * mintRate / tokenPrices["avalanche-2"];
        const totalSupply = await blizzC.methods.totalSupply().call();
        const TM = fromWei(web3, totalSupply) * tokenPrices["blizz"];

        setTotalMarketCap(TM);
        Object.values(vaultList).map(async item => {
            switch (item.tags[0]) {
                case "main": {
                    const vaultC = new web3.eth.Contract(
                        item.vault_abi,
                        item.vault_address
                    );
                    const vaultB = await vaultC.methods.totalSupply().call();
                    const userB = await vaultC.methods.balanceOf(account).call();
                    const rewards = await vaultC.methods.claimable(account).call();
                    const TD = fromWei(web3, vaultB) * tokenPrices[item.base_token_id];
                    const UB = fromWei(web3, userB) * tokenPrices[item.base_token_id];
                    const rPrices = calcRewardTokenPrice(item.earn, tokenPrices);

                    let TR = null;
                    if (item.tags[1] === "lock") {
                        TR =
                            fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0) +
                            fromWei(web3, rewards._autoRewards) * Number(rPrices[1] ? rPrices[1] : 0);
                        setTotalDeposit((prevState) => {
                            return {
                                ...prevState,
                                [item.id]: TD,
                            };
                        });
                    } else {
                        const secsForYear = toBN(web3, toWei(web3, 60 * 60 * 24 * 365));
                        const avaxData = await vaultC.methods.rewardData(avax.address).call();
                        const blizzData = await vaultC.methods.rewardData(blizz.address).call();
                        const BAP = tokenPrices["avalanche-2"] / tokenPrices["blizz"];

                        const arRate = toBN(web3, avaxData.rewardRate);
                        const brRate = toBN(web3, blizzData.rewardRate);
                        const btSupply = toBN(web3, vaultB);
                        const blSupply = toBN(web3, await vaultC.methods.lockedSupply().call());

                        const tAPR = fromWei(web3, arRate.mul(secsForYear).div(btSupply)) * BAP;
                        const lAPR = fromWei(web3, brRate.mul(secsForYear).div(blSupply));
                        const lAPY = Math.pow((1 + Number(lAPR) / 1095), 1095) - 1;

                        setApy((prevState) => {
                            return {
                                ...prevState,
                                "blizz-lock": {
                                    apr: tAPR,
                                    apy: tAPR + lAPY + 1,
                                },
                                "blizz-stake": {
                                    apr: tAPR,
                                    apy: tAPR
                                }
                            };
                        });

                        TR = fromWei(web3, rewards.totalReward) * tokenPrices[item.base_token_id];
                        const rDuration = toBN(web3, await vaultC.methods.rewardsDuration().call());
                        const aEarned = fromWei(web3, arRate.mul(rDuration));
                        const bEarned = fromWei(web3, brRate.mul(rDuration));

                        const TE = aEarned * tokenPrices["avalanche-2"] + bEarned * tokenPrices["blizz"];

                        setTotalEarned((prevState) => {
                            return {
                                ...prevState,
                                [item.id]: TE,
                            };
                        });

                        const lockVault = vaultList.find(item => item.id === "blizz-lock");
                        const lockVaultC = new web3.eth.Contract(
                            lockVault.vault_abi,
                            lockVault.vault_address
                        );
                        const lockVaultB = await lockVaultC.methods.totalSupply().call();
                        const lTD = fromWei(web3, lockVaultB) * tokenPrices["blizz"];

                        setTotalDeposit((prevState) => {
                            return {
                                ...prevState,
                                [item.id]: TD - lTD,
                            };
                        });
                    }
                    setEachBalance((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: UB,
                        };
                    });
                    setTotalRewards((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TR,
                        };
                    });
                    break;
                }
                case "avax":
                case "usdc":
                case "joe": {
                    const vaultC = new web3.eth.Contract(
                        item.vault_abi,
                        item.vault_address
                    );
                    const vaultB = await vaultC.methods.totalSupply().call();
                    const userB = await vaultC.methods.principalOf(account).call();
                    const rewards = await vaultC.methods.claimable(account).call();
                    const earned = await vaultC.methods.totalEarned().call();
                    const fub = toBN(web3, userB).add(toBN(web3, rewards._poolRewards));
                    const TD = fromWei(web3, vaultB) * tokenPrices[item.base_token_id];
                    const UB = fromWei(web3, fub) * tokenPrices[item.base_token_id];
                    const rPrices = calcRewardTokenPrice(item.earn, tokenPrices);
                    const TR =
                        fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0) +
                        fromWei(web3, rewards._snowRewards) * Number(rPrices[1] ? rPrices[1] : 0);
                    const TE = fromWei(web3, earned.usdAmount);
                    const secsForYear = toBN(web3, toWei(web3, 60 * 60 * 24 * 365));
                    const blizzStakeVaultAPR = await getBlizzStakeVaultAPR(web3, tokenPrices, secsForYear);
                    const APY = soAPY[item.id] * (1 + 0.255 * multipler * (1 + blizzStakeVaultAPR));
                    setApy((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: {
                                apr: 0,
                                apy: APY
                            },
                        };
                    });
                    setTotalDeposit((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TD,
                        };
                    });
                    setEachBalance((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: UB,
                        };
                    });
                    setTotalRewards((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TR,
                        };
                    });
                    setTotalEarned((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TE,
                        };
                    });
                    break;
                }
                case "png": {
                    const vaultC = new web3.eth.Contract(
                        item.vault_abi,
                        item.vault_address
                    );
                    const vaultB = await vaultC.methods.totalSupply().call();
                    const userB = await vaultC.methods.principalOf(account).call();
                    const rewards = await vaultC.methods.claimable(account).call();
                    const earned = await vaultC.methods.totalEarned().call();

                    const TD = fromWei(web3, vaultB) * tokenPrices[item.base_token_id];
                    const UB = fromWei(web3, userB) * tokenPrices[item.base_token_id];
                    const rPrices = calcRewardTokenPrice(item.earn, tokenPrices);
                    const TR =
                        fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0) +
                        fromWei(web3, rewards._autoRewards) * Number(rPrices[1] ? rPrices[1] : 0);
                    const TE = fromWei(web3, earned.usdAmount);

                    const secsForYear = toBN(web3, toWei(web3, 60 * 60 * 24 * 365));
                    const rewardC = new web3.eth.Contract(reward.abi.spng, reward.address.spng);
                    const rewardRate = toBN(web3, await rewardC.methods.rewardRate().call());
                    const rewardTotalSupply = toBN(web3, await rewardC.methods.totalSupply().call());
                    const avaxPngPrice = tokenPrices["avalanche-2"] / tokenPrices[item.base_token_id];
                    const blizzStakeVaultAPR = await getBlizzStakeVaultAPR(web3, tokenPrices, secsForYear);
                    const originAPR = fromWei(web3, rewardRate.mul(secsForYear).div(rewardTotalSupply)) * avaxPngPrice;
                    const originAPY = Math.pow((1 + Number(originAPR) * 0.7 / 1095), 1095) - 1;
                    const APY = originAPY * (1 + 0.255 * multipler * (1 + blizzStakeVaultAPR)) * swapFee;
                    setApy((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: {
                                apr: 0,
                                apy: APY
                            },
                        };
                    });
                    setTotalDeposit((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TD,
                        };
                    });
                    setEachBalance((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: UB,
                        };
                    });
                    setTotalRewards((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TR,
                        };
                    });
                    setTotalEarned((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TE,
                        };
                    });
                    break;
                }
                case "lp": {
                    const vaultC = new web3.eth.Contract(
                        item.vault_abi,
                        item.vault_address
                    );
                    const lpC = new web3.eth.Contract(
                        item.lp_abi,
                        item.lp_address
                    )
                    const baseTokenC = new web3.eth.Contract(
                        erc20,
                        item.token_address
                    )
                    const baseTokenDecimals = await baseTokenC.methods.decimals().call();
                    const vaultB = toBN(web3, await vaultC.methods.totalSupply().call());
                    const lpR = toBN(web3, (await lpC.methods.getReserves().call())[0]);
                    const totalSupply = toBN(web3, await lpC.methods.totalSupply().call());
                    const userB = toBN(web3, await vaultC.methods.principalOf(account).call());
                    const rewards = await vaultC.methods.claimable(account).call();
                    const earned = await vaultC.methods.totalEarned().call();

                    let fub = 0;
                    if (item.tags[1] === "compound")
                        fub = toBN(web3, userB).add(toBN(web3, rewards._poolRewards));
                    else
                        fub = userB;

                    let lpPrice = fromWei(
                        web3,
                        lpR
                            .mul(toBN(web3, toWei(web3, 2 * tokenPrices[item.base_token_id])))
                            .mul(toBN(web3, Math.pow(10, 18 - Number(baseTokenDecimals))))
                            .div(toBN(web3, totalSupply))
                    )

                    let APR;

                    const secsForYear = toBN(web3, toWei(web3, 60 * 60 * 24 * 365));

                    switch (item.subtitle) {
                        case "Pangolin": {
                            const BTL = tokenPrices["pangolin"] / lpPrice;
                            let rewardC;
                            switch (item.tags[2]) {
                                case "png-avax": {
                                    rewardC = new web3.eth.Contract(reward.abi.png, reward.address.png);
                                    break;
                                }
                                case "png-avax-new": {
                                    rewardC = new web3.eth.Contract(reward.abi.png, reward.address.png);
                                    break;
                                }
                            }
                            const rewardRate = toBN(web3, await rewardC.methods.rewardRate().call());
                            const reTotalSupply = toBN(web3, await rewardC.methods.totalSupply().call());
                            APR = fromWei(web3, rewardRate.mul(secsForYear).div(reTotalSupply)) * BTL;
                            break;
                        }
                        case "TraderJoe": {
                            const BTL = tokenPrices["joe"] / lpPrice;
                            const rewardC = new web3.eth.Contract(reward.abi.ojoe, reward.address.ojoe);
                            const joePerSec = toBN(web3, await rewardC.methods.joePerSec().call());
                            const lpBalance = toBN(web3, await lpC.methods.balanceOf(reward.address.ojoe).call());
                            const allowPoint = toBN(web3, (await rewardC.methods.poolInfo(item.pid).call()).allocPoint);
                            const totalAllocPoint = toBN(web3, await rewardC.methods.totalAllocPoint().call());
                            APR = fromWei(web3, (joePerSec.mul(allowPoint).mul(secsForYear)).div(lpBalance.mul(totalAllocPoint))) * 0.5 * BTL;

                            switch (item.tags[2]) {
                                case "joe-avax-new": {
                                    const ALP = tokenPrices["avalanche-2"] / lpPrice;
                                    const joeRewardC = new web3.eth.Contract(reward.abi.joe, reward.address.joe);
                                    const avaxRewardC = new web3.eth.Contract(reward.abi.avax, reward.address.avax);
                                    const joePerSec = toBN(web3, await joeRewardC.methods.joePerSec().call());
                                    const tokenPerSec = toBN(web3, await avaxRewardC.methods.tokenPerSec().call());
                                    const lpBalance = toBN(web3, await lpC.methods.balanceOf(reward.address.joe).call());
                                    const allowPoint = toBN(web3, (await joeRewardC.methods.poolInfo(item.pid).call()).allocPoint);
                                    const totalAllocPoint = toBN(web3, await joeRewardC.methods.totalAllocPoint().call());
                                    const joeAPR = fromWei(web3, (joePerSec.mul(allowPoint).mul(secsForYear)).div(lpBalance.mul(totalAllocPoint))) * 0.5 * BTL;
                                    const avaxAPR = fromWei(web3, (tokenPerSec.mul(secsForYear).div(lpBalance))) * ALP;
                                    APR = joeAPR + avaxAPR;
                                }
                            }
                            break;
                        }
                    }
                    const originAPY = Math.pow((1 + APR * 0.7 / 1095), 1095) - 1;
                    const blizzStakeVaultAPR = await getBlizzStakeVaultAPR(web3, tokenPrices, secsForYear);
                    if (item.tags[1] === "compound") {
                        const cAPY = originAPY * (1 + 0.255 * multipler * (1 + blizzStakeVaultAPR));
                        setApy((prevState) => {
                            return {
                                ...prevState,
                                [item.id]: {
                                    apr: APR,
                                    apy: cAPY
                                },
                            };
                        });
                    } else {
                        const mAPY = originAPY * (1 + 0.255 * multipler * (1 + blizzStakeVaultAPR)) * swapFee;
                        setApy((prevState) => {
                            return {
                                ...prevState,
                                [item.id]: {
                                    apr: APR,
                                    apy: mAPY
                                },
                            };
                        });
                    }

                    if (item.tags[2] === "blizz-avax") {
                        setApy((prevState) => {
                            return {
                                ...prevState,
                                "blizz-avax-max": {
                                    apr: 11,
                                    apy: 11
                                },
                            };
                        });
                    }

                    const TD = fromWei(web3, vaultB) * lpPrice;
                    const UB = fromWei(web3, fub) * lpPrice;
                    const rPrices = calcRewardTokenPrice(item.earn, tokenPrices, lpPrice);
                    const TR =
                        fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0) +
                        fromWei(web3, rewards._autoRewards) * Number(rPrices[1] ? rPrices[1] : 0);

                    const TE =
                        fromWei(web3, earned.usdAmount);
                    setTotalDeposit((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TD,
                        };
                    });
                    setEachBalance((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: UB,
                        };
                    });
                    setTotalRewards((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TR,
                        };
                    });
                    setTotalEarned((prevState) => {
                        return {
                            ...prevState,
                            [item.id]: TE,
                        };
                    });
                }
            }
        });
    };

    useEffect(() => {
        let interval;

        if (chainId === netId && account && library) {
            updateData();

            interval = setInterval(() => {
                updateData();
            }, updateIntervalDuration);
        }

        return () => clearInterval(interval);
    }, [account, library, chainId]);

    const filterOptions = [
        "BLIZZ",
        "LP",
        "Single Asset",
    ]

    const sortVaults = (sortBy, direction) => {
        switch (sortBy) {
            case "DEF": {
                const vaultsDOM = document.getElementById("vault-list");
                for (let i = 0; i < vaultsDOM.children.length; i++) {
                    const child = vaultsDOM.children;
                    child[i].style.order = i;
                }
                break;
            }
            case "TVL": {
                let tvl_sorted;
                if (direction === "DESC") {
                    tvl_sorted = Object.entries(totalDeposit).sort((a, b) => b[1] - a[1]);
                } else {
                    tvl_sorted = Object.entries(totalDeposit).sort((a, b) => a[1] - b[1]);
                }
                const vaultsDOM = document.getElementById("vault-list");
                for (let index in tvl_sorted) {
                    const child = vaultsDOM.children;
                    for (let i = 0; i < child.length; i++) {
                        if (tvl_sorted[index][0] === child[i].id) {
                            child[i].style.order = index;
                        }
                    }
                }
                break;
            }
            case "APY": {
                let apys_sorted;
                if (direction === "DESC") {
                    apys_sorted = Object.entries(apy).sort((a, b) => b[1]["apy"] - a[1]["apy"]);
                } else {
                    apys_sorted = Object.entries(apy).sort((a, b) => a[1]["apy"] - b[1]["apy"]);
                }
                const vaultsDOM = document.getElementById("vault-list");
                for (let index in apys_sorted) {
                    const child = vaultsDOM.children;
                    for (let i = 0; i < child.length; i++) {
                        if (apys_sorted[index][0] === child[i].id) {
                            child[i].style.order = index;
                        }
                    }
                }
            }
        }
        handleCloseSortMenu();
    };

    return (
        <Container
            maxWidth="md"
            className={clsx(
                classes.container,
                {
                    "mobile": isMobile
                }
            )}
        >
            <Box className="root">
                <Box className="adsense">
                    <Grid container>
                        <Grid item xs={12} sm={10}>
                            <Typography color="secondary" className="title">
                                BLIZZARD IS AN ADVANCED YIELD AGGREGATOR ON AVALANCHE. {"  "}
                                <Link href="/blizzard-audit-hacken.pdf" color="inherit" target="_blank">
                                    FULLY AUDITED BY HACKEN
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2} className="hacken-icon">
                            <Tooltip arrow title={`Show audit report`}>
                                <Link href="/blizzard-audit-hacken.pdf" color="inherit" target="_blank">
                                    <img src={HackenLogo} className="hacken-logo" />
                                </Link>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
                <Grid
                    container
                    className="statistics"
                >
                    <Grid item xs={12} sm={4}>
                        <Box className="s-item">
                            <Typography
                                color="secondary"
                                className="title"
                            >
                                TOTAL DEPOSITED
                            </Typography>
                            <Typography className="value">
                                ${fn(updateTotalDeposit(), 2)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className="s-item">
                            <Typography
                                color="secondary"
                                className="title"
                            >
                                BLIZZ MARKET CAP
                            </Typography>
                            <Typography className="value">
                                ${fn(totalMarketCap, 2)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className="s-item">
                            <Typography
                                color="secondary"
                                className="title"
                            >
                                DAILY PROFITS
                            </Typography>
                            <Typography color="primary" className="value">
                                ${fn(updateTotalEarned(), 2)}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box className="tools">
                <Autocomplete
                    multiple
                    className="filter"
                    disableListWrap
                    options={filterOptions}
                    disableCloseOnSelect
                    limitTags={2}
                    getOptionLabel={(option) => option}
                    onChange={(e, v) => setFilter(v)}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            maxRows={1}
                            color="secondary"
                            placeholder="Filter"
                        />
                    )}
                />
                <Box className="search-sort">
                    <TextField
                        color="secondary"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        InputProps={{
                            placeholder: "Search...",
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRoundedIcon color="secondary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton
                        id="sort-button"
                        aria-controls="sort-menu"
                        className="tool-button"
                        color="secondary"
                        aria-haspopup="true"
                        size="large"
                        aria-expanded={isOpenSortMenu ? 'true' : undefined}
                        onClick={handleClickSortMenu}
                    >
                        <SortIcon />
                    </IconButton>
                    <Tooltip arrow title={`Stake only: ${stakeOnly ? "active" : "inactive"}`}>
                        <IconButton
                            id="stake-button"
                            className={
                                clsx("tool-button", {
                                    "active": stakeOnly
                                })
                            }
                            color="secondary"
                            size="large"
                            onClick={() => setStakeOnly(!stakeOnly)}
                        >
                            {stakeOnly ?
                                <AttachMoneyRoundedIcon /> :
                                <MoneyOffCsredRoundedIcon />
                            }
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="sort-menu"
                        className={classes.sortMenu}
                        anchorEl={sortAnchorEl}
                        open={isOpenSortMenu}
                        onClose={handleCloseSortMenu}
                        MenuListProps={{
                            'aria-labelledby': 'sort-button',
                        }}
                    >
                        <MenuItem onClick={() => sortVaults("TVL", "ASC")}>
                            <ListItemText>TVL</ListItemText>
                            <IconButton size="small" color="secondary">
                                <VerticalAlignBottomIcon />
                            </IconButton>
                        </MenuItem>
                        <MenuItem onClick={() => sortVaults("TVL", "DESC")}>
                            <ListItemText>TVL</ListItemText>
                            <IconButton size="small" color="secondary">
                                <VerticalAlignTopIcon />
                            </IconButton>
                        </MenuItem>
                        <MenuItem onClick={() => sortVaults("APY", "ASC")}>
                            <ListItemText>APY</ListItemText>
                            <IconButton size="small" color="secondary">
                                <VerticalAlignBottomIcon />
                            </IconButton>
                        </MenuItem>
                        <MenuItem onClick={() => sortVaults("APY", "DESC")}>
                            <ListItemText>APY</ListItemText>
                            <IconButton size="small" color="secondary">
                                <VerticalAlignTopIcon />
                            </IconButton>
                        </MenuItem>
                        <MenuItem onClick={() => sortVaults("DEF")}>
                            <ListItemText>DEF</ListItemText>
                            <IconButton size="small" color="secondary">
                                <WrapTextIcon />
                            </IconButton>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Box id="vault-list" className="vault">
                {
                    vaultList.map((item, idx) => {
                        const flag = filter.find(i => i === item.filterOption);
                        if (stakeOnly && Number(eachBalance[item.id]) <= 0) {
                            return <React.Fragment key={idx} />
                        }
                        if (item.name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                            return <React.Fragment key={idx} />
                        }
                        if (filter.length !== 0 && !flag) {
                            return <React.Fragment key={idx} />
                        }
                        return (
                            <Card key={idx} id={item.id} className="vault-container" style={{
                                order: item.isRibbon ? vaultList.length + idx : idx
                            }}>
                                <Grid className="vault-item-container" container onClick={() => viewDetail(item.id)}>
                                    {
                                        item.isRibbon &&
                                        <Box className="ribbon">
                                            {item.ribbon}
                                        </Box>
                                    }
                                    <Grid className="vault-item vault-detail" item xs={6} sm={4}>
                                        <Box className="vault-icon">
                                            {item.icons.map((img, idx) => {
                                                if (img === "skelton") {
                                                    return (
                                                        <img className="hidden" key={idx} src={img} alt={img} />
                                                    )
                                                } else {
                                                    return (
                                                        <img key={idx} src={img} alt={img} />
                                                    )
                                                }
                                            })}
                                        </Box>
                                        <Box className="vault-title">
                                            <Box className="vault-name">
                                                {item.name}
                                            </Box>
                                            <Box className="vault-sub-name">
                                                {item.subtitle}
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid className="vault-item vault-apy" item xs={6} sm={3}>
                                        {(() => {
                                            if (item.tags[0] === "main") {
                                                if (item.tags[1] === "stake") {
                                                    if (apy[item.id])
                                                        return <Typography>APR {fn(apy[item.id].apy * 100, 2)}%</Typography>
                                                    else
                                                        return <Skeleton className="skelton" animation="wave" />
                                                } else {
                                                    if (apy[item.id])
                                                        return <Typography>APY {fn(apy[item.id].apy * 100, 2)}% <b>(MAX)</b></Typography>
                                                    else
                                                        return <Skeleton className="skelton" animation="wave" />
                                                }
                                            } else if (item.tags[2] === "blizz-avax") {
                                                if (apy[item.id])
                                                    return (
                                                        <Typography>APR {fn(apy[item.id].apr * 100, 2)}%</Typography>
                                                    )
                                                else
                                                    return <Skeleton className="skelton" animation="wave" />
                                            } else {
                                                if (apy[item.id])
                                                    return <Typography>APY {fn(apy[item.id].apy * 100, 2)}%</Typography>
                                                else
                                                    return <Skeleton className="skelton" animation="wave" />
                                            }
                                        })()}
                                        <Typography>
                                        </Typography>
                                        <Typography>
                                            {item.description}
                                        </Typography>
                                    </Grid>
                                    <Grid className="vault-item vault-status" item xs={12} sm={5}>
                                        <Box>
                                            <Typography>
                                                Earn
                                            </Typography>
                                            <Typography>
                                                Balance
                                            </Typography>
                                            <Typography>
                                                Total Deposit
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography>
                                                {item.earn.map((sitem, idx) => {
                                                    if (item.earn.length > 1 && item.earn.length !== idx + 1 && sitem !== null) {
                                                        return `${sitem} + `;
                                                    } else {
                                                        return sitem;
                                                    }
                                                })}
                                            </Typography>
                                            {(() => {
                                                let balance = Number(eachBalance[item.id]) + Number(totalRewards[item.id]);
                                                if (!isNaN(balance)) {
                                                    if (balance > 0 && balance < 0.0001) {
                                                        return (
                                                            <Tooltip arrow placement="top" title={<>{balance}</>}>
                                                                <Typography>${fn(balance, 2)}</Typography>
                                                            </Tooltip>
                                                        )
                                                    } else {
                                                        return (
                                                            <Typography>${fn(balance, 2)}</Typography>
                                                        )
                                                    }

                                                } else {
                                                    return <Typography><Skeleton className="skelton" animation="wave" /></Typography>
                                                }
                                            })()}
                                            {(() => {
                                                let tDbalance = Number(totalDeposit[item.id]);
                                                if (!isNaN(tDbalance)) {
                                                    if (tDbalance > 0 && tDbalance < 0.0001) {
                                                        return (
                                                            <Tooltip arrow placement="bottom" title={<>{totalDeposit[item.id]}</>}>
                                                                <Typography>${fn(tDbalance, 2)}</Typography>
                                                            </Tooltip>
                                                        )
                                                    } else {
                                                        return (
                                                            <Typography>${fn(tDbalance, 2)}</Typography>
                                                        )
                                                    }
                                                } else {
                                                    return <Typography><Skeleton className="skelton" animation="wave" /></Typography>
                                                }

                                            })()}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        )
                    })
                }
                {(() => {
                    let noStake = true;
                    for (let i in eachBalance) {
                        if (eachBalance[i] > 0) {
                            noStake = false
                        }
                    }
                    if (stakeOnly && noStake) {
                        return (
                            <Box className="p-404">
                                <svg
                                    width="120"
                                    height="100"
                                    viewBox="0 0 184 152"
                                    aria-hidden
                                    focusable="false"
                                >
                                    <g fill="none" fillRule="evenodd">
                                        <g transform="translate(24 31.67)">
                                            <ellipse
                                                className="p-404-img-5"
                                                cx="67.797"
                                                cy="106.89"
                                                rx="67.797"
                                                ry="12.668"
                                            />
                                            <path
                                                className="p-404-img-1"
                                                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                                            />
                                            <path
                                                className="p-404-img-2"
                                                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                                            />
                                            <path
                                                className="p-404-img-3"
                                                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                                            />
                                        </g>
                                        <path
                                            className="p-404-img-3"
                                            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                                        />
                                        <g className="p-404-img-4" transform="translate(149.65 15.383)">
                                            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                                            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                                        </g>
                                    </g>
                                </svg>
                                <Typography color="secondary">
                                    No Vaults
                                </Typography>
                            </Box>
                        )
                    }
                })()}
            </Box>
        </Container >
    )
}

export default Vaults;