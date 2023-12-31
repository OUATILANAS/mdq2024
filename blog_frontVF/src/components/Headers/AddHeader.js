
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

// reactstrap components
import {  Container } from "reactstrap";

// core components

function AddHeader() {
    let pageHeader = React.createRef();
    
    

    React.useEffect(() => {
        if (window.innerWidth < 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });

    return (
        <>
            <div
                style={{
                    backgroundImage:
                        "url(" + require("assets/img/federico-beccari.jpg") + ")",
                }}
                className="page-header"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter" />
                <Container>
                    <div className="motto text-center">
                        <h1 className=" text-uppercase"><b>Ajouter votre histoire</b></h1>
                        <h3>Partager avec nous votre EXPERIENCE, votre AVENTURE</h3>
                        <br />


                    </div>
                </Container>
            </div>
        </>
    );
}

export default AddHeader;
