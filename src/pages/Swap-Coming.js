import React from "react";

import clsx from "clsx";

// ** Import Material UI
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Import Assets
import useStyles from "../assets/constants/styles";

const Swap = () => {
    const classes = useStyles();
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Container
            className={
                clsx(classes.swap, {
                    "mobile": isMobile
                })
            }
            maxWidth="sm"
        >
            <Box className="coming-soon">
                <svg width="120" height="115" viewBox="0 0 120 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M95.5598 101.699V106.58C95.5598 108.707 93.8367 110.432 91.7079 110.432H29.4198C27.291 110.432 25.5679 108.707 25.5679 106.58V101.699C25.5679 99.5723 27.291 97.8467 29.4198 97.8467H34.1988H86.9291H91.7081C93.8369 97.8467 95.5598 99.5723 95.5598 101.699Z" fill="rgb(191, 191, 191)" />
                    <path d="M95.5598 6.4198V11.3015C95.5598 13.4277 93.8367 15.1534 91.7079 15.1534H86.9289H34.1988H29.4198C27.291 15.1534 25.5679 13.4277 25.5679 11.3015V6.4198C25.5679 4.29353 27.291 2.56787 29.4198 2.56787H91.7081C93.8369 2.56787 95.5598 4.29328 95.5598 6.4198Z" fill="rgb(191, 191, 191)" />
                    <path d="M86.9285 85.9953V97.8464L63.383 85.7308C61.6137 84.8217 59.5131 84.8217 57.7438 85.7308L34.1982 97.8464V85.9953V85.9927C34.1982 73.2171 43.2837 62.5678 55.3453 60.1488V52.8507C57.0325 53.1922 58.7761 53.3694 60.5634 53.3694C62.3507 53.3694 64.0943 53.1922 65.7815 52.8507V60.1488C77.8431 62.5678 86.9285 73.2171 86.9285 85.9927V85.9953V85.9953Z" fill="rgb(191, 191, 191)" />
                    <path d="M86.9285 15.1531V27.0068C86.9285 28.5707 86.7924 30.1012 86.5305 31.5906H34.5963C34.3343 30.1012 34.1982 28.5707 34.1982 27.0068V15.1531H86.9285V15.1531Z" fill="rgb(191, 191, 191)" />
                    <path d="M86.9285 97.8465H34.1982L57.7438 85.731C59.5131 84.8219 61.6137 84.8219 63.383 85.731L86.9285 97.8465Z" fill="rgb(191, 191, 191)" />
                    <path d="M34.5964 31.5909H86.5307C84.6587 42.2633 76.3668 50.7273 65.7817 52.851C64.0945 53.1925 62.3509 53.3697 60.5636 53.3697C58.7763 53.3697 57.0326 53.1925 55.3455 52.851C44.7607 50.7273 36.4685 42.263 34.5964 31.5909Z" fill="rgb(191, 191, 191)" />
                    <path d="M55.349 55.4192C55.1816 55.4192 55.0116 55.4028 54.841 55.3686C49.1343 54.2236 43.9565 51.406 39.8673 47.2213C35.7722 43.0299 33.0751 37.7781 32.0677 32.0344C31.778 30.3876 31.6311 28.6958 31.6311 27.0071C31.6311 25.5891 32.7808 24.4391 34.1991 24.4391C35.6173 24.4391 36.767 25.5891 36.767 27.0071C36.767 28.3984 36.888 29.791 37.126 31.1459C38.8042 40.7123 46.329 48.4226 55.8513 50.3331C57.2418 50.6123 58.1429 51.9656 57.8638 53.3559C57.6193 54.5759 56.5475 55.4192 55.349 55.4192Z" fill="#181837" />
                    <path d="M65.7796 55.4192C64.5811 55.4192 63.5095 54.5761 63.2645 53.3559C62.9856 51.9656 63.8865 50.612 65.277 50.3331C74.7992 48.4228 82.3241 40.7123 84.002 31.1472C84.2406 29.791 84.3613 28.3984 84.3613 27.0071C84.3613 25.5891 85.5109 24.4391 86.9292 24.4391C88.3475 24.4391 89.4972 25.5891 89.4972 27.0071C89.4972 28.6958 89.3503 30.3876 89.0603 32.0357C88.0532 37.7781 85.3561 43.0299 81.261 47.2213C77.172 51.4063 71.9943 54.2236 66.2872 55.3686C66.117 55.4028 65.9467 55.4192 65.7796 55.4192Z" fill="#181837" />
                    <path d="M34.1991 29.5751C32.7808 29.5751 31.6311 28.4252 31.6311 27.0072V15.1535C31.6311 13.7355 32.7808 12.5856 34.1991 12.5856C35.6174 12.5856 36.767 13.7355 36.767 15.1535V27.0072C36.767 28.4252 35.6171 29.5751 34.1991 29.5751Z" fill="#181837" />
                    <path d="M86.9293 29.5751C85.511 29.5751 84.3613 28.4252 84.3613 27.0072V15.1535C84.3613 13.7355 85.511 12.5856 86.9293 12.5856C88.3476 12.5856 89.4973 13.7355 89.4973 15.1535V27.0072C89.4973 28.4252 88.3476 29.5751 86.9293 29.5751Z" fill="#181837" />
                    <path d="M91.7079 17.7215H29.4199C25.88 17.7215 23 14.8415 23 11.3016V6.41989C23 2.87996 25.88 0 29.4199 0H91.7082C95.2481 0 98.1281 2.87996 98.1281 6.41989V11.3016C98.1278 14.8415 95.2479 17.7215 91.7079 17.7215ZM29.4199 5.13591C28.7119 5.13591 28.1359 5.7119 28.1359 6.41989V11.3016C28.1359 12.0096 28.7119 12.5855 29.4199 12.5855H91.7082C92.4162 12.5855 92.9922 12.0096 92.9922 11.3016V6.41989C92.9922 5.7119 92.4162 5.13591 91.7082 5.13591H29.4199Z" fill="#181837" />
                    <path d="M34.1991 88.5607C32.7808 88.5607 31.6311 87.4108 31.6311 85.9928C31.6311 72.2563 41.3924 60.3283 54.8413 57.6312C56.2306 57.3531 57.5854 58.2537 57.864 59.644C58.1429 61.0345 57.2418 62.3881 55.8513 62.6667C44.7932 64.8844 36.7673 74.6945 36.7673 85.9928C36.767 87.4111 35.6171 88.5607 34.1991 88.5607Z" fill="#181837" />
                    <path d="M86.9292 88.5607C85.5109 88.5607 84.3612 87.4108 84.3612 85.9928C84.3612 74.6945 76.3354 64.8844 65.2773 62.6667C63.8867 62.3878 62.9856 61.0345 63.2645 59.644C63.5434 58.2537 64.8972 57.3531 66.2872 57.6312C79.7361 60.3283 89.4974 72.2563 89.4974 85.9928C89.4971 87.4111 88.3475 88.5607 86.9292 88.5607Z" fill="#181837" />
                    <path d="M34.1991 100.414C32.7808 100.414 31.6311 99.2644 31.6311 97.8464V85.9955C31.6311 84.5772 32.7808 83.426 34.1991 83.426C35.6174 83.426 36.767 84.5747 36.767 85.9927V97.8464C36.767 99.2647 35.6171 100.414 34.1991 100.414Z" fill="#181837" />
                    <path d="M86.9293 100.414C85.511 100.414 84.3613 99.2644 84.3613 97.8464V85.9955C84.3613 84.5772 85.511 83.426 86.9293 83.426C88.3476 83.426 89.4973 84.5747 89.4973 85.9927V97.8464C89.4973 99.2647 88.3476 100.414 86.9293 100.414Z" fill="#181837" />
                    <path d="M91.7079 113H29.4199C25.88 113 23 110.12 23 106.58V101.698C23 98.1584 25.88 95.2784 29.4199 95.2784H91.7082C95.2481 95.2784 98.1281 98.1584 98.1281 101.698V106.58C98.1278 110.12 95.2479 113 91.7079 113ZM29.4199 100.414C28.7119 100.414 28.1359 100.99 28.1359 101.698V106.58C28.1359 107.288 28.7119 107.864 29.4199 107.864H91.7082C92.4162 107.864 92.9922 107.288 92.9922 106.58V101.698C92.9922 100.99 92.4162 100.414 91.7082 100.414H29.4199Z" fill="#181837" />
                    <path d="M55.3463 62.7172C53.928 62.7172 52.7783 61.5673 52.7783 60.1492V52.8511C52.7783 51.4331 53.928 50.2832 55.3463 50.2832C56.7646 50.2832 57.9142 51.4331 57.9142 52.8511V60.1492C57.9142 61.5673 56.7646 62.7172 55.3463 62.7172Z" fill="#181837" />
                    <path d="M65.7818 62.7172C64.3635 62.7172 63.2139 61.5673 63.2139 60.1492V52.8511C63.2139 51.4331 64.3635 50.2832 65.7818 50.2832C67.2001 50.2832 68.3498 51.4331 68.3498 52.8511V60.1492C68.3498 61.5673 67.2001 62.7172 65.7818 62.7172Z" fill="#181837" />
                    <path d="M86.5316 34.159H34.5973C33.179 34.159 32.0293 33.0093 32.0293 31.591C32.0293 30.173 33.179 29.0231 34.5973 29.0231H86.5316C87.9498 29.0231 89.0995 30.173 89.0995 31.591C89.0995 33.009 87.9498 34.159 86.5316 34.159Z" fill="#181837" />
                    <path d="M86.9272 100.415C86.5317 100.415 86.1304 100.323 85.7544 100.13L62.2088 88.0142C61.1796 87.4855 59.949 87.4857 58.918 88.015L35.3737 100.13C34.1129 100.778 32.5644 100.283 31.9155 99.0215C31.2665 97.7604 31.7629 96.2122 33.024 95.5632L56.5696 83.4476C59.0716 82.1623 62.0571 82.1621 64.5572 83.4468L88.1041 95.5632C89.3652 96.2119 89.8616 97.7604 89.2127 99.0215C88.7574 99.9067 87.8586 100.415 86.9272 100.415Z" fill="#181837" />
                    <path d="M60.5643 76.6328C59.146 76.6328 57.9963 75.4831 57.9963 74.0648V70.829C57.9963 69.411 59.146 68.261 60.5643 68.261C61.9826 68.261 63.1323 69.411 63.1323 70.829V74.0648C63.1323 75.4829 61.9823 76.6328 60.5643 76.6328Z" fill="#181837" />
                    <path d="M60.5636 55.9375C58.6302 55.9375 56.7032 55.7459 54.836 55.3676C53.446 55.0862 52.5472 53.7313 52.8287 52.3413C53.1101 50.9513 54.466 50.053 55.8552 50.3342C58.9201 50.9546 62.2073 50.9546 65.2721 50.3342C66.6617 50.0514 68.017 50.9513 68.2987 52.3413C68.5802 53.7313 67.6814 55.0862 66.2914 55.3676C64.424 55.7459 62.497 55.9375 60.5636 55.9375Z" fill="#181837" />
                </svg>
                <Typography>
                    Coming Soon
                </Typography>
            </Box>
        </Container>
    )
}

export default Swap;