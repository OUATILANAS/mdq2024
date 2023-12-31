
import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import logo from '../../assets/img/3Alogo.png';


// core components

function LandingPageHeader() {
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
            "url(" + require("assets/img/sac-a-dos.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1><b>TRIPLE <img src={logo} height={90}/> TRAVEL STORY</b></h1>
            <h3>Partageons Nos Aventures et Voyages
              Pour Faire le Tour Du Monde Ensemble</h3>
            <br />
            <Button
              href="/add-blog"
              className="btn-round mr-2"
              color="neutral"
              target="_blank"
              outline
            >

              Partager avec nous
              {" "} <i className="fa fa-slideshare" />
            </Button>
            <Button className="btn-round" color="neutral" type="button" outline>
              Savoir plus...
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;
