import { getWeek } from "../helperFunction";

// parsing errorlist json to specfic format for each station failure symptom
export function parsingErrorList(errorList) {
  let n = {};
  errorList.forEach((obj) => {
    if (n[obj.Model] === undefined || n[obj.Model] === null) {
      n[obj.Model] = {};
      n[obj.Model]["SMT1"] = { ErorrDescriptions: [] };
      n[obj.Model]["SMT2"] = { ErorrDescriptions: [] };
      n[obj.Model]["ASM"] = { ErorrDescriptions: [] };
      n[obj.Model]["FCT"] = { ErorrDescriptions: [] };
      n[obj.Model]["DAOI"] = { ErorrDescriptions: [] };
      n[obj.Model]["CPLD"] = { ErorrDescriptions: [] };
      n[obj.Model]["VOL"] = { ErorrDescriptions: [] };
      n[obj.Model]["CQC"] = { ErorrDescriptions: [] };
      n[obj.Model]["ICT"] = { ErorrDescriptions: [] };

      if (
        obj.Type === "SMT1" ||
        obj.Type === "SMT2" ||
        obj.Type === "ASM" ||
        obj.Type === "FCT" ||
        obj.Type === "DAOI" ||
        obj.Type === "CPLD" ||
        obj.Type === "VOL" ||
        obj.Type === "CQC" ||
        obj.Type === "ICT"
      ) {
        n[obj.Model][obj.Type].ErorrDescriptions = [
          {
            description: obj["Error_Description"],
            reasons: [{ reason: obj.Reason, item: obj.item, date: obj.Date }],
            date: obj.Date,
          },
        ];
      }
    } else {
      if (
        obj.Type === "SMT1" ||
        obj.Type === "SMT2" ||
        obj.Type === "ASM" ||
        obj.Type === "FCT" ||
        obj.Type === "DAOI" ||
        obj.Type === "CPLD" ||
        obj.Type === "VOL" ||
        obj.Type === "CQC" ||
        obj.Type === "ICT"
      ) {
        n[obj.Model][obj.Type].ErorrDescriptions.push({
          description: obj["Error_Description"],
          reasons: [{ reason: obj.Reason, item: obj.item, date: obj.Date }],
          date: obj.Date,
        });
      }
    }
  });

  return n;
}

