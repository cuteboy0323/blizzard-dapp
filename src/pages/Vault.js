import React, { useCallback, useState, useEffect } from "react";

import { useParams, useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Tabs from "@mui/material/Tabs";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Collapse from '@mui/material/Collapse';
import Skeleton from '@mui/material/Skeleton';

import Web3 from "web3";
import { useApi } from "../hooks";
import { erc20, tokenList, netId, reward, abi, avax, mintRate, swapFee, blizz, updateIntervalDuration, soAPY } from "../config/app";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import vaultList from "../assets/constants/vaults";
import useStyles from "../assets/constants/styles";

// Import Components
import Cwallet from "../components/Cwallet";

const Vault = () => {
    const api = useApi();
    const params = useParams();
    const classes = useStyles();
    const history = useHistory();
    const isMobile = useMediaQuery("(max-width:600px)");
    const currentVault = vaultList.find(item => item.id === params.id);

    const { account, chainId, library } = useWeb3React();
    const [amount, setAmount] = useState();
    const [balance, setBalance] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [rewards, setRewards] = useState({});
    const [vaultBalance, setVaultBalance] = useState(0);
    const [lastDeposit, setLastDeposit] = useState(null);
    const [unlockDeposit, setUnlockDeposit] = useState(null);
    const [extraClaimLocked, setExtraClaimLocked] = useState(true);
    const [extraClaimAmount, setExtraClaimAmount] = useState(0);
    const [depositBalance, setDepositBalance] = useState({});
    const [lockingPeriod, setLockingPeriod] = useState(0);
    const [wbwp, setWbwp] = useState(0);
    const [vestItem, setVestItem] = useState([]);
    const [vestBalance, setVestBalance] = useState(0);
    const [isVestOpen, setIsVestOpen] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [apy, setApy] = useState({});

    const [blizzAPY, setBlizzAPY] = useState({
        stake: 0,
        normal: 0
    });

    const goBack = () => {
        history.goBack();
    }

    const handleActiveTab = (event, newTab) => {
        setActiveTab(newTab);
    };

    const setMaxBalance = async (bmax, wmax) => {
        switch (activeTab) {
            case 0: {
                setAmount(bmax.toString());
                break;
            }
            case 1: {
                setAmount(wmax.toString());
            }
        }
    };

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
            return trimVal;
        } else {
            return Number(0);
        }
    }

    const getBlizzStakeVaultAPR = async (web3, tokenPrices, secsForYear) => {
        const blizzStakeVault = vaultList.find(item => item.id === "blizz-stake");
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

    const vest = async () => {
        const web3 = new Web3(library.provider);
        const cVault = currentVault;
        const vaultC = new web3.eth.Contract(
            cVault.vault_abi,
            cVault.vault_address
        );
        await vaultC.methods.vest().send({ from: account });
        await updateData()
    }

    const claim = async () => {
        const web3 = new Web3(library.provider);
        const cVault = currentVault;
        const vaultC = new web3.eth.Contract(
            cVault.vault_abi,
            cVault.vault_address
        );
        await vaultC.methods.claim().send({ from: account });
        await updateData()
    }

    const extraClaim = async () => {
        const web3 = new Web3(library.provider);
        const cVault = currentVault;
        const vaultC = new web3.eth.Contract(
            cVault.vault_abi,
            cVault.vault_address
        );
        await vaultC.methods.claimExtraReward().send({ from: account });
        await updateData()
    }

    const deposit = async () => {
        if (Number(amount) > Number(balance)) {
            alert("Your balance is not enough to deposit.", "info");
            return;
        } else if (!amount) {
            alert("Please input valid amount.", "info");
            return;
        } else {
            const web3 = new Web3(library.provider);
            const cVault = currentVault;
            const amountAsWei = toWei(web3, amount);
            switch (cVault.tags[0]) {
                case "main": {
                    const blizzC = new web3.eth.Contract(
                        cVault.blizz_abi,
                        cVault.token_address
                    );
                    const vaultC = new web3.eth.Contract(
                        cVault.vault_abi,
                        cVault.vault_address
                    );
                    const allowance = await blizzC.methods.allowance(account, vaultC._address).call({ from: account });
                    if (toBN(web3, allowance).lt(toBN(web3, amountAsWei))) {
                        await blizzC.methods.approve(vaultC._address, toWei(web3, "100000")).send({ from: account });
                    }
                    let result = null;
                    if (cVault.tags[1] === "lock") {
                        if (Number(rewards[0]) > 0) {
                            await claim();
                        }
                        result = await vaultC.methods.deposit(amountAsWei, lockingPeriod).send({ from: account });
                    } else {
                        result = await vaultC.methods.vest(account, amountAsWei).send({ from: account });
                    };
                    alert(`From :${result.from} To: ${result.to} Status: True`, "success");
                    await updateData()
                    break;
                }
                case "lp": {
                    const lpC = new web3.eth.Contract(
                        cVault.lp_abi,
                        cVault.lp_address
                    );
                    const vaultC = new web3.eth.Contract(
                        cVault.vault_abi,
                        cVault.vault_address
                    );
                    const allowance = await lpC.methods.allowance(account, vaultC._address).call({ from: account });
                    if (toBN(web3, allowance).lt(toBN(web3, amountAsWei))) {
                        await lpC.methods.approve(vaultC._address, toWei(web3, "100000")).send({ from: account });
                    }
                    const result = await vaultC.methods.deposit(amountAsWei).send({ from: account });
                    alert(`From :${result.from} To: ${result.to} Status: True`, "success");
                    await updateData()
                    break;
                }
                case "avax": {
                    const vaultC = new web3.eth.Contract(
                        cVault.vault_abi,
                        cVault.vault_address
                    );
                    const result = await vaultC.methods.deposit().send({ value: amountAsWei, from: account });
                    alert(`From :${result.from} To: ${result.to} Status: True`, "success");
                    await updateData()
                    break;
                }
                case "usdc": {
                    const tokenC = new web3.eth.Contract(
                        abi[cVault.id],
                        cVault.token_address
                    );
                    const vaultC = new web3.eth.Contract(
                        cVault.vault_abi,
                        cVault.vault_address
                    );
                    const allowance = await tokenC.methods.allowance(account, vaultC._address).call({ from: account });
                    if (toBN(web3, allowance).lt(toBN(web3, amountAsWei))) {
                        await tokenC.methods.approve(vaultC._address, toWei(web3, "100000")).send({ from: account });
                    }
                    const result = await vaultC.methods.deposit(amountAsWei / 10 ** 12).send({ from: account });
                    alert(`From :${result.from} To: ${result.to} Status: True`, "success");
                    await updateData()
                    break;
                }
                case "joe": {
                    const tokenC = new web3.eth.Contract(
                        abi[cVault.id],
                        cVault.token_address
                    );
                    const vaultC = new web3.eth.Contract(
                        cVault.vault_abi,
                        cVault.vault_address
                    );
                    const allowance = await tokenC.methods.allowance(account, vaultC._address).call({ from: account });
                    if (toBN(web3, allowance).lt(toBN(web3, amountAsWei))) {
                        await tokenC.methods.approve(vaultC._address, toWei(web3, "100000")).send({ from: account });
                    }
                    const result = await vaultC.methods.deposit(amountAsWei).send({ from: account });
                    alert(`From :${result.from} To: ${result.to} Status: True`, "success");
                    await updateData()
                    break;
                }
                case "png": {
                    const tokenC = new web3.eth.Contract(
                        abi[cVault.id],
                        cVault.token_address
                    );
                    const vaultC = new web3.eth.Contract(
                        cVault.vault_abi,
                        cVault.vault_address
                    );
                    const allowance = await tokenC.methods.allowance(account, vaultC._address).call({ from: account });
                    if (toBN(web3, allowance).lt(toBN(web3, amountAsWei))) {
                        await tokenC.methods.approve(vaultC._address, toWei(web3, "100000")).send({ from: account });
                    }
                    const result = await vaultC.methods.deposit(amountAsWei).send({ from: account });
                    alert(`From :${result.from} To: ${result.to} Status: True`, "success");
                    await updateData()
                    break;
                }
            }
        }
    }

    const withdraw = async () => {
        if (Number(amount) > Number(depositBalance)) {
            alert("Your balance is not enough to withdraw.", "info");
            return;
        } else if (!amount) {
            alert("Please input valid amount.", "info");
            return;
        } else {
            if (currentVault.tags[1] === "lp" && currentVault.tags[1] === "compound") {
                if (rewards[0] > 0 || rewards[1] > 0) {
                    await claim();
                }
            }
            const web3 = new Web3(library.provider);
            const cVault = currentVault;
            const amountAsWei = toWei(web3, amount);
            const vaultC = new web3.eth.Contract(
                cVault.vault_abi,
                cVault.vault_address
            );
            let result;
            switch (cVault.tags[0]) {
                case "usdc": {
                    result = await vaultC.methods.withdraw(amountAsWei / 10 ** 12).send({ from: account });
                    break;
                }
                default: {
                    result = await vaultC.methods.withdraw(amountAsWei).send({ from: account });
                }
            }
            alert(`From :${result.from} To: ${result.to} Status: True`, "success");
            await updateData()
        }
    };

    const withdrawAll = async () => {
        const web3 = new Web3(library.provider);
        const cVault = currentVault;
        const vaultC = new web3.eth.Contract(
            cVault.vault_abi,
            cVault.vault_address
        );
        const result = await vaultC.methods.withdrawAll().send({ from: account });
        if (cVault.tags[1] === "stake") {
            const { unlockable } = await vaultC.methods.lockedBalances(account).call();
            if (unlockable > 0) {
                await vaultC.methods.withdrawExpiredLocks().send({ from: account });
            }
        }
        alert(`From :${result.from} To: ${result.to} Status: True`, "success");
        await updateData()
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

    const calcAPY = useCallback(async (web3, tokenPrices) => {
        const multipler = tokenPrices["blizz"] * mintRate / tokenPrices["avalanche-2"];
        vaultList.map(async item => {
            switch (item.tags[0]) {
                case "main": {
                    if (item.tags[1] === "stake") {
                        const vaultC = new web3.eth.Contract(
                            item.vault_abi,
                            item.vault_address
                        );
                        const vaultB = await vaultC.methods.totalSupply().call();

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

                        setBlizzAPY({
                            "lock": tAPR + lAPY + 1,
                            "stake": tAPR
                        });
                    }
                    break;
                }
                case "avax":
                case "usdc":
                case "joe": {
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
                    break;
                }
                case "png": {
                    const secsForYear = toBN(web3, toWei(web3, 60 * 60 * 24 * 365));
                    const avaxPngPrice = tokenPrices["avalanche-2"] / tokenPrices[item.base_token_id];
                    const rewardC = new web3.eth.Contract(reward.abi.spng, reward.address.spng);
                    const rewardRate = toBN(web3, await rewardC.methods.rewardRate().call());
                    const rewardTotalSupply = toBN(web3, await rewardC.methods.totalSupply().call());
                    const blizzStakeVaultAPR = await getBlizzStakeVaultAPR(web3, tokenPrices, secsForYear);
                    const originAPR = fromWei(web3, rewardRate.mul(secsForYear).div(rewardTotalSupply)) * avaxPngPrice;
                    const originAPY = Math.pow((1 + Number(originAPR) * 0.7 / 1095), 1095) - 1;
                    const multipler = tokenPrices["blizz"] * mintRate / tokenPrices["avalanche-2"];
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
                    break;
                }
                case "lp": {
                    const lpC = new web3.eth.Contract(
                        item.lp_abi,
                        item.lp_address
                    );
                    const baseTokenC = new web3.eth.Contract(
                        erc20,
                        item.token_address
                    )
                    const lpR = toBN(web3, (await lpC.methods.getReserves().call())[0]);
                    const baseTokenDecimals = await baseTokenC.methods.decimals().call();
                    const totalSupply = toBN(web3, await lpC.methods.totalSupply().call());
                    const lpPrice = fromWei(
                        web3,
                        toBN(web3, lpR)
                            .mul(toBN(web3, toWei(web3, 2 * tokenPrices[item.base_token_id])))
                            .mul(toBN(web3, Math.pow(10, 18 - Number(baseTokenDecimals))))
                            .div(toBN(web3, totalSupply))
                    );
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
                }
            }
        });
    }, [fromWei, toBN, toWei])

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
        const cVault = currentVault;
        const tokenPrices = await updateTokenPrices(web3);

        calcAPY(web3, tokenPrices);

        if (cVault.show_last_deposit_time) {
            const vaultContract = new web3.eth.Contract(
                cVault.vault_abi,
                cVault.vault_address
            );
            const userInfo = await vaultContract.methods.userInfo(account).call();
            setLastDeposit(userInfo.depositedAt !== '0' ? userInfo.depositedAt : null);
        }

        switch (cVault.tags[0]) {
            case "lp": {
                const lpC = new web3.eth.Contract(cVault.lp_abi, cVault.lp_address);
                const vaultC = new web3.eth.Contract(cVault.vault_abi, cVault.vault_address);
                const baseC = new web3.eth.Contract(erc20, cVault.token_address);
                const baseTokenDecimals = await baseC.methods.decimals().call();

                const walletB = await lpC.methods.balanceOf(account).call();
                const rewards = await vaultC.methods.claimable(account).call();
                const lpR = (await lpC.methods.getReserves().call())[0];
                const totalSupply = await lpC.methods.totalSupply().call();
                const userB = await vaultC.methods.principalOf(account).call();

                const lpPrice = fromWei(
                    web3,
                    toBN(web3, lpR)
                        .mul(toBN(web3, toWei(web3, 2 * tokenPrices[cVault.base_token_id])))
                        .mul(toBN(web3, Math.pow(10, 18 - Number(baseTokenDecimals))))
                        .div(toBN(web3, totalSupply))
                )
                if (cVault.tags[1] === "compound") {
                    const fub = toBN(web3, userB).add(toBN(web3, rewards._poolRewards));
                    const UB = fromWei(web3, userB) * lpPrice;
                    setVaultBalance(UB);
                    setDepositBalance({
                        "fub": fromWei(web3, fub),
                        "ub": fromWei(web3, userB)
                    });
                } else {
                    const UB = fromWei(web3, userB) * lpPrice;
                    setVaultBalance(UB);
                    setDepositBalance({
                        "fub": fromWei(web3, userB),
                        "ub": fromWei(web3, userB)
                    });
                }

                const rPrices = calcRewardTokenPrice(cVault.earn, tokenPrices, lpPrice);

                if (cVault.tags[2] === "blizz-avax") {
                    setRewards({
                        0: fromWei(web3, rewards._poolRewards),
                        1: fromWei(web3, rewards._blizzRewards),
                        2: fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0),
                        3: fromWei(web3, rewards._blizzRewards) * Number(rPrices[1] ? rPrices[1] : 0),
                    });
                } else {
                    setRewards({
                        0: fromWei(web3, rewards._poolRewards),
                        1: fromWei(web3, rewards._autoRewards),
                        2: fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0),
                        3: fromWei(web3, rewards._autoRewards) * Number(rPrices[1] ? rPrices[1] : 0),
                    });
                }
                setBalance(fromWei(web3, walletB));
                break;
            }
            case "avax": {
                const vaultC = new web3.eth.Contract(
                    cVault.vault_abi,
                    cVault.vault_address
                );
                const walletB = await web3.eth.getBalance(account);
                const userB = await vaultC.methods.principalOf(account).call();
                const rewards = await vaultC.methods.claimable(account).call();

                const fub = toBN(web3, userB).add(toBN(web3, rewards._poolRewards));
                const UB = tokenPrices[cVault.base_token_id] * fromWei(web3, fub);

                const rPrices = calcRewardTokenPrice(cVault.earn, tokenPrices);
                setRewards({
                    0: fromWei(web3, rewards._poolRewards),
                    1: fromWei(web3, rewards._snowRewards),
                    2: fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0),
                    3: fromWei(web3, rewards._snowRewards) * Number(rPrices[1] ? rPrices[1] : 0),
                });
                setVaultBalance(UB);
                setBalance(fromWei(web3, walletB));
                setDepositBalance({
                    "fub": fromWei(web3, fub),
                    "ub": fromWei(web3, userB)
                });
                break;
            }
            case "usdc": {
                const tokenC = new web3.eth.Contract(
                    abi[cVault.id],
                    cVault.token_address
                );
                const vaultC = new web3.eth.Contract(
                    cVault.vault_abi,
                    cVault.vault_address
                );
                const walletB = await tokenC.methods.balanceOf(account).call();
                const userB = await vaultC.methods.principalOf(account).call();
                const rewards = await vaultC.methods.claimable(account).call();

                const fub = toBN(web3, userB).add(toBN(web3, rewards._poolRewards));
                const UB = tokenPrices[cVault.base_token_id] * fromWei(web3, fub);

                const rPrices = calcRewardTokenPrice(cVault.earn, tokenPrices);
                setRewards({
                    0: fromWei(web3, rewards._poolRewards),
                    1: fromWei(web3, rewards._snowRewards),
                    2: fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0),
                    3: fromWei(web3, rewards._snowRewards) * Number(rPrices[1] ? rPrices[1] : 0),
                });
                setVaultBalance(UB * 10 ** 12);
                setBalance(fromWei(web3, walletB) * 10 ** 12);
                setDepositBalance({
                    "fub": fromWei(web3, fub) * 10 ** 12,
                    "ub": fromWei(web3, userB) * 10 ** 12
                });
                break;
            }
            case "joe": {
                const tokenC = new web3.eth.Contract(
                    abi[cVault.id],
                    cVault.token_address
                );
                const vaultC = new web3.eth.Contract(
                    cVault.vault_abi,
                    cVault.vault_address
                );
                const walletB = await tokenC.methods.balanceOf(account).call();
                const userB = await vaultC.methods.principalOf(account).call();
                const rewards = await vaultC.methods.claimable(account).call();

                const fub = toBN(web3, userB).add(toBN(web3, rewards._poolRewards));
                const UB = tokenPrices[cVault.base_token_id] * fromWei(web3, fub);

                const rPrices = calcRewardTokenPrice(cVault.earn, tokenPrices);
                setRewards({
                    0: fromWei(web3, rewards._poolRewards),
                    1: fromWei(web3, rewards._snowRewards),
                    2: fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0),
                    3: fromWei(web3, rewards._snowRewards) * Number(rPrices[1] ? rPrices[1] : 0),
                });
                setVaultBalance(UB);
                setBalance(fromWei(web3, walletB));
                setDepositBalance({
                    "fub": fromWei(web3, fub),
                    "ub": fromWei(web3, userB)
                });
                break;
            }
            case "png": {
                const tokenC = new web3.eth.Contract(
                    abi[cVault.id],
                    cVault.token_address
                );
                const vaultC = new web3.eth.Contract(
                    cVault.vault_abi,
                    cVault.vault_address
                );
                const walletB = await tokenC.methods.balanceOf(account).call();
                const userB = await vaultC.methods.principalOf(account).call();
                const rewards = await vaultC.methods.claimable(account).call();

                const UB = tokenPrices[cVault.base_token_id] * fromWei(web3, userB);

                const rPrices = calcRewardTokenPrice(cVault.earn, tokenPrices);
                setRewards({
                    0: fromWei(web3, rewards._poolRewards),
                    1: fromWei(web3, rewards._autoRewards),
                    2: fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0),
                    3: fromWei(web3, rewards._autoRewards) * Number(rPrices[1] ? rPrices[1] : 0),
                });
                setVaultBalance(UB);
                setBalance(fromWei(web3, walletB));
                setDepositBalance({
                    "fub": fromWei(web3, userB),
                    "ub": fromWei(web3, userB)
                });
                break;
            }
            case "main": {
                const blizzC = new web3.eth.Contract(
                    cVault.blizz_abi,
                    cVault.token_address
                );
                const vaultC = new web3.eth.Contract(
                    cVault.vault_abi,
                    cVault.vault_address
                );
                const walletB = await blizzC.methods.balanceOf(account).call();
                const rewards = await vaultC.methods.claimable(account).call();
                if (cVault.tags[1] === "lock") {
                    const userB = await vaultC.methods.principalOf(account).call();
                    const userInfo = await vaultC.methods.userInfo(account).call();
                    const lockInfo = await vaultC.methods.lockInfo(userInfo.lockIndex).call();
                    const UB = fromWei(web3, userB) * tokenPrices[cVault.base_token_id];
                    const rPrices = calcRewardTokenPrice(cVault.earn, tokenPrices);
                    const currentTimestamp = Math.round(Date.now() / 1000);
                    setRewards({
                        0: fromWei(web3, rewards._poolRewards),
                        1: fromWei(web3, rewards._autoRewards),
                        2: fromWei(web3, rewards._poolRewards) * Number(rPrices[0] ? rPrices[0] : 0),
                        3: fromWei(web3, rewards._autoRewards) * Number(rPrices[1] ? rPrices[1] : 0),
                    });
                    if (userInfo.ending_timestamp < currentTimestamp) {
                        setExtraClaimLocked(false);
                        setExtraClaimAmount(fromWei(web3, userInfo.extraRewards));
                    } else {
                        setExtraClaimLocked(true);
                        setExtraClaimAmount(fromWei(web3, userInfo.principal) * lockInfo.rewardRate / 10000);
                    }
                    setVaultBalance(UB);
                    setBalance(fromWei(web3, walletB));
                    setDepositBalance({
                        "fub": fromWei(web3, userB),
                        "ub": fromWei(web3, userB)
                    });
                    setLastDeposit(userInfo.lastDepositTime);
                    setUnlockDeposit(userInfo.ending_timestamp);
                } else {
                    const userB = await vaultC.methods.balanceOf(account).call();
                    const lockB = await vaultC.methods.lockedBalances(account).call();
                    const vestB = await vaultC.methods.vestedBalances(account).call();
                    const wbwp = await vaultC.methods.withdrawableBalance(account).call();
                    const LU = fromWei(web3, lockB.unlockable);
                    const UB = fromWei(web3, userB) * tokenPrices[cVault.base_token_id];
                    const rPrices = calcRewardTokenPrice(cVault.earn, tokenPrices);
                    setRewards({
                        0: fromWei(web3, rewards.totalReward),
                        1: fromWei(web3, rewards.lockedReward),
                        2: fromWei(web3, rewards.totalReward) * Number(rPrices[0] ? rPrices[0] : 0),
                        3: fromWei(web3, rewards.lockedReward) * Number(rPrices[1] ? rPrices[1] : 0),
                    });
                    setVaultBalance(UB);
                    setVestItem(vestB.earningsData);
                    setWbwp({
                        wbwp: Number(fromWei(web3, wbwp.amount)) + Number(LU),
                        fub: Number(fromWei(web3, wbwp.amount)) - Number(fromWei(web3, wbwp.penaltyAmount))
                    });
                    setBalance(fromWei(web3, walletB));
                    setVestBalance(fromWei(web3, vestB.total));
                    setDepositBalance({
                        "fub": fromWei(web3, userB),
                        "ub": fromWei(web3, userB)
                    });
                }
            }
        }
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

    return (
        <Container
            className={
                isMobile ?
                    `${classes.vaultDetail} mobile` :
                    classes.vaultDetail}
            maxWidth="sm"
        >
            <Card className="card">
                <Box>
                    <Button
                        color="secondary"
                        size="small"
                        startIcon={
                            <KeyboardBackspaceIcon />
                        }
                        onClick={() => goBack()}
                        variant="outlined"
                    >
                        Back
                    </Button>
                </Box>
                <Box className="card-header">
                    <Typography className="title">
                        {currentVault.name}
                    </Typography>
                    <Typography color="secondary" className="description">
                        {currentVault.description}
                    </Typography>
                </Box>
                <Table className="table">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                {
                                    (params.id === "blizz-stake" || params.id === "blizz-avax-max") ? "APR" : "APY"
                                }
                            </TableCell>
                            <TableCell colSpan={2}>
                                {(() => {
                                    if (currentVault.tags[0] === "main") {
                                        if (currentVault.tags[1] === "stake") {
                                            if (blizzAPY.stake)
                                                return <Typography>{fn(blizzAPY.stake * 100, 2)}%</Typography>
                                            else
                                                return <Skeleton className="skelton" animation="wave" />
                                        } else {
                                            if (blizzAPY.lock)
                                                return <Typography>{fn(blizzAPY.lock * 100, 2)}% <b>(MAX)</b></Typography>
                                            else
                                                return <Skeleton className="skelton" animation="wave" />
                                        }
                                    } else if (currentVault.tags[2] === "blizz-avax") {
                                        if (apy[params.id])
                                            return <Typography>{fn(apy[params.id].apr * 100, 2)}%</Typography>
                                        else
                                            return <Skeleton className="skelton" animation="wave" />
                                    } else {
                                        if (apy[params.id])
                                            return <Typography>{fn(apy[params.id].apy * 100, 2)}%</Typography>
                                        else
                                            return <Skeleton className="skelton" animation="wave" />
                                    }
                                })()}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Deposit</TableCell>
                            {(() => {
                                if (depositBalance.fub >= 0) {
                                    const dv = Number(depositBalance.fub).toFixed(4);
                                    if (dv < 0.0001) {
                                        return (
                                            <Tooltip arrow title={depositBalance.fub}>
                                                <TableCell>{fn(depositBalance.fub, 10)}</TableCell>
                                            </Tooltip>
                                        )
                                    } else {
                                        return (
                                            <TableCell>{fn(depositBalance.fub)}</TableCell>
                                        )
                                    }
                                } else {
                                    return <TableCell><Skeleton className="skelton" animation="wave" /></TableCell>
                                }
                            })()}
                            <TableCell>
                                {currentVault.token_name}
                            </TableCell>
                        </TableRow>
                        {(() => {
                            if (currentVault.tags[1] === "lock" && Number(depositBalance.fub) > 0) {
                                return (
                                    <>
                                        <TableRow>
                                            <TableCell>
                                                Locked At
                                            </TableCell>
                                            <TableCell
                                                colSpan={2}
                                                style={{
                                                    textAlign: "right",
                                                }}
                                            >
                                                {new Date(lastDeposit * 1000).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Unlock At
                                            </TableCell>
                                            <TableCell
                                                colSpan={2}
                                                style={{
                                                    textAlign: "right",
                                                }}
                                            >
                                                {new Date(unlockDeposit * 1000).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            }
                        })()}
                        {(() => {
                            if (currentVault.tags[1] === "stake") {
                                return (
                                    <>
                                        <TableRow>
                                            <TableCell>Vest</TableCell>
                                            <TableCell>
                                                {Number(vestBalance) < 0.0001 &&
                                                    Number(vestBalance) > 0 ? (
                                                    <Tooltip
                                                        arrow={true}
                                                        placement="top"
                                                        title={vestBalance}
                                                    >
                                                        <Typography>
                                                            {fn(vestBalance)}
                                                        </Typography>
                                                    </Tooltip>
                                                ) : (
                                                    fn(vestBalance)
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {currentVault.token_name}
                                                <IconButton disabled={vestItem.length === 0} onClick={() => setIsVestOpen(!isVestOpen)} size="small">
                                                    {
                                                        isVestOpen ?
                                                            <KeyboardArrowUpIcon className={vestItem.length ? "" : classes.vhide} />
                                                            : <KeyboardArrowDownIcon className={vestItem.length ? "" : classes.vhide} />
                                                    }
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        {
                                            vestItem.length > 0 && (
                                                <TableRow>
                                                    <TableCell style={{ padding: 0 }} colSpan={3}>
                                                        <Collapse in={isVestOpen} timeout="auto" unmountOnExit>
                                                            <Table size="small">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Amount</TableCell>
                                                                        <TableCell align="right">Unlock Time</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {vestItem.map((item, idx) => {
                                                                        return (
                                                                            <TableRow key={idx}>
                                                                                <TableCell>{fn(item.amount / Math.pow(10, 18))} BLIZZ</TableCell>
                                                                                <TableCell align="right">{new Date(item.unlockTime * 1000).toLocaleString()}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </>
                                )
                            }
                        })()}
                        {currentVault.show_last_deposit_time && <TableRow>
                            <TableCell colSpan={2}>Last Deposit At</TableCell>
                            <TableCell style={{ textAlign: "right" }}>
                                <Typography>{lastDeposit ? new Date(lastDeposit * 1000).toLocaleString() : 'No deposit yet'}</Typography>
                            </TableCell>
                        </TableRow>}
                        <TableRow>
                            <TableCell>Profits</TableCell>
                            <TableCell>
                                {(() => {
                                    if (Number(rewards[0]) < 0.0001 && Number(rewards[0]) > 0) {
                                        return (
                                            <Tooltip arrow title={`${currentVault.earn[0]}: ${rewards[0]}`}>
                                                <Typography>
                                                    {Number(balance).toFixed(4) < 0.0001 ? fn(rewards[0], 9) : fn(rewards[0])}{` ${currentVault.earn[0]}`}
                                                </Typography>
                                            </Tooltip>
                                        )
                                    } else if (currentVault.earn[0]) {
                                        return (
                                            <Typography>
                                                {fn(rewards[0])}{` ${currentVault.earn[0]}`}
                                            </Typography>
                                        )
                                    };
                                })()}
                                {(() => {
                                    if (Number(rewards[1]) < 0.0001 && Number(rewards[1]) > 0) {
                                        return (
                                            <Tooltip arrow title={`${currentVault.earn[1]}: ${rewards[1]}`}>
                                                <Typography>
                                                    {Number(balance).toFixed(4) < 0.0001 ? fn(rewards[1], 9) : fn(rewards[1])}{` ${currentVault.earn[1]}`}
                                                </Typography>
                                            </Tooltip>
                                        )
                                    } else if (currentVault.earn[1]) {
                                        return (
                                            <Typography>
                                                {fn(rewards[1])}{` ${currentVault.earn[1]}`}
                                            </Typography>
                                        )
                                    };
                                })()}
                            </TableCell>
                            <TableCell>
                                {(() => {
                                    const cv = currentVault;
                                    if (cv.tags[1] === "compound") {
                                        if (cv.tags[0] === "joe" || cv.tags[0] === "avax" || cv.tags[0] === "usdc") {
                                            return (
                                                <Tooltip arrow title="Vested BLIZZ will be locked for 3 months. If you withdraw early, you will be charged 50% penalty">
                                                    <Button
                                                        onClick={() => claim()}
                                                        size="small"
                                                        variant="outlined"
                                                        disabled={chainId === netId ? false : true}
                                                    >
                                                        Vest
                                                    </Button>
                                                </Tooltip>
                                            )
                                        } else {
                                            return (
                                                <Tooltip arrow title="Vested BLIZZ will be locked for 3 months. If you withdraw early, you will be charged 50% penalty">
                                                    <Button
                                                        onClick={() => vest()}
                                                        size="small"
                                                        variant="outlined"
                                                        disabled={chainId === netId ? false : true}
                                                    >
                                                        Vest
                                                    </Button>
                                                </Tooltip>
                                            )
                                        }
                                    } else if ((cv.tags[1] === "maximizer" && cv.tags[2] !== "blizz-avax") || cv.tags[0] === "png") {
                                        return (
                                            <ButtonGroup orientation={isMobile ? "vertical" : "horizontal"}>
                                                <Tooltip arrow title="Vested BLIZZ will be locked for 3 months. If you withdraw early, you will be charged 50% penalty">
                                                    <Button
                                                        onClick={() => vest()}
                                                        size="small"
                                                        variant="outlined"
                                                        disabled={chainId === netId ? false : true}
                                                    >
                                                        Vest
                                                    </Button>
                                                </Tooltip>
                                                <Button
                                                    onClick={() => claim()}
                                                    size="small"
                                                    variant="outlined"
                                                    disabled={chainId === netId ? false : true}
                                                >
                                                    Claim
                                                </Button>
                                            </ButtonGroup>
                                        )
                                    } else {
                                        if (cv.tags[2] === "blizz-avax") {
                                            return (
                                                <Button
                                                    onClick={() => claim()}
                                                    size="small"
                                                    variant="outlined"
                                                    disabled={chainId === netId ? false : true}
                                                >
                                                    Claim
                                                </Button>
                                            )
                                        } else if (cv.tags[1] === "lock") {
                                            return (
                                                <Tooltip arrow title="BLIZZ profits stay locked until timer expires">
                                                    <Button
                                                        onClick={() => claim()}
                                                        size="small"
                                                        variant="outlined"
                                                        disabled={chainId === netId ? false : true}
                                                    >
                                                        Claim
                                                    </Button>
                                                </Tooltip>
                                            )

                                        } else {
                                            return (
                                                <Button
                                                    onClick={() => claim()}
                                                    size="small"
                                                    variant="outlined"
                                                    disabled={chainId === netId ? false : true}
                                                >
                                                    Claim
                                                </Button>
                                            )
                                        }
                                    }
                                })()}
                            </TableCell>
                        </TableRow>
                        {(() => {
                            if (currentVault.tags[1] === "lock") {
                                return (
                                    <TableRow>
                                        <TableCell>Extra Profits</TableCell>
                                        <TableCell>
                                            {fn(extraClaimAmount)}{" BLIZZ"}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip arrow title="Extra profits stay locked until timer expires">
                                                <span>
                                                    <Button
                                                        onClick={() => extraClaim()}
                                                        size="small"
                                                        variant="outlined"
                                                        disabled={chainId !== netId || extraClaimLocked ? true : false}
                                                    >
                                                        Extra Claim
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        })()}
                    </TableBody>
                </Table>
                <Tabs
                    value={activeTab}
                    className="tabs"
                    indicatorColor="primary"
                    textColor="secondary"
                    variant="fullWidth"
                    onChange={handleActiveTab}
                >
                    <Tab label="Deposit" />
                    <Tab label="Withdraw" />
                </Tabs>
                <Typography className="fee-description">
                    {currentVault.fee_description}
                </Typography>
                {(() => {
                    if (currentVault.tags[1] === "lock" && activeTab === 0) {
                        return (
                            <Table
                                className="table select"
                                style={{ marginTop: 16 }}
                            >
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Locking Period
                                        </TableCell>
                                        <TableCell >
                                            <Select
                                                size="small"
                                                labelId="locking-period"
                                                id="locking-period-select"
                                                value={lockingPeriod}
                                                fullWidth
                                                variant="outlined"
                                                className={"locking-select"}
                                                onChange={e => setLockingPeriod(e.target.value)}
                                            >
                                                <MenuItem value={0}>3 Months</MenuItem>
                                                <MenuItem value={1}>6 Months</MenuItem>
                                                <MenuItem value={2}>9 Months</MenuItem>
                                                <MenuItem value={3}>12 Months</MenuItem>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        )
                    }
                })()}
                <TextField
                    id="amount"
                    variant="outlined"
                    fullWidth
                    value={amount ? amount : 0}
                    color="secondary"
                    className="input"
                    InputProps={{
                        readOnly: currentVault.tags[1] === "lock" && activeTab === 1 ? true : false,
                        placeholder: "0",
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className="max-pattern"
                            >
                                <Typography>
                                    {currentVault.token_name}
                                </Typography>
                                <Button
                                    onClick={
                                        () => setMaxBalance(
                                            balance,
                                            currentVault.tags[1] === "lock" ?
                                                wbwp : depositBalance.ub
                                        )
                                    }
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                >
                                    Max
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setAmount(e.target.value)}
                    helperText={
                        (() => {
                            if (currentVault.tags[1] === "stake" && activeTab === 1) {
                                if (Number(wbwp.wbwp) === Number(depositBalance.ub)) {
                                    return (
                                        <>
                                            Withdrawable :&nbsp;
                                            {Number(wbwp.fub).toFixed(4) < 0.0001 ? wbwp.fub : fn(wbwp.fub)}
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            Withdrawable :&nbsp;
                                            {Number(wbwp.fub).toFixed(4) < 0.0001 ? wbwp.fub : fn(wbwp.fub)}
                                            <br />
                                            <Tooltip arrow title="Withdrawable with 50% penalty for still vested balances">
                                                <Box component="span">
                                                    Withdrawable with 50% penalty :&nbsp;
                                                    {Number(wbwp.wbwp).toFixed(4) < 0.0001 ? wbwp.wbwp : fn(wbwp.wbwp)}
                                                </Box>
                                            </Tooltip>
                                        </>
                                    )
                                }
                            } else {
                                return (
                                    <>Wallet Balance : {Number(balance).toFixed(4) < 0.0001 ? fn(balance, 10) : fn(balance)}</>
                                )
                            }
                        })()
                    }
                />
                <Box className="balance">
                    <Typography className="title">
                        Your Balance
                    </Typography>
                    <Typography className="value">
                        {(() => {
                            const fb = Number(vaultBalance) + Number(rewards[2] ? rewards[2] : 0) + Number(rewards[3] ? rewards[3] : 0);
                            if (fb < 0.01 && fb > 0) {
                                return (
                                    <Tooltip arrow placement="top" title={fb}>
                                        <Box component="span">${fn(fb)}</Box>
                                    </Tooltip>
                                )
                            } else {
                                return <>${fn(fb)}</>
                            }
                        })()}
                    </Typography>
                </Box>
                <Box className="checkout">
                    {(() => {
                        if (!account) {
                            return (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setIsOpenDialog(true);
                                    }}
                                >
                                    Connect Wallet
                                </Button>
                            )
                        } else {
                            if (chainId === netId) {
                                if (activeTab === 0) {
                                    if (currentVault.tags[1] === "stake") {
                                        return (
                                            <Tooltip arrow title="Vested BLIZZ will be locked for 3 months. If you withdraw early, you will be charged 50% penalty">
                                                <Button
                                                    fullWidth
                                                    onClick={() => deposit()}
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Deposit
                                                </Button>
                                            </Tooltip>
                                        )
                                    } else if (currentVault.tags[1] === "lock") {
                                        return (
                                            <Tooltip arrow title="Lock timer resets with every new deposit">
                                                <Button
                                                    fullWidth
                                                    onClick={() => deposit()}
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Deposit
                                                </Button>
                                            </Tooltip>
                                        )
                                    } else {
                                        return (
                                            <Button
                                                fullWidth
                                                disabled={currentVault.isRibbon ? true : false}
                                                onClick={() => deposit()}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Deposit
                                            </Button>
                                        )
                                    }
                                } else {
                                    if (currentVault.tags[1] === "lock") {
                                        return (
                                            <Button
                                                fullWidth
                                                onClick={() => withdrawAll()}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Withdraw All
                                            </Button>
                                        )
                                    } else if (currentVault.tags[1] === "stake") {
                                        return (
                                            <Tooltip arrow title="Vested BLIZZ will be locked for 3 months. If you withdraw early, you will be charged 50% penalty">
                                                <Box className="buttonGroup">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => withdraw()}
                                                    >
                                                        Withdraw
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => withdrawAll()}
                                                    >
                                                        Withdraw All
                                                    </Button>
                                                </Box>
                                            </Tooltip>
                                        )
                                    } else {
                                        if (currentVault.tags[1] === "compound") {
                                            return (
                                                <Tooltip arrow title="You will get compounded profit after withdrawal">
                                                    <Box className="buttonGroup">
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => withdraw()}
                                                        >
                                                            Withdraw
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => withdrawAll()}
                                                        >
                                                            Withdraw All
                                                        </Button>
                                                    </Box>
                                                </Tooltip>
                                            )
                                        } else {
                                            return (
                                                <Box className="buttonGroup">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => withdraw()}
                                                    >
                                                        Withdraw
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => withdrawAll()}
                                                    >
                                                        Withdraw All
                                                    </Button>
                                                </Box>
                                            )
                                        }
                                    }
                                }
                            } else {
                                return (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    >
                                        Please Switch To Avalanche Network
                                    </Button>
                                )
                            }
                        }
                    })()}
                </Box>
            </Card>
            <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
        </Container>
    )
}

export default Vault;