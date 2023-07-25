import React from "react";

export const DisplayLineChart = (props) => {
  const { JanData, FebData, MarData, labels, onSelect } = props;
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

  console.log(
    totalDataDept.map((monthData, monthIndex) => {
      const a = monthData.map((value, index) => {
        const test = totalDataDept.map((item) => item[index]);
        return test;
      });
      return [...a];
    })
  );

  return (
    <>
      {/* x座標ラベル、線 */}
      <svg width="100%" height={600}>
        <g transform="translate(200, 100)">
          {x0.ticks(3).map((item, i) => {
            return (
              <g key={i}>
                <line
                  x1={x0(item)}
                  y1="400"
                  x2={x0(item + 0.3)}
                  y2="400"
                  stroke="black"
                />
                <text x={x0(item)} y="420" textAnchor="middle">
                  {item}月
                </text>
              </g>
            );
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
                  {item}
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
              return (
                <g key={i}>
                  <circle cx={(800 / 3) * (i + 1)} cy={y0(value)} r="5" />
                  <line
                    x1={(800 / 3) * i}
                    y1={y0(arr[i - 1])}
                    x2={(800 / 3) * (i + 1)}
                    y2={y0(arr[i])}
                    stroke="black"
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
              return (
                <g key={i}>
                  <circle cx={(800 / 3) * (i + 1)} cy={y0(value)} r="5" />
                  <line
                    x1={(800 / 3) * i}
                    y1={y0(arr[i - 1])}
                    x2={(800 / 3) * (i + 1)}
                    y2={y0(arr[i])}
                    stroke="black"
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
              return (
                <g key={i}>
                  <circle cx={(800 / 3) * (i + 1)} cy={y0(value)} r="5" />
                  <line
                    x1={(800 / 3) * i}
                    y1={y0(arr[i - 1])}
                    x2={(800 / 3) * (i + 1)}
                    y2={y0(arr[i])}
                    stroke="black"
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
              return (
                <g key={i}>
                  <circle cx={(800 / 3) * (i + 1)} cy={y0(value)} r="5" />
                  <line
                    x1={(800 / 3) * i}
                    y1={y0(arr[i - 1])}
                    x2={(800 / 3) * (i + 1)}
                    y2={y0(arr[i])}
                    stroke="black"
                  />
                </g>
              );
            })}
        </g>
      </svg>
    </>
  );
};
