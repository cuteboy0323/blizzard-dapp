import React from "react";

// ** Import Material-Ui Components
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Import Assets
import useStyles from "../assets/constants/styles";

// ** Import Icons
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

import {
    TelegramLink,
    GithubLink,
    TwitterLink,
    MediumLink,
    BugBountyLink
} from "../config/app";

const Footer = () => {
    // ** Maintaiers
    const classes = useStyles();
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <>
            <Box className={classes.bugBounty}>
                <Link underline="none" href={BugBountyLink} target="_blank">
                    <Container maxWidth="md">
                        <Box>
                            <Box className="border top-border" />
                            <Box className="content">
                                <img height={32} src="https://pancakebunny.finance/static/media/label-immunefi.cb02b777.svg" alt="bug-bounty" />
                                Blizzard Bug Bounty by Immunefi
                            </Box>
                            <Box className="border bottom-border" />
                        </Box>
                    </Container>
                </Link>
            </Box>
            <AppBar
                position="static"
                component="footer"
                className={classes.footer}
            >
                <Toolbar className="toolbar">
                    <Link underline="none" href={TelegramLink} target="_blank">
                        <Button
                            className={isMobile ? "social-link mobile" : "social-link"}
                            startIcon={
                                <TelegramIcon />
                            }
                        >
                            {
                                !isMobile && (
                                    <Box className="social-link-name">
                                        Telegram
                                    </Box>
                                )
                            }
                        </Button>
                    </Link>
                    <Link underline="none" href={GithubLink} target="_blank">
                        <Button
                            className={isMobile ? "social-link mobile" : "social-link"}
                            startIcon={
                                <GitHubIcon />
                            }
                        >
                            {
                                !isMobile && (
                                    <Box className="social-link-name">
                                        Github
                                    </Box>
                                )
                            }
                        </Button>
                    </Link>
                    <Link underline="none" href={TwitterLink} target="_blank">
                        <Button
                            className={isMobile ? "social-link mobile" : "social-link"}
                            startIcon={
                                <TwitterIcon />
                            }
                        >
                            {
                                !isMobile && (
                                    <Box className="social-link-name">
                                        Twitter
                                    </Box>
                                )
                            }
                        </Button>
                    </Link>
                    <Link underline="none" href={MediumLink} target="_blank">
                        <Button
                            className={isMobile ? "social-link mobile" : "social-link"}
                            startIcon={
                                <svg version="1.1" id="Bold"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px" y="0px" viewBox="0 0 512 512">
                                    <path fill="rgb(191, 191, 191)" className="st0" d="M170.6,454.9c0,14.8-11.1,20.9-23.4,14.8L14.3,403.3c-4-1.9-7.4-5.1-10.1-9.5S0,384.9,0,380.5V55.7
                                c0-12.1,7.3-17.6,23.7-9.4l146,73C171.8,121.3,170.3,106.8,170.6,454.9L170.6,454.9z M188.9,149.4l152.6,246.8l-152.6-75.8
                                L188.9,149.4z M512,154.6v300.4c0,4.8-1.3,8.6-4,11.5c-2.7,2.9-6.3,4.4-10.9,4.4c-4.6,0-9-1.2-13.4-3.7l-126-62.7L512,154.6z
                                 M511.1,120.4c0,0.6-24.4,40.4-73.3,119.5S360.4,365.3,352,378.8L240.6,198.1L333.1,48c5-8.3,15.4-9.7,22.3-6.3L510,118.7
                                C510.8,119,511.1,119.6,511.1,120.4L511.1,120.4z"/>
                                </svg>

                            }
                        >
                            {
                                !isMobile && (
                                    <Box className="social-link-name">
                                        Medium
                                    </Box>
                                )
                            }
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Footer;