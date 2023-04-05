import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const exportToExcel = (user) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileName = "data.xlsx";

  const newUser = user.map((e) => {
    return {
      number: e?.number,
      statusOfPatient: e?.statusOfPatient,
      YOFB: e?.YOFB,
      ethnicity: e?.ethnicity,
      ehnicityO: e?.ehnicityO,
      gender: e?.gender,
      travelTime: e?.travelTime,
      education: e?.education,
      glucoma: e?.glucoma,
      glucomaO: e?.glucomaO,
      hadOfGlaucoma: e?.hadOfGlaucoma,
      relativeWithBlindness: e?.relativeWithBlindness,
      historyOfGlaucoma: e?.historyOfGlucoma,
      historyOfHYPERTENSION: e?.historyOfHYPERTENSION,
      BPSYSTOLIC: e?.BPSYSTOLIC,
      BPDIASTOLIC: e?.BPDIASTOLIC,
      weight: e?.weight,
      height: e?.height,
      historyOfDiabetes: e?.historyOfDiabetes,

      whatEye: e?.whatEye,
      presentingVisualAcuityL: e?.presentingVisualAcuityL,
      presentingVisualAcuityR: e?.presentingVisualAcuityR,
      bestcorrectedvisualAquityLNaive: e?.bestcorrectedvisualAquityLNaive, //new
      bestcorrectedvisualAquityLBeforeWashout:
        e?.bestcorrectedvisualAquityLBeforeWashout, //new
      bestcorrectedvisualAquityLAfterWashout:
        e?.bestcorrectedvisualAquityLAfterWashout, //new
      bestcorrectedvisualAquityRNaive: e?.bestcorrectedvisualAquityRNaive, //new
      bestcorrectedvisualAquityRBeforeWashout:
        e?.bestcorrectedvisualAquityRBeforeWashout, //new
      bestcorrectedvisualAquityRAfterWshout:
        e?.bestcorrectedvisualAquityRAfterWshout, //new
      whatEyeChartWasUsedL: e?.whatEyeChartWasUsedL, //text
      whatEyeChartWasUsedR: e?.whatEyeChartWasUsedR, //text
      cataractPresentL: e?.cataractPresentL,
      cataractPresentR: e?.cataractPresentR,
      GonioscopyL: e?.GonioscopyL,
      GonioscopyR: e?.GonioscopyR,
      openessOfQuadrantL: e?.openessOfQuadrantL,
      openessOfQuadrantR: e?.openessOfQuadrantR,
      anteriorChemberActivityprioToProcedureL:
        e?.anteriorChemberActivityprioToProcedureL, // new text
      anteriorChemberActivityprioToProcedureR:
        e?.anteriorChemberActivityprioToProcedureR, // new text

      VCDRL: e?.VCDRL,
      VCDRR: e?.VCDRR,
      HCDRL: e?.HCDRL,
      HCDRR: e?.HCDRR,
      CVFL: e?.CVFL,
      CVFR: e?.CVFR,
      visualFieldPerformedL: e?.visualFielPerformedL, // yes, No
      visualFieldPerformedR: e?.visualFieldPerformedR, // yes, No
      visualFieldNotPerformedL: e?.visualFieldNotPerformedL,
      visualFieldNotPerformedR: e?.visualFieldNotPerformedR,
      visualFieldNotPerformedLO: e?.visualFieldNotPerformedLO,
      visualFieldNotPerformedRO: e?.visualFieldNotPerformedRO,
      meanDeviationL: e?.meanDeviationL,
      meanDeviationR: e?.meanDeviationR,
      patternSDL: e?.patternSDL,
      patternSDR: e?.patternSDR,
      perimeterL: e?.perimeterL,
      perimeterR: e?.perimeterR,
      // end

      CCTL: e?.CCTL,
      CCTR: e?.CCTR,

      eyesToBeTreatedL: e?.eyesToBeTreatedL, //dropdown, right, left, both
      eyesToBeTreatedR: e?.eyesToBeTreatedR, //dropdown, right, left, both

      //change
      IOP1L: e?.IOP1L, //IOPPrior
      IOP1R: e?.IOP1R,
      IOP2L: e?.IOP2L, // IOPBEFOREwASHOUT
      IOP2R: e?.IOP2R,
      //NEW
      IOP3L: e?.IOP3L, // IOPAfterwASHOUT
      IOP3R: e?.IOP3R,

      //new
      IOP4L: e?.IOP4L, // IOPAtRecruitment
      IOP4R: e?.IOP4R,
      //nEW Position
      // interoccular pressre before procedure(Ihr before)
      IOP1HRL: e?.IOP1HRL,
      IOP1HRR: e?.IOP1HRR,

      BIOP: e?.BIOP,
      BIOPR: e?.BIOPR,
      howmanymililitreofwaterwasgiven: e?.howmanymililitreofwaterwasgiven, // new
      howmanymililitreofwaterwasgivenR: e?.howmanymililitreofwaterwasgivenR, // new
      iop5minL: e?.iop5minL, //number
      iop5minR: e?.iop5minR, //number
      iop15MinL: e?.iop15MinL,
      iop15MinR: e?.iop15MinR,
      iop30minL: e?.iop30minL,
      iop30minR: e?.iop30minR,
      iop1HRL: e?.iop1HRL,
      iop1HRR: e?.iop1HRR,
      averageEnergyForProcedureL: e?.averageEnergyForProcedureL, //Number
      averageEnergyForProcedureR: e?.averageEnergyForProcedureR, //Number

      noOfShotsL: e?.noOfShotsL,
      noOfShotsR: e?.noOfShotsR,
      powerUsedL: e?.powerUsedL,
      powerUsedR: e?.powerUsedR,
      noOfQuadrantsTreatedL: e?.noOfQuadrantsTreatedL,
      noOfQuadrantsTreatedR: e?.noOfQuadrantsTreatedR,
      procedureComplicationL: e?.procedureComplicationL,
      procedureComplicationR: e?.procedureComplicationR,

      ocularPainL: e?.ocularPainL,
      ocularPainR: e?.ocularPainR,

      // if yes show scale
      pain1hrL: e?.pain1hrL,
      pain1hrR: e?.pain1hrR,
      pain24hrL: e?.pain24hrL,
      pain24hrR: e?.pain24hrR,
      pain48hrL: e?.pain48hrL,
      pain48hrR: e?.pain48hrR,

      medicationsBeforeL: JSON.stringify(e.medicationsBeforeL)
        .replace("[", "")
        .replace("]", ""),
      medicationsBeforeR: JSON.stringify(e.medicationsBeforeR)
        .replace("[", "")
        .replace("]", ""),
      //   hobbies: [],
      vaUnaided1HRL: e?.vaUnaided1HRL,
      vaUnaided1HRR: e?.vaUnaided1HRR,

      bcVA1HRL: e?.bcVA1HRL,
      bcVA1HRR: e?.bcVA1HRR,

      flare1HRL: e?.flare1HRL,
      flare1HRR: e?.flare1HRR,

      cells1HRL: e?.cells1HRL,
      cells1HRR: e?.cells1HRR,

      LOCSG1HRR: e?.LOCSG1HRR,
      LOCSG1HRL: e?.LOCSG1HRL,

      IOPA1HRL: e?.IOPA1HRL,
      IOPA1HRR: e?.IOPA1HRR,

      comp1HRL: e?.comp1HRL,
      comp1HRR: e?.comp1HRR,

      BV1HRL: e?.BV1HRL,
      BV1HRR: e?.BV1HRR,

      //24HR
      vaUnaided24HRL: e?.vaUnaided24HRL,
      vaUnaided24HRR: e?.vaUnaided24HRR,

      bcVA24HRL: e?.bcVA24HRL,
      bcVA24HRR: e?.bcVA24HRR,

      flare24HRL: e?.flare24HRL,
      flare24HRR: e?.flare24HRR,

      cells24HRL: e?.cells24HRL,
      cells24HRR: e?.cells24HRR,

      LOCSG24HRR: e?.LOCSG24HRR,
      LOCSG24HRL: e?.LOCSG24HRL,

      IOPA24HRL: e?.IOPA24HRL,
      IOPA24HRR: e?.IOPA24HRR,

      comp24HRL: e?.comp24HRL,
      comp24HRR: e?.comp24HRR,

      //1MONTH
      vaUnaided1ML: e?.vaUnaided1ML,
      vaUnaided1MR: e?.vaUnaided1MR,

      bcVA1ML: e?.bcVA1ML,
      bcVA1MR: e?.bcVA1MR,

      flare1ML: e?.flare1ML,
      flare1MR: e?.flare1MR,

      cells1ML: e?.cells1ML,
      cells1MR: e?.cells1MR,

      LOCSG1MR: e?.LOCSG1MR,
      LOCSG1ML: e?.LOCSG1ML,

      IOPA1ML: e?.IOPA1ML,
      IOPA1MR: e?.IOPA1MR,

      comp1ML: e?.comp1ML,
      comp1MR: e?.comp1MR,

      //2MONTH
      vaUnaided2ML: e?.vaUnaided2ML,
      vaUnaided2MR: e?.vaUnaided2MR,

      bcVA2ML: e?.bcVA2ML,
      bcVA2MR: e?.bcVA2MR,

      flare2ML: e?.flare2ML,
      flare2MR: e?.flare2MR,

      cells2ML: e?.cells2ML,
      cells2MR: e?.cells2MR,

      LOCSG2MR: e?.LOCSG2MR,
      LOCSG2ML: e?.LOCSG2ML,

      IOPA2ML: e?.IOPA2ML,
      IOPA2MR: e?.IOPA2MR,

      PAS2ML: e?.PAS2ML,
      PAS2MR: e?.PAS2MR,

      Gonioscopy2ML: e?.Gonioscopy2ML,
      Gonioscopy2MR: e?.Gonioscopy2MR,

      openessOfQuadrant2MR: e?.openessOfQuadrant2MR,
      openessOfQuadrant2ML: e?.openessOfQuadrant2ML,

      pigment2ML: e?.pigment2ML,
      pigment2MR: e?.pigment2MR,

      pigmentO2ML: e?.pigmentO2ML,
      pigmentO2MR: e?.pigmentO2MR,

      SLT2ML: e?.SLT2ML,
      SLT2MR: e?.SLT2MR,

      BIOP2ML: e?.BIOP2ML,
      BIOPR2MR: e?.BIOP2MR,
      howmanymililitreofwaterwasgiven2ML: e?.howmanymililitreofwaterwasgiven2ML, // new
      howmanymililitreofwaterwasgivenR2MR:
        e?.howmanymililitreofwaterwasgiven2MR, // new
      iop5minL2ML: e?.iop5minL2ML, //number
      iop5minR2MR: e?.iop5minL2MR, //number
      iop15MinL2ML: e?.iop15MinL2ML,
      iop15MinR2MR: e?.iop15MinL2MR,
      iop30minL2ML: e?.iop30minL2ML,
      iop30minR2MR: e?.iop30minL2MR,
      iop1HRL2ML: e?.iop1HRL2ML,
      iop1HRR2MR: e?.iop1HRL2MR,

      //3MONTH
      vaUnaided3ML: e?.vaUnaided3ML,
      vaUnaided3MR: e?.vaUnaided3MR,

      bcVA3ML: e?.bcVA3ML,
      bcVA3MR: e?.bcVA3MR,

      flare3ML: e?.flare3ML,
      flare3MR: e?.flare3MR,

      cells3ML: e?.cells3ML,
      cells3MR: e?.cells3MR,

      LOCSG3MR: e?.LOCSG3MR,
      LOCSG3ML: e?.LOCSG3ML,

      IOPA3ML: e?.IOPA3ML,
      IOPA3MR: e?.IOPA3MR,

      Gonioscopy3ML: e?.Gonioscopy3ML,
      Gonioscopy3MR: e?.Gonioscopy3MR,

      openessOfQuadrant3MR: e?.openessOfQuadrant3MR,
      openessOfQuadrant3ML: e?.openessOfQuadrant3ML,

      PAS3ML: e?.PAS3ML,
      PAS3MR: e?.PAS3MR,

      pigment3ML: e?.pigment3ML,
      pigment3MR: e?.pigment3MR,

      pigmentO3ML: e?.pigmentO3ML,
      pigmentO3MR: e?.pigmentO3MR,

      SLT3ML: e?.SLT3ML,
      SLT3MR: e?.SLT3MR,

      //6MONTH
      vaUnaided6ML: e?.vaUnaided6ML,
      vaUnaided6MR: e?.vaUnaided6MR,

      bcVA6ML: e?.bcVA6ML,
      bcVA6MR: e?.bcVA6MR,

      flare6ML: e?.flare6ML,
      flare6MR: e?.flare6MR,

      cells6ML: e?.cells6ML,
      cells6MR: e?.cells6MR,

      LOCSG6MR: e?.LOCSG6MR,
      LOCSG6ML: e?.LOCSG6ML,

      IOPA6ML: e?.IOPA6ML,
      IOPA6MR: e?.IOPA6MR,

      Gonioscopy6ML: e?.Gonioscopy6ML,
      Gonioscopy6MR: e?.Gonioscopy6MR,

      openessOfQuadrant6MR: e?.openessOfQuadrant6MR,
      openessOfQuadrant6ML: e?.openessOfQuadrant6ML,

      PAS6ML: e?.PAS6ML,
      PAS6MR: e?.PAS6MR,

      pigment6ML: e?.pigment6ML,
      pigment6MR: e?.pigment6MR,

      pigmentO6ML: e?.pigmentO6ML,
      pigmentO6MR: e?.pigmentO6MR,

      SLT6ML: e?.SLT6ML,
      SLT6MR: e?.SLT6MR,

      CVFMD6ML: e?.CVFMD6ML,
      CVFMD6MR: e?.CVFMD6MR,

      PCVF6ML: e?.PCVF6ML,
      PCVF6MR: e?.PCVF6MR,

      CVFO6ML: e?.CVFO6ML,
      CVFO6MR: e?.CVFO6MR,

      CVFOO6ML: e?.CVFOO6ML,
      CVFOO6MR: e?.CVFOO6MR,

      //9 month
      vaUnaided9ML: e?.vaUnaided9ML,
      vaUnaided9MR: e?.vaUnaided9MR,

      bcVA9ML: e?.bcVA9ML,
      bcVA9MR: e?.bcVA9MR,

      flare9ML: e?.flare9ML,
      flare9MR: e?.flare9MR,

      cells9ML: e?.cells9ML,
      cells9MR: e?.cells9MR,

      LOCSG9MR: e?.LOCSG9MR,
      LOCSG9ML: e?.LOCSG9ML,

      IOPA9ML: e?.IOPA9ML,
      IOPA9MR: e?.IOPA9MR,

      // 12 MONTH

      vaUnaided12ML: e?.vaUnaided12ML,
      vaUnaided12MR: e?.vaUnaided12MR,

      bcVA12ML: e?.bcVA12ML,
      bcVA12MR: e?.bcVA12MR,

      flare12ML: e?.flare12ML,
      flare12MR: e?.flare12MR,

      cells12ML: e?.cells12ML,
      cells12MR: e?.cells12MR,

      LOCSG12MR: e?.LOCSG12MR,
      LOCSG12ML: e?.LOCSG12ML,

      IOPA12ML: e?.IOPA12ML,
      IOPA12MR: e?.IOPA12MR,

      CVFMD12ML: e?.CVFMD12ML,
      CVFMD12MR: e?.CVFMD12MR,

      PCVF12ML: e?.PCVF12ML,
      PCVF12MR: e?.PCVF12MR,

      CVFO12ML: e?.CVFO12ML,
      CVFO12MR: e?.CVFO12MR,

      CVFOO12ML: e?.CVFOO12ML,
      CVFOO12MR: e?.CVFOO12MR,

      CVFPS12ML: e?.CVFPS12ML,
      CVFPS12MR: e?.CVFPS12MR,

      wasTreatmentAddedL: e?.wasTreatmentAddedL,
      wasTreatmentAddedR: e?.wasTreatmentAddedR,
      whatTreatmentWasAddedL: e?.whatTreatmentWasAddedL,
      whatTreatmentWasAddedR: e?.whatTreatmentWasAddedR,
      medicationsL: JSON.stringify(e.medicationsBeforeL)
        .replace("[", "")
        .replace("]", ""),
      medicationsR: JSON.stringify(e.medicationsR)
        .replace("[", "")
        .replace("]", ""),

      medicalTreatmentMonthL: e?.medicalTreatmentMonthL,
      medicalTreatmentMonthR: e?.medicalTreatmentMonthR,
      repeatSLTL: e?.repeatSLTL,
      repeatSLTR: e?.repeatSLTR,
      repeatSLTMonthL: e?.repeatSLTMonthL,
      repeatSLTMonthR: e?.repeatSLTMonthR,
      iopBeforeRepeatSLTL: e?.iopBeforeRepeatSLTL,
      iopBeforeRepeatSLTR: e?.iopBeforeRepeatSLTR,
      iopAfter1hrRepeatLaserL: e?.iopAfter1hrRepeatLaserL,
      iopAfter1hrRepeatLaserR: e?.iopAfter1hrRepeatLaserR,
      iop3MonthsAfterRepeatSLTL: e?.iop3MonthsAfterRepeatSLTL,
      iop3MonthsAfterRepeatSLTR: e?.iop3MonthsAfterRepeatSLTR,
      iopAfter6MonthsAfterRepeatSLTL: e?.iopAfter6MonthsAfterRepeatSLTL,
      iopAfter6MonthsAfterRepeatSLTR: e?.iopAfter6MonthsAfterRepeatSLTR,
      iopAfter12MonthsAfterRepeatSLTL: e?.iopAfter12MonthsAfterRepeatSLTL,
      iopAfter12MonthsAfterRepeatSLTR: e?.iopAfter12MonthsAfterRepeatSLTR,
      complicationsAfterSLTL: e?.complicationsAfterSLTL,
      complicationsAfterSLTR: e?.complicationsAfterSLTR,
    };
  });

  const ws = XLSX.utils.json_to_sheet(newUser);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });
  const excelBlob = new Blob([excelBuffer], { type: fileType });
  saveAs(excelBlob, fileName);
};
