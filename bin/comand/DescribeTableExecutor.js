const colors = require("colors");
const Mdb = require("../../lib/Mdb");
const { Printer } = require("@aux4/engine");

async function describeTableExecutor(params) {
  const file = await params.file;
  const password = await params.password;
  const tableName = await params.table;

  const filePassword = password !== "" ? password : undefined;

  const mdb = await Mdb.open(file, filePassword);
  const table = mdb.desc(tableName);

  const out = Printer.on(process.stdout);
  out.println(table.name.yellow);
  table.columns.forEach(column => {
    let length = "";
    if (column.length && column.precision) {
      length = `(${column.length}, ${column.precision})`;
    } else if (column.length) {
      length = `(${column.length})`;
    }
    out.println("-", column.name.yellow, column.type, length, column.nullable ? "NULL".gray : "NOT NULL".gray);
  });
}

module.exports = { describeTableExecutor };
