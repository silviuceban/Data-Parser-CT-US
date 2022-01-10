module.exports = (criterion, dataSet) => {
  let dataObj;
  for (let i = 0; i < dataSet.length; i++) {
    if (dataSet.eq(i).text() === criterion) {
      dataObj = dataSet
        .eq(i + 1)
        .text()
        .replace(/\s+/g, " ")
        .trim();
      break;
    }
  }

  return dataObj;
};
