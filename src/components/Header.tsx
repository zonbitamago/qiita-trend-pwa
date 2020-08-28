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
            // src="icon-384x384.png"
            src={base64Image}
            className="header_imageStyle"
            alt="Qiita-trend-PWA"
            height="72"
          />
        </Icon>
      </Link>
      <Menu>
        <Link to="/" title="home">
          <MenuIcon>
            <FontAwesomeIcon icon={faChartLine} size="1x" />
          </MenuIcon>
        </Link>
        <Link to="/graph" title="graph">
          <MenuIcon>
            <FontAwesomeIcon icon={faChartPie} size="1x" />
          </MenuIcon>
        </Link>
        <a
          href="https://github.com/zonbitamago/qiita-trend-pwa"
          target="_blank"
          rel="noopener noreferrer"
          title="github"
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

//以下のサイトで画像を変換
// https://www.peko-step.com/tool/datauri.html
const base64Image =
  "data:image/png;base64,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";
