const moment = require("moment");
const stringToDOM = require("./stringToDOM");
const extractDATA = require("./extractDATA");
const searchDATA = require("./searchDATA");

module.exports = (inputDATA) => {
  const $ = stringToDOM(inputDATA);

  const businessDetailsTabDataCells = $(".whitebg");
  const officerDetailsTab = $(".bluebg tbody").eq(1);
  const officerDetailsTabRows = officerDetailsTab.children();

  const companyDetailsObj = {};

  //==========BUSINESS DETAILS============

  companyDetailsObj.businessName = searchDATA(
    "Business Name:",
    businessDetailsTabDataCells
  );
  companyDetailsObj.citizenshipStateInc = searchDATA(
    "Citizenship/State Inc:",
    businessDetailsTabDataCells
  );
  companyDetailsObj.businessId = searchDATA(
    "Business ID:",
    businessDetailsTabDataCells
  );
  companyDetailsObj.lastReportFiledYear = searchDATA(
    "Last Report Filed Year:",
    businessDetailsTabDataCells
  );

  companyDetailsObj.businessAddress = searchDATA(
    "Business Address:",
    businessDetailsTabDataCells
  );
  companyDetailsObj.businessType = searchDATA(
    "Business Type:",
    businessDetailsTabDataCells
  );
  companyDetailsObj.mailingAddress = searchDATA(
    "Mailing Address:",
    businessDetailsTabDataCells
  );
  companyDetailsObj.businessStatus = searchDATA(
    "Business Status:",
    businessDetailsTabDataCells
  );
  companyDetailsObj.dateIncRegistration = moment(
    searchDATA("Date Inc/Registration:", businessDetailsTabDataCells)
  ).format("DD/MM/YYYY");

  companyDetailsObj.annualReportDueDate = moment(
    searchDATA("Annual Report Due Date:", businessDetailsTabDataCells),
    "MM/DD/YYYY"
  ).format("DD/MM/YYYY");

  companyDetailsObj.NAICSCode = searchDATA(
    "NAICS Code:",
    businessDetailsTabDataCells
  );
  companyDetailsObj.NAICSSubCode = searchDATA(
    "NAICS Sub Code:",
    businessDetailsTabDataCells
  );

  //==========OFFICER(s) DETAILS============

  const officersArr = [];

  for (let i = 2; i < officerDetailsTabRows.length; i++) {
    let officerDetailsArr = extractDATA(officerDetailsTabRows, i, 0).split(" ");
    let officerTitle = officerDetailsArr[officerDetailsArr.length - 1];
    let officerName = officerDetailsArr
      .slice(0, officerDetailsArr.length - 1)
      .join(" ");
    officersArr.push({
      [officerTitle]: officerName,
    });
  }

  companyDetailsObj.officers = officersArr;
  return companyDetailsObj;
  // console.log(companyDetailsObj);
};
