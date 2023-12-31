
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

// reactstrap components
import {
    Button,
    Col,
    Form,
    Input, Row
} from "reactstrap";
import avatar from '../../assets/img/new_logo.png';

// core components

function Comments() {
    const { idB } = useParams();
    const [comments, setComments] = useState([]);
    const [story, setStory] = useState([]);
    const [text, setText] = useState('');
    const [connectedUser, setConnectedUser] = useState('');
    const isUserLoggedIn = localStorage.getItem("user");

    const getUser = () => {
        
        if (isUserLoggedIn) {
            setConnectedUser(JSON.parse(isUserLoggedIn));
        }
    }


    const getComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/comment/story/${idB}`);
            //setSelectedValue(response.data.directeur.id);
            setComments(response.data);
        } catch (error) {
            console.error(error);
        }

    };
    const getStory = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/story/${idB}`);
            //setSelectedValue(response.data.directeur.id);
            setStory(response.data);
        } catch (error) {
            console.error(error);
        }

    };
    const addComment = async (e) => {
        e.preventDefault();

        const newComment = {
            text: text, commentator: connectedUser.username, story: story
        };
        try {
            const response = await axios.post('http://localhost:8080/api/comment/save', newComment);
            setComments([...comments, response.data]);
            setText('');
        } catch (error) {
            console.error(error);
        }



    };

    useEffect(() => {
        getComments();
        getStory();
        getUser();
    }, []);

    const CommentsList = comments.map(comment => {
        return <div className="typography-line ">
            <span className="note"><img src={avatar} /></span>
            <blockquote className="blockquote">
                <p className="mb-0">
                    <b>{comment.text}</b>
                </p>
                <br />
                <footer className="blockquote-footer">

                    <cite title="source Title">{comment.commentator}</cite>
                </footer>
            </blockquote>

        </div>

    });



    return (
        <>
            {CommentsList}
            {isUserLoggedIn ? (
                <>
                    <Form onSubmit={addComment}>
                        <Row>


                            <Col md="11">
                                <Input type="text" placeholder="Type Comment..." name="comment" id="comment" value={text} onChange={(e) => setText(e.target.value)} />
                            </Col>
                            <Col md="1">
                                <Button type="submit" className="btn-round" color="danger" outline>
                                    <i className="nc-icon nc-send" />
                                </Button>
                            </Col>

                        </Row>
                    </Form>



                </>
            ) : (
                <>
                    <a href="/login-page" className="text-danger">Login</a> To COMMENT !



                </>
            )}

        </>
    );
}

export default Comments;
