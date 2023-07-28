import React, { useEffect, useState } from "react";
import "./App.scss";

import { DisplayLineChart } from "./components/DisplayLineChart.jsx";
import { DisplayPieChart } from "./components/DisplayPieChart";
import { DisplayWordcloud } from "./components/DisplayWordcloud";

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

  //月別データ
  const [JanData, setJanData] = useState([]);
  const [FebData, setFebData] = useState([]);
  const [MarData, setMarData] = useState([]);

  //データ選択のindex保持
  const [selectedIndex, setSelectedIndex] = useState([0]);

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
        setJanData(response);
      });

    fetch(FebURL)
      .then((response) => response.json())
      .then((response) => {
        setFebData(response);
      });

    fetch(MarURL)
      .then((response) => response.json())
      .then((response) => {
        setMarData(response);
      });
  }, []);

  const deptLabels = Array.from(
    new Set(JanData.map((item) => item[labels[0]]))
  );

  const onSelect = (props) => {
    const selectIndex = props;

    setSelectedIndex(selectIndex);
  };

  console.log(deptLabels);

  return (
    <div className="bdy">
      <Header />

      <div className="LineChart">
        <DisplayLineChart
          JanData={JanData}
          FebData={FebData}
          MarData={MarData}
          labels={labels}
          onSelect={onSelect}
          selectedIndex={selectedIndex}
        />
      </div>

      <div className="subCharts">
        <div className="PieChart">
          <DisplayPieChart
            data={[JanData, FebData, MarData]}
            labels={labels}
            selectedIndex={selectedIndex}
            deptLabels={deptLabels}
          />
        </div>

        <div className="Wordcloud">
          <DisplayWordcloud index={selectedIndex} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
