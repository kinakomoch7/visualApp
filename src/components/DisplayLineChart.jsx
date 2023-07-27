import React from "react";

export const DisplayLineChart = (props) => {
  const { JanData, FebData, MarData, labels, onSelect, selectedIndex } = props;
  const data = { 1: JanData, 2: FebData, 3: MarData };

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
    <>
      {/* x座標ラベル、線 */}
      <svg width="100%" height={600}>
        <g transform="translate(200, 100)">
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
        <g transform="translate(0, 500) scale(1, -1)">
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
                  {item / 1000000}
                </text>
              </g>
            );
          })}
        </g>

        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(0)}
        >
          {totalDataDept
            .map((item, index, arr) => item[0])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 0) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(1)}
        >
          {totalDataDept
            .map((item, index, arr) => item[1])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 1) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(2)}
        >
          {totalDataDept
            .map((item, index, arr) => item[2])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 2) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(3)}
        >
          {totalDataDept
            .map((item, index, arr) => item[3])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 3) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(4)}
        >
          {totalDataDept
            .map((item, index, arr) => item[4])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 4) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(5)}
        >
          {totalDataDept
            .map((item, index, arr) => item[5])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 5) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(6)}
        >
          {totalDataDept
            .map((item, index, arr) => item[6])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 6) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(7)}
        >
          {totalDataDept
            .map((item, index, arr) => item[7])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 7) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(8)}
        >
          {totalDataDept
            .map((item, index, arr) => item[8])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 8) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(9)}
        >
          {totalDataDept
            .map((item, index, arr) => item[9])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 9) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(10)}
        >
          {totalDataDept
            .map((item, index, arr) => item[10])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 10) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(11)}
        >
          {totalDataDept
            .map((item, index, arr) => item[11])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 11) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(12)}
        >
          {totalDataDept
            .map((item, index, arr) => item[12])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 12) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(13)}
        >
          {totalDataDept
            .map((item, index, arr) => item[13])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 13) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(14)}
        >
          {totalDataDept
            .map((item, index, arr) => item[14])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 14) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(15)}
        >
          {totalDataDept
            .map((item, index, arr) => item[15])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 15) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(16)}
        >
          {totalDataDept
            .map((item, index, arr) => item[16])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 16) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(17)}
        >
          {totalDataDept
            .map((item, index, arr) => item[17])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 17) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(18)}
        >
          {totalDataDept
            .map((item, index, arr) => item[18])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 18) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(19)}
        >
          {totalDataDept
            .map((item, index, arr) => item[19])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 19) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(20)}
        >
          {totalDataDept
            .map((item, index, arr) => item[20])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 20) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(21)}
        >
          {totalDataDept
            .map((item, index, arr) => item[21])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 21) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(22)}
        >
          {totalDataDept
            .map((item, index, arr) => item[22])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 22) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(23)}
        >
          {totalDataDept
            .map((item, index, arr) => item[23])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 23) {
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
        <g
          transform="translate(200, 500) scale(1, -1)"
          onClick={() => onSelect(24)}
        >
          {totalDataDept
            .map((item, index, arr) => item[24])
            .map((value, i, arr) => {
              let color, strokeWid;
              if (selectedIndex === 24) {
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
      </svg>
    </>
  );
};