// parsing yieldRate json to specfic format for each station failure symptom
export function parseForYieldRate(updatedJson) {
  let n = { startDate: null, endDate: null, MB: [], BPN: [], Other: [] };

  updatedJson.YieldRate.forEach((obj) => {
    // seperate raw data for MB, BPN ,and Other groups
    const proName = obj.Model.split("(")[1] || "";
    if (proName.substring(0, 3).toUpperCase() === "BPN") {
      n.BPN.push(obj);
    } else if (
      // to catch the key word for MB product, it should be maintained
      proName.substring(0, 2).toUpperCase() === "X1" ||
      proName.substring(0, 2).toUpperCase() === "H1" ||
      proName.substring(0, 2).toUpperCase() === "A1" ||
      proName.substring(0, 2).toUpperCase() === "A2"
    ) {
      n.MB.push(obj);
    } else {
      n.Other.push(obj);
    }

    if (n.startDate === null) {
      n.startDate = obj.Date;
    } else if (obj.Date < n.startDate) {
      n.startDate = obj.Date;
    }

    if (n.endDate === null) {
      n.endDate = obj.Date;
    } else if (obj.Date > n.endDate) {
      n.endDate = obj.Date;
    }

    if (n[obj.Model] === undefined || n[obj.Model] === null) {
      n[obj.Model] = {};
      n[obj.Model]["RowData"] = [obj];
      n[obj.Model]["SMT1"] = { Pass: 0, Fail: 0, Total: 0, data: [], mo: [] };
      n[obj.Model]["SMT2"] = { Pass: 0, Fail: 0, Total: 0, data: [], mo: [] };
      n[obj.Model]["ASM"] = { Pass: 0, Fail: 0, Total: 0, data: [], mo: [] };
      n[obj.Model]["FCT"] = { Pass: 0, Fail: 0, Total: 0, data: [], mo: [] };
      n[obj.Model]["DAOI"] = { Pass: 0, Fail: 0, Total: 0, data: [], mo: [] };
      n[obj.Model]["CPLD"] = { Pass: 0, Fail: 0, Total: 0, data: [], mo: [] };
      n[obj.Model]["VOL"] = { Pass: 0, Fail: 0, Total: 0, data: [], mo: [] };
      n[obj.Model]["CQC"] = { Pass: 0, Fail: 0, Total: 0, data: [], mo: [] };
      n[obj.Model]["ICT"] = { Pass: 0, Fail: 0, Total: 0, data: [], mo: [] };

      if (
        obj.Type === "SMT1" ||
        obj.Type === "SMT2" ||
        obj.Type === "ASM" ||
        obj.Type === "FCT" ||
        obj.Type === "DAOI" ||
        obj.Type === "CPLD" ||
        obj.Type === "VOL" ||
        obj.Type === "CQC" ||
        obj.Type === "ICT"
      ) {
        n[obj.Model][obj.Type].Pass += obj.Pass;
        n[obj.Model][obj.Type].Fail += obj.Fail;
        n[obj.Model][obj.Type].Total += obj.Total;
        const { Date, Pass, Fail, Total, MO, Start_date } = obj;
        n[obj.Model][obj.Type].data = [{ Date, Pass, Fail, Total }];
        n[obj.Model][obj.Type].mo = [{ MO, Pass, Fail, Total, Start_date }];
      }
    } else {
      n[obj.Model]["RowData"].push(obj);
      if (
        obj.Type === "SMT1" ||
        obj.Type === "SMT2" ||
        obj.Type === "ASM" ||
        obj.Type === "FCT" ||
        obj.Type === "DAOI" ||
        obj.Type === "CPLD" ||
        obj.Type === "VOL" ||
        obj.Type === "CQC" ||
        obj.Type === "ICT"
      ) {
        n[obj.Model][obj.Type].Pass += obj.Pass;
        n[obj.Model][obj.Type].Fail += obj.Fail;
        n[obj.Model][obj.Type].Total += obj.Total;
        const { Date, Pass, Fail, Total, MO, Start_date } = obj;
        const sameDateObje = n[obj.Model][obj.Type].data.find(
          (elem) => elem.Date.toString() === Date.toString()
        );
        if (sameDateObje) {
          sameDateObje.Pass += Pass;
          sameDateObje.Fail += Fail;
          sameDateObje.Total += Total;
        } else {
          n[obj.Model][obj.Type].data.push({ Date, Pass, Fail, Total });
        }
        const sameMoObj = n[obj.Model][obj.Type].mo.find(
          (elem) => elem.MO === MO
        );

        if (sameMoObj) {
          sameMoObj.Pass += Pass;
          sameMoObj.Fail += Fail;
          sameMoObj.Total += Total;
        } else {
          n[obj.Model][obj.Type].mo.push({ MO, Pass, Fail, Total, Start_date });
        }
      }
    }
  });

  //{startDate: Wed Apr 01 2020 00:00:00 GMT+0800 (Taipei Standard Time), endDate: Thu Jun 04 2020 00:00:00 GMT+0800 (Taipei Standard Time), 2701-005240-60(X11DPG-SN): {…}, 2701-005280-61(X11DPG-OT-CPU): {…}, 2701-005222-61(X11DPFR-SN-LC019): {…}, …}
  //2701-001520-65(AOC-STGN-i2S): {RowData: Array(312), SMT1: {…}, SMT2: {…}, ASM: {…}, FCT: {…}, …}
  //ASM: {Pass: 5001, Fail: 0, Total: 5001, data: Array(10)}

  const result = transformToArray(generateFTY(n));
  const BPNData = calculateSMT2AndFctYieldByGroup(result.BPN);
  const MBData = calculateSMT2AndFctYieldByGroup(result.MB);
  const OtherData = calculateSMT2AndFctYieldByGroup(result.Other);
  // const BPNSMT2Total = BPNData.SMT2.reduce((acc, elem) => acc + elem.Total, 0);
  const BPNSMT2Total = calculateTotal(BPNData, "SMT2");
  const BPNFCTTotal = calculateTotal(BPNData, "FCT");
  const MBSMT2Total = calculateTotal(MBData, "SMT2");
  const MBFCTTotal = calculateTotal(MBData, "FCT");
  const OtherSMT2Total = calculateTotal(OtherData, "SMT2");
  const OtherFCTTotal = calculateTotal(OtherData, "FCT");
  const smt2PieData = { BPNSMT2Total, MBSMT2Total, OtherSMT2Total };
  const fct2PieData = { BPNFCTTotal, MBFCTTotal, OtherFCTTotal };
  const piesData = { smt2PieData, fct2PieData };
  const { startDate, endDate, models } = result;
  return {
    startDate,
    endDate,
    models,
    BPNData,
    MBData,
    OtherData,
    piesData,
  };
}

