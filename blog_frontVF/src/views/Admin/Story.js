import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Input, Button,ButtonGroup,Container, Table, CardBody, Card, CardHeader, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar2.js";
import IndexHeader from "components/Headers/IndexHeader";
function Story() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [modal, setModal] = useState(false);
  const [storyToDelete, setstoryToDelete] = useState(null);

  const handleDeleteClick = (comment) => {
    setstoryToDelete(comment);
    setShowDeleteConfirmation(true);
    toggleModal();
};
  const toggleModal = () => setModal(!modal);

  const getStories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/story/");
      setStories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStory = async () => {
    try {
        console.log(storyToDelete.storyId)
        await axios.delete(`/api/story/delete/${storyToDelete.storyId}`);
        setShowDeleteConfirmation(false);
        toggleModal();
        getStories(); 
    } catch (error) {
        console.error(error);
    }
};
const handleCancelDelete = () => {
    setstoryToDelete(null);
    setShowDeleteConfirmation(false);
    toggleModal();
};

  useEffect(() => {
    getStories();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Logic for filtering/searching stories based on searchTerm
  };

  const storyList = stories.map(story => (
    <tr key={story.storyId}>
      <td style={{ whiteSpace: "nowrap" }}>{story.storyId}</td>
      <td>{story.title}</td>
      <td>{story.content}</td>
      <td><img src={require(`../../assets/img/${story.image1}`)} alt={story.title} style={{ width: 100, height: 60 }} /></td>
      <td><img src={require(`../../assets/img/${story.image2}`)} alt={story.title} style={{ width: 100, height: 60 }}/></td>
      <td><img src={require(`../../assets/img/${story.image3}`)} alt={story.title}  style={{ width: 100, height: 60 }}/></td>
      <td className="text-center">
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => handleDeleteClick(story)}>Delete</Button>
                    </ButtonGroup>
        </td>
      {/* Include other columns if needed */}
    </tr>
  ));

  return (
    <>
     <ExamplesNavbar />
      <IndexHeader />
      <div className='main'>
                <div className='section'></div>
                <Container>
        <Row>
          <Col className="pt-1" xs={12} md={9} xl={9}>
            <Input
              placeholder="Search"
              type="text"
              name="search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
          <Col className="py-0" xs={12} md={3} xl={3}>
            <Button
              size="sm"
              color="success"
              tag={Link}
              to="/admin/addstory"
            >
              Add Story
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12} md={12} xl={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Story List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Image 1</th>
                      <th>Image 2</th>
                      <th>Image 3</th>
                      <th className="text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>{storyList}</tbody>
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
                        <Button color="primary" onClick={deleteStory}>YES</Button>
                        <Button color="secondary" onClick={handleCancelDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )}
                </>
  );
}

export default Story;
