module.exports = (data, row, cell) => {
  return data.eq(row).children().eq(cell).text().replace(/\s+/g, " ").trim();
};
