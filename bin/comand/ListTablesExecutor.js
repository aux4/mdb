const colors = require("colors");
const Mdb = require("../../lib/Mdb");
const { Printer } = require("@aux4/engine");

async function listTablesExecutor(params) {
  const file = await params.file;
  const password = await params.password;
  const normalTables = await booleanParam(params.normalTables);
  const systemTables = await booleanParam(params.systemTables);
  const linkedTables = await booleanParam(params.linkedTables);
  const showCount = await booleanParam(params.showCount);

  const filePassword = password !== "" ? password : undefined;

  const mdb = await Mdb.open(file, filePassword);
  const tables = mdb.getTableNames(normalTables, systemTables, linkedTables, showCount);

  const out = Printer.on(process.stdout);

  if (showCount) {
    tables.forEach(table => out.println("-", table.name.yellow, `(${table.rowCount})`.gray));
  } else {
    tables.forEach(table => out.println("-", table.yellow));
  }
}

async function booleanParam(param) {
  const value = await param;
  return value === true || value === "true";
}

module.exports = { listTablesExecutor };
