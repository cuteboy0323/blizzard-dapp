import React from "react";
import useStyles from "../assets/constants/styles";

const Container = ({ children }) => {
    const classes = useStyles();
    return(
        <main className={classes.base}>
            {children}
        </main>
    )   
}

export default Container;