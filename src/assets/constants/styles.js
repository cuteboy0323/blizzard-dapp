import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
    return {
        appbar: {
            backgroundColor: `${theme.palette.background.default} !important`,
            boxShadow: "none !important",
            backgroundImage: `url(${require("../img/space-bg.svg").default}) !important`,
            "& .pre-header": {
                padding: theme.spacing(0, 7),
                minHeight: theme.spacing(4.75),
                borderColor: theme.palette.common.white,
                borderWidth: 1,
                borderStyle: "solid",

                "& .tabs": {
                    minHeight: 0,
                    flexGrow: 1,

                    "& .MuiTabScrollButton-root": {
                        width: theme.spacing(4)
                    },
                    "& button": {
                        padding: theme.spacing(0, 0.5),
                        minHeight: 0,
                        margin: 0,

                        "& > span": {
                            margin: 0
                        }
                    }
                },
                "& .action-group": {
                    display: "flex",
                    alignItems: "center"
                },
                "& .social-group": {
                    padding: theme.spacing(0, 1.5),
                    display: "flex",
                    "& .social-button": {
                        padding: theme.spacing(.5),
                        "&.medium": {
                            "& svg": {
                                width: theme.spacing(1.75),
                                height: theme.spacing(1.75)
                            }
                        },
                        "& svg": {
                            width: theme.spacing(2),
                            height: theme.spacing(2)
                        }
                    }
                },
                "& .token-price": {
                    marginRight: theme.spacing(2),
                    background: "transparent",
                    cursor: "auto",
                    "& img": {
                        height: theme.spacing(2.5),
                        borderRadius: theme.shape.borderRadius
                    },

                    "&.up": {
                        color: "#5bc77f"
                    },
                    "&.down": {
                        color: "#f52959"
                    }
                },
                "& button": {
                    textTransform: "none",
                    marginLeft: theme.spacing(1)
                }
            },
            "& .toolbar": {
                height: theme.spacing(12),
                margin: theme.spacing(0, 4),

                '& .logo': {
                    height: theme.spacing(6.5),
                },
                "& .page-route": {
                    marginLeft: theme.spacing(8),
                    "& button": {
                        margin: theme.spacing(0, 1.5)
                    }
                },
                "& .add-token": {
                    margin: theme.spacing(0, 0.5),
                    "& img": {
                        height: theme.spacing(3),
                        borderRadius: theme.shape.borderRadius
                    }
                },
                "& .network": {
                    marginRight: theme.spacing(1),
                    "& img": {
                        height: theme.spacing(3),
                        borderRadius: theme.shape.borderRadius
                    }
                },
                "& .menu-open": {
                    "&:hover": {
                        background: "#172e57"
                    },
                    boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                    background: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    marginLeft: theme.spacing(1),
                    padding: 13,
                    "& svg": {
                        width: theme.spacing(3.5),
                        height: theme.spacing(3.5)
                    }
                }
            },
            "& .connect-button": {
                "& .account": {
                    background: theme.palette.background.default,
                    padding: theme.spacing(0, 2),
                    borderRadius: theme.shape.borderRadius,
                    color: theme.palette.primary.main
                },
                "& .token-balance": {
                    fontSize: theme.spacing(2)
                },
                "& img": {
                    height: theme.spacing(2.5),
                }
            }
        },
        base: {
            minHeight: "calc(100% - 238px)",
            backgroundColor: theme.palette.background.default,
            overflow: "hidden",
            paddingBottom: theme.spacing(4),
            backgroundImage: `url(${require("../img/space-bg.svg").default})`
        },
        bugBounty: {
            backgroundColor: `${theme.palette.background.default} !important`,
            boxShadow: "none !important",
            backgroundImage: `url(${require("../img/space-bg.svg").default}) !important`,
            padding: theme.spacing(4, 0),

            "& > a": {
                "& > div": {
                    "& > div": {
                        borderRadius: theme.shape.borderRadius,
                        "&:hover": {
                            background: "#172e57",
                        },
                    }
                }
            },
            "& .border": {
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "rgb(191 191 191 / 50%)",
                height: theme.spacing(5),
                borderRadius: theme.shape.borderRadius,
                boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",

                "&.top-border": {
                    borderBottom: "none",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                },
                "&.bottom-border": {
                    borderTop: "none",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                },
            },
            "& .content": {
                display: "flex",
                boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.secondary.main,
                fontSize: theme.spacing(2.5),
                textTransform: "uppercase",
                flexDirection: "column",

                "& img": {
                    marginBottom: theme.spacing(2)
                }
            }
        },
        footer: {
            backgroundColor: `${theme.palette.background.default} !important`,
            boxShadow: "none !important",
            backgroundImage: `url(${require("../img/space-bg.svg").default}) !important`,
            "& .toolbar": {
                display: "flex",
                justifyContent: "center",
                height: theme.spacing(10),
                "& .social-link": {
                    margin: theme.spacing(0, 2),
                    padding: theme.spacing(0.75, 2),
                    "&.mobile": {
                        minWidth: theme.spacing(6)
                    },
                    "& img": {
                        width: theme.spacing(2),
                        height: theme.spacing(2),
                        margin: theme.spacing(0.75, 0),
                    },
                    "& svg": {
                        width: theme.spacing(2),
                        height: theme.spacing(2),
                        margin: theme.spacing(0.75, 0),

                        "& path": {
                            fill: theme.palette.primary.main
                        }
                    },
                    "& .social-link-name": {
                        color: theme.palette.secondary.main
                    }
                }
            }
        },
        cwallet: {
            backdropFilter: "blur(5px)",
            "& .cwallet-paper": {
                background: "none !important",

                "& .wallet-list": {
                    "& .wallet": {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    },
                    "& .card": {
                        height: theme.spacing(30),
                        width: theme.spacing(30),
                        margin: theme.spacing(1.5),
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: ".5s",
                        borderColor: "transparent",
                        borderWidth: 1,
                        borderStyle: "solid",
                        "&:hover": {
                            background: "#172e57",
                            borderColor: "rgb(115 115 182 / 40%)"
                        },
                        "& > div": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",

                            "& .title": {
                                fontSize: theme.spacing(2.5),
                                fontWeight: 'bold',
                                color: theme.palette.primary.main,
                                marginTop: theme.spacing(1.5),
                                textShadow: `2px 0px 8px ${theme.palette.primary.main}`
                            },
                            "& .description": {
                                color: theme.palette.secondary.main,
                                textAlign: "center"
                            }
                        },
                        "& img": {
                            width: theme.spacing(10),
                            height: theme.spacing(10)
                        }
                    }
                },

                "& .wallet-detail": {
                    background: theme.palette.background.paper,

                    "& li": {
                        margin: theme.spacing(1.5, 0),
                        "& img": {
                            height: 24
                        }
                    }
                },
                "& .connect-process": {
                    padding: theme.spacing(1),
                    minWidth: theme.spacing(30),
                    maxWidth: theme.spacing(50),
                    "& > div": {
                        "& > div": {
                            alignItems: "center",
                            "& strong": {
                                cursor: "pointer"
                            }
                        }
                    },
                    "& .status": {
                        color: theme.palette.secondary.main,
                        fontSize: theme.spacing(2.5),
                        margin: theme.spacing(1, 0),
                        textAlign: "center"
                    }
                }
            }
        },
        vaultDetail: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            display: "flex",
            justifyContent: "center",

            "&.mobile": {
                padding: theme.spacing(3, 1),
                "& .card": {
                    padding: theme.spacing(3, 3),
                }
            },
            "& .card": {
                width: "100%",
                boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                background: theme.palette.background.paper,
                maxWidth: theme.spacing(60),
                padding: theme.spacing(6, 6),
                "& .card-header": {
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    color: theme.palette.secondary.main,

                    "& .title": {
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                        fontSize: theme.spacing(3),
                        margin: theme.spacing(1, 0),
                        textShadow: `2px 0px 16px ${theme.palette.primary.main}`,
                    },
                    "& .description": {
                        padding: theme.spacing(0.5, 2),
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: theme.spacing(2)
                    }
                },
                "& .table": {
                    background: "rgb(18 18 39 / 30%)",
                    margin: theme.spacing(1, 0),
                    borderRadius: theme.shape.borderRadius,
                    "& tr": {
                        "&:nth-child(1)": {
                            "& td": {
                                "&:nth-child(2)": {
                                    textAlign: "right"
                                }
                            }
                        },
                        "& td": {
                            color: theme.palette.secondary.main,
                            borderBottom: "none",
                            "& p": {
                                fontSize: "0.875rem"
                            },
                            "&:nth-child(2)": {
                                textAlign: "center"
                            },
                            "&:nth-child(3)": {
                                textAlign: "-webkit-right"
                            }
                        }
                    },
                    "&.select": {
                        background: "none",
                        "& td": {
                            paddingTop: theme.spacing(0.5),
                            paddingBottom: theme.spacing(0.5)
                        }
                    },
                    "& .locking-select": {
                        "& fieldset": {
                            borderColor: '#3c3c6a !important',
                            borderRadius: theme.shape.borderRadius
                        },
                        "& > div": {
                            color: theme.palette.secondary.main,
                            padding: theme.spacing(1.5, 4)
                        }
                    }
                },
                "& .tabs": {
                    minHeight: "0px !important",
                    position: "relative",
                    marginTop: theme.spacing(2.5),
                    zIndex: 0,
                    "& button": {
                    },
                    "& .Mui-selected": {
                        color: "#white",
                    },
                    "& .MuiTabs-indicator": {
                        background: "123",
                        zIndex: -1,
                        borderRadius: theme.shape.borderRadius,
                        "&:hover": {
                            backgroundColor: "#da012c",
                        },
                    },
                },
                "& .fee-description": {
                    textAlign: "center",
                    color: theme.palette.secondary.main,
                    marginTop: theme.spacing(2)
                },
                "& .input": {
                    marginTop: theme.spacing(1.5),
                    "& .max-pattern": {
                        "& > p": {
                            padding: theme.spacing(0, 1.25),
                            color: theme.palette.secondary.main,
                            fontWeight: 600,
                        },
                        "& button": {
                            margin: theme.spacing(0, 1),
                            minWidth: theme.spacing(5)
                        },
                    },
                    "& input": {
                        textAlign: "right",
                        fontWeight: 600,
                        color: theme.palette.secondary.main,
                    },
                    "& > p": {
                        color: theme.palette.secondary.main,
                        fontSize: theme.spacing(1.75),
                        textAlign: "right",
                    },
                    "& fieldset": {
                        borderColor: '#3c3c6a !important',
                    }
                },
                "& .balance": {
                    marginTop: theme.spacing(1.5),
                    textAlign: "center",
                    "& .title": {
                        color: theme.palette.secondary.main,
                    },
                    "& .value": {
                        fontSize: 22,
                        color: theme.palette.secondary.main,
                        fontWeight: 700,
                    },
                },
                "& .checkout": {
                    paddingTop: theme.spacing(3),
                    "& button": {
                        width: "100%",
                        minHeight: 48,
                    },
                    "& .buttonGroup": {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "& button": {
                            width: "calc(50% - 16px)",
                        },
                    },
                },
            }
        },
        container: {
            "&.mobile": {
                "& .root": {
                    margin: theme.spacing(4, 0),
                    backgroundSize: "250%",
                    backgroundPosition: "10% 50px",
                    "& .adsense": {
                        paddingTop: theme.spacing(2),
                        "& .title": {
                            fontSize: theme.spacing(2.5),
                        },
                        "& .hacken-icon": {
                            display: "none",
                        }
                    }
                },
                "& .statistics": {
                    "& .s-item": {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: theme.spacing(0, 1),
                        "& .title": {
                            fontSize: theme.spacing(2.25),
                            fontWeight: "bold",
                            textAlign: "center"
                        },
                        "& .value": {
                            fontSize: theme.spacing(2.25),
                            fontWeight: "bold",
                            textAlign: "center",
                            color: theme.palette.primary.main,
                            textShadow: `2px 0px 16px ${theme.palette.primary.main}`,
                        }
                    }
                },
                "& .vault": {
                    "& .vault-container": {
                        padding: theme.spacing(1, 2),
                        "& .vault-item": {
                            "& > .vault-icon": {
                                lineHeight: 0,
                                display: "flex",
                                padding: theme.spacing(0.5, 0.25),
                                borderRadius: theme.shape.borderRadius,
                                "& .hidden": {
                                    visibility: "hidden"
                                },
                                "& img": {
                                    position: "relative",
                                    "&:nth-child(1)": {
                                        zIndex: 2,
                                    },
                                    "&:nth-child(2)": {
                                        marginLeft: theme.spacing(-2.5),
                                        zIndex: 1
                                    }
                                }
                            },
                            "&.vault-apy": {
                                alignItems: "flex-end",
                            },
                            "&.vault-detail": {
                                paddingLeft: theme.spacing(0)
                            },
                            "&.vault-status": {
                                paddingLeft: theme.spacing(0),
                                paddingRight: theme.spacing(0)
                            }
                        }
                    },
                },
                "& .tools": {
                    flexDirection: "column",
                    "& .filter": {
                        maxWidth: "100%",
                        marginBottom: theme.spacing(2)
                    },
                }
            },
            "& .root": {
                backgroundColor: theme.palette.background.paper,
                backgroundImage: `url(${require("../img/ad-bg.png").default})`,
                boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                margin: theme.spacing(8, 0),
                backgroundSize: "130%",
                backgroundPosition: "50% -50%",
                backgroundRepeat: "no-repeat",
                borderRadius: theme.shape.borderRadius,
                "& .adsense": {
                    paddingTop: theme.spacing(2),
                    "& .title": {
                        fontSize: theme.spacing(3),
                        textShadow: `2px 0px 16px ${theme.palette.secondary.main}`,
                        textAlign: "center"
                    },
                    "& .hacken-icon": {
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        "& a": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        },
                        "& img": {
                            height: theme.spacing(8)
                        }
                    }
                }
            },
            "& .statistics": {
                padding: theme.spacing(2, 0),
                marginTop: theme.spacing(2),
                "& .s-item": {
                    "& .title": {
                        fontSize: theme.spacing(3),
                        fontWeight: "bold",
                        textAlign: "center"
                    },
                    "& .value": {
                        fontSize: theme.spacing(4),
                        fontWeight: "bold",
                        textAlign: "center",
                        color: theme.palette.primary.main,
                        textShadow: `2px 0px 16px ${theme.palette.primary.main}`,
                    }
                }
            },
            "& .tools": {
                padding: theme.spacing(1, 0),
                display: "flex",
                justifyContent: "space-between",
                "& .filter": {
                    maxWidth: "50%",
                    "& .MuiOutlinedInput-root": {
                        boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                        background: theme.palette.background.paper,
                    }
                },
                "& fieldset": {
                    borderColor: "transparent !important"
                },
                "& .search-sort": {
                    display: "flex",
                    alignItems: "center",
                    "& > div": {
                        flexGrow: 1
                    },
                    "& .MuiOutlinedInput-root": {
                        boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                        background: theme.palette.background.paper,
                    }
                },
                "& .tool-button": {
                    "&.active": {
                        background: "#172e57"
                    },
                    "&:hover": {
                        background: "#172e57"
                    },
                    boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                    background: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    marginLeft: theme.spacing(1),
                    padding: 13,
                    "& svg": {
                        width: theme.spacing(3.5),
                        height: theme.spacing(3.5)
                    }
                }
            },
            "& .vault": {
                display: "flex",
                flexDirection: "column",
                "& .vault-container": {
                    "&:hover": {
                        background: "#172e57",
                    },
                    "& .ribbon": {
                        position: "absolute",
                        background: theme.palette.common.white,
                        padding: theme.spacing(0, 2),
                        borderRadius: theme.spacing(1.5),
                        fontSize: theme.spacing(1.75),
                        color: theme.palette.secondary.main,
                        borderTopLeftRadius: theme.spacing(0.5),
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: theme.spacing(0),
                        top: theme.spacing(0),
                        left: theme.spacing(0),
                        boxShadow: "0 0 25px 2px rgb(0 0 0 / 15%)",
                    },
                    cursor: "pointer",
                    position: "relative",
                    background: theme.palette.background.paper,
                    padding: theme.spacing(1, 3),
                    margin: theme.spacing(1.5, 0),
                    boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                    "& .vault-item": {
                        "& > .vault-icon": {
                            lineHeight: 0,
                            display: "flex",
                            background: "theme.custom.base.dark",
                            padding: theme.spacing(0.5, 0.25),
                            borderRadius: theme.shape.borderRadius,
                            "& .hidden": {
                                visibility: "hidden"
                            },
                            "& img": {
                                borderRadius: theme.shape.borderRadius,
                                background: theme.palette.background.paper,
                                width: theme.spacing(5),
                                height: theme.spacing(5),
                                zIndex: 1,
                                padding: theme.spacing(0.5),
                                border: "1px solid rgba(115, 115, 182, 0.5)",
                                margin: theme.spacing(0, 0.25)
                            }
                        },
                        "& .vault-title": {
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            justifyContent: "center"
                        },
                        "& .vault-name": {
                            color: theme.palette.primary.main,
                            padding: theme.spacing(0, 2),
                            fontWeight: "bold",
                            fontSize: theme.spacing(2.25)
                        },
                        "& .vault-sub-name": {
                            padding: theme.spacing(0, 2),
                            fontSize: theme.spacing(1.75),
                            color: theme.palette.secondary.main,
                        },
                        display: "flex",
                        alignItems: "center",
                        padding: theme.spacing(0.5),
                        "&.vault-detail": {
                            paddingLeft: theme.spacing(2)
                        },
                        "&.vault-apy": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            "& .skelton": {
                                width: "70%",
                            },
                            "& b": {
                                fontSize: theme.spacing(1),
                            },
                            "& strong": {
                                fontSize: ".8em",
                            },
                            "& > p": {
                                "& > svg": {
                                    position: "relative",
                                    top: "3px"
                                },
                                "&:nth-child(1)": {
                                    color: theme.palette.primary.main,
                                    background: "theme.custom.base.dark",
                                    borderRadius: theme.shape.borderRadius,
                                    padding: theme.spacing(0.25, 1),
                                    fontWeight: "bold",
                                    textShadow: `2px 0px 16px ${theme.palette.primary.main}`,
                                    fontSize: theme.spacing(2.5),
                                    textAlign: "center"
                                },
                                "&:nth-child(3)": {
                                    textAlign: "center",
                                    color: theme.palette.secondary.main,
                                    fontSize: theme.spacing(1.75),
                                    padding: theme.spacing(0.25, 0)
                                }
                            }
                        },
                        "&.vault-status": {
                            paddingRight: theme.spacing(2),
                            paddingLeft: theme.spacing(6),
                            display: "flex",
                            color: theme.palette.secondary.main,
                            justifyContent: "space-between",
                            alignItems: "center",
                            "& > div": {
                                width: "100%",
                                "&:nth-child(1)": {
                                    "& p": {
                                        padding: theme.spacing(0.25, 1),
                                        borderRadius: theme.shape.borderRadius,
                                        margin: theme.spacing(0.25, 0),
                                    }
                                },
                                "&:nth-child(2)": {
                                    "& p": {
                                        paddingRight: 0,
                                        textAlign: "-webkit-right",
                                        padding: theme.spacing(0.25, 1),
                                        margin: theme.spacing(0.25, 0),
                                    }
                                }
                            }
                        }
                    }
                },
                "& .p-404": {
                    "& > p": {
                        padding: theme.spacing(2, 0)
                    },
                    padding: theme.spacing(4, 2),
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",

                    '& .p-404-img-1': {
                        fill: "#181837",
                    },
                    '& .p-404-img-2': {
                        fill: "#7f7f90",
                    },
                    '& .p-404-img-3': {
                        fill: "#181837",
                    },
                    '& .p-404-img-4': {
                        fill: "#7f7f90",
                    },
                    '& .p-404-img-5': {
                        fillOpacity: "0.9",
                        fill: "#7f7f90",
                    },
                }
            }
        },
        swap: {
            maxWidth: "510px !important",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            "& .ad-slide": {
                marginBottom: theme.spacing(0),
                borderRadius: theme.shape.borderRadius,
                border: "1px solid rgb(115 115 182 / 40%)",
                overflow: "hidden",
                lineHeight: 0,
                "& img": {
                    width: "100%",
                    height: theme.spacing(25),
                }
            },
            "& .stepper": {
                background: "transparent",
                marginTop: "-50px",
                position: "relative",
                zIndex: theme.spacing(1),
                marginBottom: theme.spacing(6)
            },
            "&.mobile": {
                paddingTop: theme.spacing(5),
                paddingBottom: theme.spacing(5)
            },
            "& .card": {
                background: theme.palette.background.paper,
                padding: theme.spacing(4, 4),
                margin: theme.spacing(4, 0),
                boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                "& hr": {
                    marginTop: -1
                },
                "& .swap": {
                    margin: theme.spacing(2, 0),
                    background: "#14142c",
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                    padding: theme.spacing(2),
                    "& .token-select": {
                        display: "flex",
                        alignItems: "center",
                        paddingRight: 0,

                        "& .token": {
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            paddingLeft: theme.spacing(1),
                            "& p": {
                                color: theme.palette.secondary.main,
                                fontSize: theme.spacing(1.5),
                            },
                            "& button": {
                                fontSize: theme.spacing(2),
                                padding: 0,
                                height: theme.spacing(3.5),
                                background: `transparent !important`
                            }
                        },
                        "& img": {
                            height: theme.spacing(5),
                            borderRadius: theme.shape.borderRadius
                        },
                        "& .select-token": {
                            textTransform: "none",
                            height: "24px !important",
                            padding: `${theme.spacing(0, 1)} !important`,
                            fontSize: `${theme.spacing(1.5)} !important`,
                        }
                    },
                    "& .token-amount": {
                        "& > div": {
                            borderRadius: theme.shape.borderRadius
                        },
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: theme.spacing(2),
                        borderRadius: theme.shape.borderRadius,

                        "& .max-button": {
                            minWidth: theme.spacing(2),
                            padding: theme.spacing(0, 1)
                        },
                        "& input": {
                            paddingLeft: theme.spacing(2),
                            padding: theme.spacing(1.5, 2),
                            fontSize: theme.spacing(2),
                            color: theme.palette.secondary.main,
                            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                                "-webkit-appearance": "none",
                                margin: 0
                            }
                        },
                        "& .MuiTextField-root": {
                            background: "#371457",
                        },
                        "& fieldset": {
                            border: "none",
                        }
                    }
                },
                "& .swap-tool": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    "& hr": {
                        marginBottom: theme.spacing(4),
                        marginTop: theme.spacing(-2 - 5 / 8)
                    },
                    "& .swap-button": {
                        boxShadow: "0 0 32px 8px rgb(24 24 55 / 50%)",
                        border: "1px solid rgb(115 115 182 / 40%)",
                        background: "#14142c",
                        marginTop: theme.spacing(4),
                        "& svg": {
                            height: theme.spacing(3),
                            width: theme.spacing(3)
                        }
                    },
                    "& .swap-percentage": {
                        marginRight: theme.spacing(0),
                        "& button": {
                            paddingTop: theme.spacing(.5),
                            paddingBottom: theme.spacing(.5)
                        }
                    }
                },
                "& .table": {
                    "& td": {
                        border: "none",
                        color: theme.palette.secondary.main
                    }
                },
                "& .action": {
                    minHeight: theme.spacing(6),
                    marginTop: theme.spacing(4),
                    marginBottom: theme.spacing(5),
                    background: "#371457",
                    color: theme.palette.secondary.main
                },
                "& .rate-title": {
                    fontSize: theme.spacing(2.25),
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: theme.spacing(4, 0),
                    paddingTop: 0
                },
                "& .g-item": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",

                    "& .flex-parent": {
                        display: "flex",
                        alignItems: "center",
                        "& p": {
                            marginLeft: theme.spacing(1),
                            fontSize: theme.spacing(1.75)
                        }
                    },
                    "&.token-detail": {
                        "&.left": {
                            alignItems: "flex-start"
                        },
                        "&.right": {
                            alignItems: "flex-end"
                        }
                    },
                    "&.no-wrap": {
                        flexDirection: "row"
                    },
                    "& .token-amount": {
                        padding: theme.spacing(1, 0),
                        paddingBottom: 0
                    },
                    "& .token-price": {
                        fontSize: theme.spacing(1.5)
                    },
                    "& .token": {
                        width: theme.spacing(3),
                        marginLeft: 0,
                        borderRadius: theme.spacing(1)
                    },
                    "& img": {
                        width: theme.spacing(4),
                        margin: theme.spacing(0, .5),
                        borderRadius: theme.shape.borderRadius
                    }
                }
            },

            "& .coming-soon": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: theme.spacing(15),

                "& p": {
                    marginTop: theme.spacing(6),
                    color: "rgb(191, 191, 191)"
                },

                "& svg": {
                    animation: "rhs 2000ms",
                    animationIterationCount: "infinite"
                },
            }
        },
        mobileDrawer: {
            backdropFilter: "blur(2.5px)",
            "& .MuiDrawer-paper": {
                backgroundImage: `url(${require("../img/space-bg.svg").default})`,
                background: theme.palette.background.default,
                borderTopLeftRadius: theme.spacing(0.675),
                borderTopRightRadius: theme.spacing(0.675),
                padding: theme.spacing(0, 4),
                paddingBottom: theme.spacing(2.5),
                "& .top-divider": {
                    height: theme.spacing(3.5),
                    marginBottom: theme.spacing(2),
                    "& > div": {
                        height: theme.spacing(0.5),
                        background: theme.palette.background.paper,
                        margin: "16px auto",
                        width: "60%",
                        borderRadius: theme.spacing(0.75),
                    }
                }
            },
            "& hr": {
                margin: theme.spacing(2)
            },
            "& .wallet-status": {
                "& button": {
                    "&:nth-child(1)": {
                        width: "40%"
                    },
                    "&:nth-child(2)": {
                        background: "none"
                    },
                    "&:nth-child(3)": {
                        width: "60%"
                    },
                }
            },
            "& .actions": {
                "& .wallet-item": {
                    display: "flex",
                    padding: theme.spacing(0.5, 0),
                    "& button": {
                        padding: theme.spacing(1.125, 1.5),
                        background: theme.palette.background.paper,
                        color: theme.palette.secondary.main,
                        boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                    }
                }
            },
            "& .main-button": {
                padding: theme.spacing(1.125, 1.5),
                background: theme.palette.background.paper,
                color: theme.palette.secondary.main,
                margin: theme.spacing(1, 0),
                boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
            },
            "& .wallet-item": {
                display: "flex",
                padding: theme.spacing(0.5, 0),
                justifyContent: "space-between",
                alignItems: "center",
            },
        },
        sortMenu: {
            "& button": {
                marginLeft: theme.spacing(1),

                "& svg": {
                    width: theme.spacing(2.5),
                    height: theme.spacing(2.5)
                }
            }
        },
        space: {
            flexGrow: 1
        }
    }
});
export default useStyles;