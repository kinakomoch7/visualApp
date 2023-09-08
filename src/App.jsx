import { Container, Grid, GridItem, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { DisplayLineChart } from "./components/DisplayLineChart.jsx";
import { DisplayPieChart } from "./components/DisplayPieChart";
import { DisplayWordcloud } from "./components/DisplayWordcloud";

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Overview from "./components/Overview.jsx";

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
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const deptLabelsObject = Object.fromEntries(
    deptLabels.map((item, index) => [index, item])
  );

  const onSelect = (props) => {
    const selectIndex = props;

    setSelectedIndex(selectIndex);
  };

  const handleChangeProperty = (event) => {
    setSelectedIndex(Number(event.target.value));
  };

  return (
    <>
      <Container maxW="container.xl">
        <Header />
        <Grid
          templateAreas={`
          "overview  PieChart"
          "lineChart PieChart"
          "lineChart wordCloud"`}
          gridTemplateRows={"20% 10% 50%"}
          gridTemplateColumns={"65% 35%"}
          gap="4"
        >
          <GridItem area={"overview"}>
            <Overview />
          </GridItem>

          <GridItem area={"lineChart"} gap="1em">
            <div className="selection">
              <Text fontSize="lg">東京都に属する局を選択してください</Text>
              <Select
                width="70%"
                onChange={handleChangeProperty}
                size="sm"
                borderColor="black"
              >
                {deptLabels.map((item, index) => (
                  <option key={item} value={index}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
            <DisplayLineChart
              JanData={JanData}
              FebData={FebData}
              MarData={MarData}
              labels={labels}
              onSelect={onSelect}
              selectedIndex={selectedIndex}
            />
          </GridItem>

          <GridItem area={"PieChart"}>
            <DisplayPieChart
              data={[JanData, FebData, MarData]}
              labels={labels}
              selectedIndex={selectedIndex}
              deptLabels={deptLabels}
            />
          </GridItem>

          <GridItem area={"wordCloud"}>
            <DisplayWordcloud index={selectedIndex} deptLabels={deptLabels} />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default App;
