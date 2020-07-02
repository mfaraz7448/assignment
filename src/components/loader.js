import React from 'react'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const Loader = props => {

    const override = css
        `
display: block;
margin: 0 auto;
border-color: red;
position: fixed;
top: 50%;
left: 50%;
transform:translate(-50%,-50%);
`

    const { isLoading } = props


    return (
        isLoading ?
            <div style={loaderContainer}>
                <HashLoader
                    css={override}
                    size={50}
                    color={"#fff"}
                    loading={isLoading}
                />
            </div> : null
    )
}

const loaderContainer = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    minWidth: '100%',
    minHeight: '100%',
    zIndex: 9999
}


export default Loader
