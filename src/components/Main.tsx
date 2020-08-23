import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import * as DateUtil from "./util/DateUtil";
import * as FetchUtil from "./util/FetchUtil";

interface FetchData {
  created_at: string;
  id: string;
  likes_count: number;
  tags: {
    name: string;
  }[];
  title: string;
  updated_at: string;
  url: string;
  user: any;
}

const Main = () => {
  const oneDayAgo = DateUtil.oneDayAgo;
  const oneWeekAgo = DateUtil.oneWeekAgo;
  const [daily, setDaily] = useState<FetchData[]>([]);
  const [weekly, setWeekly] = useState<FetchData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchUtil.fetchData();

      setDaily(data.daily.data);
      setWeekly(data.weekly.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <H1>
        Trend
        <Icon>
          <FontAwesomeIcon icon={faChartLine} size="1x" />
        </Icon>
      </H1>
      <H2>Dailyランキング</H2>
      <H2>{oneDayAgo}</H2>
      <ItemContainer>
        {daily.map((elem, idx) => {
          return (
            <Item key={idx}>
              <ItemIndex>No.{idx + 1}</ItemIndex>
              <ItemTitle>
                <a href={elem.url} target="_blank" rel="noopener noreferrer">
                  {elem.title}
                </a>
                ({elem.likes_count}いいね)
                <br />
                <br />
                by {elem.user.id}
              </ItemTitle>
            </Item>
          );
        })}
      </ItemContainer>

      <H2>Weeklyランキング</H2>
      <H2>
        {oneWeekAgo} 〜 {oneDayAgo}
      </H2>
      <ItemContainer>
        {weekly.map((elem, idx) => {
          return (
            <Item key={idx}>
              <ItemIndex>No.{idx + 1}</ItemIndex>
              <ItemTitle>
                <a href={elem.url} target="_blank" rel="noopener noreferrer">
                  {elem.title}
                </a>
                ({elem.likes_count}いいね)
                <br />
                <br />
                by {elem.user.id}
              </ItemTitle>
            </Item>
          );
        })}
      </ItemContainer>
    </div>
  );
};

const H1 = styled.h1`
  font-family: Hiragino Maru Gothic ProN;
  margin-left: 10px;
`;

const Icon = styled.div`
  margin-left: 10px;
  vertical-align: middle;
  display: inline;
`;

const H2 = styled.h2`
  margin-left: 10px;
`;

const ItemContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0 10px 10px 10px;
`;

const Item = styled.div`
  background-color: white;
  border-radius: 10px;
`;

const ItemIndex = styled.h3`
  background-color: #55c600;
  color: white;
  border-radius: 10px 10px 0px 0px;
  padding: 0 10px;
  margin: 0;
`;

const ItemTitle = styled.div`
  padding: 0 10px;
  padding-bottom: 5px;
`;

export default Main;
