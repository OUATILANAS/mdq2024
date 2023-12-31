import BlogHeader from "components/Headers/BlogHeader";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React, { useEffect, useState } from "react";
import { Col, Container, Row,CardImg } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comments from "./Comments";


function Blog() {
    const { idB } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [city, setCity] = useState('');
    const [blogs, setBlogs] = useState([]);

    const getBlogById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/story/${idB}`);
            //setSelectedValue(response.data.directeur.id);
            setBlogs(response.data)
        } catch (error) {
            console.error(error);
        }

    };
    useEffect(() => {
        getBlogById();
    }, []);


    return (
        <>
            <ExamplesNavbar />
            <BlogHeader />
            <div className="main ">
                <div className="section">
                    <Container>
                        <Row>
<Col className="" md="4">
  {blogs.image1 && <CardImg top width="100%" src={require(`../../assets/img/${blogs.image1}`)} alt="test" />}
</Col>
<Col className="" md="4">
  {blogs.image2 && <CardImg top width="100%" src={require(`../../assets/img/${blogs.image2}`)} alt="test" />}
</Col>
<Col className="" md="4">
  {blogs.image3 && <CardImg top width="100%" src={require(`../../assets/img/${blogs.image3}`)} alt="test" />}
</Col>
<Col className="" md="8">
  <h2 className="title text-uppercase"><b>{blogs.title} - {blogs.city}</b></h2>
  <h5 className="description">
    {blogs.content /* Assuming content comes from the 'blogs' object */}
  </h5>
</Col>

                        </Row>
                    </Container>
                </div>
                <div className="section ">
                    <Container>
                        <h2 className="title">COMMENTS</h2>
                        <Row>
                            <Col md="10">
                            <Comments />
                            </Col>
                        </Row>
                    </Container>
                </div>

            </div>
        </>
    );
}
export default Blog;