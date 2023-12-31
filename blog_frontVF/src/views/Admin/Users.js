import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Row, Col, Input, Button, Table,Container ,ButtonGroup, CardBody, Card, CardHeader, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar2.js";
import IndexHeader from "components/Headers/IndexHeader";
function UserComponent() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [modal, setModal] = useState(false);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteConfirmation(true);
        setModal(!modal);
    };

    const toggle = () => setModal(!modal);

    const getUsers = async () => {
        try {
            setLoading(true);
            // Make an API call to get users with role "User"
            const response = await axios.get('/api/user/?role=User');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/api/user/delete/${id}`);
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
        } catch (error) {
            console.error(error);
        }
        setShowDeleteConfirmation(false);
        setModal(modal);
    };

    const handleCancelDelete = () => {
        setUserToDelete(null);
        setShowDeleteConfirmation(false);
        setModal(modal);
    };

    useEffect(() => {
        getUsers();
    }, []);

    

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const userList = users.map(user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => handleDeleteClick(user)}>Delete</Button>
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
                <Row className="">
                    <Col className="pt-1" xs={12} md={12} xl={12}>
                        <Input placeholder="Search" type="text" name="search" value={searchTerm} onChange={handleSearch} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={12} md={12} xl={12}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">User List</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                </Container>
            </div>
            {showDeleteConfirmation && (
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Delete Confirmation</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this User?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => deleteUser(userToDelete.id)}>
                            Yes
                        </Button>{' '}
                        <Button color="secondary" onClick={handleCancelDelete}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}

export default UserComponent;
