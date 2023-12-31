import React, { useEffect, useState } from "react";
import { Row, Col, Input, Button, Table, ButtonGroup, Container,CardBody, Card, CardHeader, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar2.js";
import IndexHeader from "components/Headers/IndexHeader";

function Comment() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [modal, setModal] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleDeleteClick = (comment) => {
        setCommentToDelete(comment);
        setShowDeleteConfirmation(true);
        toggleModal();
    };

    const toggleModal = () => setModal(!modal);

    const getcomments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/comment/`);
            setComments(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deletecomment = async () => {
        try {
            await axios.delete(`/api/comment/delete/${commentToDelete.commentId}`);
            setShowDeleteConfirmation(false);
            toggleModal();
            getcomments(); // Fetch comments again after deletion
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelDelete = () => {
        setCommentToDelete(null);
        setShowDeleteConfirmation(false);
        toggleModal();
    };

    useEffect(() => {
        getcomments();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const commentList = comments.map(comment => {
        return (
            <tr key={comment.comment_id}>
                <td style={{ whiteSpace: 'nowrap' }}>{comment.commentId}</td>
                <td>{comment.story?.title}</td>
                <td>{comment.text}</td>
                {/* Adjust 'commentType' rendering based on your actual data structure */}
                <td className="text-center">
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={`/admin/editcomment/${comment.commentId}`}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => handleDeleteClick(comment)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    });
    
    
    return (
        <>
        <ExamplesNavbar />
      <IndexHeader />
      <div className='main'>
                <div className='section'></div>
                <Container>
                        <Row >
                            <Col sm={12} md={12} xl={12}></Col>
                    <Col className="pt-1" xs={12} md={9} xl={9}>
                        <Input placeholder="Search" type="text" name="search" value={searchTerm} onChange={handleSearch} />
                    </Col>
                    <Col className="py-0" xs={12} md={3} xl={3}>
                        <Button size="sm" color="success" tag={Link} to="/admin/addcomment">
                            Add comment
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                <Col className="py-0" xs={12} md={3} xl={3}>
</Col>


                <Col xs={12} md={12} xl={12}>
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Comment List</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead className="text-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Story</th>
                                        <th>Text</th>
                                        <th className="text-center">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {commentList}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </Container>

            </div>
            
            {showDeleteConfirmation && (
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Delete Confirmation</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this comment?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={deletecomment}>YES</Button>
                        <Button color="secondary" onClick={handleCancelDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )}
            
        </>
        
    );
}

export default Comment;
