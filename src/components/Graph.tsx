import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import * as DateUtil from "./util/DateUtil";
import * as FetchUtil from "./util/FetchUtil";
import ReactHighcharts from "react-highcharts";

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

interface TagCount {
  name: string;
  y: number;
}

const Graph = () => {
  const oneDayAgo = DateUtil.oneDayAgo;
  const oneWeekAgo = DateUtil.oneWeekAgo;
  const [dailyTagCount, setDailyTagCount] = useState<TagCount[]>([]);
  const [weeklyTagCount, setWeeklyTagCount] = useState<TagCount[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchUtil.fetchData();

      setDailyTagCount(getGraphData(data.daily.data));
      setWeeklyTagCount(getGraphData(data.weekly.data));
    };
    fetchData();
  }, []);

  const getGraphData = (array: FetchData[]) => {
    let tagCount: TagCount[] = [];
    array.forEach((node) => {
      node.tags.forEach((tag) => {
        let hasKey = false;
        tagCount.forEach((content) => {
          if (content.name === tag.name) {
            hasKey = true;
            content.y++;
          }
        });

        if (!hasKey) {
          tagCount.push({ name: tag.name, y: 1 });
        }
      });
    });

    tagCount.sort((a, b) => {
      return a.y > b.y ? -1 : 1;
    });

    let hasOtherTags = true;
    let countOtherTags = 0;
    while (hasOtherTags) {
      let lastTag = tagCount[tagCount.length - 1];
      if (lastTag.y === 1) {
        countOtherTags++;
        tagCount.pop();
      } else {
        hasOtherTags = false;
      }
    }
    tagCount.push({ name: "その他", y: countOtherTags });

    return tagCount;
  };

  const getGraphConfig = (data: TagCount[]): Highcharts.Options => {
    const config: Highcharts.Options = {
      chart: {
        plotBackgroundColor: undefined,
        plotBorderWidth: undefined,
        plotShadow: false,
        type: "pie",
      },
      title: { text: "Tags" },
      series: [{ name: "Count", data: data }],
    };

    return config;
  };

  return (
    <div>
      <H1>
        Graph
        <Icon>
          <FontAwesomeIcon icon={faChartPie} size="1x" />
        </Icon>
      </H1>
      <H2>Daily</H2>
      <H2>{oneDayAgo}</H2>
      <ReactHighcharts config={getGraphConfig(dailyTagCount)} />
      <H2>Weekly</H2>
      <H2>
        {oneWeekAgo} 〜 {oneDayAgo}
      </H2>
      <ReactHighcharts config={getGraphConfig(weeklyTagCount)} />
      <br />
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

export default Graph;
