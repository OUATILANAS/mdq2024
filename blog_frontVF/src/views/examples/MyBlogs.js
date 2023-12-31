import { Link } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import MyBlogsHeader from "components/Headers/MyBlogsHeader";
import DemoFooter from "components/Footers/DemoFooter";

function MyBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    const [modal, setModal] = useState(false);

    const [connectedUser, setConnectedUser] = useState('');

    const getUserNameFromLocalStorage = async () => {
        const storedUserName = localStorage.getItem('user');

        if (storedUserName) {
            setConnectedUser(JSON.parse(storedUserName));
        };
    };

    const getBlogByAuthor = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/story/author/${connectedUser.username}`);
           
            setBlogs(response.data);
        } catch (error) {
            console.error(error);
        };

    };
    const handleDeleteClick = (blog) => {
        setBlogToDelete(blog);
        setShowDeleteConfirmation(true);
        setModal(!modal);
    };

    const handleCancelDelete = () => {
        setBlogToDelete(null);
        setShowDeleteConfirmation(false);
        setModal(modal);
    };
    const toggle = () => setModal(!modal);
    const deleteBlog = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/story/delete/${blogToDelete.storyId}`);
            const updatedUsers = blogs.filter((blog) => blog.storyId !== blogToDelete.storyId);
            setBlogs(updatedUsers);
        } catch (error) {
            console.error(error);
        };
        setShowDeleteConfirmation(false);
        setModal(modal);
    };
    useEffect(() => {
        const fetchData = async () => {
            await getUserNameFromLocalStorage();
            await getBlogByAuthor();
        };

        fetchData();


    }, []);

    const MyBlogsList = blogs.map((blog => {
        return <>
            <Row className="my-5">
                <Col className="" md="4">
                    <img
                        alt="..."
                        className="img-rounded img-responsive"
                        src={require("assets/img/uriel-soberanes.jpg")}
                    />
                </Col>
                <Col className="" md="6">
                    <h2 className="title text-uppercase"><b>{blog.title} - {blog.city}</b></h2>
                    <h5 className="description">
                        {blog.content}
                    </h5>
                    <ButtonGroup >
                        <Button size="sm" color="primary" tag={Link} to={"/edit-blog/" + blog.storyId}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => handleDeleteClick(blog)}>Delete</Button>
                    </ButtonGroup>

                </Col>
            </Row>
        </>
    }));


    return (
        <>
            <ExamplesNavbar />
            <MyBlogsHeader />
            <div className="main">
                <div className="section">
                    <Container>

                        {MyBlogsList}

                    </Container>
                </div>
                {showDeleteConfirmation && (
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Delete Confirmation</ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete this Blog?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={deleteBlog}>
                                YES
                            </Button>{' '}
                            <Button color="secondary" onClick={handleCancelDelete}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                )};

            </div>
            <DemoFooter />

        </>
    );
}
export default MyBlogs;