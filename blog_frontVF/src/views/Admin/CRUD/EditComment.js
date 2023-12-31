import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button, Form,Container, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar2.js";
import IndexHeader from "components/Headers/IndexHeader";
function EditComment() {
    const { idB } = useParams();
    const [comment, setComment] = useState({ text: '', story_id: '' });
    const [stories, setStories] = useState([]);

    const getCommentById = async () => {
        try {
            const response = await axios.get(`/api/comment/${idB}`);
            console.log(response.data)
            const { text, story_id } = response.data;
            setComment({ text, story_id }); // Set only the necessary fields
        } catch (error) {
            console.error(error);
        }
    };

    const updateComment = async () => {
        try {
            const response = await axios.put(`/api/comment/update/${idB}`, comment);
            console.log(response.data); // Logging the response data for verification
        } catch (error) {
            console.error(error);
        }

        window.location.replace('/admin/comments');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComment({ ...comment, [name]: value });
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
        getCommentById();
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
                    <Form onSubmit={updateComment}>
                        <FormGroup>
                            <Label htmlFor='text'>Comment Text:</Label>
                            <Input type='text' name='text' id='text' value={comment.text || ''} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='story_id'>Story:</Label>
                            <Input type='select' name='story_id' id='story_id' value={comment.story_id || ''} onChange={handleInputChange}>
                                <option value=''>Select a Story</option>
                                {stories.map(story => (
                                    <option key={story.storyId} value={story.storyId}>
                                        {story.title}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Button color='primary' type='submit'>Save</Button>{' '}
                            <Button color='secondary' tag={Link} to='/admin/comments'>Cancel</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            </Container>
        </div>
        </>
    );
}

export default EditComment;
