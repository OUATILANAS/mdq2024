
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

// reactstrap components
import {  Container } from "reactstrap";

// core components

function BlogHeader() {
    let pageHeader = React.createRef();
    const { idB } = useParams();
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');

    const getBlogById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/story/${idB}`);
            //setSelectedValue(response.data.directeur.id);
            setTitle(response.data.title);
            setCity(response.data.city);
        } catch (error) {
            console.error(error);
        }

    };
    useEffect(() => {
        getBlogById();
    }, []);

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
                        "url(" + require("assets/img/daniel-olahs.jpg") + ")",
                }}
                className="page-header"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter" />
                <Container>
                    <div className="motto text-center">
                        <h1 className=" text-uppercase"><b>{city}</b></h1>
                        <h3>{title}</h3>
                        <br />
                        <h6>Read More</h6>
                        <h5><i className="nc-icon nc-minimal-down" /></h5>


                    </div>
                </Container>
            </div>
        </>
    );
}

export default BlogHeader;
