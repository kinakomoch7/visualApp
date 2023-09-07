import * as d3 from "d3";
import React from "react";

export const DisplayLineChart = (props) => {
  const { JanData, FebData, MarData, labels, onSelect, selectedIndex } = props;

  // 月毎のデータの集計
  const deptJanDataLabelsArray = Array.from(
    new Set(JanData.map((item) => item[labels[0]]))
  );
  const deptFebDataLabelsArray = Array.from(
    new Set(FebData.map((item) => item[labels[0]]))
  );
  const deptMarDataLabelsArray = Array.from(
    new Set(MarData.map((item) => item[labels[0]]))
  );

  // 月毎の局別合計金額の設定
  const totalJanDataDept = new Array(deptJanDataLabelsArray.length);
  for (var i in JanData) {
    if (i >= deptJanDataLabelsArray.length) {
      break;
    }
    let selectDeptData = JanData.filter(
      (item) => item[labels[0]] === deptJanDataLabelsArray[i]
    );
    const selectData = selectDeptData.map((item) => {
      const money = parseInt(item[labels[9]].replace(/,/g, "") || 0, 10);
      return money;
    });
    totalJanDataDept[i] = selectData.reduce(
      (prev, current) => prev + current,
      0
    );
  }

  const totalFebDataDept = new Array(deptFebDataLabelsArray.length);
  for (var i in FebData) {
    if (i >= deptFebDataLabelsArray.length) {
      break;
    }
    let selectDeptData = FebData.filter(
      (item) => item[labels[0]] === deptFebDataLabelsArray[i]
    );
    const selectData = selectDeptData.map((item) => {
      const money = parseInt(item[labels[9]].replace(/,/g, "") || 0, 10);
      return money;
    });
    totalFebDataDept[i] = selectData.reduce(
      (prev, current) => prev + current,
      0
    );
  }

  const totalMarDataDept = new Array(deptMarDataLabelsArray.length);
  for (var i in MarData) {
    if (i >= deptMarDataLabelsArray.length) {
      break;
    }
    let selectDeptData = MarData.filter(
      (item) => item[labels[0]] === deptMarDataLabelsArray[i]
    );
    const selectData = selectDeptData.map((item) => {
      const money = parseInt(item[labels[9]].replace(/,/g, "") || 0, 10);
      return money;
    });
    totalMarDataDept[i] = selectData.reduce(
      (prev, current) => prev + current,
      0
    );
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

  return (
    <div>
      <svg viewBox="0 0 1200 600">
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
