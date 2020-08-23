import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faChartLine, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Container>
      <Link to="/">
        <Icon>
          <img
            src="icon-72x72.png"
            className="header_imageStyle"
            alt="Qiita-trend-PWA"
          />
        </Icon>
      </Link>
      <Menu>
        <Link to="/">
          <MenuIcon>
            <FontAwesomeIcon icon={faChartLine} size="1x" />
          </MenuIcon>
        </Link>
        <Link to="/graph">
          <MenuIcon>
            <FontAwesomeIcon icon={faChartPie} size="1x" />
          </MenuIcon>
        </Link>
        <a
          href="https://github.com/zonbitamago/qiita-trend-pwa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MenuIcon>
            <FontAwesomeIcon icon={faGithub} size="1x" />
          </MenuIcon>
        </a>
      </Menu>
    </Container>
  );
};

const Container = styled.header`
  background-color: #55c600;
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  color: white;
`;

const Icon = styled.div`
  margin-left: 1em;
`;

const Menu = styled.div`
  margin-right: 1em;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const MenuIcon = styled.div`
  font-size: 40px;
  margin-right: 5px;
  color: white;
`;

export default Header;
