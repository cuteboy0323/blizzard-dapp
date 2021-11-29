// import { makeStyles } from "@mui/styles";
// import { backGrid, boxShadow } from "../../config/style";

// const useStyles = makeStyles((theme) => {
//     return {
//         base: {
//             minHeight: "calc(100% - 176px)",
//             overflow: "hidden",
//             background: "radial-gradient(50% 50% at 50% 50%,#291331 0,#161522 100%)"
//         },
//         logo: {
//             height: theme.spacing(6.5),
//         },
//         header: {
//             background: "linear-gradient(90deg, rgb(144,12,177) 0%, rgb(33,10,66) 80%)",
//             padding: theme.spacing(5),
//             borderRadius: theme.shape.borderRadius,
//             marginBottom: theme.spacing(6),
//             position: "relative",
//             overflow: "hidden",
//             "& .front": {
//                 zIndex: 999
//             },
//             "& .logos": {
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "100%",
//                 width: "100%",
//                 justifyContent: "center",
//                 alignItems: "flex-end"
//             },
//             "& .hacken-logo": {
//                 height: "4em"
//             },
//             "& .bg-logo": {
//                 position: "absolute",
//                 left: 0,
//                 top: 0,
//                 opacity: 0.05,
//                 width: "90em",
//                 zIndex: 0
//             }
//         },
//         appbar: {
//             background: theme.custom.base.darken,
//             backgroundSize: "8px 8px",
//             backgroundImage: backGrid,
//             "& .icon-button": {
//                 background: theme.custom.base.dark,
//                 padding: theme.spacing(1),
//                 marginRight: theme.spacing(1),
//                 "& img": {
//                     height: theme.spacing(4),
//                     borderRadius: theme.shape.borderRadius
//                 }
//             },
//             "& .connect-wallet": {
//                 padding: theme.spacing(1.375, 2),
//                 color: theme.custom.fontColor,
//                 background: theme.custom.base.dark
//             },
//             "& .multi-lang": {
//                 margin: theme.spacing(0, 1),
//                 padding: theme.spacing(0.625, 1),
//                 paddingLeft: theme.spacing(1.5),
//                 textTransform: "none",
//                 background: theme.custom.base.dark,
//                 borderRadius: theme.shape.borderRadius,
//                 color: theme.custom.fontColor,
//                 "& .flag": {
//                     width: theme.spacing(4.5),
//                     height: theme.spacing(3.5),
//                     padding: theme.spacing(0.25),
//                     backgroundClip: "content-box",
//                     borderRadius: theme.shape.borderRadius,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center"
//                 },
//                 "& .name": {
//                     fontSize: 15,
//                     padding: theme.spacing(0.75, 1),
//                     marginLeft: theme.spacing(1.5),
//                     borderRadius: theme.shape.borderRadius,
//                     background: theme.custom.base.darken,
//                     fontWeight: 500
//                 },
//                 "& .lang-list": {
//                     position: "absolute",
//                     top: theme.spacing(7),
//                     background: theme.custom.base.dark,
//                     borderRadius: theme.shape.borderRadius,
//                     boxShadow: theme.shadows[4],
//                     left: 0,
//                     right: 0,
//                     "& .lang-item": {
//                         padding: theme.spacing(1.5),
//                         "& .lang-icon": {
//                             minWidth: "unset",
//                             paddingRight: theme.spacing(1),
//                             "& .lang-flag": {
//                                 borderRadius: 4,
//                                 width: theme.spacing(4),
//                                 height: theme.spacing(2.75)
//                             },
//                         },
//                         "& .lang-name": {
//                         },
//                         "&:hover": {
//                             background: theme.custom.base.darken
//                         }
//                     }
//                 }
//             },
//             "& .buy-token": {
//                 margin: theme.spacing(0, 1),
//                 padding: theme.spacing(0.625, 1),
//                 paddingLeft: theme.spacing(1.5),
//                 textTransform: "none",
//                 background: theme.custom.base.dark,
//                 color: theme.custom.fontColor,
//                 "& .token-price": {
//                     fontSize: 15,
//                     padding: theme.spacing(0.75, 1),
//                     marginLeft: theme.spacing(1.5),
//                     borderRadius: theme.shape.borderRadius,
//                     background: theme.custom.base.darken,
//                     fontWeight: 500
//                 }
//             },
//             "& .toggle-mode": {
//                 background: theme.custom.base.dark,
//                 color: theme.custom.fontColor
//             }
//         },
//         mobileDrawer: {
//             "& .MuiDrawer-paper": {
//                 borderTopLeftRadius: theme.spacing(0.675),
//                 borderTopRightRadius: theme.spacing(0.675),
//                 padding: theme.spacing(0, 4),
//                 paddingBottom: theme.spacing(2.5),
//                 "& .top-divider": {
//                     height: theme.spacing(3.5),
//                     marginBottom: theme.spacing(2),
//                     "& > div": {
//                         height: theme.spacing(0.75),
//                         background: theme.custom.base.darken,
//                         margin: "16px auto",
//                         width: "60%",
//                         borderRadius: theme.spacing(0.75),
//                     }
//                 }
//             },
//             "& .wallet-status": {
//                 "& .wallet-item": {
//                     display: "flex",
//                     padding: theme.spacing(0.5, 0),
//                     justifyContent: "space-between",
//                     "& button": {
//                         background: theme.custom.base.darken,
//                         color: theme.custom.fontColor,
//                         padding: theme.spacing(1.125, 0),
//                         "&:nth-child(1)": {
//                             width: "40%"
//                         },
//                         "&:nth-child(2)": {
//                             background: "none"
//                         },
//                         "&:nth-child(3)": {
//                             width: "60%"
//                         },
//                     }
//                 },
//             },
//             "& .actions": {
//                 padding: theme.spacing(0.5, 0),
//                 paddingTop: theme.spacing(2.5),
//                 "& > div": {
//                     display: "flex",
//                     justifyContent: "space-between",
//                     "& a": {
//                         flexGrow: 1
//                     },
//                     "& button": {
//                         flexGrow: 1,
//                         "&:nth-child(1)": {
//                             marginRight: theme.spacing(0.5),
//                             width: "100%",
//                         },
//                         "&:nth-child(2)": {
//                             marginLeft: theme.spacing(0.5)
//                         }
//                     }
//                 },
//                 "& button": {
//                     background: theme.custom.base.darken,
//                     color: theme.custom.fontColor,
//                     margin: theme.spacing(0.5, 0),
//                     padding: theme.spacing(1.125, 0),
//                 }
//             },
//             "& .buy-token": {
//                 margin: theme.spacing(0, 1),
//                 padding: theme.spacing(0.625, 1),
//                 paddingLeft: theme.spacing(1.5),
//                 textTransform: "none",
//                 background: theme.custom.base.dark,
//                 color: theme.custom.fontColor,
//                 "& .token-price": {
//                     fontSize: 15,
//                     padding: theme.spacing(0.75, 1),
//                     marginLeft: theme.spacing(1.5),
//                     borderRadius: theme.shape.borderRadius,
//                     background: theme.custom.base.darken,
//                     fontWeight: 500
//                 }
//             },
//         },
//         walletDetail: {
//             background: theme.custom.base.dark,
//             padding: theme.spacing(0.625, 1),
//             paddingLeft: theme.spacing(1.5),
//             textTransform: "none",
//             color: theme.custom.fontColor,
//             "& .balance": {
//                 padding: theme.spacing(0.75, 0),
//                 paddingRight: theme.spacing(1),
//             },
//             "& .account": {
//                 background: theme.custom.base.darken,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: theme.spacing(0.75, 1),
//                 borderRadius: theme.shape.borderRadius,
//                 "& > img": {
//                     height: theme.spacing(2.25),
//                     marginLeft: theme.spacing(1)
//                 }
//             }
//         },
//         copyright: {
//             background: theme.custom.base.dark,
//             textAlign: "center",
//             color: theme.custom.fontColor,
//             padding: theme.spacing(2, 0)
//         },
//         footer: {
//             background: theme.custom.base.darken,
//             backgroundSize: "8px 8px",
//             backgroundImage: backGrid,
//             "& .toolbar": {
//                 display: "flex",
//                 justifyContent: "center",
//                 height: theme.spacing(10),
//                 "& .social-link": {
//                     "&.mobile": {
//                         minWidth: theme.spacing(6)
//                     },
//                     margin: theme.spacing(0, 1),
//                     padding: theme.spacing(0.625, 1),
//                     paddingLeft: theme.spacing(1.5),
//                     textTransform: "none",
//                     background: theme.custom.base.dark,
//                     color: theme.custom.fontColor,
//                     "& img": {
//                         width: theme.spacing(3),
//                         height: theme.spacing(3),
//                         margin: theme.spacing(0.75, 0),
//                     },
//                     "& svg": {
//                         margin: theme.spacing(0.75, 0),
//                     },
//                     "& .social-link-name": {
//                         fontSize: 15,
//                         padding: theme.spacing(0.75, 1),
//                         marginLeft: theme.spacing(1.5),
//                         borderRadius: theme.shape.borderRadius,
//                         background: theme.custom.base.darken,
//                         fontWeight: 500
//                     }
//                 }
//             }
//         },
//         toolbar: {
//             height: theme.spacing(12),
//             margin: theme.spacing(0, 4),
//             "& .menu-open": {
//                 background: theme.custom.base.dark
//             }
//         },
//         space: {
//             flexGrow: 1
//         },
//         hide: {
//             display: "none !important"
//         },
//         home: {
//             lineHeight: 0,
//             "& .title": {
//                 textAlign: "center",
//                 paddingTop: theme.spacing(3),
//                 background: theme.custom.base.dark,
//                 color: theme.custom.fontColor,
//                 "& b": {
//                     textTransform: "uppercase"
//                 },
//                 "& div": {
//                     fontSize: theme.spacing(3)
//                 }
//             },
//             "& .route-tab": {
//                 background: theme.custom.base.dark,
//                 "& .buy-token": {
//                     margin: theme.spacing(0, 1),
//                     padding: theme.spacing(0.625, 1),
//                     paddingLeft: theme.spacing(1.5),
//                     textTransform: "none",
//                     background: theme.custom.base.dark,
//                     color: theme.custom.fontColor,
//                     "& .token-price": {
//                         fontSize: 15,
//                         padding: theme.spacing(0.75, 1),
//                         marginLeft: theme.spacing(1.5),
//                         borderRadius: theme.shape.borderRadius,
//                         background: theme.custom.base.darken,
//                         fontWeight: 500
//                     }
//                 },
//                 "& .MuiTabs-indicator": {
//                     height: "100%",
//                     background: theme.custom.base.darken,
//                     zIndex: 1,
//                     borderTopLeftRadius: 6,
//                     borderTopRightRadius: 6,
//                     // backgroundImage: backGrid,
//                     // backgroundSize: theme.spacing(1, 1)
//                 }
//             },
//             "& .tab-panel": {
//                 background: theme.custom.base.darken
//             },
//             "& marquee": {
//                 background: theme.custom.base.darken,
//                 padding: theme.spacing(1.5, 1)
//             },
//             "& .game-list": {
//                 background: theme.custom.base.dark,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: theme.spacing(4, 0, 8, 0),
//                 "& .game-item": {
//                     borderRadius: theme.shape.borderRadius,
//                     borderWidth: theme.spacing(1.5),
//                     borderColor: theme.custom.base.darken,
//                     margin: theme.spacing(0, 1),
//                     borderStyle: "solid",
//                 }
//             },
//             "& .container": {
//                 padding: theme.spacing(4, 2),
//                 "& .wrap-accordion": {
//                     background: theme.custom.base.darken,
//                     borderRadius: theme.shape.borderRadius,
//                     padding: theme.spacing(2, 0),
//                     "& .accordion": {
//                         padding: theme.spacing(0, 1),
//                         borderRadius: theme.shape.borderRadius,
//                         background: "transparent",
//                         margin: 0,
//                         marginTop: theme.spacing(1),
//                         boxShadow: "none",
//                         "& .summary": {
//                             minHeight: "unset !important",
//                         },
//                         "& .summary-title": {
//                             color: theme.custom.fontColor
//                         },
//                         "& .ac-content": {
//                             color: theme.custom.fontColor
//                         },
//                         "& .MuiAccordionSummary-content": {
//                             padding: theme.spacing(1.5, 2),
//                             margin: 0,
//                             marginRight: theme.spacing(1),
//                             borderRadius: theme.shape.borderRadius,
//                             background: theme.custom.base.dark
//                         },
//                         "& .MuiAccordionSummary-expandIcon": {
//                             padding: theme.spacing(1.5),
//                             background: theme.custom.base.dark,
//                             marginRight: 0,
//                         },
//                         "&::before": {
//                             background: "none"
//                         }
//                     },
//                     "& .MuiCollapse-hidden": {
//                         padding: "0px !important",
//                     },
//                     "& .MuiCollapse-root": {
//                         padding: theme.spacing(1, 2),
//                         "& .MuiCollapse-wrapper": {
//                             background: theme.custom.base.dark,
//                             borderRadius: theme.shape.borderRadius
//                         }
//                     }
//                 }
//             }
//         },
//         vaultDetail: {
//             paddingTop: theme.spacing(8),
//             paddingBottom: theme.spacing(8),
//             display: "flex",
//             justifyContent: "center",

