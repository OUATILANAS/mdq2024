
import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import logo from '../../assets/img/3Alogo.png';

// core components

function MyBlogsHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/daniel-olahs.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1 className=" text-uppercase"><b>My Stories</b></h1>
            <h3>Consulter et editer mes stories</h3>
            <br />
            
          </div>
        </Container>
      </div>
    </>
  );
}

export default MyBlogsHeader;
