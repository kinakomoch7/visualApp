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

import JanData from "../../formattedDatas/LineChartDatas/LineChartData01.json";
import FebData from "../../formattedDatas/LineChartDatas/LineChartData02.json";
import MarData from "../../formattedDatas/LineChartDatas/LineChartData03.json";

export const DisplayLineChart = (props) => {
  const { onSelect, selectedIndex } = props;

  const start = performance.now();

  // 月毎のデータの集計
  const deptJanDataLabelsArray = Array.from(
    new Set(JanData.map((item) => item.bureauName))
  );
  const deptFebDataLabelsArray = Array.from(
    new Set(FebData.map((item) => item.bureauName))
  );
  const deptMarDataLabelsArray = Array.from(
    new Set(MarData.map((item) => item.bureauName))
  );

  // 月毎の局別合計金額の設定;
  const totalJanDataDept = new Array(deptJanDataLabelsArray.length);
  for (var i in JanData) {
    if (i >= deptJanDataLabelsArray.length) {
      break;
    }
    let selectData = JanData.filter(
      (item) => item.bureauName === deptJanDataLabelsArray[i]
    );
    totalJanDataDept[i] = selectData
      .map((item) => item.payment)
      .reduce((prev, current) => prev + current, 0);
  }

  const totalFebDataDept = new Array(deptFebDataLabelsArray.length);
  for (var i in FebData) {
    if (i >= deptFebDataLabelsArray.length) {
      break;
    }
    let selectData = FebData.filter(
      (item) => item.bureauName === deptFebDataLabelsArray[i]
    );
    totalFebDataDept[i] = selectData
      .map((item) => item.payment)
      .reduce((prev, current) => prev + current, 0);
  }

  const totalMarDataDept = new Array(deptMarDataLabelsArray.length);
  for (var i in MarData) {
    if (i >= deptMarDataLabelsArray.length) {
      break;
    }
    let selectData = MarData.filter(
      (item) => item.bureauName === deptMarDataLabelsArray[i]
    );

    totalMarDataDept[i] = selectData
      .map((item) => item.payment)
      .reduce((prev, current) => prev + current, 0);
  }

  const totalDataDept = [totalJanDataDept, totalFebDataDept, totalMarDataDept];

  // グラフ描画のためのデータ調整
  const JanMoneyMax = totalJanDataDept.reduce((a, b) => {
    return Math.max(a, b);
  }, 0);
  const FebMoneyMax = totalFebDataDept.reduce((a, b) => {
    return Math.max(a, b);
  }, 0);
  const MarMoneyMax = totalMarDataDept.reduce((a, b) => {
    return Math.max(a, b);
  }, 0);
  const maxMoney = Math.max(JanMoneyMax, FebMoneyMax, MarMoneyMax);

  const x0 = d3.scaleLinear().domain([0, 3]).range([0, 800]).nice();
  const y0 = d3.scaleLinear().domain([0, maxMoney]).range([0, 400]).nice();

  const end = performance.now();

  console.log(end - start + "ミリ秒");

  return (
    <div>
      <Flex
        maxW={"6xl"}
        marginTop={5}
        spacing={4}
        justify={{ base: "center", md: "center" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>月毎の合計金額の推移</Text>
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
            <PopoverHeader>折れ線グラフ</PopoverHeader>
            <PopoverBody>
              <Text>各局の支出金額の推移を表示</Text>
              <Text>選択した局は赤色の太線で表示しています。</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <svg viewBox="0 0 1100 600">
        {/* x座標ラベル、線 */}
        <g transform="translate(40, 70)">
          <text>（億円）</text>
        </g>

        <g transform="translate(100, 100)">
          {x0.ticks(3).map((item, i) => {
            if (i !== 0) {
              return (
                <g key={i}>
                  <line
                    x1={x0(item)}
                    y1="400"
                    x2={x0(item)}
                    y2="400"
                    stroke="black"
                  />
                  <text x={x0(item)} y="420" textAnchor="middle">
                    {item}月
                  </text>
                </g>
              );
            }
          })}
        </g>
        {/* y座標ラベル、線 */}
        <g transform="translate(-100, 500) scale(1, -1)">
          {y0.ticks().map((item, i) => {
            return (
              <g key={i}>
                <line
                  x1="200"
                  y1={y0(item)}
                  x2="200"
                  y2={y0(item) + 40}
                  stroke="black"
                />

                <text
                  x="195"
                  y={-y0(item) + 5}
                  textAnchor="end"
                  transform="scale(1, -1)"
                >
                  {item / 100000000}
                </text>
              </g>
            );
          })}
        </g>

        {totalJanDataDept.map((_, janDeptIndex) => {
          return (
            <g
              transform="translate(100, 500) scale(1, -1)"
              onClick={() => onSelect(janDeptIndex)}
              key={janDeptIndex}
            >
              {totalDataDept
                .map((item) => item[janDeptIndex])
                .map((value, i, arr) => {
                  let color, strokeWid;
                  if (selectedIndex == janDeptIndex) {
                    color = "red";
                    strokeWid = "5";
                  } else {
                    color = "black";
                    strokeWid = "2";
                  }
                  return (
                    <g key={i}>
                      <circle
                        cx={(800 / 3) * (i + 1)}
                        cy={y0(value)}
                        r="5"
                        fill={color}
                      />
                      <line
                        x1={(800 / 3) * i}
                        y1={y0(arr[i - 1])}
                        x2={(800 / 3) * (i + 1)}
                        y2={y0(arr[i])}
                        stroke={color}
                        strokeWidth={strokeWid}
                      />
                    </g>
                  );
                })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