//             "&.mobile": {
//                 padding: theme.spacing(3, 1),
//                 "& .card": {
//                     padding: theme.spacing(3, 3),
//                 }
//             },
//             "& .card": {
//                 width: "100%",
//                 maxWidth: theme.spacing(60),
//                 padding: theme.spacing(6, 6),
//                 background: theme.custom.base.dark,
//                 "& .btn-back": {
//                     background: theme.custom.base.darken,
//                     color: theme.custom.fontColor
//                 },
//                 "& .card-header": {
//                     display: "flex",
//                     justifyContent: "center",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     color: theme.custom.fontColor,

//                     "& .title": {
//                         fontWeight: "bold",
//                         color: theme.custom.base.base,
//                         fontSize: theme.spacing(3),
//                         padding: theme.spacing(0, 2),
//                         margin: theme.spacing(1, 0),
//                         borderRadius: theme.shape.borderRadius,
//                         textShadow: `2px 0px 16px ${theme.custom.base.base}`,
//                     },
//                     "& .description": {
//                         padding: theme.spacing(0.5, 2),
//                         width: "100%",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         borderRadius: theme.shape.borderRadius,
//                         marginBottom: theme.spacing(2)
//                     }
//                 },
//                 "& .table": {
//                     background: theme.custom.base.darken,
//                     margin: theme.spacing(1, 0),
//                     borderRadius: theme.shape.borderRadius,
//                     "& tr": {
//                         "&:nth-child(1)": {
//                             "& td": {
//                                 "&:nth-child(2)": {
//                                     textAlign: "right"
//                                 }
//                             }
//                         },
//                         "& td": {
//                             color: theme.custom.fontColor,
//                             borderBottom: "none",
//                             "& p": {
//                                 fontSize: "0.875rem"
//                             },
//                             "&:nth-child(2)": {
//                                 textAlign: "center"
//                             },
//                             "&:nth-child(3)": {
//                                 textAlign: "-webkit-right"
//                             }
//                         }
//                     },
//                     "&.select": {
//                         background: "none",
//                         "& td": {
//                             paddingTop: theme.spacing(0.5),
//                             paddingBottom: theme.spacing(0.5)
//                         }
//                     },
//                     "& .locking-select": {
//                         "& fieldset": {
//                             borderColor: theme.custom.base.darken,
//                             borderRadius: theme.shape.borderRadius
//                         },
//                         "& > div": {
//                             color: theme.custom.fontColor,
//                             padding: theme.spacing(1.5, 4)
//                         }
//                     }
//                 },
//                 "& .tabs": {
//                     minHeight: "0px !important",
//                     position: "relative",
//                     marginTop: theme.spacing(2.5),
//                     zIndex: 0,
//                     "& button": {
//                     },
//                     "& .Mui-selected": {
//                         color: theme.custom.base.base,
//                     },
//                     "& .MuiTabs-indicator": {
//                         background: theme.custom.base.darken,
//                         zIndex: -1,
//                         borderRadius: theme.shape.borderRadius,
//                         "&:hover": {
//                             backgroundColor: "#da012c",
//                         },
//                     },
//                 },
//                 "& .fee-description": {
//                     textAlign: "center",
//                     color: theme.custom.fontColor,
//                     marginTop: theme.spacing(2)
//                 },
//                 "& .input": {
//                     marginTop: theme.spacing(1.5),
//                     "& .max-pattern": {
//                         "& > p": {
//                             padding: theme.spacing(0, 2),
//                             color: theme.custom.fontColor,
//                             fontWeight: 600,
//                         },
//                         "& button": {
//                             margin: theme.spacing(0, 1),
//                         },
//                     },
//                     "& input": {
//                         textAlign: "right",
//                         fontWeight: 600,
//                         color: theme.custom.fontColor
//                     },
//                     "& > p": {
//                         color: theme.custom.fontColor,
//                         fontSize: theme.spacing(1.75),
//                         textAlign: "right",
//                     },
//                     "& fieldset": {
//                         borderColor: theme.custom.base.darken
//                     }
//                 },
//                 "& .balance": {
//                     marginTop: theme.spacing(1.5),
//                     textAlign: "center",
//                     "& .title": {
//                         color: theme.custom.fontColor,
//                     },
//                     "& .value": {
//                         fontSize: 22,
//                         color: theme.custom.fontColor,
//                         fontWeight: 700,
//                     },
//                 },
//                 "& .checkout": {
//                     paddingTop: theme.spacing(3),
//                     "& button": {
//                         width: "100%",
//                         minHeight: 48,
//                     },
//                     "& .buttonGroup": {
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         "& button": {
//                             width: "calc(50% - 16px)",
//                         },
//                     },
//                 },
//             }
//         },
//         cWallet: {
//             "& .cwallet-paper": {
//                 padding: theme.spacing(2),
//                 width: theme.spacing(45),
//                 "& .title": {
//                     background: theme.custom.base.dark,
//                     borderRadius: theme.shape.borderRadius,
//                     color: theme.custom.fontColor,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: theme.spacing(0.625),
//                     "& > div": {
//                         padding: theme.spacing(0),
//                         flexGrow: 1,
//                         "& h2": {
//                             padding: theme.spacing(1, 2),
//                             marginRight: theme.spacing(0.625),
//                             borderRadius: theme.shape.borderRadius,
//                         }
//                     },
//                     "& > button": {
//                         background: theme.custom.base.darken
//                     }
//                 },
//                 "& .content": {
//                     padding: theme.spacing(1, 0, 0, 0),
//                     "& > ul": {
//                         paddingBottom: 0,
//                         "& .item": {
//                             padding: theme.spacing(0.625, 2),
//                             background: theme.custom.base.dark,
//                             margin: theme.spacing(2, 0),
//                             borderRadius: theme.shape.borderRadius,
//                             cursor: "pointer",
//                             "& .symbol": {
//                                 minWidth: theme.spacing(5.5),
//                                 "& svg": {
//                                     fontSize: theme.spacing(3.5),
//                                     color: theme.custom.fontColor
//                                 },
//                                 "& img": {
//                                     width: `${theme.spacing(3.5)}px !important`
//                                 }
//                             },
//                             "& .activating-description": {
//                                 borderRadius: theme.shape.borderRadius,
//                                 background: theme.custom.base.darken,
//                                 padding: theme.spacing(0.5625, 2),
//                                 margin: 0,
//                                 color: theme.custom.fontColor,
//                                 "& p": {
//                                     fontSize: theme.spacing(1.375)
//                                 }
//                             },
//                             "& .description": {
//                                 borderRadius: theme.shape.borderRadius,
//                                 background: theme.custom.base.darken,
//                                 padding: theme.spacing(1.5, 2),
//                                 margin: 0,
//                                 color: theme.custom.fontColor,
//                             },
//                         },
//                         "& .action": {
//                             "& button": {
//                                 marginRight: theme.spacing(1),
//                                 "& svg": {
//                                     color: theme.custom.fontColor,
//                                 }
//                             }
//                         },
//                         "& .state": {
//                             paddingTop: theme.spacing(4),
//                             paddingBottom: theme.spacing(4),
//                             "& .symbol": {
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 "& .MuiCircularProgress-root": {
//                                     width: `${theme.spacing(3.5)}px !important`,
//                                     height: `${theme.spacing(3.5)}px !important`
//                                 }
//                             },
//                             "& .description": {
//                                 color: theme.custom.fontColor,
//                                 padding: theme.spacing(1.5, 1),
//                             }
//                         },
//                         "& .activating-item": {
//                             marginBottom: 0,
//                         }
//                     }
//                 }
//             },
//         },
//         container: {
//             padding: theme.spacing(4, 0),
//             "& .root": {
//                 "&.mobile": {
//                     marginTop: `${theme.spacing(0)}px !important`,
//                     paddingTop: `${theme.spacing(5)}px !important`,
//                     "& .button": {
//                         left: 0,
//                         top: theme.spacing(1),
//                         margin: 0,
//                     },
//                     "& .s-item": {
//                         flexDirection: "row",
//                         padding: theme.spacing(0, 2),
//                         justifyContent: "space-between",
//                         "& .title": {
//                             width: "50%",
//                             textAlign: "center"
//                         },
//                         "& .divider-point": {
//                             width: "10%",
//                             textAlign: "center"
//                         },
//                         "& .value": {
//                             fontWeight: 500,
//                             marginTop: theme.spacing(0),
//                             fontSize: theme.spacing(2),
//                             background: theme.custom.base.darken,
//                             width: "40%",
//                             borderRadius: theme.shape.borderRadius,
//                             padding: theme.spacing(1, 2),
//                             textAlign: "center",
//                         }
//                     },
//                     "&.vault": {
//                         flexDirection: "row",
//                         paddingTop: `${theme.spacing(8)}px !important`,
//                         marginTop: `${theme.spacing(6)}px !important`,
//                         marginBottom: `${theme.spacing(0)}px !important`,
//                         padding: theme.spacing(0, 0),
//                         justifyContent: "space-between",
//                         "&::before, &::after": {
//                             content: "none",
//                         },
//                         "& .hand-key": {
//                             display: "none"
//                         },
//                         "& .vault-list": {
//                             padding: theme.spacing(0.375, 0),
//                             "& .vault-container": {
//                                 padding: theme.spacing(0.375, 0.75),
//                                 "& .vault-item-container": {
//                                     borderRadius: theme.shape.borderRadius,
//                                     background: theme.custom.base.dark,
//                                     padding: theme.spacing(0.5, 2),
//                                     "& .vault-item": {
//                                         "& img": {
//                                             position: "relative",
//                                             "&:nth-child(1)": {
//                                                 zIndex: 2,
//                                             },
//                                             "&:nth-child(2)": {
//                                                 marginLeft: theme.spacing(-2),
//                                                 zIndex: 1
//                                             }
//                                         },
//                                         "&.vault-detail": {
//                                             paddingLeft: theme.spacing(0)
//                                         },
//                                         "&.vault-apy": {
//                                             alignItems: "flex-end",
//                                             padding: 0,
//                                             "& > p": {
//                                                 "&:nth-child(1)": {
//                                                     fontSize: theme.spacing(2),
//                                                     textAlign: "right"
//                                                 },
//                                                 "&:nth-child(3)": {
//                                                     fontSize: theme.spacing(1.5),
//                                                 }
//                                             }
//                                         },
//                                         "&.vault-status": {
//                                             paddingRight: theme.spacing(0),
//                                             paddingLeft: theme.spacing(0),
//                                         }
//                                     }
//                                 },
//                             }
//                         }
//                     }
//                 },
//                 background: theme.custom.base.dark,
//                 borderRadius: theme.shape.borderRadius,
//                 boxShadow: boxShadow,
//                 position: "relative",
//                 padding: theme.spacing(2, 0),
//                 paddingTop: theme.spacing(1),
//                 marginTop: theme.spacing(10),
//                 "& .button": {
//                     margin: theme.spacing(0, 1),
//                     position: "absolute",
//                     top: -36,
//                     left: 16,
//                     borderBottomLeftRadius: 0,
//                     borderBottomRightRadius: 0,
//                     padding: theme.spacing(.625, 1.5),
//                     paddingLeft: theme.spacing(2),
//                     textTransform: "none",
//                     background: theme.custom.base.dark,
//                     color: theme.custom.fontColor,
//                     "& img": {
//                         width: theme.spacing(3),
//                         height: theme.spacing(2.5)
//                     },
//                     "& .button-content": {
//                         fontSize: 15,
//                         padding: theme.spacing(0, 1),
//                         marginLeft: theme.spacing(1.5),
//                         borderRadius: theme.shape.borderRadius,
//                         background: theme.custom.base.darken,
//                         fontWeight: 500
//                     }
//                 },
//                 "& .s-item": {
//                     marginTop: theme.spacing(2),
//                     borderRadius: theme.shape.borderRadius,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flexDirection: "column",
//                     "& .divider-point": {
//                         display: "none"
//                     },
//                     "& .title": {
//                         background: theme.custom.base.darken,
//                         borderRadius: theme.shape.borderRadius,
//                         padding: theme.spacing(1, 2),
//                         color: theme.custom.fontColor
//                     },
//                     "& .value": {
//                         fontWeight: 800,
//                         marginTop: theme.spacing(1.5),
//                         fontSize: theme.spacing(3.5),
//                         color: theme.custom.base.base,
//                         textShadow: `2px 0px 16px ${theme.custom.base.base}`,
//                         width: "65%",
//                         padding: theme.spacing(1, 0),
//                         textAlign: "center",
//                     }
//                 },
//                 "&.header": {
//                     background: "red"
//                 },
//                 "&.vault": {
//                     marginTop: theme.spacing(15),
//                     marginBottom: theme.spacing(8),
//                     padding: theme.spacing(2, 2),
//                     position: "relative",
//                     "&::before": {
//                         content: "''",
//                         width: theme.spacing(4),
//                         height: theme.spacing(8),
//                         borderRadius: theme.shape.borderRadius,
//                         background: theme.custom.base.dark,
//                         transform: "translateY(-50%)",
//                         right: theme.spacing(-2),
//                         top: "25%",
//                         position: "absolute"
//                     },
//                     "&::after": {
//                         content: "''",
//                         width: theme.spacing(4),
//                         height: theme.spacing(8),
//                         borderRadius: theme.shape.borderRadius,
//                         transform: "translateY(-50%)",
//                         background: theme.custom.base.dark,
//                         right: theme.spacing(-2),
//                         top: "75%",
//                         position: "absolute"
//                     },
//                     "& .hand-key": {
//                         position: "absolute",
//                         width: theme.spacing(5),
//                         height: theme.spacing(10),
//                         transform: "translateY(-50%)",
//                         top: "50%",
//                         left: theme.spacing(-3),
//                         borderRadius: "50px",
//                         borderTopRightRadius: 0,
//                         borderBottomRightRadius: 0,
//                         background: theme.custom.base.dark,
//                         "&::before": {
//                             content: "''",
//                             width: theme.spacing(2.5),
//                             height: theme.spacing(2.5),
//                             borderRadius: 50,
//                             position: "absolute",
//                             background: theme.custom.base.darken,
//                             transform: "translate(-50%, -50%)",
//                             top: "50%",
//                             left: theme.spacing(3)
//                         }
//                     },
//                     "& .vault-list": {
//                         background: theme.custom.base.darken,
//                         borderRadius: theme.shape.borderRadius,
//                         padding: theme.spacing(0.75, 0),
//                         "& .skelton": {
//                             width: "80%",
//                         },
//                         "& .vault-container": {
//                             padding: theme.spacing(0.75, 1.5),
//                             cursor: "pointer",
//                             "&:hover": {
//                                 "& .vault-item-container": {
//                                     background: "#2c2f3f"
//                                 }
//                             },
//                             "& .vault-item-container": {
//                                 borderRadius: theme.shape.borderRadius,
//                                 background: theme.custom.base.dark,
//                                 padding: theme.spacing(0.5, 8),
//                                 "& .vault-item": {
//                                     "& .dimg": {
//                                         position: "relative",
//                                         "&:nth-child(1)": {
//                                             zIndex: 2,
//                                         },
//                                         "&:nth-child(2)": {
//                                             marginLeft: theme.spacing(-2),
//                                             zIndex: 1
//                                         }
//                                     },
//                                     "& > .vault-icon": {
//                                         lineHeight: 0,
//                                         display: "flex",
//                                         background: theme.custom.base.darken,
//                                         padding: theme.spacing(0.5, 0.25),
//                                         borderRadius: theme.shape.borderRadius,
//                                         "& img": {
//                                             borderRadius: theme.shape.borderRadius,
//                                             background: theme.custom.base.dark,
//                                             width: theme.spacing(5),
//                                             height: theme.spacing(5),
//                                             zIndex: 1,
//                                             margin: theme.spacing(0, 0.25)
//                                         }
//                                     },
//                                     "& .vault-title": {
//                                         display: "flex",
//                                         alignItems: "flex-start",
//                                         flexDirection: "column",
//                                         justifyContent: "center"
//                                     },
//                                     "& .vault-name": {
//                                         padding: theme.spacing(0, 2),
//                                         color: theme.custom.fontColor,
//                                         fontWeight: "bold",
//                                         fontSize: theme.spacing(2.25)
//                                     },
//                                     "& .vault-sub-name": {
//                                         padding: theme.spacing(0, 2),
//                                         color: theme.custom.fontColor
//                                     },
//                                     display: "flex",
//                                     alignItems: "center",
//                                     padding: theme.spacing(0.5),
//                                     "&.vault-detail": {
//                                         paddingLeft: theme.spacing(2)
//                                     },
//                                     "&.vault-apy": {
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                         "& b": {
//                                             fontSize: theme.spacing(1),
//                                         },
//                                         "& strong": {
//                                             fontSize: ".8em",
//                                         },
//                                         "& > p": {
//                                             "& > svg": {
//                                                 position: "relative",
//                                                 top: "3px"
//                                             },
//                                             "&:nth-child(1)": {
//                                                 color: theme.custom.base.base,
//                                                 background: theme.custom.base.darken,
//                                                 borderRadius: theme.shape.borderRadius,
//                                                 padding: theme.spacing(0.25, 1),
//                                                 fontWeight: "bold",
//                                                 textShadow: `2px 0px 16px ${theme.custom.base.base}`,
//                                                 fontSize: theme.spacing(2.25),
//                                                 textAlign: "center"
//                                             },
//                                             "&:nth-child(3)": {
//                                                 color: theme.custom.fontColor,
//                                                 textAlign: "center",
//                                                 padding: theme.spacing(0.25, 0)
//                                             }
//                                         }
//                                     },
//                                     "&.vault-status": {
//                                         paddingRight: theme.spacing(2),
//                                         paddingLeft: theme.spacing(6),
//                                         display: "flex",
//                                         color: theme.custom.fontColor,
//                                         justifyContent: "space-between",
//                                         alignItems: "center",
//                                         "& > div": {
//                                             width: "100%",
//                                             "&:nth-child(1)": {
//                                                 "& p": {
//                                                     padding: theme.spacing(0.25, 1),
//                                                     background: theme.custom.base.darken,
//                                                     borderRadius: theme.shape.borderRadius,
//                                                     margin: theme.spacing(0.25, 0)
//                                                 }
//                                             },
//                                             "&:nth-child(2)": {
//                                                 "& p": {
//                                                     paddingRight: 0,
//                                                     textAlign: "-webkit-right",
//                                                     padding: theme.spacing(0.25, 1),
//                                                     margin: theme.spacing(0.25, 0),
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }
//                             }
//                         },
//                     }
//                 }
//             }
//         },
//         notification: {
//             padding: theme.spacing(0.75, 4),
//             "& button": {
//                 textTransform: "capitalize",
//                 margin: theme.spacing(0, 1)
//             },
//             "& img": {
//                 height: theme.spacing(4),
//                 borderRadius: theme.spacing(0.5)
//             }
//         }
//     }
// });

// export default useStyles;
