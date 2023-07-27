import { useEffect, useState } from "react";

import "./App.scss";
import { DisplayLineChart } from "./components/DisplayLineChart.jsx";
import { DisplayPieChart } from "./components/DisplayPieChart";
// import { DisplayWordcloud } from "./components/DisplayWordcloud";
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
  const [moneyData, setMoneyData] = useState([]);

  //月別データ
  const [JanData, setJanData] = useState([]);
  const [FebData, setFebData] = useState([]);
  const [MarData, setMarData] = useState([]);

  //円グラフ用のデータセット
  const [deptSelectedData, setDeptSelectedData] = useState([0]);
  const [selectedIndex, setSelectedIndex] = useState([-1]);

  //ワードクラウド用データ
  const [dataForD3Cloud, setDataForD3Cloud] = useState([]);

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
        setDeptDataLabels(deptLabelsArray);

        const moneyArray = response.map((item) =>
          parseInt(item[labels[9]].replace(/,/g, "") || 0, 10)
        );
        setMoneyData(moneyArray);
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

    // // WordCloudの情報として抽出する品詞（助詞、助動詞などは意味がないので拾わない）
    // const TARGET_POS = ["名詞"];

    // // kuromoji.jsの解析結果の値で特に値がない場合は以下の文字が設定される
    // const NO_CONTENT = "*";

    // const text = "親譲りの無鉄砲で小供の時から損ばかりしている";
    // kuromoji.builder({ dicPath: "../public/dict" }).build((err, tokenizer) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     const tokens = tokenizer.tokenize(text);
    //     console.log(tokens);
    //   }
    // });

    // kuromoji.builder({ dicPath: "/dict" }).build((err, tokenizer) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }

    //   // テキストを引数にして形態素解析
    //   const tokens = tokenizer.tokenize(JanData[labels[8]]);

    //   // 解析結果から単語と出現回数を抽出
    //   const dataForD3Cloud = tokens
    //     // pos（品詞）を参照し、'名詞', '動詞', '形容詞'のみを抽出
    //     .filter((t) => TARGET_POS.includes(t.pos))
    //     // 単語を抽出(basic_formかsurface_formに単語が存在する)
    //     .map((t) =>
    //       t.basic_form === NO_CONTENT ? t.surface_form : t.basic_form
    //     )
    //     // [{text: 単語, value: 出現回数}]の形にReduce
    //     .reduce((data, text) => {
    //       const target = data.find((c) => c.text === text);
    //       if (target) {
    //         target.value = target.value + 1;
    //       } else {
    //         data.push({
    //           text,
    //           value: 1,
    //         });
    //       }
    //       return data;
    //     }, []);

    //   // 加工した解析結果をstateにセット
    //   setDataForD3Cloud(data);
    // });
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

  const onSelect = (props) => {
    const selectIndex = props;

    // setDeptSelectedData([
    //   JanData.filter((item) => item[labels[0]] === deptDataLabels[selectIndex]),
    //   FebData.filter((item) => item[labels[0]] === deptDataLabels[selectIndex]),
    //   MarData.filter((item) => item[labels[0]] === deptDataLabels[selectIndex]),
    // ]);
    setSelectedIndex(selectIndex);
  };

  return (
    <div className="bdy">
      <Header />

      <DisplayLineChart
        JanData={JanData}
        FebData={FebData}
        MarData={MarData}
        labels={labels}
        onSelect={onSelect}
        selectedIndex={selectedIndex}
      />

      <DisplayPieChart
        data={[JanData, FebData, MarData]}
        labels={labels}
        selectedIndex={selectedIndex}
        deptLabels={deptDataLabels}
      />

      {/* <DisplayWordcloud JanData={JanData} labels={labels} />  */}

      {/* <div style={{ width: "100%", height: "500px" }}>
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
      </div> */}

      <Footer />
    </div>
  );
}

export default App;
