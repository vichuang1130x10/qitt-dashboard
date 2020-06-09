import XLSX from "xlsx";

export function readxlsx(inputData) {
  var workbook = XLSX.read(inputData, { type: "binary", cellDates: true });
  return toJson(workbook);
}

export function toJson(workbook) {
  let result = {};
  workbook.SheetNames.forEach((sheetName) => {
    const roa = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[sheetName]
    );
    if (roa.length > 0) {
      result[sheetName] = roa;
    }
  });

  return result;
}

export function parseForYieldRate(updatedJson) {
  let n = {};

  updatedJson.YieldRate.forEach((obj) => {
    if (n[obj.Model] === undefined || n[obj.Model] === null) {
      n[obj.Model] = {};
      n[obj.Model]["RowData"] = [obj];
      n[obj.Model]["SMT1"] = { Pass: 0, Fail: 0, Total: 0, data: [] };
      n[obj.Model]["SMT2"] = { Pass: 0, Fail: 0, Total: 0, data: [] };
      n[obj.Model]["ASM"] = { Pass: 0, Fail: 0, Total: 0, data: [] };
      n[obj.Model]["FCT"] = { Pass: 0, Fail: 0, Total: 0, data: [] };
      n[obj.Model]["DAOI"] = { Pass: 0, Fail: 0, Total: 0, data: [] };
      n[obj.Model]["CPLD"] = { Pass: 0, Fail: 0, Total: 0, data: [] };
      n[obj.Model]["VOL"] = { Pass: 0, Fail: 0, Total: 0, data: [] };
      n[obj.Model]["CQC"] = { Pass: 0, Fail: 0, Total: 0, data: [] };
      n[obj.Model]["ICT"] = { Pass: 0, Fail: 0, Total: 0, data: [] };

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
        const { Date, Pass, Fail, Total } = obj;
        n[obj.Model][obj.Type].data = [{ Date, Pass, Fail, Total }];
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
        const { Date, Pass, Fail, Total } = obj;
        n[obj.Model][obj.Type].data.push({ Date, Pass, Fail, Total });
      }
    }
  });

  return generateFTY(n);
}

export function generateFTY(obj) {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    let model = obj[key];
    const fePass = Math.max(model.SMT1.Pass || 0, model.SMT2.Pass || 0);
    const feFail = (model.SMT1.Fail || 0) + (model.SMT2.Fail || 0);
    const feYield = parseFloat(((fePass / (fePass + feFail)) * 100).toFixed(1));
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

    const beYield = parseFloat(((bePass / (bePass + beFail)) * 100).toFixed(1));
    const fty = parseFloat(((feYield * beYield) / 100).toFixed(1));
    obj[key] = {
      ...obj[key],
      FE: {
        Pass: fePass,
        Fail: feFail,
        Yeild: feYield,
      },
      BE: {
        Pass: bePass,
        Fail: beFail,
        Yield: beYield,
      },
      FTY: fty,
    };
  });
  // return obj.map((model) => {
  //   const fe = { Pass: model.SMT1.Pass + model.SMT2.Pass };
  //   return { ...model, FE: fe };
  // });
  return obj;
}

export function mappingErrorListAndRepairList(objA, objB) {
  objB.RepairList.forEach((repairElement) => {
    let errorListElement = objA.ErrorList.find((errorListElement) => {
      return (
        repairElement["CM_SN"] === errorListElement["CM_SN"] &&
        repairElement["Error_Description"] ===
          errorListElement["Error_Description"] &&
        repairElement["Type"] === errorListElement["Type"]
      );
    });
    if (errorListElement) {
      Object.assign(errorListElement, repairElement);
    }
  });

  // const result = [];

  // objA.ErrorList.forEach((a) => {
  //   let obj = {};
  //   objB.RepairList.forEach((b) => {
  //     if (
  //       b.CM_SN === a.CM_SN &&
  //       b.Error_Description === a.Error_Description &&
  //       b.Type === a.Type
  //     ) {
  //       obj = { ...objA.ErrorList, Reason: b.Reason };
  //     } else {
  //       obj = { ...objA.ErrorList, Reason: "Under Investigation" };
  //     }
  //   });
  //   result.push(obj);
  // });

  // return result;
}

export function parseObject(retJson) {
  let bomObj = [];
  retJson.BOM.forEach((row) => {
    if (row["Bill of Materials (BOM) Form"] >= 0) {
      const obj = {
        item: row["Bill of Materials (BOM) Form"],
        qty: row.__EMPTY,
        smcPn: row.__EMPTY_1,
        type:
          row.__EMPTY_1 === null ||
          row.__EMPTY_1 === undefined ||
          typeof row.__EMPTY_1 !== "string" ||
          row.__EMPTY_1 instanceof String
            ? ""
            : row.__EMPTY_1.split("-")[0],
        mfg: row.__EMPTY_2,
        mfgPn: row.__EMPTY_3,
        description: row.__EMPTY_4,
        refence: row.__EMPTY_5,
        rowNum: row.__rowNum__,
      };
      bomObj.push(obj);
    }
  });

  return bomObj;
}

const keywords = [
  "BGA",
  "SOCKET",
  "QFN",
  "CRYSTAL",
  "QFP",
  "LED",
  "CONNECTOR",
  "SFP",
  "LGA",
  "PRESS",
  "HEATSINK",
  "SCREW",
];

export function recommendItem(bom) {
  return bom
    .filter(
      (item) => item.description !== undefined && item.description !== null
    )
    .filter((item) =>
      keywords.some((keyword) => item.description.includes(keyword))
    );
}
