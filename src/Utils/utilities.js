import XLSX from "xlsx";

// read excel file
export function readxlsx(inputData) {
  var workbook = XLSX.read(inputData, { type: "binary", cellDates: true });
  return toJson(workbook);
}

// parsing excel obj to json
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
            reasons: [{ reason: obj.Reason, item: obj.item }],
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
          reasons: [{ reason: obj.Reason, item: obj.item }],
        });
      }
    }
  });

  return n;
}

// parsing yieldRate json to specfic format for each station failure symptom
export function parseForYieldRate(updatedJson) {
  let n = { startDate: null, endDate: null };

  updatedJson.YieldRate.forEach((obj) => {
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

  return transformToArray(generateFTY(n));
}

// transform yieldRate object into array for result page easy to render
function transformToArray(obj) {
  const o = { startDate: obj.startDate, endDate: obj.endDate, models: [] };
  const keys = Object.keys(obj).filter(
    (item) => item !== "startDate" && item !== "endDate"
  );
  keys.forEach((model) => {
    const newObject = { model, ...obj[model] };
    o.models.push(newObject);
  });

  return o;
}

// generate FTY for yieldRate each model and stattion
function generateFTY(obj) {
  const keys = Object.keys(obj).filter(
    (item) => item !== "startDate" && item !== "endDate"
  );

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
  return obj;
}

// Mapping error list and repair list
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
}
