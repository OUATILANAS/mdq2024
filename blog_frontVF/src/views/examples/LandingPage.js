
import React, { useState, useEffect } from "react";
import '../../assets/css/aboutsHome.css';
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import logo from '../../assets/img/3Alogo.png';
import { Link } from "react-router-dom";

function LandingPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });

  const [lastBlog, setLastBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [city, setCity] = useState('');
  const [author, setAuthor] = useState('');
  const [id, setId] = useState(0);

  const getLastBlog = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/story/last`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setCity(response.data.city);
        setAuthor(response.data.author);
        setId(response.data.storyId);
    } catch (error) {
        console.error(error);
    }

};

  useEffect(() => {
    getLastBlog();
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <LandingPageHeader />
      <div className="main">
        <div className="section">
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <h2 className="title mb-1" style={{ color: '#64CCC5' }}><b>About Us</b></h2>
              <div className="about-line mb-5" style={{ backgroundColor: '#64CCC5' }}></div>
              <h5 className="pl-5 description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h5>
              <br />
              <Button
                className="btn-round "
                href="#pablo"
                style={{ borderColor: '#64CCC5', color: '#64CCC5' }}
                outline
              >
                Savoir plus...
              </Button>
            </Col>
          </Row>
          <br />
          <br />
        </div>
        <div className="section px-4" style={{ backgroundColor: '#043565' }}>
          <h2 className="title text-white mb-1 "><b>Last Blog</b></h2>
          <div className="about-line mb-5" style={{ backgroundColor: '#64CCC5' }}></div>
          <Row>
            <Col md="4" sm="6">
              <img
                alt="..."
                className="img-rounded img-responsive"
                src={require("assets/img/uriel-soberanes.jpg")}
              />
            </Col>
            <Col md="8">
              <Card className="card-plain">
                <CardTitle className="text-white text-uppercase"><h3><b>{title} - {city}</b></h3></CardTitle>
                <CardBody>
                  <p className="text-white mt-4">
                    {content}
                  </p>
                  <br></br>
                  <br></br>
                  <p className="mt-4 text-right text-white"><b>- {author}</b></p>
                </CardBody>
                <CardFooter className="text-right">
                  <Button
                    className="btn-round btn"
                    color="white"
                    tag={Link} to={`/blog/${id}`}
                    style={{ borderColor: 'white' }}
                    outline
                  >
                    DECOUVRIR
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="section">
          <div className="separate-line mb-5" style={{ backgroundColor: '#64CCC5' }}></div>
          <div className="separate-line-yellow mb-5" style={{ backgroundColor: '#FFC436' }}></div>
        </div>
        <div className="section " style={{ backgroundColor: '#64CCC5' }}>

          <Row>
            <Col className="ml-0 mr-auto text-center" md="4">
              <img
                alt="..."
                className="img-rounded img-responsive text-center mb-4 mt-5"
                width={150}
                height={150}
                src={logo}
              />
              <h4 className="text-white mt-5"><b>TRIPLE A TRAVEL STORY</b></h4>

            </Col>
            <Col className="ml-auto mr-auto px-5" md="8">
              <h2 className="text-white"><b>Contact Us</b></h2>
              <div className="contact-line mb-5" style={{ backgroundColor: '#043565' }}></div>
              <Form className="contact-form">
                <Row className="text-white">
                  <Col md="6">
                    <label>Name</label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Name" type="text" />
                    </InputGroup>
                  </Col>
                  <Col md="6" >
                    <label>Email</label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="text" />
                    </InputGroup>
                  </Col>
                </Row>
                <label className="text-white">Message</label>
                <Input
                  placeholder="Tell us your thoughts and feelings..."
                  type="textarea"
                  rows="4"
                />
                <Row className="text-right">
                  <Col className="ml-auto mr-auto " md="4">
                    <Button className="btn-round text-right" color="white" size="lg" outline>
                      Envoyer Message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <DemoFooter />
    </>
  );
}

export default LandingPage;
