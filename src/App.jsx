import { useEffect, useState } from "react";
import "./App.scss";
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
    "　　　支払額　（円）　", //9
  ];

  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FF8000",
    "#8000FF",
    "#0080FF",
    "#FF0080",
    "#80FF00",
    "#00FF80",
    "#800000",
    "#008000",
    "#000080",
    "#808000",
    "#800080",
    "#008080",
    "#804000",
    "#400080",
    "#004080",
    "#800040",
    "#408000",
    "#004040",
  ];

  const [data, setData] = useState([]);
  const [deptDataLabels, setDeptDataLabels] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [moneyData, setMoneyData] = useState([]);

  const url = "https://kinakomoch7.github.io/opDataJson/opDataApril.json";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setData(response.slice(0, 43749));

        const deptLabelsArray = Array.from(
          new Set(response.slice(0, 43749).map((item) => item[labels[0]]))
        );
        setDeptDataLabels(deptLabelsArray.slice(0, 24));

        const deptArray = response
          .slice(0, 43749)
          .map((item) => item[labels[0]]);
        setDeptData(deptArray);

        const moneyArray = response
          .slice(0, 43749)
          .map((item) => parseInt(item[labels[9]].replace(/,/g, "") || 0, 10));
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

  const circleChart = d3.path();
  circleChart.moveTo(400, 400);
  var angle0 = -(Math.PI / 2);
  var angle1 = -(Math.PI / 2);
  for (let i = 0; i < deptDataLabels.length; i++) {
    const colorIndex = i % colors.length;
    const color = colors[colorIndex];

    angle1 += (moneyDataAngle[i] * Math.PI) / 180;

    circleChart.lineTo(
      Math.cos(angle0) * 200 + 400,
      Math.sin(angle0) * 200 + 400
    );
    circleChart.arc(400, 400, 200, angle0, angle1);
    // circleChart.arcTo(
    //   Math.cos(angle0) * 200 + 400,
    //   Math.sin(angle0) * 200 + 400,
    //   Math.cos(angle1) * 200 + 400,
    //   Math.sin(angle1) * 200 + 400,
    //   200
    // );
    circleChart.closePath();
    circleChart.fillStyle = color;
    angle0 = angle1;
  }

  return (
    <div className="bdy">
      <Header />

      <div className="main">
        <svg width={800} height={800} viewBox="100, 100, 800, 800">
          <g>
            <circle
              cx="400"
              cy="400"
              r="200"
              fill="none"
              stroke="#000000"
            ></circle>
          </g>

          <g>
            <path
              d={circleChart.toString()}
              fill={circleChart.fillStyle}
              stroke="black"
            ></path>
          </g>

          {/* <g>
            {deptDataLabels.map((item) => {
              let angle0 = 0;
              let angle1 = 0;
              for (let i = 1; i < item.length; i++) {
                angle1 += (moneyDataAngle[i] * Math.PI) / 180;
                const x0 = 200 * Math.cos(angle0) + 400;
                const y0 = 200 * Math.sin(angle0) + 400;
                const x1 = 200 * Math.cos(angle1) + 400;
                const y1 = 200 * Math.sin(angle1) + 400;
                return (
                  <path
                    fill={d3.schemePastel1[i]}
                    d="M x0 y0 A 200 200 1 1 x1 y1"
                  ></path>
                );

                angle0 += (moneyDataAngle[i] * Math.PI) / 180;
              }
            })}
          </g> */}
        </svg>
      </div>

      <Footer />
    </div>
  );
}

export default App;
