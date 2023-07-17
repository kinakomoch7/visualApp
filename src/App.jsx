import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

import "./App.scss";
import DisplayLineGraph from "./components/DisplayLineGraph.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  const labels = [
    "局名", //0
    "部名", //1
    "課名", //2
    "支払日", //3
    "款名", //4
    "項目", //5
    "目名", //6
    "節・細節名", //7
    "支払内容（件名）", //8
    "支払額（円）", //9
  ];

  const [data, setData] = useState([]);
  const [deptDataLabels, setDeptDataLabels] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [moneyData, setMoneyData] = useState([]);

  const [JanData, setJanData] = useState([]);

  const JanURL =
    "https://raw.githubusercontent.com/kinakomoch7/TokyoOpenData/main/opData01.json";
  const FebURL =
    "https://raw.githubusercontent.com/kinakomoch7/TokyoOpenData/main/opData02.json";
  const MarURL =
    "https://raw.githubusercontent.com/kinakomoch7/TokyoOpenData/main/opData03.json";

  useEffect(() => {
    fetch(JanURL)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setJanData(response);

        const deptLabelsArray = Array.from(
          new Set(response.map((item) => item[labels[0]]))
        );
        setDeptDataLabels(deptLabelsArray.slice(0, 24));

        const deptArray = response.map((item) => item[labels[0]]);
        setDeptData(deptArray);

        const moneyArray = response.map((item) =>
          parseInt(item[labels[9]].replace(/,/g, "") || 0, 10)
        );
        setMoneyData(moneyArray);
      });
  }, []);

  const totalOfDept = new Array(deptDataLabels.length);
  for (var i in data) {
    if (i >= deptDataLabels.length) {
      break;
    }
    let selectDeptData = data.filter(
      (item) => item[labels[0]] === deptDataLabels[i]
    );
    const selectData = selectDeptData.map((item) => {
      const money = parseInt(item[labels[9]].replace(/,/g, "") || 0, 10);
      return money;
    });
    totalOfDept[i] = selectData.reduce((prev, current) => prev + current, 0);
  }

  const totalMoney = moneyData.reduce((prev, current) => prev + current, 0);
  const dataToAngleChange = d3
    .scaleLinear()
    .domain([0, totalMoney])
    .range([0, 360]);
  const moneyDataAngle = totalOfDept.map((item) => dataToAngleChange(item));

  const formattedData = totalOfDept.map((value, index) => ({
    value: value,
    name: deptDataLabels[index],
    color: d3.interpolateBrBG(0.1 * index),
  }));

  console.log(formattedData);

  return (
    <div className="bdy">
      <Header />

      <DisplayLineGraph JanData={JanData} labels={labels} />

      <div style={{ width: "100%", height: "500px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="支出金"
              cx="50%"
              cy="50%"
              fill={"#" + Math.floor(Math.random() * 16777215).toString(16)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "100%", height: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="支出金"
              cx="50%"
              cy="50%"
              fill={"#" + Math.floor(Math.random() * 16777215).toString(16)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Footer />
    </div>
  );
}

export default App;
