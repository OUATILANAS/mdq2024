import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col, Input } from "reactstrap";
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/3Alogo.png';
import '../../assets/css/aboutsHome.css';


const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return "The username must be between 3 and 20 characters.";
  }
  return null;
};

const email = (value) => {
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    return "This is not a valid email.";
  }
  return null;
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return "The password must be between 6 and 40 characters.";
  }
  return null;
};

function RegisterPage() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    errors: {
      username: "",
      email: "",
      password: "",
    },
    message: "",
    successful: false,
  });

  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value,
      errors: {
        ...state.errors,
        username: "",
      },
    });
  };

  const onChangeEmail = (e) => {
    setState({
      ...state,
      email: e.target.value,
      errors: {
        ...state.errors,
        email: "",
      },
    });
  };

  const navigate = useNavigate();


  const onChangePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
      errors: {
        ...state.errors,
        password: "",
      },
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setState({
      ...state,
      message: "",
      successful: false,
    });

    const errors = {
      username: vusername(state.username),
      email: email(state.email),
      password: vpassword(state.password),
    };

    if (Object.values(errors).every((error) => !error)) {

      AuthService.register(state.username, state.email, state.password).then(
        (response) => {
          setState({
            ...state,
            message: response.data.message,
            successful: true,
          });
          navigate('/login-page');
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState({
            ...state,
            successful: false,
            message: resMessage,
          });
        }
      );
    } else {

      setState({
        ...state,
        successful: false,
        errors: {
          ...errors,
        },
      });
    }
  };

  useEffect(() => {
    document.body.classList.add("register-page");
    return () => {
      document.body.classList.remove("register-page");
    };
  }, []);

  return (
    <>


      <Row>
        <Col md="7">
          <div
            className="page-header"
            style={{
              backgroundImage: "url(" + require("assets/img/joshua-stannard.jpg") + ")",
              borderRadius: '0px 30px 30px 0px'
            }}
          >
            <Container>
              <div className="motto text-center">
                <h1><b>TRIPLE <img src={logo} height={90} /> TRAVEL STORY</b></h1>

              </div>
            </Container>
          </div>
        </Col>
        <Col className="ml-auto mr-auto mt-5 pt-5 text-center" md="5">
          <Card className="card-register ml-auto mr-auto text-left" style={{ backgroundColor: '#e8f8f7', maxWidth: '650px', borderRadius: '30px' }}>
            <h3 className="title mx-auto mb-1">
              <b>CREATE YOUR ACCOUNT</b>
            </h3>
            <div className="about-line mb-5" style={{ backgroundColor: '#64CCC5' }}></div>

            <Form className="register-form" onSubmit={handleRegister}>
              <div className="form-group">
                <label><b>Username</b></label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={state.username}
                  onChange={onChangeUsername}
                  required
                />
                {state.errors.username && (
                  <div className="alert alert-danger" role="alert">
                    {state.errors.username}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label><b>Email</b></label>
                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={state.email}
                  onChange={onChangeEmail}
                  required
                />
                {state.errors.email && (
                  <div className="alert alert-danger" role="alert">
                    {state.errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label><b>Password</b></label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={onChangePassword}
                  required
                />
                {state.errors.password && (
                  <div className="alert alert-danger" role="alert">
                    {state.errors.password}
                  </div>
                )}
              </div>

              {state.message && !state.successful && (
                <div className="alert alert-danger" role="alert">
                  {state.message}
                </div>
              )}

              <div className="form-group">
                <Button
                  block
                  className="btn-round btn-block"
                  style={{ backgroundColor: '#64CCC5', borderColor: '#64CCC5' }}
                  type="submit"
                >
                  Create account
                </Button>
              </div>
            </Form>

            <div className="forgot">
              <Button
                className="btn-link"
                style={{ color: '#FFC436' }}
                href="/login-page"
              >
                Already have an account?
              </Button>
            </div>
          </Card>
        </Col>
      </Row>


    </>
  );
}

export default RegisterPage;