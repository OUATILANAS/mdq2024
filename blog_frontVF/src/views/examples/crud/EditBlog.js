import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import EditHeader from 'components/Headers/EditHeader';

function EditBlog() {
    const { idB } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [city, setCity] = useState('');
    const [photo, setPhoto] = useState(null);
    const [connectedUser, setConnectedUser] = useState('');


    const getUserNameFromLocalStorage = () => {
        const storedUserName = localStorage.getItem('user');

        if (storedUserName) {
            setConnectedUser(JSON.parse(storedUserName));
        }
    };
    const getBlogById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/story/${idB}`);
            setTitle(response.data.title);
            setContent(response.data.content);
            setPhoto(response.data.photo);
            setCity(response.data.city);

            
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        getUserNameFromLocalStorage();
        getBlogById();
    }, []);





    const editBlog = async (e) => {
        e.preventDefault();

        const newBlog = {
            storyId:idB, title: title, content: content, city: city, photo: photo, author: connectedUser.username
        };
        try {
            const response = await axios.put(`/api/story/update/${idB}`, newBlog);
            const updatedUsers = blogs.map((blog) => {
                if (blog.storyId === response.data.storyId) {
                    return response.data;
                }
                return blog;
            });
            setBlogs(updatedUsers);
            window.location.replace('/myblogs');

        } catch (error) {
            console.error(error);
        }



    };



    return (
        <>
            <ExamplesNavbar />
            <EditHeader />
            <div className='main'>
                <div className='section'>
                    <Container>
                        <Row >
                            <Col sm={12} md={12} xl={12}>
                                <Form onSubmit={editBlog}>
                                    <FormGroup>
                                        <Label htmlFor='title'><b>Titre d'histoire :</b></Label>
                                        <Input type='text' name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                                        <Label htmlFor='content'><b>Contenu :</b></Label>
                                        <Input type='text' name='content' id='content' value={content} onChange={(e) => setContent(e.target.value)} />
                                        <Label htmlFor='city'><b>Ville :</b></Label>
                                        <Input type='text' name='city' id='city' value={city} onChange={(e) => setCity(e.target.value)} />
                                        <Label htmlFor='photo'><b>Image :</b></Label>
                                        <Input type='text' name='photo' id='photo' value={photo} onChange={(e) => setPhoto(e.target.value)} disabled />


                                    </FormGroup>
                                    <FormGroup>
                                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                                        <Button color="secondary" tag={Link} to="/myblogs">Annuler</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default EditBlog;