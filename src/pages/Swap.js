import React, { useState } from "react";

import clsx from "clsx";

// ** Import Material UI
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";

import SnowStorm from 'react-snowstorm';

// import MobileStepper from '@mui/material/MobileStepper';

// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';

// ** Import Assets
import useStyles from "../assets/constants/styles";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//     {
//         label: 'San Francisco – Oakland Bay Bridge, United States',
//         imgPath:
//             'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//     },
//     {
//         label: 'Bird',
//         imgPath:
//             'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//     },
//     {
//         label: 'Bali, Indonesia',
//         imgPath:
//             'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
//     },
//     {
//         label: 'Goč, Serbia',
//         imgPath:
//             'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//     },
// ];

const Swap = () => {
    const classes = useStyles();
    const isMobile = useMediaQuery("(max-width:600px)");

    // const [activeStep, setActiveStep] = useState(0);
    const [inputToken, setInputToken] = useState({
        id: "blizzard-network",
        symbol: "BLIZZ",
        img: "https://assets.coingecko.com/coins/images/18446/large/blizz.PNG?1632059955"
    });
    const [targetToken, setTargetToken] = useState({});
    const [percentage, setPercentage] = useState(25);
    const [inputTokenAmount, setInputTokenAmount] = useState();
    const [targetTokenAmount, setTargetTokenAmount] = useState();

    const handleInputTokenAmount = (e) => {
        setInputTokenAmount(e.target.value);
    }
    const handleTargetTokenAmount = (e) => {
        setTargetTokenAmount(e.target.value);
    }
    const handlePercentage = (e, v) => {
        setPercentage(v);
    };
    // const handleStepChange = (step) => {
    //     setActiveStep(step);
    // };
    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };
    const swapTokens = () => {
        setTargetToken(inputToken);
        setInputToken(targetToken);
        setInputTokenAmount(targetTokenAmount);
        setTargetTokenAmount(inputTokenAmount);
    }

    return (
        <Container
            className={
                clsx(classes.swap, {
                    "mobile": isMobile
                })
            }
            maxWidth="sm"
        >
            <SnowStorm
                animationInterval={22}
                flakesMax={20}
                flakesMaxActive={10}
                followMouse={false}
                snowStick={false}
                snowColor="#595967"
            />
            {/* <AutoPlaySwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                className="ad-slide"
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={images.length}
                position="static"
                className="stepper"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleNext}
                        disabled={activeStep === images.length - 1}
                    >
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            /> */}
            <Card className="card">
                <Grid container className="swap">
                    <Grid item xs={12} sm={4} className="token-select">
                        <img
                            src={inputToken.img ? inputToken.img : "data:image/png;base64,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"}
                            alt={inputToken.id ? inputToken.id : "select-token"}
                        />
                        <Box className="token">
                            {(() => {
                                if (inputToken.symbol) {
                                    return (
                                        <Button
                                            disableRipple
                                            disableElevation
                                            disableFocusRipple
                                            endIcon={
                                                <ExpandMoreIcon />
                                            }
                                        >
                                            {inputToken.symbol}
                                        </Button>
                                    )
                                } else {
                                    return (
                                        <Button
                                            className="select-token"
                                            size="small"
                                            variant="outlined"
                                        >
                                            Select
                                        </Button>
                                    )
                                }
                            })()}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} className="token-amount">
                        <TextField
                            fullWidth
                            inputProps={{
                                min: "0",
                            }}
                            value={inputTokenAmount}
                            onChange={handleInputTokenAmount}
                            InputProps={{
                                placeholder: "0.00",
                                type: "number",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button variant="outlined" className="max-button">Max</Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Box className="swap-tool">
                    <ToggleButtonGroup
                        color="primary"
                        value={percentage}
                        exclusive
                        className="swap-percentage"
                        onChange={handlePercentage}
                    >
                        <ToggleButton value={25}>25%</ToggleButton>
                        <ToggleButton value={50}>50%</ToggleButton>
                        <ToggleButton value={75}>75%</ToggleButton>
                        <ToggleButton value={100}>100%</ToggleButton>
                    </ToggleButtonGroup>
                    <IconButton onClick={swapTokens} className="swap-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <clipPath id="__lottie_element_2563">
                                    <rect width="500" height="500" x="0" y="0"></rect>
                                </clipPath>
                                <clipPath id="__lottie_element_2565">
                                    <path d="M0,0 L500,0 L500,500 L0,500z"></path>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#__lottie_element_2563)">
                                <g transform="matrix(4.5,0,0,4.5,207.25,194.875)" opacity="1" >
                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                        <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(226,226,226)" strokeOpacity="1" strokeWidth="5.6000000000000005" d=" M28.945999145507812,-27.937000274658203 C28.966999053955078,-9.605999946594238 29.014999389648438,33.75299835205078 29.034000396728516,50.236000061035156"></path>
                                    </g>
                                </g>
                                <g transform="matrix(3.1819803714752197,-3.1819803714752197,3.1819803714752197,3.1819803714752197,363.2012939453125,326.5682373046875)" opacity="1">
                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                        <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(226,226,226)" strokeOpacity="1" strokeWidth="5.6000000000000005" d=" M-20.548999786376953,-4.929999828338623 C-20.548999786376953,-4.929999828338623 -20.548999786376953,12.746999740600586 -20.548999786376953,12.746999740600586 C-20.548999786376953,12.746999740600586 -2.927000045776367,12.746999740600586 -2.927000045776367,12.746999740600586"></path>
                                    </g>
                                </g>
                                <g transform="matrix(-4.5,0,0,-4.5,292.75,305.125)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                    <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(226,226,226)" strokeOpacity="1" strokeWidth="5.6000000000000005" d=" M28.945999145507812,-27.937000274658203 C28.966999053955078,-9.605999946594238 29.014999389648438,33.75299835205078 29.034000396728516,50.236000061035156"></path>
                                </g>
                                </g>
                                <g transform="matrix(-3.1819803714752197,3.1819803714752197,-3.1819803714752197,-3.1819803714752197,136.79869079589844,173.43174743652344)" opacity="1">
                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                        <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(226,226,226)" strokeOpacity="1" strokeWidth="5.6000000000000005" d=" M-20.548999786376953,-4.929999828338623 C-20.548999786376953,-4.929999828338623 -20.548999786376953,12.746999740600586 -20.548999786376953,12.746999740600586 C-20.548999786376953,12.746999740600586 -2.927000045776367,12.746999740600586 -2.927000045776367,12.746999740600586"></path>
                                    </g>
                                </g>
                                <g clipPath="url(#__lottie_element_2565)" transform="matrix(1,0,0,1,0,0)" opacity="1">
                                </g>
                            </g>
                        </svg>
                    </IconButton>
                    <Divider flexItem />
                </Box>
                <Grid container className="swap">
                    <Grid item xs={12} sm={4} className="token-select">
                        <img
                            src={targetToken.img ? targetToken.img : "data:image/png;base64,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"}
                            alt={targetToken.id ? targetToken.id : "select-token"}
                        />
                        <Box className="token">
                            {(() => {
                                if (targetToken.symbol) {
                                    return (
                                        <Button
                                            disableRipple
                                            disableElevation
                                            disableFocusRipple
                                            endIcon={
                                                <ExpandMoreIcon />
                                            }
                                        >
                                            {targetToken.symbol}
                                        </Button>
                                    )
                                } else {
                                    return (
                                        <Button
                                            className="select-token"
                                            size="small"
                                            variant="outlined"
                                        >
                                            Select
                                        </Button>
                                    )
                                }
                            })()}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} className="token-amount">
                        <TextField
                            fullWidth
                            value={targetTokenAmount}
                            onChange={handleTargetTokenAmount}
                            InputProps={{
                                placeholder: "0.00",
                                readOnly: true,
                                type: "number",
                            }}
                        />
                    </Grid>
                </Grid>
                <Table className="table">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Price
                            </TableCell>
                            <TableCell style={{ textAlign: "right" }}>
                                23.345 BLIZZ per USDC
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Price Impact
                            </TableCell>
                            <TableCell style={{ textAlign: "right" }}>
                                0.00 %
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {(() => {
                    return (
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            className="action"
                        >
                            SWAP
                        </Button>
                    )
                })()}
                <Typography
                    className="rate-title"
                    color="secondary"
                >
                    Best Rate Routing
                </Typography>
                <Grid container>
                    <Grid item className="g-item token-detail left" xs={3}>
                        <Box className="flex-parent">
                            <img className="token" src="https://assets.coingecko.com/coins/images/18446/large/blizz.PNG?1632059955" alt="token" />
                            <Typography color="secondary">
                                100%
                            </Typography>
                        </Box>
                        <Typography className="token-amount" color="secondary">26 BLIZZ</Typography>
                        <Typography className="token-price" color="secondary">~ $25.30</Typography>
                    </Grid>
                    <Grid item className="g-item" xs={1}>
                        <IconButton size="small">
                            <ArrowRightAltIcon />
                        </IconButton>
                    </Grid>
                    <Grid item className="g-item no-wrap" xs={4}>
                        <img src="https://assets.coingecko.com/coins/images/17569/large/joe_200x200.png?1628497750" alt="token" />
                        <img src="https://assets.coingecko.com/coins/images/14023/large/pangolin.jpg?1613743598" alt="token" />
                    </Grid>
                    <Grid item className="g-item" xs={1}>
                        <IconButton size="small">
                            <ArrowRightAltIcon />
                        </IconButton>
                    </Grid>
                    <Grid item className="g-item token-detail right" xs={3}>
                        <Box className="flex-parent">
                            <img className="token" src="https://raw.githubusercontent.com/sushiswap/icons/master/token/usdc.jpg" alt="token" />
                            <Typography color="secondary">
                                100%
                            </Typography>
                        </Box>
                        <Typography className="token-amount" color="secondary">26 USDC</Typography>
                        <Typography className="token-price" color="secondary">~ $25.30</Typography>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}

export default Swap;