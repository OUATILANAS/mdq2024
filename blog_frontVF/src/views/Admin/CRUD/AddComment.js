import React, { useState, useEffect } from 'react';
import { Button, Form, Container,FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar2.js";
import IndexHeader from "components/Headers/IndexHeader";

function AddComment() {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [stories, setStories] = useState([]);

    const handleChange = event => {
        console.log('Selected value:', event.target.value);
        setSelectedValue(event.target.value);
    }; 
    
    const addComment = async (event) => {
    
        // Convert selectedValue to a number
        const selectedStoryId = parseInt(selectedValue);
    
        // Find the selected story from the stories array based on selectedValue
        const selectedStory = stories.find(story => story.storyId === selectedStoryId);
    
        if (!selectedStory) {
            console.error('Selected story not found');
            return;
        }
    
        console.log('Selected story:', selectedStory);
    
        // Construct the newComment object
        const newComment = {
            story: {
                storyId: selectedStory.storyId
            },
            text: text // The comment text from the form input
        };
    
        try {
            const response = await axios.post('/api/comment/save', newComment);
            console.log(response.data);
            // Perform any additional actions after adding the Comment
        } catch (error) {
            console.error(error);
        }
    };
    
    // Rest of your component remains the same
    
    
    
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
                  <Container>            <Row>
                <Col sm={12} md={12} xl={12}>
                <Form onSubmit={(event) => addComment(event)}>
                        <FormGroup>
                            <Label htmlFor='text'>Comment Text:</Label>
                            <Input
                                type='text'
                                name='text'
                                id='text'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='story'>Story:</Label>
                            <Input type="select" name="story" id="story" onChange={handleChange}>
    <option value="">Select a Story</option>
    {stories.map(story => (
        <option key={story.id} value={story.storyId}> {/* Ensure the correct property for ID */}
            {story.title}
        </option>
    ))}
</Input>

                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/admin/comments">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            </Container>
        </div>
        </>
    );
}

export default AddComment;
