import { QuestionIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import * as d3 from "d3";
import React from "react";
import { Pie, PieChart, Tooltip } from "recharts";

import JanData from "../../formattedDatas/PieChartDatas/PieChartData01.json";
import FebData from "../../formattedDatas/PieChartDatas/PieChartData02.json";
import MarData from "../../formattedDatas/PieChartDatas/PieChartData03.json";

export const DisplayPieChart = (props) => {
  const { labels, selectedIndex, deptLabels } = props;

  const start = performance.now();

  const selectedJanData = JanData.filter(
    (item) => item.bureauName === deptLabels[selectedIndex]
  );
  const selectedFebData = FebData.filter(
    (item) => item.bureauName === deptLabels[selectedIndex]
  );
  const selectedMarData = MarData.filter(
    (item) => item.bureauName === deptLabels[selectedIndex]
  );

  //部名のラベル取得
  const divisionLabelsArray = Array.from(
    new Set(selectedJanData.map((item) => item.divisionName))
  );
  // 課名のラベル取得
  let sectionLabelsArray = new Array(divisionLabelsArray.length);
  for (let i = 0; i < divisionLabelsArray.length; i++) {
    sectionLabelsArray[i] = Array.from(
      new Set(
        selectedJanData
          .filter((item) => item.divisionName === divisionLabelsArray[i])
          .map((item) => item.sectionName)
      )
    );
  }

  //各部ごとの金額合計
  const totalOfDivision = new Array(divisionLabelsArray.length);
  for (let i in selectedJanData) {
    if (i >= divisionLabelsArray.length) {
      break;
    }
    let selectData = selectedJanData.filter(
      (item) => item.divisionName === divisionLabelsArray[i]
    );
    totalOfDivision[i] = selectData
      .map((item) => item.payment)
      .reduce((prev, current) => prev + current, 0);
  }
  for (let i in selectedFebData) {
    if (i >= divisionLabelsArray.length) {
      break;
    }
    let selectData = selectedFebData.filter(
      (item) => item.divisionName === divisionLabelsArray[i]
    );
    totalOfDivision[i] += selectData
      .map((item) => item.payment)
      .reduce((prev, current) => prev + current, 0);
  }
  for (let i in selectedMarData) {
    if (i >= divisionLabelsArray.length) {
      break;
    }
    let selectData = selectedMarData.filter(
      (item) => item.divisionName === divisionLabelsArray[i]
    );
    totalOfDivision[i] += selectData
      .map((item) => item.payment)
      .reduce((prev, current) => prev + current, 0);
  }

  //各課ごとの合計
  let totalOfSection = new Array(divisionLabelsArray.length);
  for (let j = 0; j < divisionLabelsArray.length; j++) {
    let newData = selectedJanData.filter(
      (item) => item[labels[1]] === divisionLabelsArray[j]
    );

    totalOfSection[j] = new Array(sectionLabelsArray[j].length);
    for (let i in newData) {
      if (i >= sectionLabelsArray.length) {
        break;
      }
      let selectDeptData = newData.filter(
        (item) => item[labels[2]] === sectionLabelsArray[j][i]
      );
      let selectData = selectDeptData.map((item) => {
        return parseInt(item[labels[9]].replace(/,/g, "") || 0, 10);
      });
      totalOfSection[j][i] = selectData.reduce(
        (prev, current) => prev + current,
        0
      );
    }
  }

  //pieChartへのフォーマット適応
  const formattedDivisionData = totalOfDivision.map((value, index) => ({
    value: value,
    name: divisionLabelsArray[index],
  }));

  let formattedSectionData = new Array(sectionLabelsArray.length);
  for (let i in totalOfSection) {
    formattedSectionData[i] = new Array(sectionLabelsArray[i].length);
    let totalSectionsMoney = totalOfSection[i].reduce(
      (prev, current) => prev + current,
      0
    );

    let dataToChange = d3
      .scaleLinear()
      .domain([0, totalSectionsMoney])
      .range([0, totalOfDivision[i]]);

    formattedSectionData[i] = totalOfSection[i].map((value, index) => ({
      value: dataToChange(value),
      name: sectionLabelsArray[i][index],
    }));
  }

  const formattedSectionDataChanged = [];
  for (let i in totalOfSection) {
    for (let j in formattedSectionData[i]) {
      if (formattedSectionData[i][j].name === undefined) {
        break;
      } else {
        formattedSectionDataChanged.push(formattedSectionData[i][j]);
      }
    }
  }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (value > 1500000000) {
      return (
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {name}
        </text>
      );
    } else {
      return <></>;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].name}</p>
        </div>
      );
    }

    return null;
  };

  const end = performance.now();

  console.log(end - start + "ミリ秒, pie");

  return (
    <div id="pieChart">
      <Flex
        maxW={"6xl"}
        direction={{ base: "column", md: "row" }}
        spacing={2}
        justify={{ base: "center", md: "space-evenly" }}
        align={{ base: "center", md: "center" }}
      >
        <Text fontSize="lg">
          {deptLabels[selectedIndex]}の各部・課ごと合計金額内訳
        </Text>
        <Popover>
          <PopoverTrigger>
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="teal"
              aria-label="Done"
              fontSize="20px"
              icon={<QuestionIcon />}
              size={10}
            />
          </PopoverTrigger>
          <PopoverContent w={500}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>合計金額の割合を表すグラフ</PopoverHeader>
            <PopoverBody>
              <Text>選択した局に属する部・課の合計金額を表示。</Text>
              <Text>内側の円が部の割合で、その円に対応する課です。</Text>
              <Text>
                カーソルを合わせるとその対応する部局名を表示しています。
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <PieChart width={400} height={200} margin={{ left: 70 }}>
        <Pie
          data={formattedDivisionData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
        />
        <Tooltip content={<CustomTooltip />} />

        <Pie
          data={formattedSectionDataChanged}
          dataKey="value"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          labelLine={false}
          label={renderCustomizedLabel}
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  );
};
