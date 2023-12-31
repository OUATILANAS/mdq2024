import React, { useState, useEffect } from 'react';
import { Button, Form, Container, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar2.js';
import IndexHeader from 'components/Headers/IndexHeader';

function AddStory() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [author, setAuthor] = useState(''); // Define 'author' state
    const [city, setCity] = useState(''); // Define 'city' state
    const [stories, setStories] = useState([]);

    const handleChange = event => {
        console.log('Selected value:', event.target.value);
        // Handle changes if needed
    };

    const handleImage1Change = event => {
        setImage1(event.target.files[0]);
    };

    const handleImage2Change = event => {
        setImage2(event.target.files[0]);
    };

    const handleImage3Change = event => {
        setImage3(event.target.files[0]);
    };

    const addStory = async event => {
        event.preventDefault();

        // Create FormData object to send files along with other data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image1', image1);
        formData.append('image2', image2);
        formData.append('image3', image3);
        formData.append('author', author); // Append 'author' to formData
        formData.append('city', city); // Append 'city' to formData

        try {
            const response = await axios.post('/api/story/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // Perform any additional actions after adding the story
        } catch (error) {
            console.error(error);
        }
    };

    const getStories = async () => {
        try {
            const response = await axios.get('/api/story/');
            setStories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getStories();
    }, []);

    return (
        <>
            <ExamplesNavbar />
            <IndexHeader />
            <div className='main'>
                <div className='section'></div>
                <Container>
                    <Row>
                        <Col sm={12} md={12} xl={12}>
                            <Form onSubmit={event => addStory(event)}>
                                <FormGroup>
                                    <Label htmlFor='title'>Story Title:</Label>
                                    <Input
                                        type='text'
                                        name='title'
                                        id='title'
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='content'>Story Content:</Label>
                                    <Input
                                        type='textarea'
                                        name='content'
                                        id='content'
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='image1'>Image 1:</Label>
                                    <Input type='file' name='image1' id='image1' onChange={handleImage1Change} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='image2'>Image 2:</Label>
                                    <Input type='file' name='image2' id='image2' onChange={handleImage2Change} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='image3'>Image 3:</Label>
                                    <Input type='file' name='image3' id='image3' onChange={handleImage3Change} />
                                </FormGroup>
                                {/* New fields for author and city */}
                                <FormGroup>
                                    <Label htmlFor='author'>Author:</Label>
                                    <Input
                                        type='text'
                                        name='author'
                                        id='author'
                                        value={author}
                                        onChange={e => setAuthor(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='city'>City:</Label>
                                    <Input
                                        type='text'
                                        name='city'
                                        id='city'
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                    />
                                </FormGroup>
                                {/* Rest of your fields */}
                                <FormGroup>
                                    <Button color='primary' type='submit'>
                                        Save
                                    </Button>{' '}
                                    <Button color='secondary' tag={Link} to='/admin/stories'>
                                        Cancel
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default AddStory;
