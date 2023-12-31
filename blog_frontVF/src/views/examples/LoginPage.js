import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "services/auth.service";
import '../../assets/css/aboutsHome.css';
import logo from '../../assets/img/3Alogo.png'

function LoginPage() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false,
    message: "",
  });

  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setState({
      ...state,
      message: "",
      loading: true,
    });

    // Validation logic (replace 'true' with your actual validation)
    if (state.username && state.password) {
      AuthService.login(state.username, state.password).then(
        () => {
          navigate("/landing-page");
          // window.location.reload();
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
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      setState({
        ...state,
        loading: false,
        message: "Username and password are required.",
      });
    }
  };

  useEffect(() => {
    document.documentElement.classList.remove("nav-open");
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
              backgroundImage: "url(" + require("../../assets/img/travel-around-the-world.png") + ")",
              borderRadius: '0px 30px 30px 0px'
            }}
          >
            <Container>
              <div className="motto text-center">
                <h1><b>TRIPLE <img src={logo} height={90} /> TRAVEL STORY</b></h1>
                <h3>Take only memories, leave only footprints.</h3>
                
              </div>
            </Container>
          </div>
        </Col>
        <Col className="ml-auto mr-auto mt-5 pt-5 text-center" md="5">
          <Card className="card-register ml-auto mr-auto text-left" style={{ backgroundColor: '#e8f8f7', maxWidth: '650px', borderRadius: '30px' }}>
            <h3 className="title mx-auto mb-1">
              <b style={{ color: '#043565' }}>WELCOME BACK !</b>
            </h3>
            <div className="about-line mb-5" style={{ backgroundColor: '#64CCC5' }}></div>

            <Form className="register-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username" className=""><b>Username</b></label>
                <Input
                  placeholder="Username"
                  type="text"
                  value={state.username}
                  onChange={onChangeUsername}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"><b>Password</b></label>
                <Input
                  placeholder="Password"
                  type="password"
                  value={state.password}
                  onChange={onChangePassword}
                  required
                />
              </div>

              <div className="form-group">
                <Button
                  className="btn-round btn-block"
                  disabled={state.loading}
                  style={{ backgroundColor: '#64CCC5', borderColor: '#64CCC5' }}
                >
                  {state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </Button>
              </div>

              {state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {state.message}
                  </div>
                </div>
              )}
            </Form>
            <div className="forgot">
              <Button
                className="btn-link"
                style={{ color: '#FFC436' }}
                href="/register-page"
              >
                Don't have an account?
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

    </>
  );
}

export default LoginPage;
