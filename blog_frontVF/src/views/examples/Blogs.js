import React, { useState, useEffect } from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import BlogsHeader from "components/Headers/BlogsHeader";
import {
    Card,
    Container,
    Row,
    Col, Button,
    CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardDeck, CardFooter
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import '../../assets/css/cards.css';

import cardimg from '../../assets/img/daniel-olahs.jpg';
import DemoFooter from "components/Footers/DemoFooter";


function Blogs() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);


    const getBlogs = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/story/`);
            setBlogs(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        setLoading(true);
        getBlogs();




    }, []);
    if (loading) {
        return <p>Loading...</p>;
    };


    const blogsList = blogs.map(blog => {
        return <Col className="my-2" md="4">
            <Card className="card-blog" key={blog.id}>
                <div className="card-image">
                    <a href="#">
                        <CardImg top width="100%" src={require(`../../assets/img/${blog.image1}`)} alt="" />
                        <div className="card-caption text-uppercase">{blog.title}</div>
                    </a>
                    <div className="ripple-cont"></div>
                </div>
                <div className="table">
                    <CardSubtitle className="category text-info text-uppercase "><b>{blog.city}</b></CardSubtitle>
                    <CardText>
                        {blog.content}
                    </CardText>
                </div>
                <CardFooter>
                    <Button block className="btn-round" color="warning" tag={Link} to={`/blog/${blog.storyId}`}>
                        See more..
                    </Button>
                </CardFooter>
            </Card>
        </Col>
    })
    return (
        <>
            <ExamplesNavbar />
            <BlogsHeader />
            <div className="main">
                <div className="section">

                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" md="8">
                                <h2 className="title text-center" style={{ color: '#5d8ac5' }}><b>De belles destinations qui n’attendent que vous !</b></h2>
                            </Col>
                            <Col className="ml-auto mr-auto" md="2">
                                <Button block className="btn-just-icon ml-1"
                                    color="info"
                                    type="button" tag={Link} to="/add-blog" outline>
                                    <b><i className="nc-icon nc-simple-add" /></b>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <div className="cards-2 ">
                        <Container>
                            <Row >
                                {blogsList}

                            </Row>
                        </Container>
                    </div>

                </div>
            </div>
            <DemoFooter />
        </>

    );

}
export default Blogs;