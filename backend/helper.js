function getOffset(currentPage = 1, listPerPage) {
  return (Number(currentPage) - 1) * Number(listPerPage);
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows
}
