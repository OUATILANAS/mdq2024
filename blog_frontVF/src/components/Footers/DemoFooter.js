
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  target="_blank"
                  href="/landing-page"
                >
                  TRIPLE A TEAM
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="/blogs-page"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by TRIPLE A TEAM
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
