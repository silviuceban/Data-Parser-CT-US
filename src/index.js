const fs = require("fs");
const path = require("path");
const axios = require("axios");
const parser = require("./parser");

// MIN businessID found so far = 0000000
// MAX businessID found so far = 1396197

const url =
  "https://www.concord-sots.ct.gov/CONCORD/PublicInquiry?eid=9744&businessID=1090009";

async function run(comp_url) {
  try {
    const res = await axios.get(comp_url);
    // console.log(res.data);
    if (res.data === "") {
      console.log("empty page");
    } else {
      const parsedDATA = parser(res.data);
      console.log("Info: ", parsedDATA);

      fs.readFile(
        path.join("../", "data", "parsedData.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            throw err;
          }
          if (content.length === 0) {
            console.log("file is empty");
            fs.writeFile(
              path.join("../", "data", "parsedData.json"),
              "[" + JSON.stringify(parsedDATA) + "]",
              (err) => {
                if (err) {
                  throw err;
                }
                console.log("file was updated");
              }
            );
          } else {
            let jsonData = JSON.parse(content);
            jsonData.push(parsedDATA);
            let backToStringData = JSON.stringify(jsonData);
            fs.writeFile(
              path.join("../", "data", "parsedData.json"),
              backToStringData,
              (err) => {
                if (err) {
                  throw err;
                }
                console.log("file was updated");
              }
            );
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
// run(url);

async function workLoop(startID, endID) {
  for (let i = startID; i < endID; i++) {
    id = "";
    if (i.toString().length < 7) {
      for (let j = 0; j < 7 - i.toString().length; j++) {
        id += "0";
      }
      id += i.toString();
    } else {
      id = i.toString();
    }

    await run(
      `https://www.concord-sots.ct.gov/CONCORD/PublicInquiry?eid=9744&businessID=${id}`
    );
  }
}

workLoop(0, 12);
