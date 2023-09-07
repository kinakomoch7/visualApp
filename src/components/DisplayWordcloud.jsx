import React from "react";
import WordCloud from "react-d3-cloud";

import audit from "../datas/Audit.json";
import central from "../datas/CentralWholesaleMarket.json";
import child from "../datas/ChildPolicyCooperation.json";
import constraction from "../datas/Constraction.json";
import digital from "../datas/DigitalService.json";
import education from "../datas/Education.json";
import election from "../datas/ElectionAdministrationCommission.json";
import enviroment from "../datas/Environment.json";
import expropriation from "../datas/ExpropriationCommittee.json";
import finance from "../datas/Finance.json";
import general from "../datas/GeneralAffairs.json";
import housing from "../datas/HousingPolicy.json";
import industry from "../datas/IndustryAndLabor.json";
import labor from "../datas/LaborRelationsCommission.json";
import life from "../datas/LifeCultureAndSports.json";
import metropolitan from "../datas/MetropolitanPolice.json";
import office from "../datas/OfficeOfAccounting.json";
import parliamentary from "../datas/Parliamentary.json";
import personnel from "../datas/PersonnelCommittee.json";
import policy from "../datas/PolicyPlanning.json";
import port from "../datas/Port.json";
import tax from "../datas/tax.json";
import tokyo from "../datas/TokyoFire.json";
import urban from "../datas/UrbanDevelopment.json";
import welfare from "../datas/WelfareAndPublicHealth.json";

export const DisplayWordcloud = (props) => {
  const { index, deptLabels } = props;

  const dataSets = [
    policy,
    general,
    finance,
    enviroment,
    tax,
    urban,
    welfare,
    central,
    constraction,
    industry,
    port,
    office,
    labor,
    life,
    expropriation,
    parliamentary,
    education,
    election,
    personnel,
    audit,
    digital,
    housing,
    child,
    metropolitan,
    tokyo,
  ];

  const formattedData = dataSets[index].map((item) => item.value);

  const wordScale = d3
    .scaleLinear()
    .domain(d3.extent(formattedData))
    .range([0, 200])
    .nice();

  return (
    <>
      <svg transform="translate(200, 0)">
        <text>{deptLabels[index]}の支払い品目</text>
      </svg>
      <div>
        <WordCloud
          data={dataSets[index]}
          fontSize={(word) => wordScale(word.value)}
        />
      </div>
    </>
  );
};