const calculateTotal = (obj, Type) =>
  obj[Type].reduce((acc, elem) => acc + elem.Total, 0);

// transform yieldRate object into array for result page easy to render
function transformToArray(obj) {
  const { startDate, endDate, MB, BPN, Other } = obj;
  const o = { startDate, endDate, MB, BPN, Other, models: [] };
  const keys = Object.keys(obj).filter(
    (item) =>
      item !== "startDate" &&
      item !== "endDate" &&
      item !== "MB" &&
      item !== "BPN" &&
      item !== "Other"
  );
  keys.forEach((model) => {
    const newObject = { model, ...obj[model] };
    o.models.push(newObject);
  });
  return o;
}

// generate yield rate/ output data by week
const calculateData = (arr, type) => {
  const data = arr
    .filter((obj) => obj.Type === type)
    .map((obj) => ({
      Week: getWeek(obj.Date),
      Pass: obj.Pass,
      Total: obj.Total,
    }));

  const finalResult = {};
  data.forEach((obj) => {
    if (finalResult[obj.Week] === undefined || finalResult[obj.Week] === null) {
      finalResult[obj.Week] = {
        Week: obj.Week,
        Pass: obj.Pass,
        Total: obj.Total,
      };
    } else {
      finalResult[obj.Week].Pass += obj.Pass;
      finalResult[obj.Week].Total += obj.Total;
    }
  });
  const keys = Object.keys(finalResult);
  const finalArray = [];
  keys.forEach((key) => {
    finalArray.push(finalResult[key]);
  });
  return finalArray;
};

// pass group raw data array and return an obj {SMT2 :[{Week:1,Total:100,Pass:99,Yield:99%}...],FCT:[{Week:1,Total:100,Pass:99,Yield:99%}...]}
const calculateSMT2AndFctYieldByGroup = (arr) => {
  const smt2FinalArray = calculateData(arr, "SMT2");
  const fctFinalArray = calculateData(arr, "FCT");

  return {
    SMT2: smt2FinalArray.sort(sortByWeek),
    FCT: fctFinalArray.sort(sortByWeek),
  };
};

function sortByWeek(a, b) {
  if (a.Week > b.Week) {
    return 1;
  } else {
    return -1;
  }
}

// generate FE, BE, and FTY columns for yieldRate each model and stattion
function generateFTY(obj) {
  const keys = Object.keys(obj).filter(
    (item) =>
      item !== "startDate" &&
      item !== "endDate" &&
      item !== "MB" &&
      item !== "BPN" &&
      item !== "Other"
  );

  keys.forEach((key) => {
    let model = obj[key];
    const fePass = Math.max(model.SMT1.Pass || 0, model.SMT2.Pass || 0);
    const feFail = (model.SMT1.Fail || 0) + (model.SMT2.Fail || 0);
    const feYield =
      parseFloat(((fePass / (fePass + feFail)) * 100).toFixed(1)) || 0;
    const bePass = Math.max(
      model.ASM.Pass || 0,
      model.CPLD.Pass || 0,
      model.VOL.pass || 0,
      model.FCT.pass || 0
    );
    const beFail =
      (model.ASM.Fail || 0) +
      (model.CPLD.Fail || 0) +
      (model.VOL.Fail || 0) +
      (model.FCT.Fail || 0) +
      (model.DAOI.Fail || 0);

    const beYield =
      parseFloat(((bePass / (bePass + beFail)) * 100).toFixed(1)) || 0;
    const fty =
      parseFloat(((feYield * beYield) / 100).toFixed(1)) ||
      Math.max(feYield, beYield);
    obj[key] = {
      ...obj[key],
      FE: {
        Pass: fePass,
        Fail: feFail,
        Yield: feYield,
      },
      BE: {
        Pass: bePass,
        Fail: beFail,
        Yield: beYield,
      },
      FTY: fty,
    };
  });

  console.log("generateFTY", obj);
  return obj;
}
