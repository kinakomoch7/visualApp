import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

export const DisplayPieChart = (props) => {
  const { data, labels, selectedIndex, deptLabels } = props;

  console.log(selectedIndex);

  const selectedJanData = data[0].filter(
    (item) => item[labels[0]] === deptLabels[selectedIndex]
  );
  const selectedFebData = data[1].filter(
    (item) => item[labels[0]] === deptLabels[selectedIndex]
  );
  const selectedMarData = data[2].filter(
    (item) => item[labels[0]] === deptLabels[selectedIndex]
  );

  //部名のラベル取得
  const divisionLabelsArray = Array.from(
    new Set(selectedJanData.map((item) => item[labels[1]]))
  );
  // 課名のラベル取得
  let sectionLabelsArray = new Array(divisionLabelsArray.length);
  for (let i = 0; i < divisionLabelsArray.length; i++) {
    sectionLabelsArray[i] = Array.from(
      new Set(
        selectedJanData
          .filter((item) => item[labels[1]] === divisionLabelsArray[i])
          .map((item) => item[labels[2]])
      )
    );
  }

  //各部ごとの金額合計
  const totalOfDivision = new Array(divisionLabelsArray.length);
  for (let i in selectedJanData) {
    if (i >= divisionLabelsArray.length) {
      break;
    }
    let selectDeptData = selectedJanData.filter(
      (item) => item[labels[1]] === divisionLabelsArray[i]
    );
    const selectData = selectDeptData.map((item) => {
      const money = parseInt(item[labels[9]].replace(/,/g, "") || 0, 10);
      return money;
    });
    totalOfDivision[i] = selectData.reduce(
      (prev, current) => prev + current,
      0
    );
  }
  for (let i in selectedFebData) {
    if (i >= divisionLabelsArray.length) {
      break;
    }
    let selectDeptData = selectedFebData.filter(
      (item) => item[labels[1]] === divisionLabelsArray[i]
    );
    const selectData = selectDeptData.map((item) => {
      const money = parseInt(item[labels[9]].replace(/,/g, "") || 0, 10);
      return money;
    });
    totalOfDivision[i] += selectData.reduce(
      (prev, current) => prev + current,
      0
    );
  }
  for (let i in selectedMarData) {
    if (i >= divisionLabelsArray.length) {
      break;
    }
    let selectDeptData = selectedMarData.filter(
      (item) => item[labels[1]] === divisionLabelsArray[i]
    );
    let selectData = selectDeptData.map((item) => {
      return parseInt(item[labels[9]].replace(/,/g, "") || 0, 10);
    });
    totalOfDivision[i] += selectData.reduce(
      (prev, current) => prev + current,
      0
    );
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
  //配列に変形
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

  return (
    <div style={{ width: "100%", height: "500px" }} id="pieChart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedDivisionData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          />
          <Pie
            data={formattedSectionDataChanged}
            dataKey="value"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
